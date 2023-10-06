import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/hooks/redux/store";

import "../styles/business-styles/style.css";
import "../styles/business-styles/index-page.css";
import "../styles/business-styles/product-page.css";
import "../styles/business-styles/chat-page.css";
import "../styles/business-styles/store-page.css";
import "../styles/createStores-styles/createStoreComponent-styles.css";
import "../styles/createStores-styles/createStoreScroller-style.css";
import "../styles/createStores-styles/createStoreForm.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
