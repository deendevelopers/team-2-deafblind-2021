// import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

const theme = extendTheme({
  components: {
    Steps,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Layout>
    </ChakraProvider>
    );
}

export default MyApp;
