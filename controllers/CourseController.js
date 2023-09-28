const { Course, UserCourse, Profile, Category } = require('../models/')
const { intToRupiah } = require('../helpers/helper');
const profile = require('../models/profile');
const { Op } = require('sequelize');

class CourseController {
  static coursePage(req, res) {
    const role = req.session.role;
    const isLoggedIn = role ? true : false;
    const userId = req.session.userId;
    const search = req.query.search;
    const alert = req.query.alert;

    let option = {
      where: {}
    }
    if (search) {
      option.where.title = { [Op.iLike]: `%${search}%` }
    }

    Course.findAll(option)
      .then(data => {
        res.render('courses', { data, isLoggedIn, role, userId, alert });
      })
      .catch(err => res.send(err));
  }

  static courseDetailPage(req, res) {
    const { id } = req.params;
    const role = req.session.role;
    const isLoggedIn = role ? true : false;
    const userId = req.session.userId;

    console.log(id);
    Course.findByPk(id)
      .then(data => {
        res.render('course-detail', { data, role, isLoggedIn, userId, intToRupiah });
      })
      .catch(err => res.send(err));
  }

  static courseBuy(req, res) {
    const UserId = req.session.userId
    const CourseId = +req.params.id

    UserCourse.findOne({
      where: { UserId, CourseId }
    })
      .then(data => {
        console.log(data);
        if (data) {
          const alert = 'Kamu sudah memiliki kelas ini'
          res.redirect(`/courses/${CourseId}?alert=${alert}`)
        } else {
          UserCourse.create({ UserId, CourseId })
            .then(() => {
              return Profile.update({ isMember: true }, {
                where: { UserId }
              })
            })
            .then(() => {
              const success = 'Berhasil membeli kelas'
              res.redirect(`/courses/${CourseId}?alert=${success}`)
            })
            .catch(err => res.send(err))
        }
      })
      .catch(err => res.send(err));

  }

  static editCoursePage(req, res) {
    const id = req.params.id
    let category;
    const isLoggedIn = req.session.userId ? true : false
    const userId = req.session.userId

    Category.findAll()
      .then(data => {
        category = data;

        return Course.findByPk(id)
      })
      .then(data => {
        res.render('edit-course', { data, category, isLoggedIn, userId })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static editCourse(req, res) {
    const { title, description, price, thumbnail, CategoryId } = req.body;
    const id = req.params.id

    Course.update({ title, description, price, thumbnail, CategoryId }, {
      where: { id }
    })
      .then(() => {
        res.redirect('/courses?alert=Course berhasil diedit')
      })
      .catch(err => {
        res.send(err);
      })
  }

  static deleteCourse(req, res) {
    const id = req.params.id;

    Course.destroy({
      where: { id }
    })
      .then(() => {
        res.redirect('/courses?alert=Course berhasil dihapus')
      })
      .catch(err => {
        res.send(err);
      })
  }
}

module.exports = CourseController;