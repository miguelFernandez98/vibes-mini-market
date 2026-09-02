import Hero from "@/components/Hero";
import Link from "next/link";
import { getCategories, getProducts } from "@/lib/products-api";
import ProductCard from "@/components/ProductCard";
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Headphones,
  Star,
  Zap,
} from "lucide-react";
import { Product } from "../../shared/interfaces/products";

const features = [
  {
    icon: Truck,
    title: "Envio Gratis",
    description: "En compras +$50",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Shield,
    title: "Pago Seguro",
    description: "100% protegido",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: RotateCcw,
    title: "30 Dias",
    description: "Para devolver",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Headphones,
    title: "Soporte 24/7",
    description: "Estamos para ti",
    color: "bg-purple-50 text-purple-600",
  },
];

const categoryIcons: Record<string, string> = {
  electronics: "💻",
  jewelery: "💍",
  "men's clothing": "👔",
  "women's clothing": "👗",
};

export default async function HomePage() {
  let products: Product[] = [];
  let categories: string[] = [];

  try {
    [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);
  } catch {
    products = [];
    categories = [];
  }

  const featuredProducts = products.slice(0, 8);

  return (
    <div>
      <Hero />

      {/* Features bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className={`p-2.5 rounded-xl ${feature.color}`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#00703C]/10 text-[#00703C] text-xs font-semibold rounded-md mb-3">
              <Zap className="w-3 h-3" />
              CATEGORIAS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Explora por categorias
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#00703C] hover:text-[#005a30] transition-colors"
          >
            Ver todo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              className="group"
            >
              <div className="bg-white rounded-2xl p-5 sm:p-6 text-center hover:shadow-lg hover:shadow-[#00703C]/5 hover:ring-2 hover:ring-[#00703C]/20 transition-all duration-300 border border-gray-100">
                <span className="text-4xl sm:text-5xl mb-3 block group-hover:scale-110 transition-transform duration-300">
                  {categoryIcons[category] || "📦"}
                </span>
                <h3 className="text-sm font-bold text-gray-900 capitalize group-hover:text-[#00703C] transition-colors">
                  {category}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-600 text-xs font-semibold rounded-md mb-3">
                <Star className="w-3 h-3 fill-amber-400" />
                DESTACADOS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Productos destacados
              </h2>
              <p className="text-gray-500 mt-1 text-sm">
                Los mas populares de nuestra tienda
              </p>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#00703C] hover:text-[#005a30] transition-colors"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#00703C] text-white text-sm font-semibold rounded-full"
            >
              Ver todos los productos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="bg-gradient-to-r from-[#00703C] to-[#005a30] rounded-3xl p-8 sm:p-10 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b00]/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-2xl" />
          </div>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
              ¿Listo para comprar?
            </h2>
            <p className="text-white/70 mb-6 max-w-md mx-auto text-sm sm:text-base">
              Explora nuestro catalogo completo y encuentra los mejores
              precios en productos de calidad.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#00703C] font-bold rounded-full hover:bg-gray-50 transition-all duration-200 shadow-lg shadow-black/10"
            >
              Explorar productos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
