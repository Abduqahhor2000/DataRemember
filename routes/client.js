const express = require("express")
const router = express.Router()
const { addclient, deleteclient, getclients, updateclient } = require("../controllers/client")

router.route("/").post(addclient)
// .delete(deleteclient).get(getclients).put(updateclient)

module.exports = router