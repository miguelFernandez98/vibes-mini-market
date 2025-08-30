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
