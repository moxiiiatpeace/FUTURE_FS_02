const express = require("express");
const router = express.Router();

const {
    addNote,
    getNotesByLead
} = require("../controllers/noteController");

router.post("/", addNote);
router.get("/:leadId", getNotesByLead);

module.exports = router;