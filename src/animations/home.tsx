import { Link } from "react-router";

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Animation Recipes
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/stepper"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer block"
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Stepper
            </h2>
            <p className="text-gray-600">
              Interactive step-by-step animation component
            </p>
          </Link>
          <Link
            to="/email"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer block"
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Email Client
            </h2>
            <p className="text-gray-600">Interactive email client component</p>
          </Link>
          <Link
            to="/books"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer block"
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Book Library
            </h2>
            <p className="text-gray-600">Interactive book library component</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
