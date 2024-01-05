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

// Sync the model with the database
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
