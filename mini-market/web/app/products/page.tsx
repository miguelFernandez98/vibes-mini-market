import { getProducts } from "@/lib/products-api";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import {
  Product,
  ProductsSearchParams,
} from "../../../shared/interfaces/products";

interface PaginationProps {
  page: number;
  limit: number;
  hasNext: boolean;
  query: string;
}

function Pagination({ page, limit, hasNext, query }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      {page > 1 ? (
        <a
          href={`?${removePageLimit(query)}&page=${page - 1}&limit=${limit}`}
          className="px-4 py-2 bg-white text-[#020618] rounded hover:bg-gray-300"
        >
          Anterior
        </a>
      ) : (
        <span className="px-4 py-2 bg-gray-100 rounded text-gray-400 cursor-not-allowed">
          Anterior
        </span>
      )}
      <span>Página {page}</span>
      {hasNext ? (
        <a
          href={`?${removePageLimit(query)}&page=${page + 1}&limit=${limit}`}
          className="px-4 py-2 bg-white text-[#020618] rounded hover:bg-gray-300"
        >
          Siguiente
        </a>
      ) : (
        <span className="px-4 py-2 bg-gray-100 rounded text-gray-400 cursor-not-allowed">
          Siguiente
        </span>
      )}
    </div>
  );
}

interface ProductsPageProps {
  searchParams: ProductsSearchParams;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const {
    page: pageParam,
    limit: limitParam,
    ...restParams
  } = searchParams || {};

  const page = pageParam ? parseInt(pageParam) : 1;
  const limit = limitParam ? parseInt(limitParam) : 10;

  const params: Record<string, string> = {};
  Object.entries(restParams).forEach(([key, value]) => {
    if (typeof value === "string" && value !== "") {
      params[key] = value;
    }
  });
  const query = new URLSearchParams(params).toString();
  const products: Product[] =
    (await getProducts(query + `&page=${page}&limit=${limit}`)) || [];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 mt-12">
        <ProductFilters />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-white">
            No se encontraron productos que coincidan con la búsqueda.
          </div>
        )}
      </div>
      <Pagination
        page={page}
        limit={limit}
        hasNext={products.length === limit}
        query={query}
      />
    </div>
  );
}

function removePageLimit(query: string) {
  const params = new URLSearchParams(query);
  params.delete("page");
  params.delete("limit");
  return params.toString();
}
