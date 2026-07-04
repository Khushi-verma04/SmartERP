const express = require("express");
const pool = require("../db");

const router = express.Router();

// TOTAL COMPANIES
router.get("/companies", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM companies");
    res.json({ total: result.rows[0].count });
  } catch (err) {
    res.status(500).json({ message: "Error fetching companies" });
  }
});

// TOTAL CUSTOMERS
router.get("/customers", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM customers");
    res.json({ total: result.rows[0].count });
  } catch (err) {
    res.status(500).json({ message: "Error fetching customers" });
  }
});

// TOTAL SALES AMOUNT
router.get("/sales", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT COALESCE(SUM(total_amount),0) AS total FROM sales_vouchers"
    );
    res.json({ total: result.rows[0].total });
  } catch (err) {
    res.status(500).json({ message: "Error fetching sales" });
  }
});

// TOTAL PURCHASE AMOUNT
router.get("/purchase", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT COALESCE(SUM(total_amount),0) AS total FROM purchase_vouchers"
    );
    res.json({ total: result.rows[0].total });
  } catch (err) {
    res.status(500).json({ message: "Error fetching purchase" });
  }
});

router.get("/inventory", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM inventory");

    res.json({
      total: result.rows[0].count,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching inventory",
    });
  }
});

module.exports = router;