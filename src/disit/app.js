"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRouter_1 = __importDefault(require("./authRouter"));
const mainApp = (app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.get("/", (req, res) => {
        try {
            return res.status(200).json({
                message: "welcome back"
            });
        }
        catch (error) {
            return res.status(404).json({
                message: "error"
            });
        }
    });
    app.use("/api", authRouter_1.default);
};
exports.mainApp = mainApp;
