export interface Product {
  id: string;
  name: string;
  price: number;
  description: string; // Descripción del producto - lo agregue para tener mas data de prueba en el backend y mas que mostrar en el front
  isAvailable: boolean;
  category: string;
  image: string;
}

export interface ProductById {
  params: {
    id: string;
  };
}
export interface ProductsSearchParams {
  search?: string;
  sort?: string;
  order?: string;
  page?: string;
  limit?: string;
  available?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}
