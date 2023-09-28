const router = require('express').Router();
const { Controller, UserController } = require('../controllers/Controller');
const courseRoutes = require('./course');
const categoyRoutes = require('./category');
const userRoutes = require('./user');

// REGISTER
router.get('/register', UserController.registerPage);
router.post('/register', UserController.registerPagePost);

// LOGIN
router.get('/login', UserController.loginPage);
router.post('/login', UserController.loginPagePost);

// LOGOUT
router.get('/logout', Controller.logout);

//LANDING PAGE
router.get('/', Controller.landingPage);
router.use('/courses', courseRoutes);
router.use('/categories', categoyRoutes);
router.use('/users', userRoutes)

module.exports = router;