const Category = require('../models/Category')
const Product = require('../models/Product')

const { formatPrice } = require('../../lib/utils')

module.exports = {
  create(req, res) {
    //pegar categorias 
    Category.all().then(function (results) {

      const categories = results.rows

      return res.render('products/create.njk', { categories })

    }).catch(function (err) {
      throw new Error(err)
    })

  },
  // Melhor forma de trabalhar --> async await
  async post(req, res) {
    // salvar categorias
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send('Please, fill all fields!')
      }
    }

    let results = await Product.create(req.body)
    const productId = results.rows[0].id

    return res.redirect(`/products/${productId}`)

  },
  async edit(req, res) {

    // nova forma de trabalhar com promisses
    // ele para aqui esperando o await para prosseguir
    let results = await Product.find(req.params.id)
    const product = results.rows[0]

    if (!product) return res.send("Peoduct not found!")

    product.price = formatPrice(product.price)
    product.old_price = formatPrice(product.old_price)

    results = await Category.all()
    const categories = results.rows

    return res.render("products/edit.njk", { product, categories })

  },
  async put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send('Please, fill all fields!')
      }
    }

    req.body.price = req.body.price.replace(/\D/g,"")
    
    // Atualizar o old_price
    if (req.body.old_price != req.body.price ){
      const oldProduct = await Product.find(req.body.id)
      req.body.old_price = oldProduct.rows[0].price
    }

    await Product.update(req.body)

    return res.redirect(`/products/${req.body.id}/edit`)

  },
  async delete(req, res){
    await Product.delete(req.body.id)

    return res.redirect('/products/create')
  }
}