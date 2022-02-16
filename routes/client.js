const express = require("express")
const router = express.Router()
const { addclient, deleteclient, getclients, updateclient } = require("../controllers/client")
const { addconvert, deleteconvert, getconverts, updateconvert } = require("../controllers/convert")

router.route("/").post(addclient).get(getclients)
router.route("/:clientID").delete(deleteclient).put(updateclient)
router.route("/convert").post(addconvert).get(getconverts)
router.route("/convert/:convertID").put(updateconvert).delete(deleteconvert)

module.exports = router