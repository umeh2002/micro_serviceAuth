"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = require("./app");
const app = (0, express_1.default)();
const port = 2910;
(0, app_1.mainApp)(app);
const server = app.listen(port, () => {
    console.log("");
    console.log(`listening on ${port}`);
});
process.on("uncaughtException", (err) => {
    console.log("server is shutting down", err);
});
process.on("unhandledRejection", (reason) => {
    console.log("server is shutting down", reason);
    server.close(() => {
        process.exit(1);
    });
});
