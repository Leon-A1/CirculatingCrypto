import { SnackbarProvider } from "notistack";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

NProgress.configure({
  showSpinner: false,
  ease: "ease",
  speed: 500,
  color: "red",
});
// Binding events.
Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
