import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const [test, setTest] = useState('nav');

  const navigateHandler = () => {
    //navigate('products');
    setTest('test');

  };

  return (
    <div>
      Home
      <Link to='products'>Products</Link>
      <button onClick={navigateHandler}>Selected {test}</button>
    </div>
  );
};
