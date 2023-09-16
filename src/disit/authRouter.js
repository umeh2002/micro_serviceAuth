"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("./authController");
const router = (0, express_1.Router)();
router.route("/create").post(authController_1.register);
router.route("/sign-in").post(authController_1.signIn);
router.route("/get-all").get(authController_1.getAll);
exports.default = router;
