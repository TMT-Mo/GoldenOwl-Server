import { createProductValidator } from './../util/express-validator';

import express from "express";
import { apis } from "../util/api";
import { productController } from "../controller/product-controller";

const { createProduct, deleteProduct, getProductById, getProductList, updateProduct } = productController;
const router = express.Router();

router.get(apis.product.getProductList, getProductList);
router.get(apis.product.getProductById, getProductById);
router.post(apis.product.createProduct, createProductValidator(), createProduct);
router.put(apis.product.updateProduct, updateProduct);
router.delete(apis.product.deleteProduct, deleteProduct);



export const productRouter = router;
