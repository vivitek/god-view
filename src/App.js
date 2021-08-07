import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./Router"
import { client } from "./utils/apollo"

const App = () => {
  return (
    <>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </BrowserRouter>
    <ToastContainer position="bottom-right" hideProgressBar={true} />
    </>
  );
}

export default App;
