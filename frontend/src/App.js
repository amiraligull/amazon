/** @format */
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homescreen from "./screens/HomeScreen";
import Productscreen from "./screens/ProductScreen";
function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <p>Header</p>
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<Productscreen />} />
            <Route path="/" element={<Homescreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
