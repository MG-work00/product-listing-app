import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Carousel({ images, autoplaySpeed = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, autoplaySpeed);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length, autoplaySpeed]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imagePromises = images.map((src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        });

        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error("Error preloading images:", error);
        setIsLoading(false);
      }
    };

    if (images && images.length > 0) {
      loadImages();
    }
  }, [images]);

  const handleUserNavigation = (updateFn) => {
    setIsAutoPlaying(false);
    updateFn();
  };

  const goToPrevious = () => {
    handleUserNavigation(() =>
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    );
  };

  const goToNext = () => {
    handleUserNavigation(() =>
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    );
  };

  const goToSlide = (index) => {
    handleUserNavigation(() => setCurrentIndex(index));
  };

  useEffect(() => {
    if (!isAutoPlaying) {
      const timeout = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isAutoPlaying, currentIndex]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        <p className="text-gray-500 text-sm italic">No images to display</p>
      </div>
    );
  }

  const navButtonClasses =
    "absolute top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-3 rounded-full z-20 transition-all duration-300";

  return (
    <div className="relative w-full h-full overflow-hidden">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          <div className="relative h-full w-full">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-opacity duration-700 ${
                  currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          <button
            onClick={goToPrevious}
            className={`${navButtonClasses} left-4`}
            aria-label="Previous slide"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className={`${navButtonClasses} right-4`}
            aria-label="Next slide"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-white w-8"
                    : "bg-white bg-opacity-50 w-2.5"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
