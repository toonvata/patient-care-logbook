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
  { id: 1, name: "Clindavid 300mg. 10's (Milmed)", price: 80, unit: "แผง" },
  { id: 2, name: "Moxipharm 500mg. 10's", price: 48, unit: "แผง" },
  { id: 3, name: "Floxcipro 500mg. 10's", price: 64, unit: "แผง" },
  { id: 4, name: "Amoxicillin 500mg. 10's", price: 30, unit: "แผง" },
  { id: 5, name: "Paracetamol 500mg. 10's", price: 15, unit: "แผง" },
  { id: 6, name: "Ibuprofen 400mg. 10's", price: 25, unit: "แผง" },
  { id: 7, name: "Omeprazole 20mg. 14's", price: 70, unit: "แผง" },
  { id: 8, name: "Loratadine 10mg. 10's", price: 35, unit: "แผง" },
  { id: 9, name: "Metformin 500mg. 30's", price: 45, unit: "ขวด" },
  { id: 10, name: "Atorvastatin 20mg. 30's", price: 120, unit: "ขวด" },
  { id: 11, name: "Amlodipine 5mg. 30's", price: 60, unit: "ขวด" },
  { id: 12, name: "Losartan 50mg. 30's", price: 80, unit: "ขวด" },
  { id: 13, name: "Sertraline 50mg. 30's", price: 150, unit: "ขวด" },
  { id: 14, name: "Escitalopram 10mg. 30's", price: 180, unit: "ขวด" },
  { id: 15, name: "Gabapentin 300mg. 30's", price: 100, unit: "ขวด" },
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