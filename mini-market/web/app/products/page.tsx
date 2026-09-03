import { getProducts } from "@/lib/products-api";
import { Product } from "../../../shared/interfaces/products";
import ProductsClient from "./ProductsClient";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Explora nuestro catalogo completo de productos. Electronics, ropa, joyeria y mas con envio gratis en compras mayores a $50.",
  openGraph: {
    title: "Productos | Mig Market",
    description:
      "Explora nuestro catalogo completo de productos. Electronics, ropa, joyeria y mas con envio gratis.",
  },
};

export default async function ProductsPage() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch {
    products = [];
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-[#00703C] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Cargando productos...</p>
          </div>
        </div>
      }
    >
      <ProductsClient products={products} />
    </Suspense>
  );
}
