import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    companyCode: '',
    companyName: '',
    // Add other customer fields here
  });

  const [customerOrders, setCustomerOrders] = useState([]);

  useEffect(() => {
    const api = axios.create({
      baseURL: 'http://localhost:3001',
    });

    // Fetch customer details
    api.get(`/api/customers/${id}`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer details:', error);
      });
  }, [id]);

  useEffect(() => {
    if (customer.companyCode) {
      const api = axios.create({
        baseURL: 'http://localhost:3001',
      });

      // Fetch customer orders using customerCode
      api.get(`/api/orders/customer/${customer.companyCode}`)
        .then((response) => {
          setCustomerOrders(response.data);
        })
        .catch((error) => {
          console.error('Error fetching customer orders:', error);
        });
    }
  }, [customer.companyCode]);

  const handleEditClick = () => {
    navigate(`/customers/edit/${id}`);
  };

  const handleDeleteClick = () => {
    const api = axios.create({
      baseURL: 'http://localhost:3001',
    });

    api.delete(`/api/customers/${id}`)
      .then(() => {
        navigate('/customers');
      })
      .catch((error) => {
        console.error('Error deleting customer:', error);
      });
  };

  return (
    <div className='container'>
      <h2>Customer Details</h2>
      <Link to="/customers">Go to Customer List</Link>
      <div className='container'>
        <div>
          <label>Company Code:</label>
          <span>{customer.companyCode}</span>
        </div>
        <div>
          <label>Company Name:</label>
          <span>{customer.companyName}</span>
        </div>
        {/* Add other customer fields here */}
        <div>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      </div>
      {customerOrders.length > 0 && (
        <div>
          <h3>Customer Orders:</h3>
          <table>
            <thead>
              <tr>
                <th>Order Code</th>
                <th>Order Name</th>
                <th>Status</th>
                <th>Item Code</th>
                <th>Task Quantity</th>
                <th>Batch Code</th>
                <th>Sales Order</th>
                <th>Deadline</th>
                <th>Start Date</th>
              </tr>
            </thead>
            <tbody>
              {customerOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.orderName}</td>
                  <td>{order.status}</td>
                  <td>{order.itemCode}</td>
                  <td>{order.taskQuantity}</td>
                  <td>{order.batchCode}</td>
                  <td>{order.salesOrder}</td>
                  <td>{order.deadline}</td>
                  <td>{order.startDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CustomerDetail;
