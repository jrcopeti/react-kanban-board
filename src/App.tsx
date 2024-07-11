import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home";
import TaskPage from "./pages/Tasks";
import AppLayout from "./components/AppLayout";
import AboutPage from "./pages/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
