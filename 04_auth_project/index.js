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
    console.log('Error:', error.message);
  }
}

async function signIn() {
  const username = document.getElementById('signin-username').value;
  const password = document.getElementById('signin-password').value;

  try {
    const response = await axios.post('http://localhost:3000/signin', {
      username,
      password,
    });
    localStorage.setItem('token', response.data.token);
    alert('User signed in successfully!');
  } catch (error) {
    console.log('Error:', error.message);
  }
}
