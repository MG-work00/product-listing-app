import aboutImg from "../assets/images/Coffee.jpg";

export default function About() {
  return (
    <div className="min-h-screen bg-white px-6 py-16 sm:py-24 lg:px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <img
          src={aboutImg}
          alt="About LetMeGrab"
          className="w-full h-auto rounded-2xl shadow-md object-cover"
        />
      </div>

      <div>
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
          About <span className="text-primary">LetMeGrab</span>
        </h1>
        <p className="text-lg text-gray-600 leading-7">
          LetMeGrab is a sleek, responsive web application designed for product management with a modern UI,
          intuitive experience, and seamless functionality. While our carousel celebrates the aroma of coffee ☕,
          our platform is built to handle a variety of products.
        </p>
        <p className="mt-4 text-lg text-gray-600 leading-7">
          Whether you're viewing, creating, or managing items, LetMeGrab ensures a smooth and delightful experience.
          This project was crafted with React, Vite, and TailwindCSS — following best practices in design and code structure.
        </p>
        <p className="mt-4 text-lg text-gray-600 leading-7">
          Built as a practical task, LetMeGrab focuses on clean code, component reusability, and responsiveness across devices.
          It reflects the dedication to performance, polish, and user-centered design.
        </p>
      </div>
    </div>
  </div>
  );
}
