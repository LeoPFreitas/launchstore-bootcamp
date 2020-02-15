const Cart = require("../../lib/cart");

const LoadProductsService = require("../services/LoadProductService");

module.exports = {
  async index(req, res) {
    try {
      // pegar carrinho da sessão
      let { cart } = req.session;

      // atualizar carrinho
      cart = Cart.init(cart);

      return res.render("cart/index", { cart });
    } catch (err) {
      console.error(err);
    }
  },
  async addOne(req, res) {
    // pegar o id (produto) e o produto
    const { id } = req.params;

    const product = await LoadProductsService.load("product", {
      where: { id: id }
    });

    // pegar o carrinho da sessão
    let { cart } = req.session;

    // adicionar o produto ao carrinho (utilizar nosso gerencidor de carrinho)
    cart = Cart.init(cart).addOne(product);

    // atualizar nosso carrinho da sessão
    req.session.cart = cart;

    // redirecionar o usuario para a tela do carrinho
    return res.redirect("/cart");
  },
  removeOne(req, res) {
    // pegar id do produto
    let { id } = req.params;

    // pegar o carrinho da sessão
    let { cart } = req.session;

    // se não tiver carrinho, retorna
    if (!cart) return res.redirect("/cart");

    // iniciar o carrinho (gerenciado de carrinho)
    cart = Cart.init(cart).removeOne(id);

    // atulizar o carrinho removendo um item
    req.session.cart = cart;

    // redireciona para pagina cart
    return res.redirect("/cart");
  },
  delete(req, res) {

    let { id } = req.params;
    let { cart } = req.session;

    if (!cart) return;

    cart = Cart.init(cart).delete(id);

    req.session.cart = cart;
    return res.redirect('/cart')
  }
};
