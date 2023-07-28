import mongoose, { Document, model } from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    color: { type: String, required: true },
  },
  {
    toJSON: {
      transform: function (doc: Document, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

export const ProductModel = model('product', productSchema);
