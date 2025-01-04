# Basic Authentication API

==========================

## Overview

---

This API provides basic authentication functionality using a simple token-based system. It allows users to sign up, sign in, and access protected routes.

## Endpoints

---

### Signup

- **POST /signup**
  - Request Body:
    - `userName`: string
    - `password`: string
  - Response:
    - `message`: string ("User registered Successfully!")

### Signin

- **POST /signin**
  - Request Body:
    - `userName`: string
    - `password`: string
  - Response:
    - `message`: string ("Sign in with Success")
    - `token`: string (generated token)

### Protected Route (Me)

- **GET /me**
  - Request Headers:
    - `Authorization`: string (token)
  - Response:
    - `message`: string ("User details")
    - `userName`: string
    - `password`: string (note: this is not recommended in a real-world application, as it exposes sensitive information)

## Token Generation

---

The `generateToken` function generates a random 32-character token using a combination of letters and numbers.

## Server

---

The server listens on port 3000.

## Notes

---

- This is a basic implementation and should not be used in production without proper security measures, such as hashing and salting passwords, and using a secure token generation algorithm.
- The `users` array is stored in memory and will be lost when the server restarts. In a real-world application, you would want to use a database to store user data.
