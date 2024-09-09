import React from 'react';
import { Treatment } from '../types';

interface DateInputsProps {
  treatment: Treatment;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInputs: React.FC<DateInputsProps> = ({ treatment, handleChange }) => (
  <>
    <input
      type="date"
      name="startDate"
      value={treatment.startDate}
      onChange={handleChange}
      placeholder="วันที่เริ่มลา"
      className="w-full p-2 border rounded"
    />
    <input
      type="date"
      name="endDate"
      value={treatment.endDate}
      onChange={handleChange}
      placeholder="วันที่สิ้นสุดการลา"
      className="w-full p-2 border rounded"
    />
    <input
      type="number"
      name="dayCount"
      value={treatment.dayCount}
      onChange={handleChange}
      placeholder="จำนวนวันลา"
      className="w-full p-2 border rounded"
    />
  </>
);

export default DateInputs;