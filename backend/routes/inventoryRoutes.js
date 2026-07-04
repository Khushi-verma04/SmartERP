const express = require("express");
const router = express.Router();
const pool = require("../db");

// CREATE ITEM
router.post("/create", async (req, res) => {
  try {
    const { item_name, category, quantity, price } = req.body;

    const result = await pool.query(
      `INSERT INTO inventory (item_name, category, quantity, price)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [item_name, category, quantity, price]
    );

    res.status(201).json({
      message: "Item created successfully",
      item: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create item" });
  }
});

// GET ALL ITEMS
router.get("/all", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM inventory ORDER BY id DESC"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
});

// UPDATE ITEM
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { item_name, category, quantity, price } = req.body;

    const result = await pool.query(
      `UPDATE inventory
       SET item_name = $1,
           category = $2,
           quantity = $3,
           price = $4
       WHERE id = $5
       RETURNING *`,
      [item_name, category, quantity, price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item updated successfully",
      item: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update item" });
  }
});

// DELETE ITEM
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM inventory WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete item" });
  }
});

module.exports = router;