import { useState, useContext } from "react";

export const useNavigationBar = () => {
  const [hideNavBar, setHideNavBar] = useState(false);

  const toggleSideNavBar = (hideNavBar) => {
    setHideNavBar(!hideNavBar);
  };
  return {
    hideNavBar,
    toggleSideNavBar
  };
};
