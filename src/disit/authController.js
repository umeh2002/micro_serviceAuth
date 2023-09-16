"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.signIn = exports.register = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const user = yield prisma.authModel.create({
            data: {
                name, email, password: hash
            }
        });
        return res.status(201).json({
            message: "registration successfully",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error",
            data: error.message
        });
    }
});
exports.register = register;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const mail = yield prisma.authModel.findUnique({
            where: { email },
        });
        const hash = yield bcrypt_1.default.compare(password, mail === null || mail === void 0 ? void 0 : mail.password);
        if (mail) {
            if (hash) {
                const token = jsonwebtoken_1.default.sign({ id: mail.id }, "secret");
                const newToken = `${(0, uuid_1.v4)()}%${token}`;
                // const newToken = `${uuid()}%${token}`
                req.headers.authorization = `Bearer ${newToken}`;
                return res.status(201).json({
                    message: "success",
                    data: newToken
                });
            }
            else {
                return res.status(404).json({
                    message: "token not available",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "user not signed in",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "error",
            data: error.message
        });
    }
});
exports.signIn = signIn;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.authModel.findMany({});
        return res.status(200).json({
            message: "success",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error",
            data: error.message
        });
    }
});
exports.getAll = getAll;
