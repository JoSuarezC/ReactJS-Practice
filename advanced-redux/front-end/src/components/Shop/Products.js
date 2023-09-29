import ProductItem from './ProductItem';
import classes from './Products.module.css';

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
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            {...product}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
