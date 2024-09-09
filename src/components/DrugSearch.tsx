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
  // ... add all other drugs from the list
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
        <ul className="border rounded p-2">
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