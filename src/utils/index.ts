const tasksStatus = ["To Do", "In Progress", "Done"];
const taskPriorities = ["Low", "Medium", "High"];

const routes = [
  { to: "/", label: "Home" },
  { to: "/tasks", label: "Tasks" },
  { to: "/about", label: "About" },
];

const generateId = () => {
  return Math.floor(Math.random() * 10001);
}

export { tasksStatus, taskPriorities, routes, generateId };
