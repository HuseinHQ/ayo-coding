const UserController = require('./UserControler');
const CourseController = require('./CourseController');

class Controller {
  static landingPage(req, res) {
    console.log(req.session);
    res.render('landing')
  }
}

module.exports = { Controller, UserController, CourseController};