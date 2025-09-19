const axios = require('axios');

const maids = [
  {
    name: "Shabnam Akter",
    services: ["cleaning", "laundry"],
    hourlyRate: 150,
    rating: 4.8,
    contact: "+880 1711 123456",
    experience: "5 years",
    availability: "Sat-Thu, 9 AM - 6 PM",
    description: "Experienced in maintaining clean and organized homes in Dhaka. Punctual and trustworthy."
  },
  {
    name: "Rokeya Begum",
    services: ["cooking", "cleaning"],
    hourlyRate: 200,
    rating: 4.9,
    contact: "+880 1911 654321",
    experience: "8 years",
    availability: "Daily, 7 AM - 2 PM",
    description: "Expert cook specializing in Bangladeshi cuisine. Also provides cleaning services."
  },
  {
    name: "Munni Khatun",
    services: ["babysitting", "cleaning"],
    hourlyRate: 180,
    rating: 4.6,
    contact: "+880 1811 987654",
    experience: "3 years",
    availability: "Flexible timings",
    description: "Caring and responsible babysitter with experience in child care and light housekeeping in Bangladesh."
  }
];

async function seedMaids() {
  for (const maid of maids) {
    try {
  const res = await axios.post('http://localhost:5000/api/maids', maid);
      console.log('Added:', res.data.name);
    } catch (err) {
      console.error('Error adding maid:', maid.name, err.response?.data || err.message);
    }
  }
}

seedMaids();
