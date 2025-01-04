const express = require('express');
const app = express();
app.use(express.json());

//? in memory variable

const users = [];
//? signup route

app.post('/signup', (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  users.push({
    userName,
    password,
  });
  console.log(users);
  res.json({
    message: 'User registered Successfully!',
  });
});

//? signin route
app.post('/signin', (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  const userFound = users.find(
    (user) => user.userName === userName && user.password === password
  );
  if (userFound) {
    const token = generateToken();
    userFound.token = token;
    res.json({
      message: 'Sign in with Success',
      token,
    });
  }
});

//? protected me route

app.get('/me', (req, res) => {
  const token = req.headers.authorization;

  const userTokenFound = users.find((user) => user.token === token);

  if (userTokenFound) {
    res.json({
      message: 'User details',
      userName: userTokenFound.userName,
      password: userTokenFound.password,
    });
  } else {
    res.json({
      message: 'Invalid Token',
    });
  }
});

function generateToken() {
  let options = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
}
app.listen(3000, (req, res) => {
  console.log(`Server is listening on port 3000...`);
});
