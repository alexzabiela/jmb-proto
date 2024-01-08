const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Connect to the SQLite database using Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'orders.db',
});

// Define the "Order" model with all data elements
const Order = sequelize.define('Order', {
  orderName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  itemCode: DataTypes.STRING,
  taskQuantity: DataTypes.INTEGER,
  batchCode: DataTypes.STRING,
  salesOrder: DataTypes.STRING,
  customerCode: DataTypes.STRING,
  deadline: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

// Define the "Customer" model with all data elements
const Customer = sequelize.define('Customer', {
  // Add other customer fields here
  companyCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Define the "Product" model with specified fields
const Product = sequelize.define('Product', {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  productStockAvailability: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Sync the models with the database
sequelize.sync();

// Create a new order
app.post('/api/orders', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ error: 'Error creating order' });
  }
});

// Retrieve all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// Retrieve a single order by ID
app.get('/api/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order by ID:', error.message);
    res.status(500).json({ error: 'Error fetching order by ID' });
  }
});

// Update an existing order
app.put('/api/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await Order.update(req.body, {
      where: { id },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error('Error updating order:', error.message);
    res.status(500).json({ error: 'Error updating order' });
  }
});

// Delete an order
app.delete('/api/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Order.destroy({
      where: { id },
    });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error.message);
    res.status(500).json({ error: 'Error deleting order' });
  }
});

// Create a new customer
app.post('/api/customers', async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    console.error('Error creating customer:', error.message);
    res.status(500).json({ error: 'Error creating customer' });
  }
});

// Retrieve all customers
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error.message);
    res.status(500).json({ error: 'Error fetching customers' });
  }
});

// Retrieve a single customer by ID or Customer Code
app.get('/api/customers/:identifier', async (req, res) => {
  const { identifier } = req.params;
  try {
    let customer;
    if (!isNaN(identifier)) {
      // If identifier is a number, assume it's an ID
      customer = await Customer.findByPk(identifier);
    } else {
      // Otherwise, search by Customer Code
      customer = await Customer.findOne({
        where: { companyCode: identifier },
      });
    }

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    res.json(customer);
  } catch (error) {
    console.error('Error fetching customer by ID or Customer Code:', error.message);
    res.status(500).json({ error: 'Error fetching customer by ID or Customer Code' });
  }
});


// Update an existing customer by ID or Customer Code
app.put('/api/customers/:identifier', async (req, res) => {
  const { identifier } = req.params;
  try {
    let updatedRows;

    if (!isNaN(identifier)) {
      // If identifier is a number, assume it's an ID
      updatedRows = await Customer.update(req.body, {
        where: { id: identifier },
      });
    } else {
      // Otherwise, update by Customer Code
      updatedRows = await Customer.update(req.body, {
        where: { companyCode: identifier },
      });
    }

    if (updatedRows[0] === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json({ message: 'Customer updated successfully' });
  } catch (error) {
    console.error('Error updating customer:', error.message);
    res.status(500).json({ error: 'Error updating customer' });
  }
});


// Delete a customer
app.delete('/api/customers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Customer.destroy({
      where: { id },
    });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error.message);
    res.status(500).json({ error: 'Error deleting customer' });
  }
});

// Create a new product
app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ error: 'Error creating product' });
  }
});

// Retrieve all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Retrieve a single product by ID
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error.message);
    res.status(500).json({ error: 'Error fetching product by ID' });
  }
});

// Update an existing product
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await Product.update(req.body, {
      where: { id },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ error: 'Error updating product' });
  }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Product.destroy({
      where: { id },
    });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ error: 'Error deleting product' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
