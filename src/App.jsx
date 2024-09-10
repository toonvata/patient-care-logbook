import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import PatientManagement from "./components/PatientManagement";
import TreatmentManagement from "./components/TreatmentManagement";
import { checkFirebaseConnection } from './firebase';

const queryClient = new QueryClient();

const App = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await checkFirebaseConnection();
      setIsConnected(connected);
    };
    checkConnection();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">ระบบบันทึกประวัติผู้ป่วยและการรักษา</h1>
            {isConnected ? (
              <p className="text-green-500 mb-4">เชื่อมต่อกับ Firebase สำเร็จ</p>
            ) : (
              <p className="text-red-500 mb-4">ไม่สามารถเชื่อมต่อกับ Firebase ได้</p>
            )}
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
};

export default App;