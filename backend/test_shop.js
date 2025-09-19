const axios = require('axios');

const shops = [
  {
    name: "Dhaka Grocery Center",
    category: "grocery",
    distance: "0.2 km",
    rating: 4.5,
    contact: "+880 1711 123456",
    address: "12 Mirpur Road, Dhanmondi",
    hours: "7:00 AM - 11:00 PM"
  },
  {
    name: "Arogya Pharmacy",
    category: "pharmacy",
    distance: "0.5 km",
    rating: 4.3,
    contact: "+880 1911 654321",
    address: "45 Health Avenue, Uttara",
    hours: "24/7"
  },
  {
    name: "Bengal Spice Restaurant",
    category: "restaurant",
    distance: "0.3 km",
    rating: 4.7,
    contact: "+880 1811 987654",
    address: "78 Food Street, Banani",
    hours: "11:00 AM - 11:00 PM"
  },
  {
    name: "Fashion House BD",
    category: "clothing",
    distance: "0.8 km",
    rating: 4.2,
    contact: "+880 1611 112233",
    address: "32 Style Road, Gulshan",
    hours: "10:00 AM - 9:00 PM"
  },
  {
    name: "Daily Needs Store",
    category: "grocery",
    distance: "1.0 km",
    rating: 4.1,
    contact: "+880 1511 445566",
    address: "65 Market Lane, Mohakhali",
    hours: "7:00 AM - 10:00 PM"
  },
  {
    name: "Cafe Dhaka",
    category: "restaurant",
    distance: "0.4 km",
    rating: 4.6,
    contact: "+880 1711 778899",
    address: "98 Coffee Lane, Dhanmondi",
    hours: "8:00 AM - 10:00 PM"
  }
];

async function seedShops() {
  for (const shop of shops) {
    try {
      const res = await axios.post('http://localhost:5000/api/shops', shop);
      console.log('Added:', res.data.name);
    } catch (err) {
      console.error('Error adding shop:', shop.name, {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
        code: err.code
      });
    }
  }
}

seedShops();