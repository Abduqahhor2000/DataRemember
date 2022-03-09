const express = require("express")
const router = express.Router()
const { addclient, deleteclient, getclients, updateclient } = require("../controllers/client")
const { addconvert, deleteconvert, getconverts, updateconvert } = require("../controllers/convert")
const { stat_client } = require("../controllers/statistic")

router.route("/").post(addclient)
router.route("/get").post(getclients)
router.route("/:clientID").delete(deleteclient).put(updateclient)
router.route("/convert").post(addconvert)
router.route("/convert/get").post(getconverts)
router.route("/convert/:convertID").delete(deleteconvert)
router.route("/convert/:convertID/update").put(updateconvert)
router.route("/stat_client").get(stat_client)

module.exports = router