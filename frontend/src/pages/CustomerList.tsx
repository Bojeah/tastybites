import { useEffect, useState } from "react";
import { fetchCustomers, deleteCustomer } from "../api/client";
import { Customer } from "../types";
import { Link } from "react-router-dom";
import { Users, Plus, Edit, Trash2, Eye, Search } from "lucide-react";

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers()
      .then(setCustomers)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      await deleteCustomer(id);
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const filteredCustomers = customers.filter(customer =>
    `${customer.first_name} ${customer.surname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        </div>
        <Link
          to="/customers/new"
          className="flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Add Customer</span>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        />
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
            <p className="text-sm text-gray-600">Total Customers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {customers.filter(c => c.orders.length > 0).length}
            </p>
            <p className="text-sm text-gray-600">Active Customers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {customers.reduce((acc, c) => acc + c.orders.length, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>
        </div>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map(customer => (
          <div
            key={customer.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {customer.first_name} {customer.surname}
                </h3>
                {customer.middle_name && (
                  <p className="text-sm text-gray-500">{customer.middle_name}</p>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <Link
                  to={`/customers/${customer.id}`}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <Link
                  to={`/customers/edit/${customer.id}`}
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(customer.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>DOB:</strong> {new Date(customer.dob).toLocaleDateString()}</p>
              <p><strong>Address:</strong> {customer.address}</p>
              <p><strong>Registered:</strong> {new Date(customer.registration_date).toLocaleDateString()}</p>
              <p><strong>Orders:</strong> {customer.orders.length}</p>
              {customer.matric_no && (
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Matriculated
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">
            {searchTerm ? "No customers found matching your search." : "No customers yet. Add your first customer!"}
          </p>
          {!searchTerm && (
            <Link
              to="/customers/new"
              className="inline-flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors mt-4"
            >
              <Plus className="w-5 h-5" />
              <span>Add First Customer</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
