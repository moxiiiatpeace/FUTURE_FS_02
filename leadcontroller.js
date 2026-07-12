const db = require("../config/db");

// Add Lead
const addLead = (req, res) => {
    const { name, email, phone, source } = req.body;

    db.query(
        "INSERT INTO leads (name, email, phone, source) VALUES (?, ?, ?, ?)",
        [name, email, phone, source],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Lead Added Successfully"
            });
        }
    );
};

// Get All Leads
const getAllLeads = (req, res) => {
    db.query(
        "SELECT * FROM leads",
        (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );
};

// Update Lead Status
const updateLeadStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    db.query(
        "UPDATE leads SET status = ? WHERE id = ?",
        [status, id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Lead Status Updated"
            });
        }
    );
};

// Delete Lead
const deleteLead = (req, res) => {
    const { id } = req.params;

    db.query(
        "DELETE FROM leads WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Lead Deleted Successfully"
            });
        }
    );
};

// Dashboard Stats
const getLeadStats = (req, res) => {
    const query = `
        SELECT
            COUNT(*) AS total,
            SUM(CASE WHEN status='New' THEN 1 ELSE 0 END) AS newLeads,
            SUM(CASE WHEN status='Contacted' THEN 1 ELSE 0 END) AS contacted,
            SUM(CASE WHEN status='Converted' THEN 1 ELSE 0 END) AS converted
        FROM leads
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(results[0]);
    });
};

module.exports = {
    addLead,
    getAllLeads,
    updateLeadStatus,
    deleteLead,
    getLeadStats
};