"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState({
    companies: 0,
    customers: 0,
    inventory: 0,
    sales: 0,
    purchase: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const c = await fetch("http://localhost:5000/api/dashboard/companies").then(r => r.json());
      const cu = await fetch("http://localhost:5000/api/dashboard/customers").then(r => r.json());
      const i = await fetch("http://localhost:5000/api/dashboard/inventory").then(r => r.json());
      const s = await fetch("http://localhost:5000/api/dashboard/sales").then(r => r.json());
      const p = await fetch("http://localhost:5000/api/dashboard/purchase").then(r => r.json());

      console.log(c, cu, s, p);

      setData({
        companies: c.total,
        customers: cu.total,
        inventory: i.total,
        sales: s.total,
        purchase: p.total,
      });
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">
          Welcome to SmartERP Management System
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-gray-500">Companies</h2>
          <p className="text-2xl font-bold">{data.companies}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-gray-500">Customers</h2>
          <p className="text-2xl font-bold">{data.customers}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-gray-500">Inventory Items</h2>
          <p className="text-2xl font-bold">{data.inventory}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-gray-500">Sales</h2>
          <p className="text-2xl font-bold">₹{data.sales}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-gray-500">Purchase</h2>
          <p className="text-2xl font-bold">₹{data.purchase}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-gray-500">Profit</h2>
          <p className="text-2xl font-bold text-green-600">
            ₹{Number(data.sales) - Number(data.purchase)}
          </p>
        </div>

      </div>

    </div>
  );
}