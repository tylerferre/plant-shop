const express = require('express')
const productRouter = express.Router()
const Product = require('../models/Product')

//GET 
productRouter.get('/', async (req, res, next) => {
    try {
        const products = await Product.find()
        return res.status(200).send(products)
    } catch (err) {
        res.status(500)
        return next(err)
    }
});

//Post
productRouter.post(
    '/',
    async (req, res, next) => {
        try {
            const newProduct = Product(req.body)
            const savedProduct = newProduct.save()
            await savedProduct
            return res.status(201).send(savedProduct)
        } catch (err) {
            res.status(500)
            return next(err)
        }
    }
)

//Search by product
productRouter.get('/search/product', async (req, res, next) => {
    try {
        const {product} = req.query
        const pattern = new RegExp(product)
        const products = await Product.find({title: {$regex: pattern, $options: 'i'}})
        return res.status(200).send(products)
    } catch (err) {
        res.status(500)
        return next(err)
    }
}) 

//Filter by inStock
productRouter.get(`/filter`, async (req, res, next) => {
    try {
        const products = await Product.find({inStock: req.query.inStock})
        return res.status(200).send(products)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

module.exports = productRouter