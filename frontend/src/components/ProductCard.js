/** @format */

import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";
import { add } from "../store/cartSlice";
import { useDispatch } from "react-redux";

const Productcard = ({ product }) => {
  const dispatch = useDispatch();

  const addToHandler = (product) => {
    // in the dispath add is the our action which we made in cartslice and product parameter is the payload
    // place now check
    dispatch(add(product));
  };

  return (
    <Card key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          className="card-img-top"
          alt={product.description}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        <Button onClick={() => addToHandler(product)}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default Productcard;
