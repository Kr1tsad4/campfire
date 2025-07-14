import { useState } from "react";

export const useUser = () => {
  const [loginUser, setLoginUser] = useState(null);
  const saveLoginUserSession = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
  };
  const getLoginUser = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setLoginUser(user);
  };

  const removeLoginUser = () => {
    sessionStorage.removeItem("user");
  };

  return {
    loginUser,
    getLoginUser,
    saveLoginUserSession,
    removeLoginUser,

  };
};
