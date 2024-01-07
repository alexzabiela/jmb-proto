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

function App() {
  return (
    <Router>
      <nav>
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
      </Routes>
    </Router>
  );
}

export default App;
