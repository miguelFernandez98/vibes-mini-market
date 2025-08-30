import Image from "next/image";
import Link from "next/link";
import { Product } from "../../shared/interfaces/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const CardContent = (
    <div className="relative w-full aspect-square flex justify-center items-center">
      <Image
        className="max-h-[200px] object-contain"
        priority
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
      />
    </div>
  );

  return (
    <section
      className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-250 ${
        product.isAvailable ? "hover:scale-105" : "cursor-not-allowed"
      }`}
    >
      {product.isAvailable ? (
        <Link
          href={`/products/${product.id}`}
          passHref
          aria-label={`Ver detalles de ${product.name}`}
        >
          {CardContent}
        </Link>
      ) : (
        <div className="pointer-events-none ">{CardContent}</div>
      )}
      <article className="p-4 flex flex-col items-start border-t border-gray-200 drop-shadow-sm bg-white/70">
        <h3 className="text-[16px] font-semibold text-[#020618] line-clamp-2">
          {product.name}
        </h3>
        <p className="text-[14px] text-[#020618]/80 mt-1">
          ${product.price.toFixed(2)}
        </p>
        <div
          className={`px-5 py-1.5 rounded-full text-xs font-medium self-end ${
            product.isAvailable
              ? "bg-green-200 text-green-800"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {product.isAvailable ? "En stock" : "Sin stock"}
        </div>
      </article>
    </section>
  );
};

export default ProductCard;
