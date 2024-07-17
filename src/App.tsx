// React Route
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import AppLayout from "./components/AppLayout";
import Homepage from "./pages/Home";
import TaskPage from "./pages/Tasks";
import AboutPage from "./pages/About";

// Providers
import { OpenSidebarProvider } from "./context/SidebarContext";
import { Toaster } from "./components/@/components/ui/toaster";
import { KanbanProvider } from "./context/KanbanContext";

function App() {
  return (
    <>
      <OpenSidebarProvider>
        <KanbanProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Homepage />} />
                <Route path="/tasks" element={<TaskPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </KanbanProvider>
      </OpenSidebarProvider>
      <Toaster />
    </>
  );
}

export default App;
