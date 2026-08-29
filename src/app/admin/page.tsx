export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-[#0c5f50]">Welcome to the Urban Shine Admin Panel</h2>
        <p className="text-gray-600">
          Use the sidebar to manage your Services, Packages, Gallery, and Contact Info. You can also view incoming customer inquiries from the booking form.
        </p>
      </div>
    </div>
  );
}
