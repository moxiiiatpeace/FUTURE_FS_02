const db = require("../config/db");

// Add Note
const addNote = (req, res) => {
    const { lead_id, note_text } = req.body;

    db.query(
        "INSERT INTO notes (lead_id, note_text) VALUES (?, ?)",
        [lead_id, note_text],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Note Added Successfully"
            });
        }
    );
};

// Get Notes By Lead
const getNotesByLead = (req, res) => {
    const { leadId } = req.params;

    db.query(
        "SELECT * FROM notes WHERE lead_id = ? ORDER BY created_at DESC",
        [leadId],
        (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );
};

module.exports = {
    addNote,
    getNotesByLead
};