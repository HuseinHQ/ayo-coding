const bcryptjs = require('bcryptjs');
const { User, Profile } = require('../models/');
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
            return res.redirect('/');
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
    res.render('register');
  }

  static registerPagePost(req, res) {
    const { username, email, password, fullName, birthDate, address, phone, profilePicture } = req.body;
    let fkForProfile;

    User.create({ username, email, password })
      .then((data) => {
        fkForProfile = data.id;

        return Profile.create({ fullName, birthDate, address, phone, profilePicture })
      })
      .then(() => {
        res.redirect('/login');
      })
      .catch(err => res.send(err));
  }
}

module.exports = UserController;