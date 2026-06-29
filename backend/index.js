const cors = require("cors");
const express = require("express");
const pool = require("./db");
const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const ledgerRoutes = require("./routes/ledgerRoutes");
const groupRoutes = require("./routes/groupRoutes");
const stockRoutes = require("./routes/stockRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const salesRoutes = require("./routes/salesRoutes");
const customerRoutes = require("./routes/customerRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/ledger", ledgerRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`SmartERP Backend Running. Database Connected at ${result.rows[0].now}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database Connection Failed");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});