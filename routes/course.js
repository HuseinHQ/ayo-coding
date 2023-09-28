const { CourseController } = require('../controllers/Controller');
const router = require('express').Router();

// CHECK IF USER LOGGED IN OR NOT
const logged = (req, res, next) => {
  if (!req.session.userId) {
    const error = 'Mohon login dahulu'
    res.redirect(`/login?err=${error}`);
  } else {
    next();
  }
}

const isAdmin = (req, res, next) => {
  if (req.session.role === 'admin') {
    next();
  } else {
    const error = 'Hanya admin yang bisa akses'
    res.redirect(`/login?err=${error}`);
  }
}

router.get('/', CourseController.coursePage);
router.get('/:id', CourseController.courseDetailPage);
router.get('/:id/buy', logged, CourseController.courseBuy)
router.get('/:id/edit', isAdmin, CourseController.editCoursePage);
router.post('/:id/edit', isAdmin, CourseController.editCourse);
router.get('/:id/delete', isAdmin, CourseController.deleteCourse);

module.exports = router;