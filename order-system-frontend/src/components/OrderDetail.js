import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function OrderDetail() {
  const { id } = useParams();
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

  useEffect(() => {
    const api = axios.create({
      baseURL: 'http://localhost:3001', // Update the base URL to match your backend
    });

    api
      .get(`/api/orders/${id}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error('Error fetching order details:', error);
      });
  }, [id]);

  return (
    <div className='container'>
      <h2>Order Details</h2>
      <Link to="/orders">Go to Order List</Link>
      <div className='container'>
      <div>
        <label>Order Name:</label>
        <span>{order.orderName}</span>
      </div>
      <div>
        <label>Status:</label>
        <span>{order.status}</span>
      </div>
      <div>
        <label>Item Code:</label>
        <span>{order.itemCode}</span>
      </div>
      <div>
        <label>Task Quantity:</label>
        <span>{order.taskQuantity}</span>
      </div>
      <div>
        <label>Batch Code:</label>
        <span>{order.batchCode}</span>
      </div>
      <div>
        <label>Sales Order:</label>
        <span>{order.salesOrder}</span>
      </div>
      <div>
        <label>Customer Code:</label>
        <span>{order.customerCode}</span>
      </div>
      <div>
        <label>Deadline:</label>
        <span>{order.deadline}</span>
      </div>
      <div>
        <label>Start Date:</label>
        <span>{order.startDate}</span>
      </div>
      </div>
    </div>
  );
}

export default OrderDetail;
