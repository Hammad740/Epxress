const { default: axios } = require('axios');

async function signUp() {
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;

  try {
    await axios.post('http://localhost:3000/signup', {
      username,
      password,
    });
    alert('User registered successfully!');
  } catch (error) {
    console.log(error.message);
  }
}
async function signIn() {}
