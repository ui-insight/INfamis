import { Link } from "react-router";

function HomePage() {
  return (
    <div className="py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">INfamis</h1>
        <p className="text-lg text-gray-600 mb-8">
          Integrated Facilities and Asset Management Information System
        </p>
        <Link
          to="/projects"
          className="rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700"
        >
          View Project Requests
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
