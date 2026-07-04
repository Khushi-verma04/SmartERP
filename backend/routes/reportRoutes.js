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

router.get("/sales", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sales");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch sales report"
    });
  }
});

router.get("/invoices/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Invoice + customer
    const invoiceResult = await pool.query(
      `SELECT i.*, c.name as customer_name, c.phone
       FROM invoices i
       JOIN customers c ON i.customer_id = c.id
       WHERE i.id = $1`,
      [id]
    );

    // Items
    const itemsResult = await pool.query(
      `SELECT * FROM invoice_items WHERE invoice_id = $1`,
      [id]
    );

    res.json({
      invoice: invoiceResult.rows[0],
      items: itemsResult.rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch invoice" });
  }
});

module.exports = router;