import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Homepage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-lg bg-pallette-100 bg-opacity-75 p-8 text-center shadow-lg">
        <h1 className="mb-4 text-6xl font-semibold text-pallette-600">
          Welcome
        </h1>
        <p className="mb-6 text-pretty text-2xl font-semibold text-pallette-600">
          At Kan Do, we turn chaos into clarity—navigating tasks with ease and
          driving progress, one step at a time.
        </p>
        <Link to="/Tasks">
          {" "}
          {/* Link to the existing Tasks page */}
          <button className="rounded-md bg-pallette-600 px-6 py-2 text-2xl text-white transition duration-200 hover:bg-pallette-500">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
