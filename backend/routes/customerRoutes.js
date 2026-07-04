const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Customer Route Working");
});

router.post("/create", async (req, res) => {
  try {
    const {
      company_id,
      name,
      mobile,
      address,
      gst_number,
      balance
    } = req.body;

    const result = await pool.query(
      `INSERT INTO customers
      (company_id, name, mobile, address, gst_number, balance)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        company_id,
        name,
        mobile,
        address,
        gst_number,
        balance
      ]
    );

    res.status(201).json({
      message: "Customer created successfully",
      customer: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Customer creation failed"
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customers ORDER BY name"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch customers",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      mobile,
      address,
      gst_number,
      balance,
    } = req.body;

    const result = await pool.query(
      `UPDATE customers
       SET name = $1,
           mobile = $2,
           address = $3,
           gst_number = $4,
           balance = $5
       WHERE id = $6
       RETURNING *`,
      [
        name,
        mobile,
        address,
        gst_number,
        balance,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      message: "Customer updated successfully",
      customer: result.rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update customer",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM customers WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      message: "Customer deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete customer",
    });
  }
});

module.exports = router;