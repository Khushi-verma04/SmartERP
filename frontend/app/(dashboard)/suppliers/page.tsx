"use client";
import { useEffect, useState } from "react";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<any[]>([]);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    company_id: "",
    name: "",
    mobile: "",
    address: "",
    gst_number: "",
    supplier_name: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState<any[]>([]);

  // FETCH SUPPLIERS
  useEffect(() => {
    fetch("http://localhost:5000/api/supplier/all")
      .then((res) => res.json())
      .then((data) => setSuppliers(data));

    fetch("http://localhost:5000/api/company/all")
      .then((res) => res.json())
      .then((data) => setCompanies(data));
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "s") {
        event.preventDefault();

        setIsEdit(false);
        setShowModal(true);

        setFormData({
          company_id: "",
          name: "",
          mobile: "",
          address: "",
          gst_number: "",
          supplier_name: "",
        });
      }
    };

    document.addEventListener("keydown", handleShortcut);

    return () => {
      document.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  // CREATE SUPPLIER
  const saveSupplier = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/supplier/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Supplier Added Successfully ✅");
        setShowModal(false);
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  // UPDATE SUPPLIER
  const updateSupplier = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/supplier/${editId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Supplier Updated Successfully ✅");
        setShowModal(false);
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  // DELETE SUPPLIER
  const deleteSupplier = async (id: string) => {
    const ok = confirm("Are you sure you want to delete?");
    if (!ok) return;

    await fetch(`http://localhost:5000/api/supplier/${id}`, {
      method: "DELETE",
    });

    alert("Supplier Deleted");
    window.location.reload();
  };

  // EDIT SUPPLIER
  const editSupplier = (supplier: any) => {
    setIsEdit(true);
    setEditId(supplier.id);

    setFormData({
      company_id: supplier.company_id,
      name: supplier.name,
      mobile: supplier.mobile,
      address: supplier.address,
      gst_number: supplier.gst_number,
      supplier_name: supplier.supplier_name,
    });

    setShowModal(true);
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Suppliers</h1>
          <p className="text-gray-500">Manage your suppliers</p>
        </div>

        <button
          onClick={() => {
            setShowModal(true);
            setIsEdit(false);
            setFormData({
              company_id: "",
              name: "",
              mobile: "",
              address: "",
              gst_number: "",
              supplier_name: "",
            });
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          + Add Supplier
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search Supplier..."
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
              <th className="border p-2">Supplier Name</th>
              <th className="border p-2">Mobile</th>
              <th className="border p-2">GST</th>
              <th className="border p-2">Company ID</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {suppliers
              .filter((s: any) =>
                s.supplier_name
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((supplier: any, index: number) => (
                <tr key={supplier.id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{supplier.supplier_name}</td>
                  <td className="border p-2">{supplier.mobile}</td>
                  <td className="border p-2">{supplier.gst_number}</td>
                  <td className="border p-2">{supplier.company_id}</td>

                  <td className="border p-2">
                    <button
                      onClick={() => editSupplier(supplier)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteSupplier(supplier.id)}
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
          <div className="bg-white p-6 rounded w-[450px]">

            <h2 className="text-xl font-bold mb-4">
              {isEdit ? "Edit Supplier" : "Add Supplier"}
            </h2>

            <div className="space-y-3">

              <input
                placeholder="Supplier Name"
                value={formData.supplier_name}
                onChange={(e) =>
                  setFormData({ ...formData, supplier_name: e.target.value })
                }
                className="border p-2 w-full"
              />

              <input
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border p-2 w-full"
              />

              <input
                placeholder="Mobile"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                className="border p-2 w-full"
              />

              <input
                placeholder="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="border p-2 w-full"
              />

              <input
                placeholder="GST Number"
                value={formData.gst_number}
                onChange={(e) =>
                  setFormData({ ...formData, gst_number: e.target.value })
                }
                className="border p-2 w-full"
              />
              <select
                value={formData.company_id}
                onChange={(e) =>
                  setFormData({ ...formData, company_id: e.target.value })
                }
                className="border p-2 w-full"
              >
                <option value="">Select Company</option>

                {companies.map((company: any) => (
                  <option key={company.id} value={company.id}>
                    {company.company_name}
                  </option>
                ))}
              </select>

            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="border px-3 py-1"
              >
                Cancel
              </button>

              <button
                onClick={isEdit ? updateSupplier : saveSupplier}
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