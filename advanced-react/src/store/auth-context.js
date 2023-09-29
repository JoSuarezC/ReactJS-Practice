import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
});

const IS_LOGGED_IN_TOKEN = 'isLoggedIn';

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem(IS_LOGGED_IN_TOKEN);
    isLoggedIn && setIsLoggedIn(isLoggedIn);
  }, [])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    localStorage.setItem(IS_LOGGED_IN_TOKEN, true)
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem(IS_LOGGED_IN_TOKEN);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler,
      onLogin: loginHandler,
    }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContext;
