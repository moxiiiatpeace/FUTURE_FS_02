const express = require("express");
const router = express.Router();

const {
    addFollowup,
    getFollowupsByLead,
    completeFollowup
} = require("../controllers/followupController");

router.post("/", addFollowup);
router.get("/:leadId", getFollowupsByLead);
router.put("/:id/complete", completeFollowup);

module.exports = router;