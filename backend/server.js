const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

// Connect to PostgreSQL using the environment variable from docker-compose
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/', async (req, res) => {
  try {
    // Simple test query to ensure DB connectivity works
    const dbRes = await pool.query('SELECT NOW()');
    res.json({
      status: "success",
      message: "👋 Hello from the secure Node.js backend!",
      databaseTime: dbRes.rows[0].now
    });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running running safely as non-root user on port ${port}`);
});