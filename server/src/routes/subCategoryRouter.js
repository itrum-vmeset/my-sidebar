const Router = require('express')
const subCategoryController = require('../controllers/subCategoryController')

const router = new Router()

router.get('/', subCategoryController.getAll)
router.post('/', subCategoryController.create)

module.exports = router