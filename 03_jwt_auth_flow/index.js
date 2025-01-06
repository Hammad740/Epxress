const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const JWT_SECRET = 'secret';
const users = [];

app.use(express.json());

// Signup route
app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  users.push({
    username,
    password,
  });
  console.log(users);
  res.json({
    message: 'User registered successfully!',
  });
});

// Signin route
app.post('/signin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = jwt.sign(
      { username: user.username, password: user.password },
      JWT_SECRET
    );
    res.json({
      message: 'User signed in successfully!',
      token,
    });
  } else {
    res.json({
      message: 'User not found!',
    });
  }
});

// /me route to return user details based on the token
app.get('/me', authMiddleware, (req, res) => {
  // const authHeader = req.headers.authorization;

  // // Check if the Authorization header is present and starts with 'Bearer '
  // if (authHeader && authHeader.startsWith('Bearer ')) {
  //   // Extract the token after 'Bearer '
  //   const token = authHeader.split(' ')[1];

  //   try {
  //     // Verify the token
  //     const decodedToken = jwt.verify(token, JWT_SECRET);

  //     // Respond with the username (avoid sending the password)
  //     res.json({
  //       username: decodedToken.username,
  //     });
  //   } catch (error) {
  //     // If the token is invalid
  //     res.status(401).json({
  //       message: 'Invalid token',
  //     });
  //   }
  // } else {
  //   // If the Authorization header is missing or malformed
  //   res.status(401).json({
  //     message: 'Authorization header missing or malformed',
  //   });
  // }
  res.json({
    username: req.user.username,
  });
});

// Move app.listen outside of the route definition
app.listen(4000, () => {
  console.log(`Server is listening on port 4000...`);
});

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
}
