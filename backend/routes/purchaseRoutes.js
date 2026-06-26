const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Purchase Route Working");
});

router.post("/create", async (req, res) => {
  try {
    const {
      supplier_id,
      date,
      total_amount
    } = req.body;

    const result = await pool.query(
      `INSERT INTO purchase_vouchers
      (supplier_id, date, total_amount)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [
        supplier_id,
        date,
        total_amount
      ]
    );

    res.status(201).json({
      message: "Purchase voucher created successfully",
      purchaseVoucher: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Purchase voucher creation failed"
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM purchase_vouchers ORDER BY date DESC"
    );

    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch purchase vouchers"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM purchase_vouchers WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Purchase voucher not found"
      });
    }

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch purchase voucher"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { supplier_id, date, total_amount } = req.body;

    const result = await pool.query(
      `UPDATE purchase_vouchers
       SET supplier_id = $1,
           date = $2,
           total_amount = $3
       WHERE id = $4
       RETURNING *`,
      [supplier_id, date, total_amount, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Purchase voucher not found"
      });
    }

    res.status(200).json({
      message: "Purchase voucher updated successfully",
      purchaseVoucher: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update purchase voucher"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM purchase_vouchers WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Purchase voucher not found"
      });
    }

    res.status(200).json({
      message: "Purchase voucher deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete purchase voucher"
    });
  }
});

module.exports = router;