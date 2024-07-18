// React Route
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import AppLayout from "./components/layout/AppLayout";
import Homepage from "./pages/Home";
import TaskPage from "./pages/Tasks";
import AboutPage from "./pages/About";
import NotFoundPage from "./pages/NotFound";

// Providers
import { OpenSidebarProvider } from "./context/SidebarContext";
import { KanbanProvider } from "./context/KanbanContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "./components/@/components/ui/toaster";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <OpenSidebarProvider>
            <KanbanProvider>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/tasks" element={<TaskPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </KanbanProvider>
          </OpenSidebarProvider>
        </ThemeProvider>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
