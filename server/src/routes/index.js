const express = require('express')
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const brandRouter = require('./brandRouter')
const categoryRouter = require('./categoryRouter')
const subCategoryRouter = require('./subCategoryRouter')

const router = new express.Router()

router.use('/auth', userRouter)
router.use('/products', productRouter)
router.use('/brands', brandRouter)
router.use('/categories', categoryRouter)
router.use('/subcategories', subCategoryRouter)

module.exports = router