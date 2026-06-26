const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Stock Route Working");
});

router.post("/create", async (req, res) => {
  try {
    const {
      company_id,
      item_name,
      sku,
      purchase_price,
      selling_price,
      quantity,
      gst_percent
    } = req.body;

    const result = await pool.query(
      `INSERT INTO stock_items
      (company_id, item_name, sku, purchase_price, selling_price, quantity, gst_percent)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        company_id,
        item_name,
        sku,
        purchase_price,
        selling_price,
        quantity,
        gst_percent
      ]
    );

    res.status(201).json({
      message: "Stock item created successfully",
      stock: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Stock item creation failed"
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM stock_items ORDER BY item_name"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch stock items"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM stock_items WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Stock item not found"
      });
    }

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch stock item"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      item_name,
      sku,
      purchase_price,
      selling_price,
      quantity,
      gst_percent
    } = req.body;

    const result = await pool.query(
      `UPDATE stock_items
       SET item_name = $1,
           sku = $2,
           purchase_price = $3,
           selling_price = $4,
           quantity = $5,
           gst_percent = $6
       WHERE id = $7
       RETURNING *`,
      [
        item_name,
        sku,
        purchase_price,
        selling_price,
        quantity,
        gst_percent,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Stock item not found"
      });
    }

    res.status(200).json({
      message: "Stock item updated successfully",
      stock: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update stock item"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM stock_items WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Stock item not found"
      });
    }

    res.status(200).json({
      message: "Stock item deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete stock item"
    });
  }
});

module.exports = router;