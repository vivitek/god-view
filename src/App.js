import Header from './components/Header/Header'
import Router from './Router'
import './App.css';
import {BrowserRouter} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
