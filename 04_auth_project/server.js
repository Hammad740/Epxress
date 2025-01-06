const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json());
const users = [];

app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  users.push({
    username,
    password,
  });
  res.json({
    message: 'User registered successfully!',
  });
});

app.listen('3000', () => {
  console.log(`Server is running on port 3000...`);
});
