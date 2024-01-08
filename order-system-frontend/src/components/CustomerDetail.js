import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Import useNavigate

function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // Get the navigate function
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

  const handleEditClick = () => {
    // Redirect to the edit page with the customer ID
    navigate(`/customers/edit/${id}`);
  };

  const handleDeleteClick = () => {
    // Send a delete request to your API to delete the customer
    const api = axios.create({
      baseURL: 'http://localhost:3001', // Update the base URL to match your backend
    });

    api
      .delete(`/api/customers/${id}`)
      .then(() => {
        // Redirect to the customer list after successful deletion
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
    </div>
  );
}

export default CustomerDetail;
