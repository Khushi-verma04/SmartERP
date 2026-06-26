const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Supplier Route Working");
});

router.post("/create", async (req, res) => {
  try {
    const {
      company_id,
      name,
      mobile,
      address,
      gst_number,
      supplier_name
    } = req.body;

    const result = await pool.query(
      `INSERT INTO suppliers
      (company_id, name, mobile, address, gst_number, supplier_name)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        company_id,
        name,
        mobile,
        address,
        gst_number,
        supplier_name
      ]
    );

    res.status(201).json({
      message: "Supplier created successfully",
      supplier: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Supplier creation failed"
    });
  }
});

module.exports = router;