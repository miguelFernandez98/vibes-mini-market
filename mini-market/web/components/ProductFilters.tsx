"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useRef } from "react";
import { SelectOption } from "../../shared/interfaces/products";

const sortOptions: SelectOption[] = [
  { value: "name", label: "Nombre" },
  { value: "price", label: "Precio" },
];

const orderOptions: SelectOption[] = [
  { value: "asc", label: "Ascendente" },
  { value: "desc", label: "Descendente" },
];

export default function ProductFilters() {
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
  const [availableOnly, setAvailableOnly] = useState(
    searchParams.get("available") === "true"
  );

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "") {
        params.delete("search");
      } else {
        params.set("search", value);
      }
      router.push(pathname + "?" + params.toString());
    }, 400);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex-1">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar productos..."
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div className="flex gap-4 items-center ">
        <select
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            const params = new URLSearchParams(searchParams.toString());
            params.set("sort", e.target.value);
            router.push(pathname + "?" + params.toString());
          }}
          className="px-6 py-2 border rounded-md"
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              className="text-[#020618]"
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={orderOption}
          onChange={(e) => {
            setOrderOption(e.target.value);
            const params = new URLSearchParams(searchParams.toString());
            params.set("order", e.target.value);
            router.push(pathname + "?" + params.toString());
          }}
          className="px-6 py-2 border rounded-md"
        >
          {orderOptions.map((option) => (
            <option
              key={option.value}
              className="text-[#020618]"
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={availableOnly}
          onChange={(e) => {
            const isChecked = e.target.checked;
            setAvailableOnly(isChecked);
            const params = new URLSearchParams(searchParams.toString());
            if (isChecked) {
              params.set("available", "true");
            } else {
              params.delete("available");
            }
            router.push(pathname + "?" + params.toString());
          }}
        />
        <span className="text-sm">Solo disponibles</span>
      </label>
    </div>
  );
}
