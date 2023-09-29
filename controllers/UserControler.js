const bcryptjs = require('bcryptjs');
const { User, Profile, Course } = require('../models/');
const { Op } = require('sequelize');

class UserController {
  static loginPage(req, res) {
    const { err } = req.query;
    res.render('login', { err });
  }

  static loginPagePost(req, res) {
    const { username, password } = req.body;

    User.findOne({
      where: {
        username: { [Op.like]: username }
      }
    })
      .then(user => {
        const error = "Invalid username/password";

        if (user) {
          const isPasswordValid = bcryptjs.compareSync(password, user.password);

          if (isPasswordValid) {
            req.session.userId = user.id;
            req.session.role = user.role;
            return res.redirect(`/`);
          } else {
            return res.redirect(`/login?err=${error}`)
          }
        } else {
          return res.redirect(`/login?err=${error}`)
        }
      })
      .catch(er => res.send(err));
  }

  static registerPage(req, res) {
    const err = req.query.err
    res.render('register', { err });
  }

  static registerPagePost(req, res) {
    const { username, email, password, fullName, birthDate, address, phone, profilePicture } = req.body;
    let UserId;

    User.create({ username, email, password })
      .then((data) => {
        UserId = data.id;

        return Profile.create({ fullName, birthDate, address, phone, profilePicture, UserId })
      })
      .then(() => {
        res.redirect('/login');
      })
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          const error = err.errors.map(el => {
            if (el.message.includes('username')) {
              el.message = 'username sudah digunakan'
            } else {
              el.message = 'email sudah digunakan'
            }
            return el.message
          });
          res.redirect(`/register?err=${error}`)
        } else if (err.name = 'SequelizeValidationError') {
          const error = err.errors.map(el => el.message);

          User.destroy({
            where: { id: UserId }
          })
            .then(() => {
              res.redirect(`/register?err=${error}`)
            })
            .catch(err => console.log(err));
        } else {
          res.send(err)
        }
      });
  }

  static userProfilePage(req, res) {
    const userId = req.session.userId;
    const isLoggedIn = userId ? true : false
    const alert = req.query.alert

    User.findByPk(userId, {
      include: [Profile]
    })
      .then(data => {
        res.render('user', { data, isLoggedIn, userId, alert })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static myCourses(req, res) {
    const id = req.session.userId
    const role = req.session.role;
    const isLoggedIn = role ? true : false

    User.findByPk(id, {
      include: [Course]
    })
      .then(data => {
        res.render('mycourse', { data, role, isLoggedIn, userId: id });
      })
      .catch(err => {
        res.send(err);
      })
  }

  static editProfile(req, res) {
    const id = req.session.userId;
    const { username, email, fullName, birthDate, address, phone, profilePicture } = req.body;

    User.update({ username, email }, {
      where: { id }
    })
      .then(() => {
        return Profile.update({ fullName, birthDate, address, phone, profilePicture }, {
          where: { UserId: id }
        })
      })
      .then(() => {
        res.redirect(`/users/${id}?alert=Profile berhasil diupdate!`)
      })
      .catch(err => {
        if (err.name = 'SequelizeValidationError') {
          const error = err.errors.map(el => el.message);
          res.redirect(`/users/${id}?alert=${error}`)
        } else {
          res.send(err);
        }
      })
  }
}

module.exports = UserController;