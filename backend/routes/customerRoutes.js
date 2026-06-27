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

module.exports = router;