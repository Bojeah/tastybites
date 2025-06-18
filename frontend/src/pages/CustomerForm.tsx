import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCustomer, updateCustomer, getCustomer } from "../api/client";
import { User, Calendar, MapPin, UserCheck } from "lucide-react";

type CustomerFormType = {
  first_name: string;
  surname: string;
  middle_name: string;
  dob: string;
  address: string;
  registration_date: string;
  matric_no: boolean;
};

export default function CustomerForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<CustomerFormType>({
    first_name: "",
    surname: "",
    middle_name: "",
    dob: "",
    address: "",
    registration_date: new Date().toISOString().slice(0, 10),
    matric_no: true,
  });

  useEffect(() => {
    if (id) {
      getCustomer(+id).then(data => {
        setForm({
          ...data,
          dob: data.dob.slice(0, 10),
          registration_date: data.registration_date.slice(0, 10),
        });
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      await updateCustomer(+id!, form);
    } else {
      await createCustomer(form);
    }
    navigate("/customers");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <User className="w-8 h-8 text-orange-500" />
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? "Edit Customer" : "Add New Customer"}
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Customer Information</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2" />
                First Name
              </label>
              <input
                name="first_name"
                type="text"
                value={form.first_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2" />
                Surname
              </label>
              <input
                name="surname"
                type="text"
                value={form.surname}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Enter surname"
              />
            </div>
          </div>

          {/* Middle Name */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2" />
              Middle Name (Optional)
            </label>
            <input
              name="middle_name"
              type="text"
              value={form.middle_name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Enter middle name"
            />
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                Date of Birth
              </label>
              <input
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                Registration Date
              </label>
              <input
                name="registration_date"
                type="date"
                value={form.registration_date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              Address
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Enter full address"
            />
          </div>

          {/* Matriculation Status */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
            <input
              type="checkbox"
              name="matric_no"
              id="matric_no"
              checked={form.matric_no}
              onChange={handleChange}
              className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="matric_no" className="flex items-center text-sm font-medium text-gray-700">
              <UserCheck className="w-4 h-4 mr-2" />
              Student is matriculated
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/customers")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors shadow-sm"
            >
              {isEdit ? "Update Customer" : "Create Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
