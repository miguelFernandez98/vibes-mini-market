import { getProducts } from "@/lib/products-api";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { Product } from "../../../shared/interfaces/products";
import { Package, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    sort?: string;
    order?: string;
    page?: string;
    limit?: string;
    category?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const { page: pageParam, limit: limitParam, ...filters } = params;

  const page = pageParam ? parseInt(pageParam) : 1;
  const limit = limitParam ? parseInt(limitParam) : 12;

  let allProducts: Product[] = [];
  try {
    allProducts = await getProducts();
  } catch {
    allProducts = [];
  }

  let filtered = [...allProducts];

  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
    );
  }

  if (filters.category) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  if (filters.sort) {
    const order = filters.order === "desc" ? -1 : 1;
    if (filters.sort === "price") {
      filtered.sort((a, b) => (a.price - b.price) * order);
    } else if (filters.sort === "name") {
      filtered.sort((a, b) => a.title.localeCompare(b.title) * order);
    }
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const products = filtered.slice(start, start + limit);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <Link href="/" className="hover:text-[#00703C] transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-gray-700 font-medium">Productos</span>
          </nav>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Productos
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                {total} {total === 1 ? "producto" : "productos"} disponibles
              </p>
            </div>
            <Link
              href="/"
              className="hidden sm:flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#00703C] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Filters */}
        <div className="mb-6">
          <ProductFilters />
        </div>

        {/* Product grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <Package className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto text-sm">
              Intenta ajustar los filtros o la busqueda para encontrar lo que
              buscas.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {page > 1 && (
              <a
                href={`?${buildQuery(filters, page - 1, limit)}`}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                Anterior
              </a>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 || p === totalPages || Math.abs(p - page) <= 2
              )
              .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1) {
                  acc.push("...");
                }
                acc.push(p);
                return acc;
              }, [])
              .map((p, idx) =>
                p === "..." ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 text-gray-400"
                  >
                    ...
                  </span>
                ) : (
                  <a
                    key={p}
                    href={`?${buildQuery(filters, p as number, limit)}`}
                    className={`min-w-[40px] px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                      p === page
                        ? "bg-[#00703C] text-white shadow-md shadow-[#00703C]/20"
                        : "text-gray-700 bg-white border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </a>
                )
              )}

            {page < totalPages && (
              <a
                href={`?${buildQuery(filters, page + 1, limit)}`}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                Siguiente
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function buildQuery(
  filters: Record<string, string | undefined>,
  page: number,
  limit: number
): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  params.set("page", String(page));
  params.set("limit", String(limit));
  return params.toString();
}
