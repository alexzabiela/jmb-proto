import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const api = axios.create({
      baseURL: 'http://localhost:3001', // Update the base URL to match your backend
    });

    api
      .get('/api/customers')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  return (
    <div>
      <h2>Customer List</h2>
      <Link to="/create-customer">Create New Customer</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Code</th>
            <th>Company Name</th>
            {/* Add other customer fields here */}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.companyCode}</td>
              <td>{customer.companyName}</td>
              {/* Add other customer fields here */}
              <td>
                <Link to={`/customers/${customer.id || ''}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
