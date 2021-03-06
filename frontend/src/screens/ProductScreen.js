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
import MessageBox from "../components/MessageBox";
import Loading from "../components/Loading";
import { getError } from "../util";
import { add } from "../store/cartSlice";
import { useDispatch } from "react-redux";
// import { Store } from "../Store";

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
  const cartdispatch = useDispatch();

  const addToHandler = (product) => {
    // in the dispath add is the our action which we made in cartslice and product parameter is the payload
    cartdispatch(add(product));
  };

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
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const addToCartHandler = () => {
  //   ctxDispatch({
  //     type: "CART_ADD_ITEM",
  //     payload: { ...product, quantity: 1 },
  //   });
  // };
  return loading ? (
    <Loading />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
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
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <div className="d-grid ">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => addToHandler(product)}
                    >
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
