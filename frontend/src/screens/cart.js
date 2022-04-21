/** @format */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/cartSlice";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();

  const removeCartHandler = (productId) => {
    dispatch(remove(productId));
  };
  const products = useSelector((state) => state.cart);
  return (
    <div>
      <section className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-7">
                      <h5 className="mb-3">
                        <Link to="/" className="text-body">
                          <i className="fas fa-long-arrow-alt-left me-2"></i>
                          Continue shopping
                        </Link>
                      </h5>
                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                          <p className="mb-0">
                            You have {products.length} items in your cart
                          </p>
                        </div>
                        <div></div>
                      </div>

                      {products.map((product) => (
                        <div className="card mb-3" key={product.slug}>
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                <div>
                                  <img
                                    src={product.image}
                                    className="img-fluid rounded-3"
                                    alt="Shopping item"
                                    style={{ width: "65px" }}
                                  />
                                </div>
                                <div className="ms-3">
                                  <h5>{product.name}</h5>
                                  <p className="small mb-0">
                                    <span>
                                      {product.category}
                                      &nbsp;
                                      {product.brand}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center">
                                <div style={{ width: "50px" }}>
                                  <h5 className="fw-normal mb-0">2</h5>
                                </div>
                                <div style={{ width: "80px" }}>
                                  <h5 className="mb-0">${product.price}</h5>
                                </div>
                                <a
                                  href="#!"
                                  style={{ color: "#cecece" }}
                                  onClick={() =>
                                    removeCartHandler(product.slug)
                                  }
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="col-lg-5">
                      <div className="card bg-primary text-white rounded-3">
                        <div className="card-body">
                          <hr className="my-4" />

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">$4798.00</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping</p>
                            <p className="mb-2">$20.00</p>
                          </div>

                          <div className="d-flex justify-content-between mb-4">
                            <p className="mb-2">Total(Incl. taxes)</p>
                            <p className="mb-2">$4818.00</p>
                          </div>

                          <Button
                            type="button"
                            className="btn btn-info btn-block btn-lg"
                          >
                            <div className="d-flex justify-content-between">
                              <span>$4818.00</span>
                              <span>
                                Checkout
                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                              </span>
                            </div>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Row>
        {products.map((product) => (
          <Col md={3} key={product.slug}>
            <img src={product.image} alt={product.title} />
            <h5>{product.title}</h5>
            <h5>{product.price}</h5>
            <button
              className="btn"
              onClick={() => removeCartHandler(product.slug)}
            >
              Remove
            </button>
          </Col>
        ))}
      </Row> */}
    </div>
  );
};

export default Cart;
