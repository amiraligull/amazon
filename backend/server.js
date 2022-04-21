/** @format */

import express from "express";
import data from "./Data.js";
const app = express();

// getting all products
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

// getting one product against  uniq slug
app.get("/api/products/slug/:slug", (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(400).send({ message: "Product not found" });
  }
});

// getting one product against  Id
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x.id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(400).send({ message: "Product not found" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
