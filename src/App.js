import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home"
import About from './Pages/About/About';
import Settings from './Pages/Settings/Settings';
import Error from './Pages/Error/Error';
import Products from './Pages/Products/Products';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
          <Route path="/" exact element= {<Home/>} />
          <Route path="/home" element={<Home/>}/> 
          <Route path="/about" element={<About/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>
    
    
     
    </div>
  );
}

export default App;
