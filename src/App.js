import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./Router"
import Header from "./components/Header"
import { client } from "./utils/apollo"

const App = () => {
  return (
    <div className="h-full w=full">
      <BrowserRouter>
        <ApolloProvider client={client}>
          {/* <Header /> */}
          <Router />
        </ApolloProvider>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        closeButton={false}
        pauseOnHover={false}
        autoClose={2000}
        hideProgressBar
      />
    </div>
  );
}

export default App;
