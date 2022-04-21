/** @format */
import "./App.css";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Homescreen from "./screens/HomeScreen";
import Productscreen from "./screens/ProductScreen";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { Helmet } from "react-helmet-async";
import Badge from "react-bootstrap/esm/Badge";
import Nav from "react-bootstrap/Nav";
// import { useContext } from "react";
// import { Store } from "./Store";
import { Provider } from "react-redux";
import store from "./store/store";
import { useSelector } from "react-redux";
import Cart from "./screens/cart";
function App() {
  // const { state } = useContext(Store);
  // const { cart } = state;
  const items = useSelector((state) => state.cart);
  return (
    <div className="App">
      <BrowserRouter>
        <Helmet>
          <title>Amazona</title>
        </Helmet>
        <div className=" d-flex flex-column site-container">
          <header>
            <Navbar bg="dark" variant="dark">
              <Container>
                <LinkContainer to={"/"}>
                  <Navbar.Brand>Amazona</Navbar.Brand>
                </LinkContainer>
                <Nav className="me-auto">
                  <Link to="/cart">
                    Cart
                    {items.length > 0 && (
                      <Badge pill bg="danger">
                        {items.length}
                      </Badge>
                    )}
                  </Link>
                </Nav>
              </Container>
            </Navbar>
          </header>
          <main>
            <Container className="mt-3">
              <Routes>
                <Route path="/product/:slug" element={<Productscreen />} />
                <Route path="/" element={<Homescreen />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </Container>
          </main>
          <footer>
            <div className="text-center">All right Reserved</div>
          </footer>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
