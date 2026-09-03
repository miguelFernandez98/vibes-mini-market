import { Product } from "@/types/products";

const FAKESTORE_API = "https://fakestoreapi.com";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${FAKESTORE_API}/products`);
    if (!res.ok) return [];
    const data: Product[] = await res.json();
    return data;
  } catch {
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${FAKESTORE_API}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  const data: Product = await res.json();
  return data;
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const res = await fetch(`${FAKESTORE_API}/products/categories`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
};

export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  try {
    const res = await fetch(
      `${FAKESTORE_API}/products/category/${category}`
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
};
