import { SupabaseClient } from "@supabase/supabase-js";
import { GetUser } from "./usert";

const FetchQuery = "id, count, product ( * )";
type FetchCartQuery = typeof FetchQuery;

export async function GetCartItems(supabase: SupabaseClient) {
  const user = await GetUser(supabase);

  const { data, error } = await supabase
    .from("cart")
    .select<FetchCartQuery, ICartResponse>(FetchQuery)
    .eq("user_id", user.id);

  if (error) throw Error("error in fetching user cart");

  return data;
}

export async function InsertCartItem(
  supabase: SupabaseClient,
  cartData: IDbCart
) {
  const { data: fetchData } = await supabase
    .from("cart")
    .select<FetchCartQuery, ICartResponse>(FetchQuery)
    .eq("user_id", cartData.user_id)
    .eq("product_id", cartData.product_id)
    .single();

  if (fetchData) {
    const { data: updateData, error: updateError } = await supabase
      .from("cart")
      .update({ count: fetchData.count + 1 })
      .eq("user_id", cartData.user_id)
      .eq("product_id", cartData.product_id)
      .select<FetchCartQuery, ICartResponse>(FetchQuery)
      .single();

    if (updateError) throw Error("error in updating cart values");
    return updateData;
  }

  const { data, error } = await supabase
    .from("cart")
    .insert(cartData)
    .select<FetchCartQuery, ICartResponse>(FetchQuery)
    .single();

  if (error) throw Error("error in inserting cart data");

  return data;
}

export async function DeleteCartItem(
  supabase: SupabaseClient,
  cartData: IDbCart
) {
  const { data: fetchData } = await supabase
    .from("cart")
    .select<FetchCartQuery, ICartResponse>(FetchQuery)
    .eq("user_id", cartData.user_id)
    .eq("product_id", cartData.product_id)
    .gt("count", 1)
    .single();

  if (fetchData) {
    const { data: updateData, error: updateError } = await supabase
      .from("cart")
      .update({ count: fetchData.count - 1 })
      .eq("user_id", cartData.user_id)
      .eq("product_id", cartData.product_id)
      .select<FetchCartQuery, ICartResponse>(FetchQuery)
      .single();

    if (updateError) throw Error("error in updating cart values");
    return updateData;
  }

  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("user_id", cartData.user_id)
    .eq("product_id", cartData.product_id);

  if (error) throw Error("error in inserting cart data");
  return null;
}
