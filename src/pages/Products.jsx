import { useState, useEffect } from "react";
import {
  FiSearch,
  FiFilter,
  FiX,
  FiEye,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import ProductModal from "../components/ProductModal";
import {
  getProducts,
  getCategories,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
} from "../utils/api";
import { showSuccessToast, showErrorToast } from "../components/Toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!products.length) return;

    let result = [...products];

    if (selectedCategory) {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.price.toString().includes(searchLower)
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);

    try {
      setLoading(true);
      if (category) {
        const categoryProducts = await getProductsByCategory(category);
        setProducts(categoryProducts);
        setFilteredProducts(categoryProducts);
      } else {
        const allProducts = await getProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      }
    } catch (error) {
      console.error("Error filtering by category:", error);
      setError("Failed to filter products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openViewModal = (product) => {
    setSelectedProduct(product);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setModalMode("delete");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setModalMode(null);
  };

  // update product func..
  const handleUpdateProduct = async (id, updatedData) => {
    try {
      await updateProduct(id, updatedData);
      const updatedProducts = products.map((product) =>
        product.id === id ? { ...product, ...updatedData } : product
      );

      setProducts(updatedProducts);
      showSuccessToast(`Product "${updatedData.title}" updated successfully!`);

      closeModal();
    } catch (error) {
      console.error("Error updating product:", error);
      showErrorToast("Failed to update product. Please try again.");
    }
  };

  // delete product func..
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      const remainingProducts = products.filter((product) => product.id !== id);
      setProducts(remainingProducts);
      setFilteredProducts(remainingProducts);

      const deletedProduct = products.find((product) => product.id === id);
      showSuccessToast(
        `Product "${deletedProduct.title}" deleted successfully!`
      );

      closeModal();
    } catch (error) {
      console.error("Error deleting product:", error);
      showErrorToast("Failed to delete product. Please try again.");
    }
  };

  const clearFilters = async () => {
    setSearchTerm("");
    setSelectedCategory("");
    try {
      setLoading(true);
      const productsData = await getProducts();
      setProducts(productsData);
      setFilteredProducts(productsData);
    } catch (error) {
      console.error("Error resetting products:", error);
      setError("Failed to reset products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage and explore your product catalog
        </p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiFilter className="text-gray-400" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {(searchTerm || selectedCategory) && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FiX className="mr-2" />
            Clear Filters
          </button>
        )}
      </div>

      {loading && (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiX className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found matching your criteria.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <div className="max-h-96 overflow-y-auto">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Image
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Product Title
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Product Price
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Product Description
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Product Category
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                              <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <img
                                  src={
                                    product.image || "/api/placeholder/80/80"
                                  }
                                  alt={product.title}
                                  className="h-16 w-16 object-contain rounded-md"
                                />
                              </td>
                              <td className="px-3 py-4 text-sm font-medium text-gray-900 max-w-xs">
                                <div
                                  className="truncate max-w-xs"
                                  title={product.title}
                                >
                                  {truncateText(product.title, 30)}
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                ${product.price}
                              </td>
                              <td className="px-3 py-4 text-sm text-gray-500 max-w-xs">
                                <div
                                  className="truncate max-w-xs"
                                  title={product.description}
                                >
                                  {truncateText(product.description)}
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {product.category}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => openViewModal(product)}
                                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    <FiEye className="mr-1" />
                                    View
                                  </button>
                                  <button
                                    onClick={() => openEditModal(product)}
                                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                  >
                                    <FiEdit className="mr-1" />
                                    Update
                                  </button>
                                  <button
                                    onClick={() => openDeleteModal(product)}
                                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                  >
                                    <FiTrash2 className="mr-1" />
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {isModalOpen && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          mode={modalMode}
          isOpen={isModalOpen}
          onClose={closeModal}
          onUpdate={handleUpdateProduct}
          onDelete={handleDeleteProduct}
          categories={categories}
        />
      )}
    </div>
  );
}
