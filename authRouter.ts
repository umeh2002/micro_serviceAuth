import {Router} from "express"
import { getAll, register, signIn } from "./authController"

const router = Router()

router.route("/create").post(register)
router.route("/sign-in").post(signIn)
router.route("/get-all").get(getAll)

export default router