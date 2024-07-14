const tasksStatus = ["to do", "in progress", "done"];
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
  { label: "none", color: "" },
];

const sortedLabels = [
  ...taskLabelsWithColors.sort((a, b) => a.label.localeCompare(b.label)),
];
const labels = sortedLabels.map((label) => label.label);

const randomLabelIndex = Math.floor(Math.random() * 15);

const labelOptions = [
  { value: "", label: "Select a Label" },
  ...sortedLabels.map((label) => ({
    value: label.label,
    label: label.label,
  })),
  { value: "", label: "none" },
];

const routes = [
  { to: "/", label: "Home" },
  { to: "/tasks", label: "Tasks" },
  { to: "/about", label: "About" },
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
};
