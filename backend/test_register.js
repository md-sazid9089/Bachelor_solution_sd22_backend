const axios = require('axios');

async function testRegister() {
  try {
  const res = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'Test User',
      email: 'testuser@example.com',
      phone: '1234567890',
      password: 'password123'
    });
    console.log('Response:', res.data);
  } catch (err) {
    if (err.response) {
      console.error('Error:', err.response.data);
    } else {
      console.error('Error:', err.message);
    }
  }
}

testRegister();
