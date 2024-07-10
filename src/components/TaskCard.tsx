import { Task } from "./types";

function TaskCard({ task }: { task: Task }) {
  const { id, title, assignee, description, status, createdDate, dueDate } =
    task;

  return (
    <div className="m-2 rounded-lg border bg-gray-50 px-2">
      <section className="py-2 text-3xl font-semibold">
        <h2>{title}</h2>
      </section>
      <section className="py-2 text-2xl">
        <p>{description}</p>
      </section>

      <section className="flex flex-col gap-1 text-lg">
        <p>
          <strong>Assignee:</strong> {assignee}
        </p>
        <p>
          <strong>Created Date:</strong> {createdDate}
        </p>
        <p>
          <strong>Due Date:</strong> {dueDate}
        </p>
      </section>
      <section className="flex justify-between gap-4 py-2 text-2xl text-gray-700">
        <p>{id}</p>
        <p>{status}</p>
      </section>
    </div>
  );
}

export default TaskCard;
