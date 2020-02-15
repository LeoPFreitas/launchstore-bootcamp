const { formatPrice } = require("./utils");

const Cart = {
  // pegar o carrinho da session e colocar no objeto
  init(oldCart) {
    if (oldCart) {
      this.items = oldCart.items;
      this.total = oldCart.total;
    } else {
      this.items = [];
      this.total = {
        quantity: 0,
        price: 0,
        formattedPrice: formatPrice(0)
      };
    }
    return this;
  },
  addOne(product) {
    // ver se o produto existe no carrinho
    let inCart = this.getCartItem(product.id);

    //se não existir, adicionar
    if (!inCart) {
      inCart = {
        product: {
          ...product,
          formattedPrice: formatPrice(product.price)
        },
        quantity: 0,
        price: 0,
        formattedPrice: formatPrice(0)
      };

      this.items.push(inCart);
    }

    // verifica se no carrinho existe mais items que o disponível
    if (inCart.quantity >= product.quantity) return this;

    // atualizar o item produto
    inCart.quantity++;
    inCart.price = inCart.product.price * inCart.quantity;
    inCart.formattedPrice = formatPrice(inCart.price);

    // atualizar carrinho
    this.total.quantity++;
    this.total.price += inCart.product.price;
    this.total.formattedPrice = formatPrice(this.total.price);

    return this;
  },
  removeOne(productId) {
    // pegar item do carrinho
    const inCart = this.getCartItem(productId);

    // se não tiver retorna
    if (!inCart) return this;

    // atulizar o item
    inCart.quantity--;
    inCart.price = inCart.product.price * inCart.quantity;
    inCart.formattedPrice = formatPrice(inCart.price);

    // atualizar o carrinho
    this.total.quantity--;
    this.total.price -= inCart.product.price;
    this.total.formattedPrice = formatPrice(this.total.price);

    // remover do carrinho se tiver <= 0
    if (inCart.quantity < 1) {
      this.items = this.items.filter(
        item => item.product.id != inCart.product.id
      );
      return this;
    }

    return this;
  },
  delete(productId) {
    const inCart = this.getCartItem(productId);

    if (!inCart) return this;

    // verificar se existe item realmente no carrinho
    if (this.items.length > 0) {
      this.total.quantity -= inCart.quantity;
      this.total.price -= inCart.product.price * inCart.quantity;
      this.total.formattedPrice = formatPrice(this.total.price);
    }

    // remover item da lista
    // o fitler vai pegar todos os que forem diferente do product.id
    this.items = this.items.filter(
      item => inCart.product.id != item.product.id
    );
    return this;
  },
  getCartItem(productId) {
    return this.items.find(item => item.product.id == productId);
  }
};

module.exports = Cart;
