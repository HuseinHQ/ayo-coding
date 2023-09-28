const UserController = require('./UserControler');
const CourseController = require('./CourseController');
const CategoryController = require('./CategoryController');

class Controller {
  static landingPage(req, res) {
    const isLoggedIn = req.session.userId ? true : false
    const role = req.session.role
    const userId = req.session.userId
    res.render('landing', { isLoggedIn, role, userId })
  }

  static logout(req, res) {
    req.session.destroy(err => {
      if (err) {
        res.send(err);
      } else {
        res.redirect('/login');
      }
    })
  }
}

module.exports = { Controller, UserController, CourseController, CategoryController };