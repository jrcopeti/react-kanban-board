import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className='flex gap-2 text-xl'>
      This is about page
      <Link to="/" className='border rounded-lg bg-gray-700 text-white p-3'>Back to home</Link>
    </div>
  );
}

export default AboutPage;
