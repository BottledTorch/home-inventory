// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const binsRoutes = require('./routes/bins');
const itemsRoutes = require('./routes/items');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'mahnkemj',
  password: 'password',
  database: 'home_inventory_db',
  port: 3310  // Specify the MySQL port here
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

app.use('/bins', binsRoutes(db));
app.use('/items', itemsRoutes(db));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Home Inventory Express Backend!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
