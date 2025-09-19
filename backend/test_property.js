const axios = require('axios');

const properties = [
  {
    title: "Cozy Studio Apartment",
    rent: 12000,
    location: "Dhanmondi",
    type: "Studio",
    beds: 1,
    baths: 1,
    contact: "+880 1711 123456",
    description: "Perfect for students and working professionals in Dhaka. Fully furnished with modern amenities."
  },
  {
    title: "Spacious 2BHK",
    rent: 18000,
    location: "Uttara",
    type: "2BHK",
    beds: 2,
    baths: 2,
    contact: "+880 1911 654321",
    description: "Ideal for sharing with roommates. Close to shopping malls and transport."
  },
  {
    title: "Budget-Friendly Mess",
    rent: 8000,
    location: "Mirpur",
    type: "Mess",
    beds: 1,
    baths: 1,
    contact: "+880 1811 987654",
    description: "Affordable accommodation with meals included. Great for students."
  }
];

async function seedProperties() {
  for (const property of properties) {
    try {
      const res = await axios.post('http://localhost:5000/api/properties', property);
      console.log('Added:', res.data.title);
    } catch (err) {
      console.error('Error adding property:', property.title, {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
        code: err.code
      });
    }
  }
}

seedProperties();
