import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const api = axios.create({
      baseURL: 'http://localhost:3001', // Update the base URL to match your backend
    });

    api
      .get('/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className='container'>
      <h2>Product List</h2>
      <Link to="/create-product">Create New Product</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Product Code</th>
            <th>Product Price</th>
            <th>Product Stock Availability</th>
            <th>Actions</th>
            {/* Add other product fields here */}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.productName}</td>
              <td>{product.productCode}</td>
              <td>{product.productPrice}</td>
              <td>{product.productStockAvailability}</td>
              {/* Add other product fields here */}
              <td>
                <Link to={`/products/${product.id || ''}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
