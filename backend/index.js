const express = require("express");
const pool = require("./db");

const app = express();

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`SmartERP Backend Running. Database Connected at ${result.rows[0].now}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database Connection Failed");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});