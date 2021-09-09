import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case "DARK_MODE_ON":
      document.documentElement.style.setProperty(
        "--main-default-bg-color",
        "#121212"
      );
      document.documentElement.style.setProperty(
        "--main-default-text-color",
        "#fdfdfd"
      );
      return { ...state, darkMode: true };
    case "DARK_MODE_OFF":
      document.documentElement.style.setProperty(
        "--main-default-bg-color",
        "#fdfdfd"
      );
      document.documentElement.style.setProperty(
        "--main-default-text-color",
        "#121212"
      );
      return { ...state, darkMode: false };

    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };
    case "USER_LOGOUT":
      Cookies.set("userInfo", null);

      return {
        ...state,
        userInfo: null,
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
