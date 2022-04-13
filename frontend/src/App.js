/** @format */
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Homescreen from "./screens/HomeScreen";
import Productscreen from "./screens/ProductScreen";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
function App() {
  return (
    <BrowserRouter>
      <div className=" d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to={"/"}>
                <Navbar.Brand>MyStore</Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/product/:slug" element={<Productscreen />} />
              <Route path="/" element={<Homescreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All right Reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
