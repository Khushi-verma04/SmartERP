const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Group Route Working");
});

router.post("/create", async (req, res) => {
  try {
    const {
      company_id,
      group_name,
      group_type
    } = req.body;

    const result = await pool.query(
      `INSERT INTO groups
      (company_id, group_name, group_type)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [
        company_id,
        group_name,
        group_type
      ]
    );

    res.status(201).json({
      message: "Group created successfully",
      group: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Group creation failed"
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM groups ORDER BY group_name"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch groups"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM groups WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Group not found"
      });
    }

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch group"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      group_name,
      group_type
    } = req.body;

    const result = await pool.query(
      `UPDATE groups
       SET group_name = $1,
           group_type = $2
       WHERE id = $3
       RETURNING *`,
      [
        group_name,
        group_type,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Group not found"
      });
    }

    res.status(200).json({
      message: "Group updated successfully",
      group: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update group"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM groups WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Group not found"
      });
    }

    res.status(200).json({
      message: "Group deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete group"
    });
  }
});

module.exports = router;