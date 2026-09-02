"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "../../shared/interfaces/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

function StarRating({ rating }: { rating: { rate: number; count: number } }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating.rate)
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-400 font-medium">
        ({rating.count})
      </span>
    </div>
  );
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/products/${product.id}`} className="block group">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
          {/* Image */}
          <div className="relative aspect-square bg-gradient-to-b from-gray-50 to-white p-6 flex items-center justify-center overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
              className="object-contain w-full h-full max-h-[180px] group-hover:scale-110 transition-transform duration-500 ease-out"
            />
            {/* Category badge */}
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#00703C]/10 text-[#00703C] text-[10px] font-bold rounded-lg uppercase tracking-wider">
              {product.category}
            </span>
          </div>

          {/* Content */}
          <div className="p-4 pt-3 border-t border-gray-50">
            <h3 className="text-[13px] font-semibold text-gray-900 line-clamp-2 mb-2 min-h-[2.2rem] group-hover:text-[#00703C] transition-colors leading-snug">
              {product.title}
            </h3>

            <StarRating rating={product.rating} />

            <div className="flex items-end justify-between mt-3">
              <div>
                <span className="text-xl font-black text-[#00703C]">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <button
                className="p-2 bg-[#00703C]/10 text-[#00703C] rounded-xl hover:bg-[#00703C] hover:text-white transition-all duration-200 group/btn"
                aria-label="Agregar al carrito"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
