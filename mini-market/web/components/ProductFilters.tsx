"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useRef, useCallback, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Product } from "../../shared/interfaces/products";

interface ProductFiltersProps {
  products: Product[];
  onFilter: (filtered: Product[]) => void;
}

const sortOptions = [
  { value: "name", label: "Nombre" },
  { value: "price", label: "Precio" },
];

const orderOptions = [
  { value: "asc", label: "Menor a Mayor" },
  { value: "desc", label: "Mayor a Menor" },
];

const categoryOptions = [
  { value: "", label: "Todas" },
  { value: "electronics", label: "Electronics" },
  { value: "jewelery", label: "Jewelery" },
  { value: "men's clothing", label: "Men's Clothing" },
  { value: "women's clothing", label: "Women's Clothing" },
];

export default function ProductFilters({ products, onFilter }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [sortOption, setSortOption] = useState(
    searchParams.get("sort") || sortOptions[0].value
  );
  const [orderOption, setOrderOption] = useState(
    searchParams.get("order") || orderOptions[0].value
  );
  const [categoryOption, setCategoryOption] = useState(
    searchParams.get("category") || ""
  );
  const [showFilters, setShowFilters] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const applyFilters = useCallback(
    (search: string, category: string, sort: string, order: string) => {
      let filtered = [...products];

      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(s) ||
            p.description.toLowerCase().includes(s) ||
            p.category.toLowerCase().includes(s)
        );
      }

      if (category) {
        filtered = filtered.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        );
      }

      if (sort) {
        const dir = order === "desc" ? -1 : 1;
        if (sort === "price") {
          filtered.sort((a, b) => (a.price - b.price) * dir);
        } else if (sort === "name") {
          filtered.sort((a, b) => a.title.localeCompare(b.title) * dir);
        }
      }

      onFilter(filtered);
    },
    [products, onFilter]
  );

  useEffect(() => {
    applyFilters(searchTerm, categoryOption, sortOption, orderOption);
  }, [searchTerm, categoryOption, sortOption, orderOption, applyFilters]);

  const updateUrl = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (!value) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      params.delete("page");
      router.push(pathname + "?" + params.toString(), { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateUrl({ search: value });
    }, 400);
  };

  const clearSearch = () => {
    setSearchTerm("");
    updateUrl({ search: "" });
  };

  const activeFilters =
    searchParams.get("search") ||
    searchParams.get("category") ||
    searchParams.get("sort");

  return (
    <div className="space-y-4">
      {/* Main search bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar productos..."
            className="w-full pl-12 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#00703C] focus:ring-2 focus:ring-[#00703C]/10 transition-all"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
            showFilters || activeFilters
              ? "bg-[#00703C] text-white border-[#00703C]"
              : "bg-white text-gray-700 border-gray-200 hover:border-[#00703C] hover:text-[#00703C]"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filtros</span>
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Categoria
              </label>
              <select
                value={categoryOption}
                onChange={(e) => {
                  setCategoryOption(e.target.value);
                  updateUrl({ category: e.target.value });
                }}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00703C] transition-colors"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Ordenar por
              </label>
              <select
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  updateUrl({ sort: e.target.value });
                }}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00703C] transition-colors"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Direccion
              </label>
              <select
                value={orderOption}
                onChange={(e) => {
                  setOrderOption(e.target.value);
                  updateUrl({ order: e.target.value });
                }}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00703C] transition-colors"
              >
                {orderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Active filter tags */}
      {activeFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-500">Filtros activos:</span>
          {searchParams.get("search") && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#00703C]/10 text-[#00703C] text-xs font-medium rounded-full">
              {`"${searchParams.get("search")}"`}
              <button onClick={clearSearch} className="hover:text-[#005a30]">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {searchParams.get("category") && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#00703C]/10 text-[#00703C] text-xs font-medium rounded-full">
              {searchParams.get("category")}
              <button
                onClick={() => {
                  setCategoryOption("");
                  updateUrl({ category: "" });
                }}
                className="hover:text-[#005a30]"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={() => {
              setSearchTerm("");
              setCategoryOption("");
              setSortOption(sortOptions[0].value);
              setOrderOption(orderOptions[0].value);
              router.push(pathname);
            }}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            Limpiar todo
          </button>
        </div>
      )}
    </div>
  );
}
