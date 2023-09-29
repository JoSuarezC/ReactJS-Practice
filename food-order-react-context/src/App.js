import { useCallback, useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import { CartProvider } from './context/cart-provider';

function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  const toggleCart = useCallback(() => {
    setIsCartShown((prev) => !prev);
  }, [setIsCartShown]);

  return (
    <CartProvider>
      {isCartShown && <Cart toggleCart={toggleCart} />}
      <Header toggleCart={toggleCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
