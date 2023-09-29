import React from 'react';
import MainNavigation from '../components/MainNavigation';

export const Error = () => {
  return (
    <>
      <MainNavigation />
      <h1>An error ocurred!</h1>
      <p>Cannot find the page</p>
    </>
  );
};
