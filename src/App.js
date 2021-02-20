import Header from './components/Header/Header'
import Router from './Router'
import './App.css';
import { BrowserRouter } from "react-router-dom"
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql';

function App() {
  // localStorage.clear()
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
          <ApolloProvider client={client}>
            <Router />
          </ApolloProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
