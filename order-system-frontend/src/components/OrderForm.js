import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function OrderForm() {
  const [order, setOrder] = useState({
    orderName: '',
    status: '',
    itemCode: '',
    taskQuantity: 0,
    batchCode: '',
    salesOrder: '',
    customerCode: '',
    deadline: '',
    startDate: '',
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const api = axios.create({
      baseURL: 'http://localhost:3001',
    });

    // Fetch customers
    api.get('/api/customers')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const api = axios.create({
      baseURL: 'http://localhost:3001',
    });

    api.post('/api/orders', order)
      .then((response) => {
        console.log('Order created:', response.data);
        // Reset form after successful submission
        setOrder({
          orderName: '',
          status: '',
          itemCode: '',
          taskQuantity: 0,
          batchCode: '',
          salesOrder: '',
          customerCode: '',
          deadline: '',
          startDate: '',
        });
      })
      .catch((error) => {
        console.error('Error creating order:', error);
      });
  };

  return (
    <div className='container'>
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Customer Code:</label>
          <select name="customerCode" value={order.customerCode} onChange={handleChange}>
            <option value="">Select a Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.companyCode}>
                {customer.companyName} ({customer.companyCode})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Order Name:</label>
          <input type="text" name="orderName" value={order.orderName} onChange={handleChange} />
        </div>
        <div>
          <label>Status:</label>
          <input type="text" name="status" value={order.status} onChange={handleChange} />
        </div>
        <div>
          <label>Item Code:</label>
          <input type="text" name="itemCode" value={order.itemCode} onChange={handleChange} />
        </div>
        <div>
          <label>Task Quantity:</label>
          <input
            type="number"
            name="taskQuantity"
            value={order.taskQuantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Batch Code:</label>
          <input type="text" name="batchCode" value={order.batchCode} onChange={handleChange} />
        </div>
        <div>
          <label>Sales Order:</label>
          <input type="text" name="salesOrder" value={order.salesOrder} onChange={handleChange} />
        </div>
        <div>
          <label>Deadline:</label>
          <input type="date" name="deadline" value={order.deadline} onChange={handleChange} />
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" name="startDate" value={order.startDate} onChange={handleChange} />
        </div>
        <button type="submit">Create Order</button>
      </form>
      <Link to="/">Go to Home</Link>
    </div>
  );
}

export default OrderForm;
