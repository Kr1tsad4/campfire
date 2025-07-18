import React, { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [hideNavBar, setHideNavBar] = useState(false);

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
