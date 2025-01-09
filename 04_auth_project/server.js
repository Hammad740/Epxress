const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const path = require('path');
const morgan = require('morgan');
const logger = require('./logger');
const JWT_SECRET = 'Hammad';
const cors = require('cors');
app.use(cors());

app.use(express.json());

const users = [];

// Setup morgan for logging
const morganFormat = ':method :url :status :response-time ms';
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Signup route
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });

  res.json({
    message: 'User registered successfully!',
  });
});

// Signin route
app.post('/signin', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = jwt.sign({ username, password }, JWT_SECRET);
    res.json({
      message: 'User signed in successfully',
      token,
    });
  } else {
    res.status(401).json({
      message: 'Invalid credentials',
    });
  }
});

// Protected route for user information
app.post('/me', authMiddleware, (req, res) => {
  const user = req.user;
  res.json({
    username: user.username,
    password: user.password,
  });
});

// Middleware for JWT authentication
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

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});
