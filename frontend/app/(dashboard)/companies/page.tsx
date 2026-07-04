"use client";
import { useEffect, useState } from "react";
export default function CompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([]);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    company_name: "",
    gst_number: "",
    address: "",
    financial_year: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  const [editId, setEditId] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/company/all")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
      });
  }, []);

  const saveCompany = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/company/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: "80c10000-90c2-4646-983a-dc30ce32bb4c",
          ...formData,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Company Added Successfully ✅");
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

  const updateCompany = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/company/${editId}`,
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
        alert("Company Updated Successfully ✅");
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

  const deleteCompany = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/company/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Company Deleted Successfully ✅");
        window.location.reload();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const editCompany = (company: any) => {
    setIsEdit(true);

    setEditId(company.id);

    setFormData({
      company_name: company.company_name,
      gst_number: company.gst_number,
      address: company.address,
      financial_year: company.financial_year,
    });

    setShowModal(true);
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Companies
          </h1>

          <p className="text-gray-500">
            Manage your business companies
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
        >
          + Add Company
        </button>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search Company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-6 bg-white shadow rounded-lg p-5">
        <h2 className="text-xl font-semibold">
          Company List
        </h2>

        <table className="w-full mt-4 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Company Name</th>
              <th className="border p-2">GST Number</th>
              <th className="border p-2">Financial Year</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {companies
              .filter((company: any) =>
                company.company_name
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((company: any, index: number) => (
                <tr key={company.id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{company.company_name}</td>
                  <td className="border p-2">{company.gst_number}</td>
                  <td className="border p-2">{company.financial_year}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => editCompany(company)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCompany(company.id)}
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
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[450px] shadow-xl">

            <h2 className="text-2xl font-bold mb-4">
              Add Company
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Company Name"
                value={formData.company_name}
                onChange={(e) =>
                  setFormData({ ...formData, company_name: e.target.value })
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
                placeholder="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full border rounded p-2"
              />

              <input
                type="text"
                placeholder="Financial Year"
                value={formData.financial_year}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    financial_year: e.target.value,
                  })
                }
                className="w-full border rounded p-2"
              />

            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={isEdit ? updateCompany : saveCompany}
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