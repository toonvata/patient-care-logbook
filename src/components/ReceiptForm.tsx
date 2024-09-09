import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Drug {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ReceiptFormProps {
  drugs: Drug[];
  onClose: () => void;
}

const ReceiptForm: React.FC<ReceiptFormProps> = ({ drugs, onClose }) => {
  const [procedureCost, setProcedureCost] = useState<string>('');

  const totalDrugCost = drugs.reduce((total, drug) => total + drug.price * drug.quantity, 0);
  const totalCost = Number(procedureCost) + totalDrugCost;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">ใบเสร็จค่ารักษา</h2>
      
      <div className="mb-4">
        <Label htmlFor="procedureCost">ค่าหัตถการ</Label>
        <Input
          id="procedureCost"
          type="number"
          value={procedureCost}
          onChange={(e) => setProcedureCost(e.target.value)}
          placeholder="ระบุค่าหัตถการ"
        />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">รายการยา</h3>
        <ul>
          {drugs.map((drug) => (
            <li key={drug.id}>
              {drug.name} x {drug.quantity} - {drug.price * drug.quantity} บาท
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <strong>รวมค่ายา: {totalDrugCost} บาท</strong>
      </div>

      <div className="mb-4">
        <strong>รวมทั้งสิ้น: {totalCost} บาท</strong>
      </div>

      <div className="flex justify-between">
        <Button onClick={handlePrint}>พิมพ์ใบเสร็จ</Button>
        <Button variant="outline" onClick={onClose}>ปิด</Button>
      </div>
    </div>
  );
};

export default ReceiptForm;