const Router = require('express')
const categoryController = require('../controllers/categoryController')

const router = new Router()

router.get('/', categoryController.getAll)
router.post('/', categoryController.create)
// router.put('/', categoryController.update)
router.delete('/:id', categoryController.delete)

module.exports = router