import "@/styles/globals.css";
import Layout from "../Components/Layout";
import { store, persistor } from "../Redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}></PersistGate>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
