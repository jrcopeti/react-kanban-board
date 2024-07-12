import { TaskCardProps } from "../types";
import { HiOutlineChevronDoubleUp, HiOutlineChevronDown } from "react-icons/hi";
import { RiEqualLine } from "react-icons/ri";

function TaskCard({ task, updateTaskPoints }: TaskCardProps) {
  const {
    title,
    assignee,
    description,
    createdDate,
    dueDate,
    priority,
    points,
  } = task;
  console.log(points)

  return (
    <div className="m-2 rounded-lg border bg-gray-50 px-2 py-0.5">
      <section className="py-2 text-3xl font-semibold">
        <h2>{title}</h2>
      </section>

      <section className="py-2 text-2xl text-gray-700">
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
      <section className="flex items-center justify-between px-4 py-2 text-2xl">
        <div className="flex items-center justify-start gap-5">
          <button onClick={() => updateTaskPoints(task, (points || 0) - 1)}>
            -
          </button>
          <p>{points}</p>
          <button onClick={() => updateTaskPoints(task, (points || 0) + 1)}>
            +
          </button>
        </div>
        <div>
          {priority === "Low" && <HiOutlineChevronDown color="green" />}
          {priority === "Medium" && <RiEqualLine color="orange" />}
          {priority === "High" && <HiOutlineChevronDoubleUp color="red" />}
        </div>
      </section>
    </div>
  );
}

export default TaskCard;
