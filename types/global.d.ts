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

interface ICheckoutBody {
  items?: ICartResponse[];
}

interface IcheckoutResponse {
  url: string;
}

interface WebhookParsedMetadata {
  order_id: string;
}

// ===================== ORDERS AND ORDER ITEMS =====================

type OrderStatus = "processing" | "success";
interface IDbOrderCreation {
  user_id: string;
  status: OrderStatus;
}

interface IDbOrder extends IDbOrderCreation {
  id: string;
  created_at: string;
}

interface IDbFullOrder extends IDbOrder {
  order_item: IDbOrderItemFull[];
}

interface IDbOrderItemCreation {
  order_id: string;
  user_id: string;
  product_id: string;
  count: number;
}

interface IDBOrderItem extends IDbOrderItemCreation {
  id: string;
}

interface IDbOrderItemFull extends IDBOrderItem {
  product: IProduct;
}
