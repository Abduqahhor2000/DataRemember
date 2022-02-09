const express = require("express")
const router = express.Router()
const {login, resetpassword, forgotpassword, register} = require("../controllers/auth")

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/forgotpassword").post(forgotpassword)
router.route("/resetpassword/:resetToken").post(resetpassword)

module.exports = router