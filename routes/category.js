const { CategoryController } = require('../controllers/Controller');
const router = require('express').Router();

router.get('/', CategoryController.categoryPage);

module.exports = router;