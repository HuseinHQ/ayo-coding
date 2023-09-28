const { Category, Course } = require('../models/')

class CategoryController {
  static categoryPage(req, res) {
    Category.findAll({
      include: [Course]
    })
      .then(data => {
        const isLoggedIn = req.session.userId ? true : false
        const role = req.session.role
        const userId = req.session.userId
        res.render('category', { data, isLoggedIn, role, userId });
      })
      .catch(err => console.log(err));
  }
}

module.exports = CategoryController;