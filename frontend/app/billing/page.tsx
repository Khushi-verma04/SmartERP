"use client";
import { useState } from "react";
import jsPDF from "jspdf";
export default function BillingPage() {
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [customerName, setCustomerName] = useState("");
    const [itemName, setItemName] = useState("");
    const [showInvoice, setShowInvoice] = useState(false);


    const total = quantity * price;
    const invoiceNumber = "INV001";
    const today = new Date().toISOString().split("T")[0];
    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("GST Invoice", 20, 20);

        doc.setFontSize(14);
        doc.text("Khushi Traders", 20, 30);

        doc.line(20, 32, 190, 32);

        doc.text(`Invoice No: ${invoiceNumber}`, 20, 40);
        doc.text(`Date: ${today}`, 20, 45);

        doc.setFontSize(12);
        doc.text("Customer Details", 20, 60);
        doc.text(`Name: ${customerName}`, 20, 70);

        doc.line(20, 80, 190, 80);

        doc.text("Item", 20, 90);
        doc.text("Qty", 90, 90);
        doc.text("Price", 120, 90);
        doc.text("Total", 160, 90);

        doc.line(20, 95, 190, 95);

        doc.text(itemName, 20, 105);
        doc.text(String(quantity), 90, 105);
        doc.text(`Rs. ${price}`, 120, 105);
        doc.text(`Rs. ${total}`, 160, 105);
        doc.setFontSize(14);
        doc.text(`Grand Total: Rs. ${total}`, 20, 125);

        doc.save("Invoice.pdf");
    };

    return (
        <div>
            <h1>Billing System</h1>

            <button>Create New Bill</button>

            <br />
            <br />

            <label>Customer Name</label>
            <br />
            <input
                type="text"
                placeholder="Enter Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
            />

            <br />
            <br />

            <label>Invoice Number</label>
            <br />
            <input
                type="text"
                value={invoiceNumber}
                readOnly
            />

            <br />
            <br />

            <label>Date</label>
            <br />
            <input
                type="date"
                value={today}
                readOnly
            />

            <br />
            <br />

            <label>Item Name</label>
            <br />
            <input
                type="text"
                placeholder="Enter Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
            />

            <br />
            <br />

            <label>Quantity</label>
            <br />
            <input
                type="number"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <br />
            <br />

            <label>Price</label>
            <br />
            <input
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
            />

            <br />
            <br />

            <label>Total Amount</label>
            <br />
            <input
                type="number"
                value={total}
                readOnly
            />

            <br />
            <br />

            <button onClick={() => setShowInvoice(true)}>
                Generate Bill
            </button>

            <br />
            <br />

            <button onClick={() => window.print()}>
                Print Invoice
            </button>

            <br />
            <br />

            <button onClick={downloadPDF}>
                Download PDF
            </button>

            <br />
            <br />

            <h2>Invoice Preview</h2>

            <hr />

            {showInvoice && (
                <div>
                    <h3>GST Invoice</h3>

                    <p><b>Invoice No:</b> {invoiceNumber}</p>

                    <p><b>Date:</b> {today}</p>

                    <p><b>Customer:</b> {customerName}</p>

                    <p><b>Item:</b> {itemName}</p>

                    <p><b>Quantity:</b> {quantity}</p>

                    <p><b>Price:</b> ₹{price}</p>

                    <p><b>Total:</b> ₹{total}</p>
                </div>
            )}


        </div>
    );
}