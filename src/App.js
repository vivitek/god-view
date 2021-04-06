import Header from './components/Header/Header'
import Router from './Router'
import './App.css';
import { BrowserRouter } from "react-router-dom"
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
          <ApolloProvider client={client}>
            <Router />
          </ApolloProvider>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
