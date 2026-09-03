import { getProductById, getProducts } from "@/lib/products-api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
} from "lucide-react";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: String(product.id),
  }));
}

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  let product;
  try {
    product = await getProductById(id);
  } catch {
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
          <Link
            href="/"
            className="hover:text-[#00703C] transition-colors"
          >
            Inicio
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href="/products"
            className="hover:text-[#00703C] transition-colors"
          >
            Productos
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-700 font-medium truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image section */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 sm:p-12 flex items-center justify-center relative min-h-[300px] sm:min-h-[400px]">
              <Link
                href="/products"
                className="absolute top-4 left-4 p-2.5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow z-10"
              >
                <ArrowLeft className="w-4 h-4 text-gray-600" />
              </Link>
              <Image
                src={product.image}
                alt={product.title}
                width={350}
                height={350}
                className="object-contain max-h-[300px] sm:max-h-[350px]"
                priority
              />
            </div>

            {/* Details section */}
            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              <span className="inline-block px-3 py-1 bg-[#00703C]/10 text-[#00703C] text-xs font-bold rounded-lg uppercase tracking-wider w-fit mb-4">
                {product.category}
              </span>

              <h1 className="text-xl sm:text-2xl lg:text-[28px] font-black text-gray-900 mb-3 leading-tight tracking-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(product.rating.rate)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  <strong className="text-gray-900">{product.rating.rate}</strong>{" "}
                  ({product.rating.count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-5 pb-5 border-b border-gray-100">
                <span className="text-3xl sm:text-4xl font-black text-[#00703C]">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                {product.description}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#00703C] text-white font-bold rounded-xl hover:bg-[#005a30] transition-all duration-200 shadow-lg shadow-[#00703C]/20 hover:shadow-xl hover:shadow-[#00703C]/30">
                  <ShoppingCart className="w-5 h-5" />
                  Agregar al carrito
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-red-300 hover:text-red-500 hover:bg-red-50/50 transition-all duration-200">
                  <Heart className="w-5 h-5" />
                  Favoritos
                </button>
              </div>

              {/* Benefits */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#00703C]/10 rounded-lg">
                    <Truck className="w-4 h-4 text-[#00703C]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Envio gratis
                    </p>
                    <p className="text-xs text-gray-500">
                      En compras mayores a $50
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#00703C]/10 rounded-lg">
                    <Shield className="w-4 h-4 text-[#00703C]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Garantia de 1 ano
                    </p>
                    <p className="text-xs text-gray-500">
                      Producto garantizado
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#00703C]/10 rounded-lg">
                    <RotateCcw className="w-4 h-4 text-[#00703C]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Devolucion facil
                    </p>
                    <p className="text-xs text-gray-500">
                      30 dias para devolver
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
