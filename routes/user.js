const { UserController } = require('../controllers/Controller');
const router = require('express').Router();

router.use((req, res, next) => {
  if (!req.session.userId) {
    const error = 'Please login first'
    res.redirect(`/login?err=${error}`);
  } else {
    next();
  }
})

router.get('/:id', UserController.userProfilePage);
router.get('/:id/courses', UserController.myCourses)
router.post('/:id/edit', UserController.editProfile)

module.exports = router;