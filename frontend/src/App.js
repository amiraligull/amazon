/** @format */
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homescreen from "./screens/HomeScreen";
import Productscreen from "./screens/ProductScreen";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { Helmet } from "react-helmet-async";
function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>Amazon</title>
      </Helmet>
      <div className=" d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to={"/"}>
                <Navbar.Brand>Amazon</Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
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
