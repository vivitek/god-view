import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ApolloProvider } from "@apollo/client";
import "react-toastify/dist/ReactToastify.css";
import { client } from "./utils/apollo";
import Page from "./components/Page";
import Routes from "./Routes";
import Header from './components/Header'

const App = () => {
  return (
    <div className="w-screen h-screen flex flex-col overflow-y-auto overflow-x-hidden scrollbar-w-2 scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-grayBlue-DEFAULT">
      <ToastContainer
        position="bottom-right"
        closeButton={false}
        pauseOnHover={false}
        autoClose={2000}
        hideProgressBar
      />
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Header />
          <main>
            <Page>
              <Routes />
            </Page>
          </main>
        </ApolloProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;