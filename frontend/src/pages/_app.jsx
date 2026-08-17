import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";

export default function App({ Component, pageProps }) {
  const storeRef = useRef(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <Component {...pageProps} />
    </Provider>
  );
}
