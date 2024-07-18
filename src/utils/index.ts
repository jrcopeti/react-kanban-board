import { GoBook, GoHome, GoTasklist } from "react-icons/go";

const taskPriorities = ["low", "medium", "high"];

const taskLabelsWithColors = [
  { label: "personal", color: "blue" },
  { label: "work", color: "green" },
  { label: "shopping", color: "red" },
  { label: "study", color: "yellow" },
  { label: "health", color: "purple" },
  { label: "finance", color: "amber" },
  { label: "family", color: "pink" },
  { label: "travel", color: "teal" },
  { label: "hobbies", color: "indigo" },
  { label: "fitness", color: "gray" },
  { label: "social", color: "violet" },
  { label: "cleaning", color: "lime" },
  { label: "appointments", color: "cyan" },
  { label: "cooking", color: "rose" },
  { label: "reading", color: "emerald" },
  { label: "no label", color: "no-color" },
];

const sortedLabels = [
  ...taskLabelsWithColors.sort((a, b) => a.label.localeCompare(b.label)),
];
const labels = sortedLabels.map((label) => label.label);

const randomLabelIndex = Math.floor(Math.random() * 15);

const fib = [1, 2, 3, 5, 8, 13];

const labelOptions = [
  ...sortedLabels.map((label) => ({
    value: label.label,
    label: label.label,
  })),
];

const routes = [
  { to: "/", label: "Home", icon: GoHome },
  { to: "/tasks", label: "Tasks", icon: GoTasklist },
  { to: "/about", label: "About", icon: GoBook },
];

const generateId = () => {
  return Math.floor(Math.random() * 10001);
};

export {
  tasksStatus,
  taskPriorities,
  routes,
  generateId,
  labels,
  taskLabelsWithColors,
  sortedLabels,
  randomLabelIndex,
  labelOptions,
  fib,
};
