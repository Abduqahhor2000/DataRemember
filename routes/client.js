const express = require("express")
const router = express.Router()
const { addclient, deleteclient, getclients, updateclient } = require("../controllers/client")
const { addconvert, deleteconvert, getconverts, updateconvert } = require("../controllers/convert")
const { stat_client } = require("../controllers/statistic")

router.route("/").post(addclient).get(getclients)
router.route("/:clientID").delete(deleteclient).put(updateclient)
router.route("/convert").post(addconvert).get(getconverts)
router.route("/convert/:convertID").put(updateconvert).delete(deleteconvert)
router.route("/stat_client").get(stat_client)

module.exports = router