import React, { useState, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ApolloProvider } from "@apollo/client";
import ThemeContext from "./contexts/themeContext";
import LoadingPage from "./pages/Loading";
import "react-toastify/dist/ReactToastify.css";
import { client } from "./utils/apollo";
import Page from "./components/Page";
import Routes from "./Routes";
import Footer from "./components/Footer";
import Header from './components/Header'

const App = () => {
  const [theme, setTheme] = useState("dark");

  return (
    <div
      className={
        theme === "dark"
          ? "dark w-screen h-screen flex flex-col"
          : "w-screen h-screen flex flex-col"
      }
    >
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
          <ThemeContext.Provider
                value={{
                  theme,
                  changeTheme: () =>
                    setTheme(theme === "dark" ? "light" : "dark"),
                }}
              >
                <Suspense fallback={LoadingPage}>
                  <Header />
                  <main>
                    <Page>
                      <Routes />
                    </Page>
                  </main>
                  <Footer />
                </Suspense>
              </ThemeContext.Provider>
          </ApolloProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;