/** @format */

import { useEffect, React, useReducer } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Badge from "react-bootstrap/Badge";
import { Helmet } from "react-helmet-async";

// reducer function for managing state and requests and also for error  handling
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Productscreen = () => {
  const params = useParams();
  const { slug } = params;

  const [{ product, loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    product: [],
  });

  // when app rund this will run automatically
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [slug]);
  return loading ? (
    <div>loading</div>
  ) : error ? (
    <div>{error} </div>
  ) : (
    <Row>
      <Col md={6}>
        <img
          src={product.image}
          className="img-large"
          alt={product.description}
        />
      </Col>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </ListGroup.Item>
          <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
          <ListGroup.Item>Description: {product.description}</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? (
                      <Badge bg="success">Success</Badge>
                    ) : (
                      <Badge bg="danger">Out of Stock</Badge>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              {/*  we hav only one can conditoin we can use product.counstock > 0 &&(<jsx gos here>) */}
              {product.countInStock > 0 ? (
                <ListGroup.Item>
                  <div className="d-grid ">
                    <Button variant="primary" size="lg">
                      Add To Cart
                    </Button>
                  </div>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  <div className="d-grid ">
                    <Button variant="primary" disabled size="lg">
                      Add To Cart
                    </Button>
                  </div>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Productscreen;
