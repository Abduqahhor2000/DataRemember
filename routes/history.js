const express = require("express")
const router = express.Router()
const { addhistory, deletehistory, gethistorys, updatehistory } = require("../controllers/client")

router.route("/").post(addhistory).get(gethistorys)
router.route("/:historyID").delete(deletehistory).put(updatehistory)


module.exports = router