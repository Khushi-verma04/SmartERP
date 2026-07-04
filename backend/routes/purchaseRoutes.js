const express = require("express");
const pool = require("../db");

const router = express.Router();

// CREATE PURCHASE
router.post("/create", async (req, res) => {
  try {
    const { supplier_id, item_name, quantity, price, date } = req.body;

    const total_amount = quantity * price;

    const result = await pool.query(
      `INSERT INTO purchases
      (supplier_id, item_name, quantity, price, total_amount,date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [supplier_id, item_name, quantity, price, total_amount,date]
    );

    res.status(201).json({
      message: "Purchase created successfully",
      purchase: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create purchase" });
  }
});

// GET ALL PURCHASES
router.get("/all", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM purchases ORDER BY id DESC"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch purchases" });
  }
});

// UPDATE PURCHASE
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { supplier_id, item_name, quantity, price } = req.body;

    const total_amount = quantity * price;

    const result = await pool.query(
      `UPDATE purchases
       SET supplier_id = $1,
           item_name = $2,
           quantity = $3,
           price = $4,
           total_amount = $5,
           date = $6
       WHERE id = $7
       RETURNING *`,
      [supplier_id, item_name, quantity, price, total_amount,date, id]
    );

    res.status(200).json({
      message: "Purchase updated successfully",
      purchase: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update purchase" });
  }
});

// DELETE PURCHASE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM purchases WHERE id = $1", [id]);

    res.status(200).json({
      message: "Purchase deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete purchase" });
  }
});

module.exports = router;