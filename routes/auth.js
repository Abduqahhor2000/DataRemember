const express = require("express")
const router = express.Router()
const {login, resetpassword, forgotpassword, register, updateUser} = require("../controllers/auth")

router.route("/login").post(login)
router.route("/update").put(updateUser)
router.route("/register").post(register)
router.route("/forgotpassword").post(forgotpassword)
router.route("/resetpassword/:resetToken").put(resetpassword)

module.exports = router