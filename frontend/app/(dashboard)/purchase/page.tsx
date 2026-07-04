"use client";
import { useEffect, useState } from "react";

export default function PurchasePage() {
  const [purchases, setPurchases] = useState<any[]>([]);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    supplier_id: "",
    item_name: "",
    quantity: "",
    price: "",
    date: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const [search, setSearch] = useState("");

  // FETCH PURCHASES
  useEffect(() => {
    fetch("http://localhost:5000/api/purchase/all")
      .then((res) => res.json())
      .then((data) => setPurchases(data));
  }, []);

  // CREATE
  const savePurchase = async () => {
    const res = await fetch(
      "http://localhost:5000/api/purchase/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Purchase Added Successfully ✅");
      setShowModal(false);
      window.location.reload();
    } else {
      alert(data.message);
    }
  };

  // UPDATE
  const updatePurchase = async () => {
    const res = await fetch(
      `http://localhost:5000/api/purchase/${editId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Purchase Updated Successfully ✅");
      setShowModal(false);
      window.location.reload();
    } else {
      alert(data.message);
    }
  };

  // DELETE
  const deletePurchase = async (id: string) => {
    const ok = confirm("Delete this purchase?");
    if (!ok) return;

    await fetch(`http://localhost:5000/api/purchase/${id}`, {
      method: "DELETE",
    });

    alert("Deleted Successfully");
    window.location.reload();
  };

  // EDIT
  const editPurchase = (p: any) => {
    setIsEdit(true);
    setEditId(p.id);

    setFormData({
      supplier_id: p.supplier_id,
      item_name: p.item_name,
      quantity: p.quantity,
      price: p.price,
      date: p.date,
    });

    setShowModal(true);
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Purchase</h1>
          <p className="text-gray-500">Manage purchase vouchers</p>
        </div>

        <button
          onClick={() => {
            setShowModal(true);
            setIsEdit(false);
            setFormData({
              supplier_id: "",
              item_name: "",
              quantity: "",
              price: "",
              date: "",
            });
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          + Add Purchase
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search Purchase..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-80 mb-4"
      />

      {/* TABLE */}
      <div className="bg-white shadow rounded p-4">
        <table className="w-full border border-gray-300 border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">S.No.</th>
              <th className="border p-2">Supplier ID</th>
              <th className="border p-2">Item</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Actions</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {purchases
              .filter((p: any) =>
                p.supplier_id?.toString().includes(search)
              )
              .map((p: any, index: number) => (
                <tr key={p.id} className="hover:big-grey-50">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{p.supplier_id}</td>
                  <td className="border p-2">{p.item_name}</td>
                  <td className="border p-2">{p.quantity}</td>
                  <td className="border p-2">₹{p.price}</td>
                  <td className="border p-2">₹{p.total_amount}</td>
                  <td className="border p-2">{p.date}</td>

                  <td className="border p-2">
                    <button
                      onClick={() => editPurchase(p)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deletePurchase(p.id)}
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
              {isEdit ? "Edit Purchase" : "Add Purchase"}
            </h2>

            <div className="space-y-3">

              <input
                placeholder="Supplier ID"
                value={formData.supplier_id}
                onChange={(e) =>
                  setFormData({ ...formData, supplier_id: e.target.value })
                }
                className="border p-2 w-full"
              />

              <input
                placeholder="Item Name"
                value={formData.item_name}
                onChange={(e) =>
                  setFormData({ ...formData, item_name: e.target.value })
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
                value={Number(formData.quantity || 0) * Number(formData.price || 0)}
                readOnly
                className="border p-2 w-full bg-gray-100"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="border px-3 py-1"
              >
                Cancel
              </button>

              <button
                onClick={isEdit ? updatePurchase : savePurchase}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                {isEdit ? "Update" : "Save"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}