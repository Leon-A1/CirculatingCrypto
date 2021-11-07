import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();
let existing_user_info =
  typeof window !== "undefined" ? localStorage.getItem("user-info") : null;

const initialState = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,
  userInfo: existing_user_info ? existing_user_info : null,
};

function reducer(state, action) {
  switch (action.type) {
    case "DARK_MODE_ON":
      document.documentElement.style.setProperty(
        "--main-default-bg-color",
        "#000000"
      );
      document.documentElement.style.setProperty(
        "--main-default-text-color",
        "#fdfdfd"
      );
      document.getElementById("darkmode-button").style.color =
        "var(--main-primary-text-color)";
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
      document.getElementById("darkmode-button").style.color = "white";
      return { ...state, darkMode: false };

    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };

    case "USER_LOGOUT":
      localStorage.removeItem("user-info");
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
