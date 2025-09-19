const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');
require('dotenv').config();

const doctors = [
  {
    uniqueId: 'DOC001RH',
    name: 'Dr. Rashida Hasan',
    specialty: 'general',
    rating: 4.8,
    experience: '10 years',
    education: 'MBBS - Dhaka Medical College Hospital (DMCH)',
    location: 'Square Hospitals Ltd, Dhanmondi, Dhaka',
    availability: 'Sat-Thu 9AM-5PM',
    contact: '+880 1711 234567',
    email: 'dr.rashida@squarehospital.com',
    description: 'Experienced general practitioner specializing in family medicine and preventive care. Expert in treating common illnesses in Bangladesh.'
  },
  {
    uniqueId: 'DOC002AK',
    name: 'Dr. Abdul Karim',
    specialty: 'cardiology',
    rating: 4.9,
    experience: '15 years',
    education: 'MBBS, MD (Cardiology) - Bangabandhu Sheikh Mujib Medical University (BSMMU)',
    location: 'National Institute of Cardiovascular Diseases (NICVD), Sher-E-Bangla Nagar',
    availability: 'Sun-Thu 10AM-4PM',
    contact: '+880 1911 345678',
    email: 'dr.karim@nicvd.gov.bd',
    description: 'Leading cardiologist with expertise in interventional cardiology and heart disease prevention. Specialist in treating cardiovascular conditions common in South Asia.'
  },
  {
    uniqueId: 'DOC003SA',
    name: 'Dr. Sultana Akter',
    specialty: 'dermatology',
    rating: 4.7,
    experience: '8 years',
    education: 'MBBS, DDV - Sir Salimullah Medical College (SSMC)',
    location: 'Ibn Sina Hospital, Dhanmondi, Dhaka',
    availability: 'Sat-Wed 9AM-3PM',
    contact: '+880 1811 456789',
    email: 'dr.sultana@ibnsinahospital.com',
    description: 'Dermatologist specializing in tropical skin conditions, acne treatment, and traditional skin care methods suitable for Bangladesh climate.'
  },
  {
    uniqueId: 'DOC004MR',
    name: 'Dr. Mohammad Rahman',
    specialty: 'psychiatry',
    rating: 4.6,
    experience: '12 years',
    education: 'MBBS, MPhil (Psychiatry) - National Institute of Mental Health (NIMH)',
    location: 'National Institute of Mental Health, Sher-E-Bangla Nagar, Dhaka',
    availability: 'Sat-Thu 11AM-7PM',
    contact: '+880 1611 567890',
    email: 'dr.rahman@nimh.gov.bd',
    description: 'Psychiatrist with expertise in anxiety, depression, and stress management therapy. Specialized in mental health issues common in urban Bangladesh.'
  },
  {
    uniqueId: 'DOC005NK',
    name: 'Dr. Nasir Khan',
    specialty: 'orthopedic',
    rating: 4.8,
    experience: '14 years',
    education: 'MBBS, MS (Orthopedics) - Chittagong Medical College',
    location: 'Dhaka Orthopedic & Trauma Hospital, Panthapath, Dhaka',
    availability: 'Sun-Thu 8AM-4PM',
    contact: '+880 1511 678901',
    email: 'dr.nasir@orthohospital.com',
    description: 'Orthopedic surgeon specializing in joint replacement, trauma surgery, and sports injury treatment common in Bangladesh.'
  },
  {
    uniqueId: 'DOC006ZI',
    name: 'Dr. Zakir Islam',
    specialty: 'general',
    rating: 4.5,
    experience: '6 years',
    education: 'MBBS - Rajshahi Medical College',
    location: 'United Hospital Limited, Gulshan, Dhaka',
    availability: 'Sat-Wed 10AM-6PM',
    contact: '+880 1411 789012',
    email: 'dr.zakir@unitedhospital.com',
    description: 'Family medicine doctor focusing on comprehensive primary care for all ages with understanding of local health patterns in Bangladesh.'
  },
  {
    uniqueId: 'DOC007FN',
    name: 'Dr. Farhana Nasreen',
    specialty: 'gynecology',
    rating: 4.9,
    experience: '11 years',
    education: 'MBBS, FCPS (Gynecology & Obstetrics) - Bangladesh College of Physicians & Surgeons',
    location: 'Birdem General Hospital, Shahbagh, Dhaka',
    availability: 'Sat-Thu 9AM-5PM',
    contact: '+880 1311 890123',
    email: 'dr.farhana@birdem.org.bd',
    description: 'Gynecologist specializing in women\'s reproductive health, prenatal care, and maternal health issues specific to Bangladeshi women.'
  },
  {
    uniqueId: 'DOC008TA',
    name: 'Dr. Tariq Ahmed',
    specialty: 'pediatrics',
    rating: 4.7,
    experience: '9 years',
    education: 'MBBS, DCH - Bangladesh Institute of Child Health (BICH)',
    location: 'Shishu Hospital & Institute, Sher-E-Bangla Nagar, Dhaka',
    availability: 'Sat-Thu 8AM-6PM',
    contact: '+880 1211 901234',
    email: 'dr.tariq@shishuhospital.org',
    description: 'Pediatrician with expertise in child development, vaccinations, malnutrition, and common childhood diseases in Bangladesh.'
  },
  {
    uniqueId: 'DOC009SK',
    name: 'Dr. Salma Khatun',
    specialty: 'general',
    rating: 4.6,
    experience: '7 years',
    education: 'MBBS - Mymensingh Medical College',
    location: 'Popular Medical Centre, Dhanmondi, Dhaka',
    availability: 'Sat-Thu 10AM-8PM',
    contact: '+880 1111 012345',
    email: 'dr.salma@popularmedical.com',
    description: 'Local general practitioner with deep understanding of community health needs and tropical diseases prevalent in Bangladesh.'
  },
  {
    uniqueId: 'DOC010RA',
    name: 'Dr. Rubina Alam',
    specialty: 'dermatology',
    rating: 4.8,
    experience: '5 years',
    education: 'MBBS, DDV - Sylhet MAG Osmani Medical College',
    location: 'Labaid Specialized Hospital, Dhanmondi, Dhaka',
    availability: 'Sun-Thu 9AM-4PM',
    contact: '+880 1011 123456',
    email: 'dr.rubina@labaidgroup.com',
    description: 'Young dermatologist specializing in skin conditions common in humid climate, traditional skin care methods, and modern dermatological treatments.'
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

async function seedDoctors() {
  try {
    // Clear existing doctors
    await Doctor.deleteMany({});
    console.log('Cleared existing doctors');

    // Insert new doctors (remove contact, email, description fields to match model)
    const doctorData = doctors.map(doctor => ({
      uniqueId: doctor.uniqueId,
      name: doctor.name,
      specialty: doctor.specialty,
      rating: doctor.rating,
      experience: doctor.experience,
      education: doctor.education,
      location: doctor.location,
      availability: doctor.availability
    }));

    const savedDoctors = await Doctor.insertMany(doctorData);
    console.log(`Added ${savedDoctors.length} doctors successfully`);
    
    // Display the doctors
    savedDoctors.forEach(doctor => {
      console.log(`- Dr. ${doctor.name} (${doctor.uniqueId}) - ${doctor.specialty}`);
    });
    
  } catch (error) {
    console.error('Error seeding doctors:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDoctors();