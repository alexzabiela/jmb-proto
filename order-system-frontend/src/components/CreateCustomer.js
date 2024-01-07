import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CreateCustomer() {
  const [customer, setCustomer] = useState({
    companyCode: '',
    companyName: '',
    // Add more fields as per your schema
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const api = axios.create({
      baseURL: 'http://localhost:3001', // Update the base URL to match your backend
    });

    api
      .post('/api/customers', customer)
      .then((response) => {
        console.log('Customer created:', response.data);
        setCustomer({
          companyCode: '',
          companyName: '',
          // Add more fields as per your schema
        });
      })
      .catch((error) => {
        console.error('Error creating customer:', error);
      });
  };

  return (
    <div>
      <h2>Create Customer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Code:</label>
          <input type="text" name="companyCode" value={customer.companyCode} onChange={handleChange} />
        </div>
        <div>
          <label>Company Name:</label>
          <input type="text" name="companyName" value={customer.companyName} onChange={handleChange} />
        </div>
        {/* Add more form fields as per your schema */}
        <button type="submit">Create Customer</button>
      </form>
      <Link to="/customers">Go to Customer List</Link>
    </div>
  );
}

export default CreateCustomer;
