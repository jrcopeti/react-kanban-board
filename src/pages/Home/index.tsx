import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-5xl p-4 text-center">
        <h1 className="mb-8 text-6xl font-normal text-pallette-600">Welcome</h1>
        <p className="mb-12 text-balance text-3xl font-semibold text-pallette-600">
          At Kan Do, we turn chaos into clarity—navigating tasks with ease and
          driving progress, one step at a time...
        </p>
        <Link to="/tasks">
          <button className="rounded-full bg-pallette-600 px-9 py-3 text-2xl font-semibold text-pallette-100 transition duration-200 hover:bg-pallette-500">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
