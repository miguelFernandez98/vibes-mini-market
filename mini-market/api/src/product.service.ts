import { Product } from "../../shared/interfaces/products";

export const filterProducts = (
  products: Product[],
  search?: string,
  available?: string
): Product[] => {
  let result = products;
  if (search) {
    const searchText = search.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(searchText));
  }
  if (available === "true") {
    result = result.filter((p) => p.isAvailable);
  }
  return result;
};

export const sortProducts = (
  products: Product[],
  sort?: string,
  order?: string
): Product[] => {
  if (!sort || !order) return products;
  const sorted = [...products];
  if (sort === "price") {
    sorted.sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
  } else if (sort === "name") {
    sorted.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (order === "asc") return nameA.localeCompare(nameB);
      else return nameB.localeCompare(nameA);
    });
  }
  return sorted;
};

export const paginateProducts = (
  products: Product[],
  page?: string,
  limit?: string
): { paginated: Product[]; page: number; limit: number } => {
  const pageNumber = Math.max(parseInt(page || "1"), 1);
  const limitNumber = Math.max(parseInt(limit || "10"), 1);
  const startIndex = (pageNumber - 1) * limitNumber;
  const paginated = products.slice(startIndex, startIndex + limitNumber);
  return { paginated, page: pageNumber, limit: limitNumber };
};
