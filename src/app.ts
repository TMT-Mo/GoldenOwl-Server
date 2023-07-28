import dotenv from "dotenv";
import express, {
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./configs/swagger.json";
import cors from "cors";
import { apis } from "./util/api";
import { InternalServer } from "./util/http-request";
import { productRouter } from "./route/product-route";
//
const app = express();
// const config = getConfigs();
dotenv.config();

mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 3000;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, application/json"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(apis.product.head, productRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new InternalServer("Could not find this route!");
  return next(res.status(error.code).json(error));
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
