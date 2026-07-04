export default function Home() {
  return (
    <>
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-5 flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Khushi Traders
          </h2>

          <p className="text-gray-500">
            Financial Year : 2026-27
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold text-lg">
            👤 Khushi
          </p>

          <p className="text-gray-500">
            Administrator
          </p>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-gray-500">Total Companies</h3>
          <p className="text-3xl font-bold text-blue-600">1</p>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-gray-500">Customers</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-gray-500">Suppliers</h3>
          <p className="text-3xl font-bold text-orange-600">0</p>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-gray-500">Total Sales</h3>
          <p className="text-3xl font-bold text-red-600">₹0</p>
        </div>
      </div>
    </>
  );
}