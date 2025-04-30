import { FiEye, FiEdit2, FiTrash } from "react-icons/fi";

export default function ProductCard({ product, onView, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative pb-[100%]">
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-contain p-4"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
            {product.category}
          </span>
          <span className="font-bold text-indigo-600">
            ${product.price?.toFixed(2)}
          </span>
        </div>

        <h3
          className="text-gray-900 font-medium text-sm sm:text-base mb-2 truncate"
          title={product.title}
        >
          {product.title}
        </h3>

        <p
          className="text-gray-500 text-sm mb-4 line-clamp-2"
          title={product.description}
        >
          {product.description}
        </p>

        <div className="flex justify-between pt-2 border-t">
          <button
            onClick={() => onView(product)}
            className="flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            aria-label="View product"
          >
            <FiEye size={18} />
            <span className="ml-1 text-sm">View</span>
          </button>

          <button
            onClick={() => onEdit(product)}
            className="flex items-center justify-center p-2 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
            aria-label="Edit product"
          >
            <FiEdit2 size={18} />
            <span className="ml-1 text-sm">Edit</span>
          </button>

          <button
            onClick={() => onDelete(product)}
            className="flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            aria-label="Delete product"
          >
            <FiTrash size={18} />
            <span className="ml-1 text-sm">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
