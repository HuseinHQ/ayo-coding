const router = require('express').Router();
const { Controller, UserController } = require('../controllers/Controller');

// REGISTER
router.get('/register', UserController.registerPage);
router.post('/register', UserController.registerPagePost);

// LOGIN
router.get('/login', UserController.loginPage);
router.post('/login', UserController.loginPagePost);
const courseRoutes = require('./course');

// CHECK IF SESSION EXISTS
router.use((req, res, next) => {
  if (!req.session.userId) {
    const error = 'Please login first'
    res.redirect(`/login?err=${error}`);
  } else {
    next();
  }
})

//LANDING PAGE
router.get('/', Controller.landingPage);
router.use('/courses', courseRoutes);

module.exports = router;