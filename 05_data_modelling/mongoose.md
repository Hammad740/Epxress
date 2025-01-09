To get started with Mongoose, the essential concepts you need for web development are:

### 1. **What is Mongoose?**

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It helps in interacting with MongoDB databases using schemas, models, and easy-to-use methods.

### 2. **Connecting to MongoDB**

First, connect your Node.js app to MongoDB using Mongoose.

```js
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/dbname', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
```

Replace `'mongodb://localhost:27017/dbname'` with your database URL.

### 3. **Schemas and Models**

In Mongoose, schemas define the structure of documents in MongoDB collections.

- **Schema**: Defines the shape and structure of a document.
- **Model**: Provides an interface to interact with the database.

Here’s an example of defining a schema and model:

```js
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0 },
  createdAt: { type: Date, default: Date.now },
});

const User = model('User', userSchema);
```

### 4. **CRUD Operations**

Mongoose simplifies CRUD operations (Create, Read, Update, Delete).

#### Create:

```js
const newUser = new User({
  name: 'Hammad',
  email: 'hammad@example.com',
  age: 25,
});

newUser
  .save()
  .then((user) => console.log(user))
  .catch((err) => console.log(err));
```

#### Read:

```js
User.find() // Get all users
  .then((users) => console.log(users));

User.findOne({ email: 'hammad@example.com' }) // Find a specific user
  .then((user) => console.log(user));
```

#### Update:

```js
User.updateOne({ email: 'hammad@example.com' }, { age: 26 }).then((result) =>
  console.log(result)
);
```

#### Delete:

```js
User.deleteOne({ email: 'hammad@example.com' }).then((result) =>
  console.log(result)
);
```

### 5. **Validations and Defaults**

Mongoose lets you enforce validations directly in the schema and set default values.

- `required`: Ensure a field is mandatory.
- `min`, `max`: Set value boundaries for numbers.
- `default`: Provide default values for fields.

Example:

```js
const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, min: 0 },
  inStock: { type: Boolean, default: true },
});
```

### 6. **Mongoose Middleware**

Middleware functions are executed before or after certain actions like saving, updating, etc.

For example, `pre` middleware for saving a user:

```js
userSchema.pre('save', function (next) {
  console.log('Before saving:', this);
  next();
});
```

### 7. **Population (References)**

If you want to reference documents from other collections (like in relational databases), use the `ref` keyword.

Example:

```js
const postSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
});

Post.find()
  .populate('author') // Populate with author details
  .then((posts) => console.log(posts));
```

### 8. **Query Helpers**

Mongoose has built-in methods to perform database queries like `find`, `findOne`, `findById`, `updateOne`, etc.

For example, chaining queries:

```js
User.find({ age: { $gte: 18 } }) // All users aged 18 or above
  .sort({ name: 1 }) // Sort by name
  .limit(10) // Limit results to 10
  .then((users) => console.log(users));
```

### 9. **Aggregation**

For complex queries like filtering, grouping, or calculating aggregates, Mongoose provides aggregation pipelines.

Example:

```js
User.aggregate([
  { $match: { age: { $gte: 18 } } },
  { $group: { _id: '$age', total: { $sum: 1 } } },
  { $sort: { total: -1 } },
]).then((result) => console.log(result));
```

### 10. **Indexes**

Indexes improve the performance of read operations. You can define indexes on schema fields:

```js
userSchema.index({ email: 1 }); // Index on email field
```

### Summary:

- **Connecting**: Use `mongoose.connect`.
- **Schemas**: Define document structure using `Schema`.
- **Models**: Interact with MongoDB through models.
- **CRUD**: Perform create, read, update, delete operations easily.
- **Validations**: Add validation and defaults in schemas.
- **Population**: Reference documents across collections.
- **Middleware**: Execute logic before/after actions.
- **Aggregation**: Perform complex queries using aggregation pipelines.
