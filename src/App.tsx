import { Route, Routes } from "react-router";
import Homepage from "./pages/Home";
import TaskPage from "./pages/Tasks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/tasks" element={<TaskPage />} />
    </Routes>
  );
}

export default App;
