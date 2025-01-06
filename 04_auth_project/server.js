const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Hammad';
app.use(express.json());
const users = [];

app.get('/', (req, res) => {
  res.sendFile('./index.html');
});

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

app.post('/signin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = users.find(
    (user) => user.password === password && user.username === username
  );

  if (user) {
    try {
      const token = jwt.sign({ username, password }, JWT_SECRET);
      res.json({
        message: 'User sign in successfully',
        token,
      });
    } catch (error) {
      res.json({
        message: 'Invalid Credentials',
      });
    }
  }
});

app.post('/me', authMiddleware, (req, res) => {
  const user = req.user;
  res.json({
    username: user.username,
    password: user.password,
  });
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
app.listen('3000', () => {
  console.log(`Server is running on port 3000...`);
});
