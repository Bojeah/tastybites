import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCustomer } from "../api/client";
import { Customer } from "../types";
import { User, Calendar, MapPin, Edit, ShoppingBag, UserCheck, ArrowLeft } from "lucide-react";

export default function CustomerDetail() {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getCustomer(Number(id))
        .then(setCustomer)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Customer not found</p>
        <Link to="/customers" className="text-orange-500 hover:text-orange-600 mt-4 inline-block">
          Return to Customers
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/customers"
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center space-x-3">
            <User className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-900">
              {customer.first_name} {customer.surname}
            </h1>
          </div>
        </div>
        <Link
          to={`/customers/edit/${customer.id}`}
          className="flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-sm"
        >
          <Edit className="w-5 h-5" />
          <span>Edit Customer</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Customer Details</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium text-gray-900">
                    {customer.first_name} {customer.middle_name} {customer.surname}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-medium text-gray-900">
                    {new Date(customer.dob).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium text-gray-900">{customer.address}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Registration Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(customer.registration_date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {customer.matric_no && (
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <UserCheck className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Matriculated Student</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Orders</span>
                <span className="font-semibold text-gray-900">{customer.orders.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Customer Since</span>
                <span className="font-semibold text-gray-900">
                  {new Date(customer.registration_date).getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-6 h-6 text-orange-500" />
                <h2 className="text-xl font-semibold text-gray-900">Order History</h2>
              </div>
              <Link
                to="/orders/new"
                className="text-orange-500 hover:text-orange-600 text-sm font-medium"
              >
                + New Order
              </Link>
            </div>

            <div className="p-6">
              {customer.orders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No orders yet</p>
                  <p className="text-gray-400">This customer hasn't placed any orders yet.</p>
                  <Link
                    to="/orders/new"
                    className="inline-flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors mt-4"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Create First Order</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {customer.orders.map(order => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{order.menu_item}</h4>
                        <span className="text-sm text-gray-500">
                          {new Date(order.order_date).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {order.payment_method}
                          </span>
                          {order.next_reservation && (
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Next: {new Date(order.next_reservation).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {order.special_instructions && (
                        <p className="text-sm text-gray-600 mt-2 italic">
                          "{order.special_instructions}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
