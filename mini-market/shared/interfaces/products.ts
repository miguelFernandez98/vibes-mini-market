export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export interface ProductsSearchParams {
  search?: string;
  sort?: string;
  order?: string;
  page?: string;
  limit?: string;
  category?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}
