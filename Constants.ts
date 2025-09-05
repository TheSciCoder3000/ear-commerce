export enum Categories {
  Gaming,
  Wireless,
  Professional,
  Specialty,
}

export interface ProductData {
  id: string;
  name: string;
  category: CategoryData;
  price: number;
  stock: number;
  description: string;
  image_paths: string[];
  user_id: string;
}

export interface CategoryData {
  id: string;
  name: string;
  description: string | null;
  cover: string;
}
