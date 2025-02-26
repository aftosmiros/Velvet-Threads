import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${backendUrl}/api/order/list`, { headers: { token: token } });

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.success);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  const statusHandler = async (e, orderId) => {
    try {

      const response = await axios.post(`${backendUrl}/api/order/status`, { orderId, status: e.target.value }, {
        headers: {
          token: token
        }
      })
      if (response.data.success) {
        await fetchAllOrders()
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 bg-gray-50 min-h-screen">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Order Page</h3>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr] gap-4 items-start border border-gray-300 bg-white p-6 rounded-lg shadow-md text-gray-700"
          >
            {/* Icon */}
            <img src={assets.parcel_icon} alt="Parcel Icon" className="w-full h-full mx-auto" />

            {/* Order Details */}
            <div>
              {/* Items */}
              <div className="mb-2">
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-gray-600">
                    {item.name} x {item.quantity} <span className="text-sm">({item.size})</span>
                    {idx < order.items.length - 1 && <span>, </span>}
                  </p>
                ))}
              </div>

              {/* Address */}
              <div className="text-sm mt-2">
                <p className="font-medium text-gray-800">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state} {order.address.zipcode}, {order.address.country}
                </p>
                <p>Phone: {order.address.phone}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="text-sm space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Items:</span> {order.items.length}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Method:</span> {order.paymentMethod}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Payment:</span>{' '}
                <span className={order.payment ? 'text-green-600' : 'text-red-600'}>
                  {order.payment ? 'Completed' : 'Pending'}
                </span>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Date:</span> {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="font-semibold text-lg text-gray-800">
                {currency}
                {typeof order.amount === 'object' ? order.amount.toString() : order.amount}
              </p>
              <div className="mt-3">
                <select onChange={(e) => statusHandler(e, order._id)} className="border-gray-300 rounded-md shadow-sm w-full text-sm">
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out For Deliver">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
