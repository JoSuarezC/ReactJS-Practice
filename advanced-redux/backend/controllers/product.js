const PRODUCTS = [
  {
    id: 'p1',
    title: 'Book',
    price: 6,
    description: 'First book',
  },
  {
    id: 'p2',
    title: 'Laptop',
    price: 20,
    description: 'First laptop',
  },
];

exports.getProducts = (req, res, next) => {
  return res.status(200).json({
    message: 'Fetched products successfully',
    products: PRODUCTS,
  });
};

