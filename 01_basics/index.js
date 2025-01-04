//? http server

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Home page</h1>');
});

app.get('/data', (req, res) => [
  res.json({
    name: 'Hammad',
    age: 24,
    job: 'Associate System Engineer',
  }),
]);

app.listen(4000, () => {
  console.log(`Server is listening on Port 4000...`);
});
