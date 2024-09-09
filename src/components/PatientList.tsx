import React, { useState } from 'react';
import { Patient } from '../types';

interface PatientListProps {
  patients: Patient[];
  deletePatient: (hn: string) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, deletePatient }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.hn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">รายชื่อผู้ป่วย</h2>
      <input
        type="text"
        placeholder="ค้นหาผู้ป่วย (ชื่อหรือ HN)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">HN</th>
            <th className="border p-2">ชื่อ-นามสกุล</th>
            <th className="border p-2">วันเกิด</th>
            <th className="border p-2">เบอร์โทรศัพท์</th>
            <th className="border p-2">การดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map(patient => (
            <tr key={patient.hn}>
              <td className="border p-2">{patient.hn}</td>
              <td className="border p-2">{patient.name}</td>
              <td className="border p-2">{patient.birthdate}</td>
              <td className="border p-2">{patient.phone}</td>
              <td className="border p-2">
                <button
                  onClick={() => deletePatient(patient.hn)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;