"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";

export default function SalesPage() {
  const [sales, setSales] = useState<any[]>([]);

  const [customers, setCustomers] = useState<any[]>([]);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    invoice_no: "",
    customer_name: "",
    product_name: "",
    quantity: "",
    price: "",
    date: "",
    total_amount: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const [search, setSearch] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [invoiceItems, setInvoiceItems] = useState<any[]>([]);
  const grandTotal = invoiceItems.reduce(
    (sum: number, item: any) => sum + item.total,
    0
  );


  // FETCH SALES
  useEffect(() => {
    fetch("http://localhost:5000/api/sales/all")
      .then((res) => res.json())
      .then((data) => setSales(data));

    fetch("http://localhost:5000/api/customer/all")
      .then((res) => res.json())
      .then((data) => setCustomers(data));

    fetch("http://localhost:5000/api/inventory/all")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  useEffect(() => {
  const handleShortcut = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key.toLowerCase() === "b") {
      event.preventDefault();

      setIsEdit(false);
      setShowModal(true);

      setFormData({
        invoice_no: "",
        customer_name: "",
        product_name: "",
        quantity: "",
        price: "",
        date: "",
        total_amount: "",
      });
    }
  };

  document.addEventListener("keydown", handleShortcut);

  return () => {
    document.removeEventListener("keydown", handleShortcut);
  };
}, []);

  // CREATE
  const saveSale = async () => {
    const res = await fetch(
      "http://localhost:5000/api/sales/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          total_amount:
            Number(formData.price || 0) *
            Number(formData.quantity || 0),
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Sale Created Successfully ✅");
      setShowModal(false);
      window.location.reload();
    } else {
      alert(data.message);
    }
  };

  const downloadPDF = () => {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("SmartERP Invoice", 70, 15);

      doc.setFontSize(12);
      doc.text(`Invoice No: ${formData.invoice_no}`, 15, 30);
      doc.text(`Customer: ${formData.customer_name}`, 15, 40);
      doc.text(`Date: ${formData.date}`, 15, 50);

      autoTable(doc, {
        startY: 60,
        head: [["Product", "Price", "Qty", "Total"]],
        body: invoiceItems.map((item: any) => [
          item.item_name,
          item.price,
          item.quantity,
          item.total,
        ]),
      });

      const finalY = (doc as any).lastAutoTable.finalY || 100;

      doc.text(`Grand Total: ₹${grandTotal}`, 15, finalY + 15);

      doc.save(`Invoice_${formData.invoice_no}.pdf`);
    };

  // UPDATE
  const updateSale = async () => {
    const res = await fetch(
      `http://localhost:5000/api/sales/${editId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Sale Updated Successfully ✅");
      setShowModal(false);
      window.location.reload();
    } else {
      alert(data.message);
    }
  };

  const addItem = () => {
    if (
      !formData.product_name ||
      !formData.price ||
      !formData.quantity
    ) {
      alert("Please fill Item, Price and Quantity");
      return;
    }

    const selectedItem = {
      item_name: formData.product_name,
    };
    setInvoiceItems([
      ...invoiceItems,
      {
        product_name: formData.product_name,
        item_name: formData.product_name,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        total:
          Number(formData.price) *
          Number(formData.quantity),
      },
    ]);

    setFormData({
      ...formData,
      product_name: "",
      price: "",
      quantity: "",
    });
  };

  // DELETE
  const deleteSale = async (id: string) => {
    const ok = confirm("Delete this sale?");
    if (!ok) return;

    await fetch(`http://localhost:5000/api/sales/${id}`, {
      method: "DELETE",
    });

    alert("Deleted Successfully");
    window.location.reload();
  };

  // EDIT
  const editSale = (s: any) => {
    setIsEdit(true);
    setEditId(s.id);

    setFormData({
      invoice_no: s.invoice_no,
      customer_name: s.customer_name,
      product_name: s.product_name,
      quantity: s.quantity,
      price: s.price,
      date: s.date,
      total_amount: s.total_amount,
    });

    setShowModal(true);
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Sales</h1>
          <p className="text-gray-500">Manage sales invoices</p>
        </div>

        <button
          onClick={() => {
            setShowModal(true);
            setIsEdit(false);
            setFormData({
              invoice_no: "",
              customer_name: "",
              product_name: "",
              quantity: "",
              price: "",
              date: "",
              total_amount: "",
            });
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          + Add Sale
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search Invoice..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-80 mb-4"
      />

      {/* TABLE */}
      <div className="bg-white shadow rounded p-4">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Invoice No</th>
              <th className="border p-2">Customer ID</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sales
              .filter((s: any) =>
                s.invoice_no?.toString().includes(search)
              )
              .map((s: any, index: number) => (
                <tr key={s.id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{s.invoice_no}</td>
                  <td className="border p-2">{s.customer_name}</td>
                  <td className="border p-2">{s.date}</td>
                  <td className="border p-2">₹{s.total_amount}</td>

                  <td className="border p-2">
                    <button
                      onClick={() => editSale(s)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteSale(s.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              {isEdit ? "Edit Sale" : "Add Sale"}
            </h2>

            <div className="space-y-3">

              <input
                placeholder="Invoice No"
                value={formData.invoice_no}
                onChange={(e) =>
                  setFormData({ ...formData, invoice_no: e.target.value })
                }
                className="border p-2 w-full"
              />

              <input
                type="text"
                placeholder="Customer Name"
                value={formData.customer_name}
                onChange={(e) =>
                  setFormData({ ...formData, customer_name: e.target.value })
                }
                className="border p-2 w-full"
              />

              <input
                type="text"
                placeholder="Product Name"
                value={formData.product_name}
                onChange={(e) =>
                  setFormData({ ...formData, product_name: e.target.value })
                }
                className="border p-2 w-full"
              />

              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="border p-2 w-full"
              />

              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="border p-2 w-full"
              />

              <button
                type="button"
                onClick={addItem}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
              >
                + Add Item
              </button>

              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="border p-2 w-full"
              />

              <input
                type="number"
                placeholder="Total Amount"
                value={grandTotal}
                readOnly
                className="border p-2 w-full bg-gray-100"
              />

            </div>

            {invoiceItems.length > 0 && (
              <table className="w-full border mt-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Item</th>
                    <th className="border p-2">Price</th>
                    <th className="border p-2">Qty</th>
                    <th className="border p-2">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {invoiceItems.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="border p-2">{item.item_name}</td>
                      <td className="border p-2">₹{item.price}</td>
                      <td className="border p-2">{item.quantity}</td>
                      <td className="border p-2">₹{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="border px-3 py-1"
              >
                Cancel
              </button>

              <button
                onClick={isEdit ? updateSale : saveSale}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                {isEdit ? "Update" : "Save"}
              </button>

              <button
                onClick={downloadPDF}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Download PDF
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}