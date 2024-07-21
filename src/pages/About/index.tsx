function About() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-5xl p-4 text-center">
        <h1 className="mb-8 text-6xl font-normal text-pallette-600 dark:text-blue-100">
          About KanDo
        </h1>
        <p className="mb-12 text-balance text-2xl font-semibold text-pallette-600 dark:text-blue-100">
          Welcome to KanDo. We are a task management tool designed to help you
          stay organized and focused. KanDo leverages the power of Kanban to
          help you visualize, organize, and complete your tasks with ease.
        </p>
        <h2 className="mb-8 text-4xl font-semibold text-pallette-600 dark:text-blue-100">
          Our Mission
        </h2>
        <p className="mb-12 text-balance text-2xl font-semibold text-pallette-600 dark:text-blue-100">
          At KanDo, our mission is to empower individuals and teams to achieve
          their goals effortlessly. We believe that with the right tools, anyone
          can transform their workflow and reach new heights of productivity.
        </p>
        <h2 className="mb-8 text-4xl font-semibold text-pallette-600 dark:text-blue-100">
          What We Offer
        </h2>
        <ul className="mb-12 list-inside list-disc text-center text-2xl font-semibold text-pallette-600 dark:text-blue-100">
          <li>
            Easy to Use: Our straightforward design helps you get started
            quickly and stay organized.
          </li>
          <li>
            Adaptable: Use it for any project, big or small, personal or
            professional.
          </li>
          <li>
            Track Progress: See your progress clearly and move tasks from a
            range of columns.
          </li>
        </ul>
        <h2 className="mb-8 text-4xl font-semibold text-pallette-600 dark:text-blue-100">
          Why Choose Kan Do?
        </h2>
        <p className="mb-12 text-balance text-2xl font-semibold text-pallette-600 dark:text-blue-100">
          KanDo provides the clarity and control needed to succeed. Whether for
          complex projects or new ideas, we help you focus on what matters and
          achieve your goals. Join us and make your aspirations a reality with
          KanDo.
        </p>
      </div>
    </div>
  );
}

export default About;
