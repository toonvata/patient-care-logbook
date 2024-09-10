import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">ระบบบันทึกประวัติผู้ป่วยและการรักษา</h1>
      <div className="space-y-4">
        <Link to="/patients">
          <Button className="w-64">จัดการข้อมูลผู้ป่วย</Button>
        </Link>
        <Link to="/treatments">
          <Button className="w-64">บันทึกการรักษา</Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;