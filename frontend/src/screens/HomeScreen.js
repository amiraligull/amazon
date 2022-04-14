/** @format */

import { useEffect, React, useReducer } from "react";

import axios from "axios";
import logger from "use-reducer-logger";
import pic from "../images/loading.gif";
import Productcard from "../components/ProductCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import data from "../data";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const Homescreen = () => {
  // const [products, setProducts] = useState([]);
  const [{ products, loading, error }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: "",
    products: [],
  });

  // when app rund this will run automatically
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1 className="h2">Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>
            <img src={pic} alt="loading" />
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col md={3} key={product.slug}>
                <Productcard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Homescreen;
