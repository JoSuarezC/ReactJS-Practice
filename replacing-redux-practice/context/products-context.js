import React, { useContext, useState } from 'react';

const initialState = {
  products: [
    {
      id: 'p1',
      title: 'Red Scarf',
      description: 'A pretty red scarf.',
      isFavorite: false,
    },
    {
      id: 'p2',
      title: 'Blue T-Shirt',
      description: 'A pretty blue t-shirt.',
      isFavorite: false,
    },
    {
      id: 'p3',
      title: 'Green Trousers',
      description: 'A pair of lightly green trousers.',
      isFavorite: false,
    },
    {
      id: 'p4',
      title: 'Orange Hat',
      description: 'Street style! An orange hat.',
      isFavorite: false,
    },
  ],
};

const ProductsContext = React.createContext({
  products: [],
  toggleFavorite: (productId) => {},
});

export const useProductsContext = () => {
  return useContext(ProductsContext);
};

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(initialState);

  const toggleFavorite = (productId) => {
    setProducts((prev) => {
      const prodIndex = prev.findIndex((p) => p.id === productId);
      const newFavStatus = !prev[prodIndex].isFavorite;
      const updatedProducts = [...prev];
      updatedProducts[prodIndex] = {
        ...prev[prodIndex],
        isFavorite: newFavStatus,
      };
      return updatedProducts;
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        toggleFavorite,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
