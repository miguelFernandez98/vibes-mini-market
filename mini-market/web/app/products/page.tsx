import { getProducts } from "@/lib/products-api";
import ProductCard from "@/components/ProductCard";
import { Product } from "../../../shared/interfaces/products";

export default async function ProductsPage() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="container mx-auto p-4 pt-18">
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-16">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h4 className="col-span-full text-center text-white">
            No se encontraron productos.
          </h4>
        )}
      </div>
    </section>
  );
}
