const express = require("express")
const router = express.Router()
const {login, resetpassword, forgotpassword, register, updateuser, getusers} = require("../controllers/auth")
const {addclient_type, getclient_types, updateclient_type, deleteclient_type,} = require("../controllers/clientType")
const { add_product } = require("../controllers/product")

router.route("/login").post(login)
router.route("/update/:userID").put(updateuser)
router.route("/register").post(register)
router.route("/forgotpassword").post(forgotpassword)
router.route("/resetpassword/:resetToken").put(resetpassword)

router.route("/users").get(getusers)

router.route("/client_type").post(addclient_type)
router.route("/getclient_type").post(getclient_types)
router.route("/client_type/:typeID").put(updateclient_type).delete(deleteclient_type)

router.route("/product").post(add_product)
 

module.exports = router