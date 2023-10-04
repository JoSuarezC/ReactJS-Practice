import React from 'react';
//import { useSelector } from 'react-redux';

import ProductItem from '../components/Products/ProductItem';
import './Products.css';
import { useProductsContext } from '../../context/products-context';

const Products = props => {
  const { products: productList } = useProductsContext();//useSelector(state => state.shop.products);
  
  return (
    <ul className="products-list">
      {productList.map(prod => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
