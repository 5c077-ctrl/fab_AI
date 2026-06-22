const express = require("express")
const router = express.Router()
const { Pool } = require("pg")
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

router.get("/", async (req, res) => {
    try {
        const { domain } = req.query
        let query = "SELECT * FROM generations ORDER BY created_at DESC LIMIT 50"
        let params = []

        if (domain) {
            query = "SELECT * FROM generations WHERE domain=$1 ORDER BY created_at DESC LIMIT 50"
            params = [domain]
        }

        const result = await pool.query(query, params)
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router