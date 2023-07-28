import { IProduct } from "./../types/products";
import mongoose from "mongoose";
import { MiddlewareFunction } from "../types/configs";
import {
  BadRequest,
  CreatedSuccessfully,
  InternalServer,
  RequestSuccessfully,
} from "../util/http-request";
import { ProductModel } from "../model/products";
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { CreateProductRequest, UpdateProductRequest } from "../types/products";
import { validationResult } from "express-validator";

// ! [GET]: /api/v1/products
const getProductList: MiddlewareFunction = async (req, res, next) => {
  let productList: mongoose.Document[] = [];

  try {
    productList = await ProductModel.find();
  } catch (err) {
    const error = new InternalServer();
    return next(res.status(error.code).json(error));
  }

  return next(res.json({ items: productList }));
};

// ! [GET]: /api/v1/products/:id
const getProductById: MiddlewareFunction = async (req, res, next) => {
  const { id } = req.params;
  let product = [];

  try {
    product = await ProductModel.findById(id);
  } catch (err) {
    const error = new InternalServer();
    return next(res.status(error.code).json(error));
  }

  return next(res.json(product));
};
// ! [POST]: /api/v1/products
const createProduct: MiddlewareFunction = async (req, res, next) => {
  // * Checking validation of user's input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new BadRequest(errors.array()[0].msg);
    return next(res.status(error.code).json(error));
  }

  const request = req.body as CreateProductRequest;

  try {
    await ProductModel.create({
      ...request,
    });
  } catch (err) {
    const error = new InternalServer("Cannot add product!");
    return next(res.status(error.code).json(error));
  }

  const response = new CreatedSuccessfully("Create product successfully!");
  return next(res.status(response.code).json(response));
};

// ! [DELETE]: /api/v1/products
const deleteProduct: MiddlewareFunction = async (req, res, next) => {
    const { id } = req.params;

  let existedProduct: mongoose.Document & IProduct;

  try {
    existedProduct = await ProductModel.findById(id);
  } catch (err) {
    const error = new InternalServer();
    return next(res.status(error.code).json(error));
  }

  if (!existedProduct) {
    const error = new BadRequest("This product does not exist!");
    return next(res.status(error.code).json(error));
  }

  try {
    await existedProduct.deleteOne();
  } catch (err) {
    const error = new InternalServer(
      "Something went wrong with deleting product"
    );
    return next(res.status(error.code).json(error));
  }

  const response = new RequestSuccessfully("Delete product successfully!");
  return next(res.status(response.code).json(response));
};

// ! [PUT]: /api/v1/products
const updateProduct: MiddlewareFunction = async (req, res, next) => {
  const { id } = req.params;
  const { color, description, image, name, price } =
    req.body as UpdateProductRequest;

  let existedProduct: mongoose.Document & IProduct;

  try {
    existedProduct = await ProductModel.findById(id);
  } catch (err) {
    const error = new InternalServer();
    return next(res.status(error.code).json(error));
  }

  if (!existedProduct) {
    const error = new BadRequest("This product does not exist!");
    return next(res.status(error.code).json(error));
  }
  existedProduct.name = name;
  existedProduct.description = description;
  existedProduct.color = color;
  existedProduct.price = price;
  existedProduct.image = image;

  try {
    await existedProduct.save();
  } catch (err) {
    const error = new InternalServer(
      "Something went wrong with updating product"
    );
    return next(res.status(error.code).json(error));
  }

  const response = new RequestSuccessfully("Update product successfully!");
  return next(res.status(response.code).json(response));
};

export const productController = {
  getProductList,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
};
