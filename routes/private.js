const express = require("express");
const router = express.Router()
const {protect} = require("../middleware/auth")
const {getPrivateRoute} = require("../controllers/private")

router.route("/").get(protect, getPrivateRoute)

module.exports = router