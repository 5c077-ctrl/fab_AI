const { Pool } = require("pg")
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function saveGeneration(domain, prompt, result, mode) {
    try {
        await pool.query(
            "INSERT INTO generations (domain, prompt, result, mode) VALUES ($1, $2, $3, $4)",
            [domain, prompt, result, mode]
        )
    } catch (err) {
        console.error("Erreur BDD :", err.message)
    }
}

module.exports = { saveGeneration }