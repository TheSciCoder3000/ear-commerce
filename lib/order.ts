import { SupabaseClient } from "@supabase/supabase-js";

export async function CreateOrder(
  supabase: SupabaseClient,
  cart: ICartResponse[]
) {
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) throw Error("Error: user does not exist");

  const user_id = user.id;

  const newOrderData: IDbOrderCreation = {
    user_id,
    status: "processing",
  };

  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert(newOrderData)
    .select()
    .single<IDbOrder>();

  if (orderError) throw Error("Error: cannot create order");

  const newOrderItems: IDbOrderItemCreation[] = cart.map((item) => {
    return {
      order_id: orderData.id,
      user_id,
      product_id: item.product.id,
      count: item.count,
    };
  });

  const { error: orderItemError } = await supabase
    .from("order_item")
    .insert(newOrderItems)
    .select();

  if (orderItemError) throw Error("Error: cannot create order item");

  return await GetFullOrder(supabase, orderData.id);
}

const FetchQuery = "*, order_item (*, product (*))";
type FetchType = typeof FetchQuery;

export async function GetFullOrder(supabase: SupabaseClient, order_id: string) {
  const { data, error } = await supabase
    .from("orders")
    .select<FetchType, IDbFullOrder>(FetchQuery)
    .eq("id", order_id)
    .single();

  if (error) throw Error("Error: cannot fetch order");

  return data;
}

export async function GetAllOrders(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("orders")
    .select<`*`, IDbOrder>("*");
  if (error) throw Error("Error in fetching user orders");

  return data;
}

export async function ChangeOrderStatus(
  supabase: SupabaseClient,
  order_id: string,
  status: OrderStatus,
  returnValue: true
): Promise<IDbFullOrder>;
export async function ChangeOrderStatus(
  supabase: SupabaseClient,
  order_id: string,
  status: OrderStatus,
  returnValue?: false | undefined
): Promise<void | undefined>;

export async function ChangeOrderStatus(
  supabase: SupabaseClient,
  order_id: string,
  status: OrderStatus,
  returnValue?: boolean
): Promise<IDbFullOrder | void> {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", order_id)
    .select<FetchType, IDbFullOrder>()
    .single();

  if (error) throw Error("Error in updating order");

  if (returnValue) return data;
}
