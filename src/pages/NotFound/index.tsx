import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="m-[130px] flex items-center justify-center">
      <div className="max-w-5xl p-4 text-center">
        <h1 className="mb-8 text-6xl font-normal text-pallette-600 dark:text-blue-100">
          Ooops 404
        </h1>
        <p className="mb-12 text-balance text-3xl font-semibold text-pallette-600 dark:text-blue-100">
       Seems like you&#39;re lost, let&#39;s get you back on track...
        </p>
        <Link to="/">
          <button className="rounded-full bg-pallette-600 px-9 py-3 text-2xl font-semibold text-pallette-100 transition duration-200 hover:bg-pallette-500 dark:bg-blue-100 dark:text-rose-950 dark:hover:bg-slate-700">
           Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
