const Router = require('express')
const productController = require('../controllers/productController')

const router = new Router()

router.get('/products', productController.getAll)
router.get('/products:id', productController.getOne)
router.post('/create', productController.create)

module.exports = router