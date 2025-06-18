// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { fetchOrders,fetchCustomers } from "../api/client";
// import { Order } from "../types";
// import { Users, ShoppingBag, TrendingUp, Calendar} from "lucide-react";



// const Dashboard = () => {
//   const [customerCount, setCustomerCount] = useState(0);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     Promise.all([fetchOrders()])
//       .then(([ordersData]) => {
//         setOrders(ordersData);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     fetchCustomers().then(customers => {
//       setCustomerCount(customers.length);
//     });
//   }, []);

//   const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
//   const todayOrders = orders.filter(order => 
//     new Date(order.order_date).toDateString() === new Date().toDateString()
//   ).length;

//   const stats = [
//     {
//       name: "Total Customers",
//       value: customerCount,
//       icon: Users,
//       color: "bg-blue-500",
//       bgColor: "bg-blue-50",
//       textColor: "text-blue-700"
//     },
//     {
//       name: "Orders Today",
//       value: todayOrders,
//       icon: ShoppingBag,
//       color: "bg-green-500",
//       bgColor: "bg-green-50",
//       textColor: "text-green-700"
//     },
//     {
//       name: "Revenue",
//       value:  `$${totalRevenue.toFixed(2)}`,
//       icon: TrendingUp,
//       color: "bg-orange-500",
//       bgColor: "bg-orange-50",
//       textColor: "text-orange-700"
//     },
//     {
//       name: "Reservations",
//       value: customerCount,
//       icon: Calendar,
//       color: "bg-purple-500",
//       bgColor: "bg-purple-50",
//       textColor: "text-purple-700"
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* Welcome Section */}
//       <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white p-8">
//         <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--third-font)" }}>
//           Welcome to TastyBites
//         </h1>
//         <p className="text-orange-100 text-lg">
//           Manage your restaurant customers and orders with ease
//         </p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat) => {
//           const Icon = stat.icon;
//           return (
//             <div
//               key={stat.name}
//               className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
//             >
//               <div className="flex items-center">
//                 <div className={`p-3 rounded-xl ${stat.bgColor}`}>
//                   <Icon className={`w-6 h-6 ${stat.textColor}`} />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">{stat.name}</p>
//                   <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
//           <div className="space-y-3">
//             <Link
//               to="/customers/new"
//               className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
//             >
//               <Users className="w-5 h-5 text-blue-600 mr-3" />
//               <div>
//                 <p className="font-medium text-blue-900">Add New Customer</p>
//                 <p className="text-sm text-blue-600">Register a new customer to the system</p>
//               </div>
//             </Link>
//             <Link
//               to="/orders/new"
//               className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
//             >
//               <ShoppingBag className="w-5 h-5 text-green-600 mr-3" />
//               <div>
//                 <p className="font-medium text-green-900">Create New Order</p>
//                 <p className="text-sm text-green-600">Take a new order from a customer</p>
//               </div>
//             </Link>
//           </div>
//         </div>
        
//         {/*Recent AActivities*/}
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
//           <div className="space-y-3">
//             <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//               <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium text-gray-900">New customer registered</p>
//                 <p className="text-xs text-gray-500">2 minutes ago</p>
//               </div>
//             </div>
//             <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//               <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium text-gray-900">Order completed</p>
//                 <p className="text-xs text-gray-500">15 minutes ago</p>
//               </div>
//             </div>
//             <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//               <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium text-gray-900">Payment received</p>
//                 <p className="text-xs text-gray-500">1 hour ago</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrders, fetchCustomers } from "../api/client";
import { Order, Customer } from "../types";
import { Users, ShoppingBag, TrendingUp, Calendar } from "lucide-react";

interface Activity {
  id: string;
  type: 'customer' | 'order' | 'payment';
  message: string;
  time: string;
  color: string;
}

const Dashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchOrders(), fetchCustomers()])
      .then(([ordersData, customersData]) => {
        setOrders(ordersData);
        setCustomers(customersData);
        setCustomerCount(customersData.length);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const todayOrders = orders.filter(order => 
    new Date(order.order_date).toDateString() === new Date().toDateString()
  ).length;

  // Generate recent activities from real data
  const getRecentActivities = (): Activity[] => {
    const activities: Activity[] = [];

    // Add recent customers
    const recentCustomers = customers
      .sort((a, b) => new Date(b.registration_date).getTime() - new Date(a.registration_date).getTime())
      .slice(0, 3);
      recentCustomers.forEach(customer => {
        activities.push({
          id: `customer-${customer.id}`,
          type: 'customer',
          message: `New customer registered: ${customer.first_name} ${customer.surname}`,
          time: getTimeAgo(customer.registration_date),
          color: 'bg-green-500'
        });
      });
  
      // Add recent orders
      const recentOrders = orders
        .sort((a, b) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime())
        .slice(0, 3);
  
      recentOrders.forEach(order => {
        const customer = customers.find(c => c.id === order.customer_id);
        const customerName = customer ? `${customer.first_name} ${customer.surname}` : 'Unknown Customer';
        
        activities.push({
          id: `order-${order.id}`,
          type: 'order',
          message: `New order: ${order.menu_item} by ${customerName}`,
          time: getTimeAgo(order.order_date),
          color: 'bg-blue-500'
        });
        if (order.total_amount && order.total_amount > 0) {
          activities.push({
            id: `payment-${order.id}`,
            type: 'payment',
            message: `Payment received: $${order.total_amount.toFixed(2)}`,
            time: getTimeAgo(order.order_date),
            color: 'bg-orange-500'
          });
        }
      });
  
      // Sort all activities by most recent and return top 3
      return activities
        .sort((a, b) => {
          const timeA = parseTimeAgo(a.time);
          const timeB = parseTimeAgo(b.time);
          return timeA - timeB;
        })
        .slice(0, 3);
    };
  
    const getTimeAgo = (dateString: string): string => {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      if (diffInMinutes < 60) {
        return diffInMinutes <= 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
      } else if (diffInHours < 24) {
        return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
      } else {
        return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
      }
    };
  
    const parseTimeAgo = (timeString: string): number => {
      const number = parseInt(timeString.split(' ')[0]);
      if (timeString.includes('minute')) return number;
      if (timeString.includes('hour')) return number * 60;
      if (timeString.includes('day')) return number * 60 * 24;
      return 0;
    };
  
    const stats = [
      {
        name: "Total Customers",
        value: customerCount,
        icon: Users,
        color: "bg-blue-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700"
      },
      {
        name: "Orders Today",
        value: todayOrders,
        icon: ShoppingBag,
        color: "bg-green-500",
        bgColor: "bg-green-50",
        textColor: "text-green-700"
      },
      {
        name: "Revenue",
        value: `$${totalRevenue.toFixed(2)}`,
        icon: TrendingUp,
        color: "bg-orange-500",
        bgColor: "bg-orange-50",
        textColor: "text-orange-700"
      },
      {
        name: "Reservations",
        value: customerCount,
        icon: Calendar,
        color: "bg-purple-500",
        bgColor: "bg-purple-50",
        textColor: "text-purple-700"
      },
    ];
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      );
    }
  
    const recentActivities = getRecentActivities();
  
    return (
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white p-8">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--third-font)" }}>
            Welcome to TastyBites
          </h1>
          <p className="text-orange-100 text-lg">
            Manage your restaurant customers and orders with ease
          </p>
        </div>
        {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/customers/new"
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
            >
              <Users className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-blue-900">Add New Customer</p>
                <p className="text-sm text-blue-600">Register a new customer to the system</p>
              </div>
            </Link>
            <Link
              to="/orders/new"
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
            >
              <ShoppingBag className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-green-900">Create New Order</p>
                <p className="text-sm text-green-600">Take a new order from a customer</p>
              </div>
            </Link>
          </div>
        </div>
        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 ${activity.color} rounded-full mr-3`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center p-8">
                <p className="text-gray-500">No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;