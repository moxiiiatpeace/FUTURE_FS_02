const db = require("../config/db");

// Add Follow-up
const addFollowup = (req, res) => {
    const {
        lead_id,
        followup_date,
        followup_time,
        remark
    } = req.body;

    db.query(
        `INSERT INTO followups
        (lead_id, followup_date, followup_time, remark)
        VALUES (?, ?, ?, ?)`,
        [lead_id, followup_date, followup_time, remark],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Follow-up Added Successfully"
            });
        }
    );
};

// Get Follow-ups By Lead
const getFollowupsByLead = (req, res) => {
    const { leadId } = req.params;

    db.query(
        "SELECT * FROM followups WHERE lead_id = ?",
        [leadId],
        (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );
};

// Mark Complete
const completeFollowup = (req, res) => {
    const { id } = req.params;

    db.query(
        "UPDATE followups SET status='Completed' WHERE id=?",
        [id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Follow-up Completed"
            });
        }
    );
};

module.exports = {
    addFollowup,
    getFollowupsByLead,
    completeFollowup
};