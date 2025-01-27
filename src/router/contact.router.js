const express = require("express");
const mysql = require("mysql2");
const contactRouter = express.Router();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'travels-web',
  port: 3307,
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
});

// Middleware để phân tích cú pháp JSON
contactRouter.use(express.json());

// API POST để nhận form từ client
contactRouter.post('/contact', (req, res) => {
  const { user_id, title, address, image, phoneNumber, website } = req.body;
  console.log(user_id, title, address, image, phoneNumber, website);
  if (!user_id || !title || !address || !image ) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO contacts (user_id, title, address, image, phoneNumber, website) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [user_id, title, address, image, phoneNumber, website], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).send({ message: 'Error saving contact message' });
    }
    res.status(200).send({ message: 'Message sent successfully' });
  });
});

//gui vai viet len giao dien
 
module.exports = contactRouter;