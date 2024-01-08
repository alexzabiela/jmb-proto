import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: '',
    productCode: '',
    productPrice: 0,
    productStockAvailability: 0,
    // Add other product fields here
  });

  useEffect(() => {
    const api = axios.create({
      baseURL: 'http://localhost:3001', // Update the base URL to match your backend
    });

    api
      .get(`/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

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
      .put(`/api/products/${id}`, product) // Use PUT request to update the product
      .then(() => {
        navigate(`/products/${id}`); // Redirect to product details page after successful update
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <div className='container'>
      <h2>Edit Product</h2>
      <Link to={`/products/${id}`}>Back to Product Details</Link>
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
        {/* Add other product fields here */}
        <div>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

export default ProductEdit;
