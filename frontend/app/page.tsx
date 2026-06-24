export default function Home() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5">
        <h1 className="text-2xl font-bold mb-6">SmartERP</h1>

        <ul className="space-y-4">
         <li className="cursor-pointer hover:bg-gray-700 p-2 rounded">Dashboard</li>
<li className="cursor-pointer hover:bg-gray-700 p-2 rounded">Companies</li>
<li className="cursor-pointer hover:bg-gray-700 p-2 rounded">Customers</li>
<li className="cursor-pointer hover:bg-gray-700 p-2 rounded">Suppliers</li>
<li className="cursor-pointer hover:bg-gray-700 p-2 rounded">Sales</li>
<li className="cursor-pointer hover:bg-gray-700 p-2 rounded">Purchase</li>
<li className="cursor-pointer hover:bg-gray-700 p-2 rounded">Inventory</li>
<li className="cursor-pointer hover:bg-gray-700 p-2 rounded">Reports</li>
        </ul>
      </div>

      {/* Main Content */}
       <div className="mb-6">
  <h2 className="text-3xl font-bold">
    Khushi Traders
  </h2>

  <p className="text-gray-600">
    Financial Year: 2026-27
  </p>

  <p className="text-gray-600">
    User: Khushi
  </p>

        <div className="grid grid-cols-2 gap-4">
  <div className="border p-4 rounded shadow">
    <h3 className="text-lg font-semibold">
      Total Companies
    </h3>
    <p className="text-2xl font-bold">1</p>
  </div>

  <div className="border p-4 rounded shadow">
    <h3 className="text-lg font-semibold">
      Total Customers
    </h3>
    <p className="text-2xl font-bold">0</p>
  </div>

  <div className="border p-4 rounded shadow">
    <h3 className="text-lg font-semibold">
      Total Suppliers
    </h3>
    <p className="text-2xl font-bold">0</p>
  </div>

  <div className="border p-4 rounded shadow">
    <h3 className="text-lg font-semibold">
      Total Sales
    </h3>
    <p className="text-2xl font-bold">0</p>
  </div>
</div>
      </div>
    </div>
  );
}