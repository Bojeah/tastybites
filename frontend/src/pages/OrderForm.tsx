import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder, fetchCustomers } from "../api/client";
import { Customer } from "../types";
import { ShoppingBag, User, Calendar, CreditCard, MessageSquare } from "lucide-react";

type OrderFormType = {
  customer_id: number;
  menu_item: string;
  special_instructions: string;
  payment_method: string;
  total_amount: number;
  next_reservation: string;
};

export default function OrderForm() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<OrderFormType>({
    customer_id: 0,
    menu_item: "",
    special_instructions: "",
    payment_method: "cash",
    total_amount: 0,
    next_reservation: "",
  });

  useEffect(() => {
    fetchCustomers()
      .then(setCustomers)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "customer_id" || name === "total_amount" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.customer_id === 0) {
      alert("Please select a customer");
      return;
    }
    await createOrder(form);
    navigate("/orders");
  };

  const menuItems = [
    "Margherita Pizza", "Pepperoni Pizza", "BBQ Chicken Pizza", "Vegetarian Pizza",
    "Chicken Burger", "Beef Burger", "Fish Burger", "Veggie Burger",
    "Caesar Salad", "Greek Salad", "Garden Salad",
    "Pasta Carbonara", "Pasta Bolognese", "Pasta Primavera",
    "Grilled Chicken", "Fish & Chips", "Ribeye Steak"
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <ShoppingBag className="w-8 h-8 text-orange-500" />
        <h1 className="text-3xl font-bold text-gray-900">Create New Order</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Order Details</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Customer Selection */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2" />
              Customer
            </label>
            <select
              name="customer_id"
              value={form.customer_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            >
              <option value={0}>Select a customer</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.first_name} {customer.surname} - {customer.address}
                </option>
              ))}
            </select>
          </div>

          {/* Menu Item */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Menu Item
            </label>
            <select
              name="menu_item"
              value={form.menu_item}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            >
              <option value="">Select a menu item</option>
              {menuItems.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <CreditCard className="w-4 h-4 mr-2" />
              Total Amount ($)
            </label>
            <input
              type="number"
              name="total_amount"
              value={form.total_amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="0.00"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <CreditCard className="w-4 h-4 mr-2" />
              Payment Method
            </label>
            <select
              name="payment_method"
              value={form.payment_method}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="mobile">Mobile Payment</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 mr-2" />
              Special Instructions
            </label>
            <textarea
              name="special_instructions"
              value={form.special_instructions}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Any special instructions for this order..."
            />
          </div>

          {/* Next Reservation */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              Next Reservation
            </label>
            <input
              type="datetime-local"
              name="next_reservation"
              value={form.next_reservation}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/orders")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors shadow-sm"
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
