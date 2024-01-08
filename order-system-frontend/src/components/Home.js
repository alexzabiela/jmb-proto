import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='container'>
      <h1>Welcome to the Order System</h1>
      <div className="dashboard-container">
        <div className="dashboard-item">
          <Link to="/orders">Manage Orders</Link>
        </div>
        <div className="dashboard-item">
          <Link to="/customers">Manage Customers</Link>
        </div>
        <div className="dashboard-item">
          <Link to="/products">Manage Products</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
