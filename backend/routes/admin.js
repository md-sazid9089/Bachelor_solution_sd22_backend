const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');

// Admin login (no auth required)
router.post('/login', adminController.adminLogin);

// Protected admin routes (require admin auth)
router.get('/dashboard', adminAuth, adminController.getDashboardStats);
router.get('/users', adminAuth, adminController.getAllUsers);
router.post('/users', adminAuth, adminController.createUser);
router.put('/users/:id', adminAuth, adminController.updateUser);
router.delete('/users/:id', adminAuth, adminController.deleteUser);

router.get('/appointments', adminAuth, adminController.getAllAppointments);
router.post('/appointments', adminAuth, adminController.createAppointment);
router.put('/appointments/:id', adminAuth, adminController.updateAppointment);
router.put('/appointments/:id/status', adminAuth, adminController.updateAppointmentStatus);
router.delete('/appointments/:id', adminAuth, adminController.deleteAppointment);

router.get('/properties', adminAuth, adminController.getAllProperties);
router.post('/properties', adminAuth, adminController.createProperty);
router.put('/properties/:id', adminAuth, adminController.updateProperty);
router.delete('/properties/:id', adminAuth, adminController.deleteProperty);

router.get('/shops', adminAuth, adminController.getAllShops);
router.post('/shops', adminAuth, adminController.createShop);
router.put('/shops/:id', adminAuth, adminController.updateShop);
router.delete('/shops/:id', adminAuth, adminController.deleteShop);

router.get('/maids', adminAuth, adminController.getAllMaids);
router.post('/maids', adminAuth, adminController.createMaid);
router.put('/maids/:id', adminAuth, adminController.updateMaid);
router.delete('/maids/:id', adminAuth, adminController.deleteMaid);

router.get('/hacks', adminAuth, adminController.getAllHacks);
router.post('/hacks', adminAuth, adminController.createHack);
router.put('/hacks/:id', adminAuth, adminController.updateHack);
router.delete('/hacks/:id', adminAuth, adminController.deleteHack);

router.get('/doctors', adminAuth, adminController.getAllDoctors);
router.post('/doctors', adminAuth, adminController.createDoctor);
router.put('/doctors/:id', adminAuth, adminController.updateDoctor);
router.delete('/doctors/:id', adminAuth, adminController.deleteDoctor);

router.get('/content', adminAuth, adminController.getContentStats);

module.exports = router;