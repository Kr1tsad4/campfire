import React, { createContext, useContext, useState, useEffect } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [hideNavBar, setHideNavBar] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768; 
    if (isMobile) {
      setHideNavBar(true);
    }
  }, []);

  const toggleSideNavBar = () => {
    setHideNavBar((prev) => !prev);
  };

  return (
    <NavigationContext.Provider value={{ hideNavBar, toggleSideNavBar }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationBar = () => {
  return useContext(NavigationContext);
};
