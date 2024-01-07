import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Order System</h1>
      <ul>
      <li><Link to="/orders">Manage Orders</Link></li>
      <li><Link to="/customers">Manage Customers</Link></li>
      </ul>
    </div>
  );
}

export default Home;
