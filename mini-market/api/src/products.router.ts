import { Router } from "express";
import { Product } from "../../shared/interfaces/products";
import productsData from "./data/products.json";
import {
  filterProducts,
  sortProducts,
  paginateProducts,
} from "./product.service";

const router = Router();

//Búsqueda general de productos
router.get("/", (req, res) => {
  const { search, sort, order, page, limit, available } = req.query;
  let products: Product[] = productsData as Product[];
  products = filterProducts(products, search as string, available as string);
  products = sortProducts(products, sort as string, order as string);
  const {
    paginated,
    page: pageNumber,
    limit: limitNumber,
  } = paginateProducts(products, page as string, limit as string);

  res.json({
    products: paginated,
    total: products.length,
    page: pageNumber,
    limit: limitNumber,
  });
});

//Búsqueda por id
router.get("/:id", (req, res) => {
  const product = productsData.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).send("No hay un producto disponible");
  }
  res.json(product);
});

export default router;
