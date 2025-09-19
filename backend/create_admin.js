const axios = require('axios');

async function createAdminUser() {
  try {
    const adminData = {
      name: 'Admin User',
      email: 'sazid.cse.20230104062@aust.edu',
      phone: '+8801234567890',
      password: 'admin123'  // You can change this password
    };

    console.log('Creating admin user...');
    const response = await axios.post('http://localhost:5000/api/auth/register', adminData);
    
    console.log('✅ Admin user created successfully!');
    console.log('Admin Login Credentials:');
    console.log('Email:', adminData.email);
    console.log('Password:', adminData.password);
    console.log('Admin Panel URL: http://localhost:3000/admin');
    
  } catch (error) {
    if (error.response && error.response.status === 400 && error.response.data.message.includes('already exists')) {
      console.log('ℹ️  Admin user already exists!');
      console.log('Admin Login Credentials:');
      console.log('Email: sazid.cse.20230104062@aust.edu');
      console.log('Password: admin123');
      console.log('Admin Panel URL: http://localhost:3000/admin');
    } else {
      console.error('Error creating admin user:', error.response?.data || error.message);
    }
  }
}

createAdminUser();