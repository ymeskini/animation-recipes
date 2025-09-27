import { Link } from "react-router";

const routes = [
  {
    to: "/stepper",
    title: "Stepper",
    description: "Interactive step-by-step animation component",
  },
  {
    to: "/email",
    title: "Email Client",
    description: "Interactive email client component",
  },
  {
    to: "/books",
    title: "Book Library",
    description: "Interactive book library component",
  },
  {
    to: "/header",
    title: "Header",
    description: "Interactive header component",
  },
  {
    to: "/carousel",
    title: "Carousel",
    description: "Interactive carousel component",
  },
  {
    to: "/resizable-panel",
    title: "Resizable Panel",
    description: "Interactive resizable panel component",
  },
];

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Animation Recipes
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer block"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                {link.title}
              </h2>
              <p className="text-gray-600">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
