const express = require("express")
const router = express.Router()
const { addclient, deleteclient, getclients, updateclient } = require("../controllers/client")

router.route("/").post(addclient).get(getclients)
router.route("/:clientID").delete(deleteclient).put(updateclient)


module.exports = router