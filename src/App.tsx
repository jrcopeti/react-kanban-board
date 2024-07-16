import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home";
import TaskPage from "./pages/Tasks";
import AppLayout from "./components/AppLayout";
import AboutPage from "./pages/About";
import { OpenSidebarProvider } from "./context/SidebarContext";
import { Toaster } from "./components/@/components/ui/toaster";
import { KanbanProvider } from "./context/KanbanContext";
import { DragAndDropProvider } from "./context/DragAndDropContext";

function App() {
  return (
    <>
      <KanbanProvider>
        <DragAndDropProvider>
          <OpenSidebarProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/tasks" element={<TaskPage />} />
                  <Route path="/about" element={<AboutPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </OpenSidebarProvider>
        </DragAndDropProvider>
      </KanbanProvider>
      <Toaster />
    </>
  );
}

export default App;
