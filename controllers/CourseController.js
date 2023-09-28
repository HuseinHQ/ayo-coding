const { Course } = require('../models/')

class CourseController {
  static coursePage(req, res) {
    Course.findAll()
      .then(data => {
        res.render('courses', { data });
      })
      .catch(err => res.send(err));
  }

  static courseDetailPage(req, res) {
    const { id } = req.query;

    Course.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => res.send(err));
  }
}

module.exports = CourseController;