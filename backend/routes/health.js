const express = require('express');
const router = express.Router();
const {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
  getDoctors,
  addDoctor,
  getDoctorById
} = require('../controllers/healthController');

// Appointment routes
router.get('/appointments', getAppointments);
router.post('/appointments', createAppointment);
router.patch('/appointments/:id/status', updateAppointmentStatus);

// Doctor routes
router.get('/doctors', getDoctors);
router.post('/doctors', addDoctor);
router.get('/doctors/:uniqueId', getDoctorById);

module.exports = router;