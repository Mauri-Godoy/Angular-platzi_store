import { Category } from "./category.model";

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: Category;
}
