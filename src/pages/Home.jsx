import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiShoppingBag,
  FiCheckCircle,
  FiTruck,
} from "react-icons/fi";
import Carousel from "../components/Carousel";
import { getLimitedProducts } from "../utils/api";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const features = [
    {
      icon: (
        <FiCheckCircle className="h-6 w-6 text-primary hover:text-primary/80 font-medium" />
      ),
      title: "Quality Products",
      description:
        "We ensure all our products meet the highest quality standards.",
    },
    {
      icon: (
        <FiTruck className="h-6 w-6 text-primary hover:text-primary/80 font-medium" />
      ),
      title: "Fast Delivery",
      description: "Get your products delivered to your doorstep quickly.",
    },
    {
      icon: (
        <FiShoppingBag className="h-6 w-6 text-primary hover:text-primary/80 font-medium" />
      ),
      title: "Easy Shopping",
      description: "Our user-friendly interface makes shopping a breeze.",
    },
  ];

  useEffect(() => {
    loadCarouselImages();
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const products = await getLimitedProducts(4);
      setFeaturedProducts(products);
    } catch (error) {
      console.error("Failed to fetch featured products:", error);
    } finally {
      setLoading(false);
    }
  };
  const loadCarouselImages = () => {
    const images = import.meta.glob("../assets/images/*.{jpg,jpeg,png,webp}", {
      eager: true,
      as: "url",
    });

    const filteredImages = Object.entries(images)
      .filter(([path]) => !path.includes("Logo.png"))
      .map(([, url]) => url);

    const sortedImages = filteredImages.sort();
    setCarouselImages(sortedImages);
  };

  return (
    <div className="min-h-screen">
      <section className="relative">
        <div className="w-full h-64 md:h-96">
          <Carousel images={carouselImages} />
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Letmegrab?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Featured Products
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Check out our selection of top-selling items that customers love.
          </p>

          {loading ? (
            <div className="flex justify-center">
              <p>Loading featured products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 p-4 flex items-center justify-center bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {product.title}
                    </h3>
                    <p className="text-primary font-medium mt-1">
                      ${product.price}
                    </p>
                    <div className="mt-2">
                      <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/products"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
            >
              View all products <FiArrowRight className="ml-1" />
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start shopping?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Create an account to get started with Letmegrab and discover amazing
            products.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
            <Link
              to="/signup"
              className="bg-white text-primary hover:bg-white/90 px-4 py-2 rounded-md text-base font-medium"
            >
              Sign Up Now
            </Link>
            <Link
              to="/login"
              className="bg-transparent border border-white text-white hover:bg-primary/90 px-4 py-2 rounded-md text-base font-medium"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
