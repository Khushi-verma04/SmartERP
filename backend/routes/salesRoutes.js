const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Sales Route Working");
});

router.post("/create", async (req, res) => {
  try {
  const {
  invoice_no,
  customer_name,
  product_name,
  quantity,
  price,
  date,
  total_amount
} = req.body;

console.log(req.body);

    const result = await pool.query(
      `INSERT INTO sales_vouchers
      (invoice_no, customer_name, date, total_amount)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [
        invoice_no,
        customer_name,
        date,
        total_amount,
      ]
    );

    res.status(201).json({
      message: "Sales voucher created successfully",
      salesVoucher: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Sales voucher creation failed"
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM sales_vouchers ORDER BY date DESC"
    );

    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch sales vouchers"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM sales_vouchers WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Sales voucher not found"
      });
    }

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch sales voucher"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      invoice_no,
      customer_name,
      date,
      total_amount
    } = req.body;

    console.log(req.body);

    const result = await pool.query(
      `UPDATE sales_vouchers
       SET invoice_no = $1,
           customer_id = $2,
           date = $3,
           total_amount = $4
       WHERE id = $5
       RETURNING *`,
      [
        invoice_no,
        customer_id,
        date,
        total_amount,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Sales voucher not found"
      });
    }

    res.status(200).json({
      message: "Sales voucher updated successfully",
      salesVoucher: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update sales voucher"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM sales_vouchers WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Sales voucher not found"
      });
    }

    res.status(200).json({
      message: "Sales voucher deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete sales voucher"
    });
  }
});

module.exports = router;