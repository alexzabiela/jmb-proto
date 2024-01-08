import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import OrderDetail from './components/OrderDetail';
import CustomerList from './components/CustomerList';
import CreateCustomer from './components/CreateCustomer';
import CustomerDetail from './components/CustomerDetail';
import CustomerEdit from './components/CustomerEdit';
import CreateProduct from './components/CreateProduct';
import ProductDetail from './components/ProductDetail';
import ProductEdit from './components/ProductEdit';
import ProductList from './components/ProductList';

function App() {
  return (
    <Router>
      <nav className='nav-container'>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/create" element={<OrderForm />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/create-customer" element={<CreateCustomer />} />
        <Route path="/customers/:id" element={<CustomerDetail />} />
        <Route path="/customers/id/:id" element={<CustomerDetail />} />
        <Route path="/customers/code/:code" element={<CustomerDetail />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/edit/:id" element={<CustomerEdit />} />
        <Route path="/customers/edit/:companyCode" element={<CustomerEdit />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/id/:id" element={<ProductDetail />} />
        <Route path="/products/code/:code" element={<ProductDetail />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/edit/:id" element={<ProductEdit />} />
        <Route path="/products/edit/:companyCode" element={<ProductEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
