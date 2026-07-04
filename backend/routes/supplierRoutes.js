const express = require("express");
const pool = require("../db");

const router = express.Router();

// TEST
router.get("/test", (req, res) => {
  res.send("Supplier Route Working");
});

// CREATE SUPPLIER
router.post("/create", async (req, res) => {
  try {
    const {
      company_id,
      name,
      mobile,
      address,
      gst_number,
      supplier_name,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO suppliers
      (company_id, name, mobile, address, gst_number, supplier_name)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [company_id, name, mobile, address, gst_number, supplier_name]
    );

    res.status(201).json({
      message: "Supplier created successfully",
      supplier: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Supplier creation failed" });
  }
});

// GET ALL SUPPLIERS
router.get("/all", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM suppliers ORDER BY id DESC"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch suppliers" });
  }
});

// UPDATE SUPPLIER
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { company_id, name, mobile, address, gst_number, supplier_name } =
      req.body;

    const result = await pool.query(
      `UPDATE suppliers
       SET company_id = $1,
           name = $2,
           mobile = $3,
           address = $4,
           gst_number = $5,
           supplier_name = $6
       WHERE id = $7
       RETURNING *`,
      [company_id, name, mobile, address, gst_number, supplier_name, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({
      message: "Supplier updated successfully",
      supplier: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update supplier" });
  }
});

// DELETE SUPPLIER
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM suppliers WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete supplier" });
  }
});

module.exports = router;