const express = require("express");
const router = express.Router();

const {
    addLead,
    getAllLeads,
    updateLeadStatus,
    deleteLead,
    getLeadStats
} = require("../controllers/leadController");

// Dashboard Stats
router.get("/stats", getLeadStats);

// Lead Routes
router.post("/", addLead);
router.get("/", getAllLeads);
router.put("/:id/status", updateLeadStatus);
router.delete("/:id", deleteLead);

module.exports = router;