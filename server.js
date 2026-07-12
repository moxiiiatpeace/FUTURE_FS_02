require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");
const noteRoutes = require("./routes/noteRoutes");
const followupRoutes = require("./routes/followupRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/followups", followupRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Mini CRM API Running...");
});

// Database Test Route
app.get("/test-db", (req, res) => {
    db.query("SELECT 1 + 1 AS result", (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});