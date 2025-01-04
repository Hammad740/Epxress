Express.js is a lightweight, flexible web application framework for Node.js. It simplifies building web applications and APIs by providing easy-to-use methods for handling HTTP requests, routing, middleware, and more. Let's go over the **basics of Express.js**:

### 1. **Installation**

First, install Express.js using `npm` (Node Package Manager):

```bash
npm install express
```

### 2. **Creating a Basic Express Server**

To start using Express, create a new JavaScript file (e.g., `app.js`) and set up a basic server:

```js
// Import the Express module
const express = require('express');

// Create an Express application
const app = express();

// Define a route for the root URL ('/')
app.get('/', (req, res) => {
  res.send('Hello, World!'); // Sends a response to the client
});

// Start the server and listen on a specific port (e.g., 3000)
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

- **Explanation**:
  - `express()` initializes an Express application.
  - `app.get()` defines a route for `GET` requests on the root URL (`/`).
  - `res.send()` sends a response to the client.
  - `app.listen()` starts the server, listening on port 3000.

### 3. **Routing**

Routing defines how your application responds to different HTTP requests (like `GET`, `POST`, etc.) for specific URLs (or endpoints).

#### **Defining Routes**:

```js
app.get('/', (req, res) => {
  res.send('This is the Home Page');
});

app.get('/about', (req, res) => {
  res.send('This is the About Page');
});

app.post('/submit', (req, res) => {
  res.send('Form Submitted');
});
```

- `app.get()` handles `GET` requests.
- `app.post()` handles `POST` requests.

#### **Route Parameters**:

You can capture dynamic values from the URL using route parameters.

```js
app.get('/user/:id', (req, res) => {
  const userId = req.params.id; // Access the 'id' parameter from the URL
  res.send(`User ID is: ${userId}`);
});
```

- Here, `:id` is a dynamic route parameter that will capture the value from the URL (e.g., `/user/123`).

### 4. **Middleware**

Middleware functions are functions that have access to the `req` (request), `res` (response), and `next` function in the application’s request-response cycle. Middleware can:

- Modify `req` and `res` objects.
- End the request-response cycle.
- Pass control to the next middleware function.

#### **Example of Middleware**:

```js
// Custom middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next(); // Call next to pass control to the next handler
});
```

#### **Built-in Middleware**:

1. **`express.json()`**:

   - Parses incoming JSON request bodies and makes them available in `req.body`.
   - Example:

     ```js
     app.use(express.json());

     app.post('/data', (req, res) => {
       console.log(req.body); // Access the parsed JSON body
       res.send('Data received');
     });
     ```

2. **`express.static()`**:
   - Serves static files (like HTML, CSS, JS) from a directory.
   - Example:
     ```js
     app.use(express.static('public')); // Serves files from the 'public' directory
     ```

### 5. **Handling Query Parameters**

Query parameters are passed in the URL after a `?` symbol.

#### **Example**:

```js
app.get('/search', (req, res) => {
  const query = req.query.q; // Access query parameter 'q'
  res.send(`You searched for: ${query}`);
});
```

- URL: `http://localhost:3000/search?q=express`
- Response: `You searched for: express`

### 6. **Sending JSON Responses**

In addition to sending plain text or HTML, you can send JSON responses using `res.json()`:

```js
app.get('/json', (req, res) => {
  res.json({ message: 'Hello, JSON!' });
});
```

- This sends a JSON response like: `{ "message": "Hello, JSON!" }`.

### 7. **Error Handling**

In Express, error-handling middleware can catch errors that occur during the request-response cycle.

#### **Example of an Error-Handling Middleware**:

```js
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).send('Something went wrong!');
});
```

- Express automatically forwards errors to this middleware if an error occurs.

### 8. **Routing with HTTP Methods**

You can handle different HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) for the same route.

#### **Example**:

```js
app
  .route('/users')
  .get((req, res) => {
    res.send('Get all users');
  })
  .post((req, res) => {
    res.send('Create a new user');
  })
  .put((req, res) => {
    res.send('Update an existing user');
  });
```

### 9. **Path Matching and Route Parameters**

You can handle routes with dynamic parts using route parameters or even regular expressions.

#### **Example**:

```js
// Route with multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.send(`User ID: ${userId}, Post ID: ${postId}`);
});

// Route with regex
app.get(/\/products\/(\d+)/, (req, res) => {
  const productId = req.params[0];
  res.send(`Product ID: ${productId}`);
});
```

### 10. **Redirecting**

You can redirect the client to another URL using `res.redirect()`:

```js
app.get('/google', (req, res) => {
  res.redirect('https://www.google.com');
});
```

### 11. **Using Template Engines**

Express can render dynamic HTML using template engines like Pug, EJS, etc.

#### **Example with Pug**:

1. Install Pug:
   ```bash
   npm install pug
   ```
2. Set up Pug as the view engine:
   ```js
   app.set('view engine', 'pug');
   ```
3. Create a Pug template (`views/index.pug`):
   ```pug
   html
     head
       title= title
     body
       h1= message
   ```
4. Render the template:
   ```js
   app.get('/home', (req, res) => {
     res.render('index', { title: 'Home Page', message: 'Welcome to Express' });
   });
   ```

### 12. **Using Environment Variables**

It's a best practice to store configuration (e.g., port, API keys) in environment variables.

```js
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

---

### Putting It All Together: Simple Express App

```js
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Route to serve the home page
app.get('/', (req, res) => {
  res.send('Welcome to Express');
});

// Route with a dynamic parameter
app.get('/users/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

// Route with query parameters
app.get('/search', (req, res) => {
  res.send(`Search query: ${req.query.q}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

This covers the **basics of Express.js**, from setting up routes and middleware to handling errors and sending responses. With this foundation, you can build more complex applications! Let me know if you want to dive deeper into any specific topic.
