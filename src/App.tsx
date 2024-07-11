import { Route, Routes } from "react-router";
import Homepage from "./pages/Home";
import TaskPage from "./pages/Tasks";
import Navbar from "./components/Navbar";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/tasks" element={<TaskPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
