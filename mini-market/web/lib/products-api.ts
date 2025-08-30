import { Product } from "../../shared/interfaces/products";

const API_BASE_URL = process.env.NEXT_PUBLIC_API;

export const getProducts = async (query?: string): Promise<Product[]> => {
  const res = await fetch(
    `${API_BASE_URL}/api/products${query ? `?${query}` : ""}`
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.products;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  const data = await res.json();
  return data;
};
