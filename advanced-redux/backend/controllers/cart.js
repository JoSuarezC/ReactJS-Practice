let CART_PRODUCTS = [];

exports.updateCart = (req, res, next) => {
  CART_PRODUCTS = req.body.cart;
  return res.status(200).json({
    message: 'Cart Updated',
    cart_products: CART_PRODUCTS,
  });
};

exports.getCart = (req, res, next) => {
  return res.status(200).json({
    message: 'Fetched Cart',
    cart_products: CART_PRODUCTS,
  });
}