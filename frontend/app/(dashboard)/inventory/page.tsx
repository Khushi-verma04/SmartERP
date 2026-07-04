"use client";
import { useEffect, useState } from "react";

export default function InventoryPage() {
  const [items, setItems] = useState<any[]>([]);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    item_name: "",
    category: "",
    quantity: "",
    price: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const [search, setSearch] = useState("");

  // FETCH ITEMS
  useEffect(() => {
    fetch("http://localhost:5000/api/inventory/all")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);


  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === "s") {
        event.preventDefault();

        setIsEdit(false);
        setShowModal(true);

        setFormData({
          item_name: "",
          category: "",
          quantity: "",
          price: "",
        });
      }
    };

    document.addEventListener("keydown", handleShortcut);

    return () => {
      document.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  // CREATE ITEM
  const saveItem = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/inventory/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Item Added Successfully ✅");
        setShowModal(false);
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  // UPDATE ITEM
  const updateItem = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/inventory/${editId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Item Updated Successfully ✅");
        setShowModal(false);
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  // DELETE ITEM
  const deleteItem = async (id: string) => {
    const ok = confirm("Are you sure?");
    if (!ok) return;

    await fetch(`http://localhost:5000/api/inventory/${id}`, {
      method: "DELETE",
    });

    alert("Deleted Successfully");
    window.location.reload();
  };

  // EDIT
  const editItem = (item: any) => {
    setIsEdit(true);
    setEditId(item.id);

    setFormData({
      item_name: item.item_name,
      category: item.category,
      quantity: item.quantity,
      price: item.price,
    });

    setShowModal(true);
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Inventory</h1>
          <p className="text-gray-500">Manage your stock items</p>
        </div>

        <button
          onClick={() => {
            setShowModal(true);
            setIsEdit(false);
            setFormData({
              item_name: "",
              category: "",
              quantity: "",
              price: "",
            });
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          + Add Item
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search Item..."
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
              <th className="border p-2">Item Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items
              .filter((i: any) =>
                i.item_name.toLowerCase().includes(search.toLowerCase())
              )
              .map((item: any, index: number) => (
                <tr key={item.id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.item_name}</td>
                  <td className="border p-2">{item.category}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">{item.price}</td>

                  <td className="border p-2">
                    <button
                      onClick={() => editItem(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteItem(item.id)}
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
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              {isEdit ? "Edit Item" : "Add Item"}
            </h2>

            <div className="space-y-3">
              <input
                placeholder="Item Name"
                value={formData.item_name}
                onChange={(e) =>
                  setFormData({ ...formData, item_name: e.target.value })
                }
                className="border p-2 w-full"
              />

              <input
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="border p-2 w-full"
              />

              <input
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="border p-2 w-full"
              />

              <input
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="border p-2 w-full"
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
                onClick={isEdit ? updateItem : saveItem}
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