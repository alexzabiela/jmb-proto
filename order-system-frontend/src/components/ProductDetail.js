import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
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

  const handleEditClick = () => {
    // Redirect to the edit page with the product ID
    navigate(`/products/edit/${id}`);
  };

  const handleDeleteClick = () => {
    // Send a delete request to your API to delete the product
    const api = axios.create({
      baseURL: 'http://localhost:3001', // Update the base URL to match your backend
    });

    api
      .delete(`/api/products/${id}`)
      .then(() => {
        // Redirect to the product list after successful deletion
        navigate('/products');
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <div className='container'>
      <h2>Product Details</h2>
      <Link to="/products">Go to Product List</Link>
      <div className='container'>
      <div>
        <label>Product Name:</label>
        <span>{product.productName}</span>
      </div>
      <div>
        <label>Product Code:</label>
        <span>{product.productCode}</span>
      </div>
      <div>
        <label>Product Price:</label>
        <span>{product.productPrice}</span>
      </div>
      <div>
        <label>Product Stock Availability:</label>
        <span>{product.productStockAvailability}</span>
      </div>
      {/* Add other product fields here */}
      <div>
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
      </div>
    </div>
  );
}

export default ProductDetail;
