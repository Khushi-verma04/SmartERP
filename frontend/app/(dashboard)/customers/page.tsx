"use client";
import { useEffect, useState } from "react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    gst_number: "",
    balance: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const [search, setSearch] = useState("");
  // FETCH CUSTOMERS
  useEffect(() => {
    fetch("http://localhost:5000/api/customer/all")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
      });
  }, []);
useEffect(() => {
  const handleShortcut = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key.toLowerCase() === "c") {
      event.preventDefault();

      setIsEdit(false);
      setShowModal(true);

      setFormData({
        name: "",
        mobile: "",
        address: "",
        gst_number: "",
        balance: "",
      });
    }
  };

  document.addEventListener("keydown", handleShortcut);

  return () => {
    document.removeEventListener("keydown", handleShortcut);
  };
}, []);

  // CREATE CUSTOMER
  const saveCustomer = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/customer/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Customer Added Successfully ✅");
        setShowModal(false);
        window.location.reload();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  // UPDATE CUSTOMER
  const updateCustomer = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/customer/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Customer Updated Successfully ✅");
        setShowModal(false);
        window.location.reload();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  // DELETE CUSTOMER
  const deleteCustomer = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/customer/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Customer Deleted Successfully ✅");
        window.location.reload();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  // EDIT CUSTOMER
  const editCustomer = (customer: any) => {
    setIsEdit(true);
    setEditId(customer.id);

    setFormData({
      name: customer.name,
      mobile: customer.mobile,
      address: customer.address,
      gst_number: customer.gst_number,
      balance: customer.balance,
    });

    setShowModal(true);
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Customers
          </h1>

          <p className="text-gray-500">
            Manage your customers
          </p>
        </div>

        <button
          onClick={() => {
            setShowModal(true);
            setIsEdit(false);
            setFormData({
              name: "",
              mobile: "",
              address: "",
              gst_number: "",
              balance: "",
            });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
        >
          + Add Customer
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* TABLE */}
      <div className="mt-6 bg-white shadow rounded-lg p-5">
        <h2 className="text-xl font-semibold">
          Customer List
        </h2>

        <table className="w-full mt-4 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Mobile</th>
              <th className="border p-2">GST</th>
              <th className="border p-2">Balance</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers
              .filter((customer: any) =>
                customer.name
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((customer: any, index: number) => (
                <tr key={customer.id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{customer.name}</td>
                  <td className="border p-2">{customer.mobile}</td>
                  <td className="border p-2">{customer.gst_number}</td>
                  <td className="border p-2">{customer.balance}</td>

                  <td className="border p-2">
                    <button
                      onClick={() => editCustomer(customer)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteCustomer(customer.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded ml-2"
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
          <div className="bg-white rounded-lg p-6 w-[450px] shadow-xl">

            <h2 className="text-2xl font-bold mb-4">
              {isEdit ? "Edit Customer" : "Add Customer"}
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border rounded p-2"
              />

              <input
                type="text"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                className="w-full border rounded p-2"
              />

              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full border rounded p-2"
              />

              <input
                type="text"
                placeholder="GST Number"
                value={formData.gst_number}
                onChange={(e) =>
                  setFormData({ ...formData, gst_number: e.target.value })
                }
                className="w-full border rounded p-2"
              />

              <input
                type="text"
                placeholder="Balance"
                value={formData.balance}
                onChange={(e) =>
                  setFormData({ ...formData, balance: e.target.value })
                }
                className="w-full border rounded p-2"
              />

            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={isEdit ? updateCustomer : saveCustomer}
                className="bg-blue-600 text-white px-4 py-2 rounded"
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