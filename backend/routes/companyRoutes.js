const pool = require("../db");
const express = require("express");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Company Route Working");
});

router.post("/create", async (req, res) => {
  try {
    const {
      user_id,
      company_name,
      gst_number,
      address,
      financial_year
    } = req.body;

    const companyCount = await pool.query(
   "SELECT COUNT(*) FROM companies WHERE user_id = $1",
   [user_id]
   );

   if (parseInt(companyCount.rows[0].count) >= 5) {
   return res.status(400).json({
   message: "Maximum 5 companies allowed per user"
   });
   }

    const result = await pool.query(
      `INSERT INTO companies
      (user_id, company_name, gst_number, address, financial_year)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [user_id, company_name, gst_number, address, financial_year]
    );

    res.status(201).json({
      message: "Company created successfully",
      company: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Company creation failed"
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM companies ORDER BY company_name"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch companies",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM companies WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch company",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      company_name,
      gst_number,
      address,
      financial_year
    } = req.body;

    const result = await pool.query(
      `UPDATE companies
       SET company_name = $1,
           gst_number = $2,
           address = $3,
           financial_year = $4
       WHERE id = $5
       RETURNING *`,
      [
        company_name,
        gst_number,
        address,
        financial_year,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Company not found"
      });
    }

    res.status(200).json({
      message: "Company updated successfully",
      company: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update company"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM stock_items WHERE company_id = $1",
      [id]
    );

    const result = await pool.query(
      "DELETE FROM companies WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Company not found"
      });
    }

    res.status(200).json({
      message: "Company deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete company"
    });
  }
});

module.exports = router;