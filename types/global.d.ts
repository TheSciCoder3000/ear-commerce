interface IProduct {
  user_id: string;
  id: string;
  stock: number;
  price: number;
  name: string;
  image_paths: string[];
  description: string;
  created_at: string;
  category_id: string;
  category: {
    id: string;
    description: string;
    name: string;
  };
}

interface IDbCart {
  user_id: string;
  product_id: string;
  count: number;
}

interface ICartResponse {
  id: string;
  count: number;
  product: IProduct;
}
