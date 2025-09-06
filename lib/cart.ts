import { SupabaseClient } from "@supabase/supabase-js";
import { GetUser } from "./usert";
import { ParseProductPaths } from "./products/fetch";
import Stripe from "stripe";
import { createClient } from "./supabase/server";

const FetchQuery = "id, count, product ( *, category ( * ) )";
type FetchCartQuery = typeof FetchQuery;

export async function GetCartItems(supabase: SupabaseClient) {
  const user = await GetUser(supabase);

  const { data, error } = await supabase
    .from("cart")
    .select<FetchCartQuery, ICartResponse>(FetchQuery)
    .eq("user_id", user.id);

  if (error) throw Error("error in fetching user cart");

  for (let i = 0; i < data.length; i++) {
    const product = data[i].product;
    data[i].product = await ParseProductPaths(product);
  }

  return data;
}

export async function GetCartByIds(supabase: SupabaseClient, ids: string[]) {}

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

  // if fetchData exist, update item
  if (fetchData) {
    const { data: updateData, error: updateError } = await supabase
      .from("cart")
      .update({ count: cartData.count })
      .eq("user_id", cartData.user_id)
      .eq("product_id", cartData.product_id)
      .select<FetchCartQuery, ICartResponse>(FetchQuery)
      .single();

    if (updateError) throw Error("error in updating cart values");
    return updateData;
  }

  // else insert new data
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
      .update({ count: cartData.count })
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

export async function ProcessCartCheckout(session: Stripe.Checkout.Session) {
  const rawMetadata = session.metadata;

  if (!rawMetadata) throw Error("Error: No metadata found in payment");

  const { cartIds } = (await JSON.parse(
    rawMetadata.data
  )) as WebhookParsedMetadata;
}
