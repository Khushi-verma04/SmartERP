const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Report Route Working");
});

router.get("/stock", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM stock_items");
    console.log(result.rows);

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch stock report"
    });
  }
});

module.exports = router;