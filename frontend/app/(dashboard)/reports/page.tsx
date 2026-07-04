"use client";

import { handleKeyboardShortcuts } from "../../../utils/keyboardShortcuts";
import { useCallback, useEffect, useState } from "react";
import jsPDF from "jspdf";

export default function ReportsPage() {

    // ✅ ALL STATES INSIDE COMPONENT
    const [stockData, setStockData] = useState([]);
    const [invoice, setInvoice] = useState(null);
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [lastUpdated, setLastUpdated] = useState("");

    console.log(search);

    // STOCK API
    useEffect(() => {
        fetch("http://localhost:5000/api/reports/stock")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setStockData(data);
                } else {
                    setStockData([]);
                }
            })
            .catch(() => setStockData([]));
    }, []);
    
    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            handleKeyboardShortcuts(event, {
                refresh: () => window.location.reload(),

                downloadPDF: downloadPDF,

                focusSearch: () => {
                    const input = document.getElementById("search") as HTMLInputElement;
                    input?.focus();
                },
            });
        };

        document.addEventListener("keydown", listener);

        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, []);
    const downloadPDF = () => {
        const doc = new jsPDF();

        // Title  
        doc.setFontSize(18);
        doc.text("Stock Report", 20, 20);

        // Summary  
        doc.setFontSize(12);
        doc.text(`Total Items: ${stockData.length}`, 20, 35);

        const totalQuantity = stockData.reduce(
            (total: number, item: any) => total + Number(item.quantity),
            0
        );

        doc.text(`Total Stock Quantity: ${totalQuantity}`, 20, 45);

        const totalValue = stockData.reduce(
            (total: number, item: any) =>
                total +
                Number(item.quantity) * Number(item.purchase_price),
            0
        );

        doc.text(`Total Stock Value: Rs. ${totalValue}`, 20, 55);

        // Table Heading  
        let y = 75;

        doc.setFontSize(13);
        doc.text("Item", 20, y);
        doc.text("Qty", 70, y);
        doc.text("Purchase", 100, y);
        doc.text("Selling", 150, y);

        y += 10;

        // Table Data  
        stockData.forEach((item: any) => {
            doc.setFontSize(11);
            doc.text(item.item_name, 20, y);
            doc.text(String(item.quantity), 70, y);
            doc.text(`Rs. ${item.purchase_price}`, 100, y);
            doc.text(`Rs. ${item.selling_price}`, 150, y);

            y += 10;
        });

        // Footer  
        y += 10;
        doc.setFontSize(10);
        doc.text(
            `Generated on: ${new Date().toLocaleString()}`,
            20,
            y
        );

        doc.save("Stock_Report.pdf");
    };
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Reports</h1>
                <p className="text-gray-500">
                    Stock Report & Inventory Summary
                </p>
            </div>
            <div className="flex gap-3 mb-4">
                <button
                    onClick={downloadPDF}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Export PDF
                </button>

                <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Refresh
                </button>
            </div>

            <br />
            <br />
            <input
                className="border p-2 rounded w-80"
                id="search"
                type="text"
                placeholder="Search Item..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex gap-4 my-4">
                <div className="bg-white shadow rounded p-4">
                    <p className="text-gray-500">Total Items</p>
                    <h2 className="text-2xl font-bold">{stockData.length}</h2>
                </div>

                <div className="bg-white shadow rounded p-4">
                    <p className="text-gray-500">Total Stock</p>
                    <h2 className="text-2xl font-bold">
                        {stockData.reduce(
                            (total: number, item: any) => total + Number(item.quantity),
                            0
                        )}
                    </h2>
                </div>

                <div className="bg-white shadow rounded p-4">
                    <p className="text-gray-500">Stock Value</p>
                    <h2 className="text-2xl font-bold">
                        ₹
                        {stockData.reduce(
                            (total: number, item: any) =>
                                total + Number(item.quantity) * Number(item.purchase_price),
                            0
                        )}
                    </h2>
                </div>
            </div>

            <br />
            <br />

            <h2 className="text-xl font-bold mt-6 mb-3">
                Stock Report
            </h2>

            <table className="w-full border border-gray-300 mt-4">
                <thead>
                    <tr>
                        <th className="border p-2 bg-gray-100">S.No.</th>
                        <th className="border p-2 bg-gray-100">Item</th>
                        <th className="border p-2 bg-gray-100">SKU</th>
                        <th className="border p-2 bg-gray-100">Purchased</th>
                        <th className="border p-2 bg-gray-100">Sold</th>
                        <th className="border p-2 bg-gray-100">Available</th>
                        <th className="border p-2 bg-gray-100">PurchasePrice</th>
                        <th className="border p-2 bg-gray-100">Selling Price</th>
                        <th className="border p-2 bg-gray-100">GST %</th>
                    </tr>
                </thead>

                <tbody>
                    {stockData
                        .filter((item: any) =>
                            (item.item_name || "").toLowerCase().includes(search.toLowerCase())
                        )
                        .sort((a: any, b: any) =>
                            a.item_name.localeCompare(b.item_name)
                        )
                        .map((item: any, index: number) => (
                            <tr key={item.id}>
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{item.item_name}</td>
                                <td className="border p-2">{item.sku}</td>
                                <td className="border p-2">0</td>
                                <td className="border p-2">0</td>
                                <td className="border p-2">{item.quantity}</td>
                                <td className="border p-2">₹{item.purchase_price}</td>
                                <td className="border p-2">₹{item.selling_price}</td>
                                <td className="border p-2">{item.gst_percent}%</td>
                            </tr>
                        ))}
                    {stockData.filter((item: any) =>
                        item.item_name.toLowerCase().includes(search.toLowerCase())
                    ).length === 0 && (
                            <tr>
                                <td colSpan={9} className="border p-2 text-center">
                                    No items found
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );

}