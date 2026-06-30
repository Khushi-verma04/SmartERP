"use client";
import { handleKeyboardShortcuts } from "../../utils/keyboardShortcuts";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";

export default function ReportsPage() {
    const [stockData, setStockData] = useState([]);
    const [search, setSearch] = useState("");
    const [lastUpdated, setLastUpdated] = useState("");
    console.log(search);
    useEffect(() => {
        fetch("http://localhost:5000/api/reports/stock")
            .then((res) => res.json())
            .then((data) => {
                setStockData(data);
                setLastUpdated(new Date().toLocaleString());
            });
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
        <div>
            <h1>Reports Module</h1>
            <button onClick={downloadPDF}>
                Export PDF
            </button>

            <br />
            <br />
            <button onClick={() => window.location.reload()}>
                Refresh
            </button>

            <br />
            <br />
            <p>Total Items: {stockData.length}</p>
            <p>
                Total Stock Quantity:{" "}
                {stockData.reduce(
                    (total: number, item: any) => total + Number(item.quantity),
                    0
                )}
            </p>
            <p>
                Total Stock Value: ₹
                {stockData.reduce(
                    (total: number, item: any) =>
                        total + Number(item.quantity) * Number(item.purchase_price),
                    0
                )}
            </p>
            <p>
                Last Updated: {lastUpdated}
            </p>
            <input
                id="search"
                type="text"
                placeholder="Search Item..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <br />
            <br />

            <button>Stock Report</button>
            <br /><br />
            <h2>Stock Report</h2>

            <table border={1}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Item</th>
                        <th>SKU</th>
                        <th>Purchased</th>
                        <th>Sold</th>
                        <th>Available</th>
                        <th>PurchasePrice</th>
                        <th>Selling Price</th>
                        <th>GST %</th>
                    </tr>
                </thead>

                <tbody>
                    {stockData
                        .filter((item: any) =>
                            item.item_name.toLowerCase().includes(search.toLowerCase())
                        )
                        .sort((a: any, b: any) =>
                            a.item_name.localeCompare(b.item_name)
                        )
                        .map((item: any, index: number) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.item_name}</td>
                                <td>{item.sku}</td>
                                <td>0</td>
                                <td>0</td>
                                <td>{item.quantity}</td>
                                <td>₹{item.purchase_price}</td>
                                <td>₹{item.selling_price}</td>
                                <td>{item.gst_percent}%</td>
                            </tr>
                        ))}
                    {stockData.filter((item: any) =>
                        item.item_name.toLowerCase().includes(search.toLowerCase())
                    ).length === 0 && (
                            <tr>
                                <td colSpan={9}>No items found</td>
                            </tr>
                        )}
                </tbody>
            </table>

            <button>Purchase Report</button>
            <br /><br />

            <button>Sales Report</button>
            <br /><br />

            <button>Customer Report</button>
        </div>
    );
}