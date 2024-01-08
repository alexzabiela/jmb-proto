import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function CustomerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    companyCode: '',
    companyName: '',
    // Add other customer fields here
  });

  useEffect(() => {
    const api = axios.create({
      baseURL: 'http://localhost:3001', // Update the base URL to match your backend
    });

    api
      .get(`/api/customers/${id}`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer details:', error);
      });
  }, [id]);

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
      .put(`/api/customers/${id}`, customer) // Use PUT request to update the customer
      .then(() => {
        navigate(`/customers/${id}`); // Redirect to customer details page after successful update
      })
      .catch((error) => {
        console.error('Error updating customer:', error);
      });
  };

  return (
    <div className='container'>
      <h2>Edit Customer</h2>
      <Link to={`/customers/${id}`}>Back to Customer Details</Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Code:</label>
          <input
            type="text"
            name="companyCode"
            value={customer.companyCode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={customer.companyName}
            onChange={handleChange}
          />
        </div>
        {/* Add other customer fields here */}
        <div>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

export default CustomerEdit;
