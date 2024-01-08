import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function CreateProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: '',
    productCode: '',
    productPrice: '',
    productStockAvailability: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const api = axios.create({
      baseURL: 'http://localhost:3001', // Update the base URL to match your backend
    });

    api
      .post('/api/products', product) // Use POST request to create the product
      .then(() => {
        navigate('/products'); // Redirect to the product list after successful creation
      })
      .catch((error) => {
        console.error('Error creating product:', error);
      });
  };

  return (
    <div className='container'>
      <h2>Create New Product</h2>
      <Link to="/products">Back to Product List</Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Product Code:</label>
          <input
            type="text"
            name="productCode"
            value={product.productCode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Product Price:</label>
          <input
            type="number"
            name="productPrice"
            value={product.productPrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Product Stock Availability:</label>
          <input
            type="number"
            name="productStockAvailability"
            value={product.productStockAvailability}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Create Product</button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
