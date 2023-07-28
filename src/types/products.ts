export interface IProduct {
  id: string;
  name: string;
  color: string;
  description: string;
  image: string;
  price: number;
}
export interface CreateProductRequest {
  name: string;
  color: string;
  description: string;
  image: string;
  price: number;
}
export interface UpdateProductRequest {
  id: string;
  name: string;
  color: string;
  description: string;
  image: string;
  price: number;
}
