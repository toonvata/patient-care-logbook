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
  { id: 1, name: "Cinnariz 500mg 10's/แผง", price: 80, unit: "แผง" },
  { id: 2, name: "Montelukast 500mg 10's/แผง", price: 48, unit: "แผง" },
  { id: 3, name: "Flucloxin 500mg 10's/แผง", price: 64, unit: "แผง" },
  { id: 4, name: "Roxithrin 150mg 10's/แผง", price: 64, unit: "แผง" },
  { id: 5, name: "Brovon 8mg 10's/แผง", price: 80, unit: "แผง" },
  { id: 6, name: "Tanyl 2.5mg/แผง", price: 60, unit: "แผง" },
  { id: 7, name: "Amitriptyline 10mg/เม็ด", price: 24, unit: "เม็ด" },
  { id: 8, name: "T.A. Cream 0.1% 5g/หลอด", price: 48, unit: "หลอด" },
  { id: 9, name: "Silvederm CR 2.5g/TO/หลอด", price: 80, unit: "หลอด" },
  { id: 10, name: "Metformin GPO 500mg 10's/แผง", price: 16, unit: "แผง" },
  { id: 11, name: "Norgetic 10's/แผง", price: 56, unit: "แผง" },
  { id: 12, name: "Parasin 10's/แผง", price: 16, unit: "แผง" },
  { id: 13, name: "Ibrofen 400mg 10's/TO/แผง", price: 32, unit: "แผง" },
  { id: 14, name: "CPM 4mg 100's/ขวด/ขวด", price: 16, unit: "ขวด" },
  { id: 15, name: "Allermine 10mg 10's/แผง", price: 32, unit: "แผง" },
  { id: 16, name: "AUBES-S 10's/แผง", price: 56, unit: "แผง" },
  { id: 17, name: "Dexderm 4mg 10's/แผง", price: 80, unit: "แผง" },
  { id: 18, name: "Omeprazole 20MG 10's/แผง", price: 48, unit: "แผง" },
  { id: 19, name: "Gaviscon Advance 150ml/ขวด", price: 350, unit: "ขวด" },
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