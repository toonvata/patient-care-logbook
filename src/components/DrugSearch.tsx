import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Drug {
  id: number;
  name: string;
  price: number;
  unit: string;
}

const drugList: Drug[] = [
  { id: 1, name: "ยาหม่อง /หลอด", price: 150, unit: "หลอด" },
  { id: 2, name: "ยาดม /ขวด", price: 90, unit: "ขวด" },
  { id: 3, name: "ยาหอม /ซอง", price: 60, unit: "ซอง" },
  { id: 4, name: "ยาแก้ไอ /ขวด", price: 40, unit: "ขวด" },
  { id: 5, name: "ยาแก้แพ้ /เม็ด", price: 20, unit: "เม็ด" },
  { id: 6, name: "ยาแก้แพ้คัดจมูก", price: 35, unit: "เม็ด" },
  { id: 7, name: "ยาแก้ปวดลดไข้พาราเซตามอล", price: 100, unit: "แผง" },
  { id: 8, name: "ยาธาตุน้ำขาวกระเทียมดอง /ขวด", price: 200, unit: "ขวด" },
  { id: 9, name: "ยาธาตุน้ำแดง /ขวด", price: 100, unit: "ขวด" },
  { id: 10, name: "ยาน้ำมันไพล /ขวด", price: 100, unit: "ขวด" },
  { id: 11, name: "ยาน้ำมันเหลือง /ขวด", price: 100, unit: "ขวด" },
  { id: 12, name: "ยาหม่องน้ำ /ขวด", price: 20, unit: "ขวด" },
  { id: 13, name: "ยาธาตุน้ำขาว 200ml. /ขวด", price: 60, unit: "ขวด" },
  { id: 14, name: "ยาเม็ดลูกกลอน /ซอง", price: 20, unit: "ซอง" },
  { id: 15, name: "ยาหอมนวโกฐ /ซอง", price: 20, unit: "ซอง" },
  { id: 16, name: "ยาเขียวหอม /ซอง", price: 20, unit: "ซอง" },
  { id: 17, name: "ยาชงชุมเห็ด /ซอง", price: 20, unit: "ซอง" },
  { id: 18, name: "ยาหอม /ซอง", price: 20, unit: "ซอง" },
  { id: 19, name: "ยาหอมเทพจิตร /ซอง", price: 20, unit: "ซอง" },
];

interface DrugSearchProps {
  onDrugSelect: (drug: Drug, quantity: number) => void;
}

const DrugSearch: React.FC<DrugSearchProps> = ({ onDrugSelect }) => {
  const [search, setSearch] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

  const filteredDrugs = drugList.filter(drug =>
    drug.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDrugSelect = (drug: Drug) => {
    setSelectedDrug(drug);
    setSearch(drug.name);
  };

  const handleAddDrug = () => {
    if (selectedDrug) {
      onDrugSelect(selectedDrug, quantity);
      setSearch('');
      setQuantity(1);
      setSelectedDrug(null);
    }
  };

  return (
    <div className="space-y-2">
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="ค้นหายา"
      />
      {search && (
        <ul className="border rounded p-2 max-h-40 overflow-y-auto">
          {filteredDrugs.map(drug => (
            <li
              key={drug.id}
              onClick={() => handleDrugSelect(drug)}
              className="cursor-pointer hover:bg-gray-100 p-1"
            >
              {drug.name} - {drug.price} บาท/{drug.unit}
            </li>
          ))}
        </ul>
      )}
      {selectedDrug && (
        <div className="flex space-x-2">
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
          />
          <Button onClick={handleAddDrug}>เพิ่มยา</Button>
        </div>
      )}
    </div>
  );
};

export default DrugSearch;