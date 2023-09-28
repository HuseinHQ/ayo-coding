const { CourseController } = require('../controllers/Controller');
const router = require('express').Router();

router.get('/', CourseController.coursePage);
router.get('/:id', CourseController.courseDetailPage);
router.get('/:id/edit');
router.post('/:id/edit');
router.get('/:id/delete');

module.exports = router;