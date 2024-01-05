import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const api = axios.create({
      baseURL: 'http://localhost:3001', // Update the base URL to match your backend
    });

    api
      .get('/api/orders')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <div>
      <h2>Order List</h2>
      <Link to="/create">Create New Order</Link>
      <table>
        <thead>
          <tr>
            <th>Order Name</th>
            <th>Status</th>
            <th>Item Code</th>
            <th>Task Quantity</th>
            <th>Batch Code</th>
            <th>Sales Order</th>
            <th>Customer Code</th>
            <th>Deadline</th>
            <th>Start Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderName}</td>
              <td>{order.status}</td>
              <td>{order.itemCode}</td>
              <td>{order.taskQuantity}</td>
              <td>{order.batchCode}</td>
              <td>{order.salesOrder}</td>
              <td>{order.customerCode}</td>
              <td>{order.deadline}</td>
              <td>{order.startDate}</td>
              <td>
              <Link to={`/orders/${order.id || ''}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
