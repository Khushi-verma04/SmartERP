const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Ledger Route Working");
});

router.post("/create", async (req, res) => {
  try {
    const {
      company_id,
      ledger_name,
      ledger_type,
      opening_balance
    } = req.body;

    const result = await pool.query(
      `INSERT INTO ledgers
      (company_id, ledger_name, ledger_type, opening_balance)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [
        company_id,
        ledger_name,
        ledger_type,
        opening_balance
      ]
    );

    res.status(201).json({
      message: "Ledger created successfully",
      ledger: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ledger creation failed"
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM ledgers ORDER BY ledger_name"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch ledgers"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM ledgers WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Ledger not found"
      });
    }

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch ledger"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      ledger_name,
      ledger_type,
      opening_balance
    } = req.body;

    const result = await pool.query(
      `UPDATE ledgers
       SET ledger_name = $1,
           ledger_type = $2,
           opening_balance = $3
       WHERE id = $4
       RETURNING *`,
      [
        ledger_name,
        ledger_type,
        opening_balance,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Ledger not found"
      });
    }

    res.status(200).json({
      message: "Ledger updated successfully",
      ledger: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update ledger"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM ledgers WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Ledger not found"
      });
    }

    res.status(200).json({
      message: "Ledger deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete ledger"
    });
  }
});

module.exports = router;