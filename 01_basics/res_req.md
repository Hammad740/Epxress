The `req` (request) and `res` (response) objects in Express.js are essential for handling HTTP requests and sending responses to the client. Here's a detailed explanation of these objects and their commonly used methods:

### `req` (Request Object)

The `req` object represents the HTTP request and contains all the information about the request being made by the client, such as the URL, HTTP method, headers, query parameters, etc.

#### Commonly Used Properties and Methods of `req`:

1. **`req.body`**

   - Contains data sent in the body of the request (usually in `POST` or `PUT` requests).
   - Requires a middleware like `express.json()` or `express.urlencoded()` to parse incoming request bodies.
   - Example:
     ```js
     app.use(express.json());
     app.post('/data', (req, res) => {
       console.log(req.body); // Logs the request body
     });
     ```

2. **`req.params`**

   - Contains route parameters, which are part of the URL.
   - Example:
     ```js
     app.get('/user/:id', (req, res) => {
       console.log(req.params.id); // Logs the 'id' parameter from the URL
     });
     ```

3. **`req.query`**

   - Contains query parameters, which are part of the URL after the `?` symbol.
   - Example:
     ```js
     app.get('/search', (req, res) => {
       console.log(req.query.q); // Logs the 'q' query parameter from the URL
     });
     ```

4. **`req.method`**

   - Contains the HTTP method used in the request (GET, POST, PUT, DELETE, etc.).
   - Example:
     ```js
     app.use((req, res) => {
       console.log(req.method); // Logs the request method
     });
     ```

5. **`req.url`**

   - Contains the URL of the request.
   - Example:
     ```js
     app.use((req, res) => {
       console.log(req.url); // Logs the request URL
     });
     ```

6. **`req.headers`**

   - Contains the headers sent by the client in the request.
   - Example:
     ```js
     app.use((req, res) => {
       console.log(req.headers); // Logs the request headers
     });
     ```

7. **`req.ip`**

   - Contains the IP address of the client making the request.
   - Example:
     ```js
     app.use((req, res) => {
       console.log(req.ip); // Logs the client's IP address
     });
     ```

8. **`req.cookies`**
   - Contains cookies sent by the client (requires cookie-parser middleware).
   - Example:
     ```js
     const cookieParser = require('cookie-parser');
     app.use(cookieParser());
     app.use((req, res) => {
       console.log(req.cookies); // Logs the cookies
     });
     ```

---

### `res` (Response Object)

The `res` object represents the HTTP response that your Express app sends back to the client. It provides methods to send data, set headers, and control the response status.

#### Commonly Used Methods of `res`:

1. **`res.send()`**

   - Sends a response to the client (can be a string, object, or buffer).
   - Example:
     ```js
     app.get('/', (req, res) => {
       res.send('Hello, World!'); // Sends a string response
     });
     ```

2. **`res.json()`**

   - Sends a JSON response to the client.
   - Example:
     ```js
     app.get('/data', (req, res) => {
       res.json({ message: 'Hello, JSON!' }); // Sends a JSON response
     });
     ```

3. **`res.status()`**

   - Sets the HTTP status code of the response.
   - Example:
     ```js
     app.get('/notfound', (req, res) => {
       res.status(404).send('Not Found'); // Sends a 404 status with a message
     });
     ```

4. **`res.redirect()`**

   - Redirects the client to another URL.
   - Example:
     ```js
     app.get('/google', (req, res) => {
       res.redirect('https://www.google.com'); // Redirects to Google's website
     });
     ```

5. **`res.render()`**

   - Renders a view template (usually used with template engines like Pug, EJS, etc.).
   - Example:
     ```js
     app.set('view engine', 'pug');
     app.get('/home', (req, res) => {
       res.render('index', { title: 'Home Page' }); // Renders a Pug template
     });
     ```

6. **`res.set()`**

   - Sets a response header.
   - Example:
     ```js
     app.get('/', (req, res) => {
       res.set('Content-Type', 'text/html');
       res.send('<h1>Hello, World!</h1>'); // Sends an HTML response
     });
     ```

7. **`res.cookie()`**

   - Sets a cookie in the response (requires `cookie-parser` middleware).
   - Example:
     ```js
     app.use(cookieParser());
     app.get('/setcookie', (req, res) => {
       res.cookie('name', 'Hammad');
       res.send('Cookie has been set');
     });
     ```

8. **`res.clearCookie()`**
   - Clears a cookie from the response.
   - Example:
     ```js
     app.get('/clearcookie', (req, res) => {
       res.clearCookie('name');
       res.send('Cookie has been cleared');
     });
     ```

---

### Example of `req` and `res` in a Simple Route:

```js
const express = require('express');
const app = express();
app.use(express.json());

app.get('/user/:id', (req, res) => {
  const userId = req.params.id; // Accessing URL parameters
  const query = req.query.q; // Accessing query parameters

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is missing' }); // Sending status and JSON
  }

  res.status(200).json({
    message: `User ID: ${userId}, Query: ${query}`, // Sending JSON response
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

This covers the essentials of the `req` and `res` objects in Express.js. These objects allow you to handle HTTP requests and responses flexibly, making it easier to build web applications.
