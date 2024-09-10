import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PatientManagement from "./components/PatientManagement";
import TreatmentManagement from "./components/TreatmentManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">ระบบบันทึกประวัติผู้ป่วยและการรักษา</h1>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/patients" element={<PatientManagement />} />
            <Route path="/treatments" element={<TreatmentManagement />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;