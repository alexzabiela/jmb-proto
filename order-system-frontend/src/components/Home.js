import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Order System</h1>
      <Link to="/orders">View Orders</Link>
    </div>
  );
}

export default Home;
