const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')

// import routes
const users = require('./users')
const products = require('./products')


routes.get('/', HomeController.index)

routes.use('/products', products)
routes.use('/users', users)

// ALIAS
routes.get('/ads/create', function(req, res){
    return res.redirect("/products/create")
})

module.exports = routes

