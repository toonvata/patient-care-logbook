import React from 'react';
import { Treatment } from '../types';

interface TreatmentHistoryProps {
  treatments: Treatment[];
  deleteTreatment: (patientHN: string, treatmentDate: string) => void;
}

const TreatmentHistory: React.FC<TreatmentHistoryProps> = ({ treatments, deleteTreatment }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">ประวัติการรักษา</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">วันที่</th>
            <th className="border p-2">อาการ</th>
            <th className="border p-2">การวินิจฉัย</th>
            <th className="border p-2">การรักษา</th>
            <th className="border p-2">การดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {treatments.map(treatment => (
            <tr key={`${treatment.patientHN}-${treatment.date}`}>
              <td className="border p-2">{treatment.date}</td>
              <td className="border p-2">{treatment.symptoms}</td>
              <td className="border p-2">{treatment.diagnosis}</td>
              <td className="border p-2">{treatment.treatment}</td>
              <td className="border p-2">
                <button
                  onClick={() => deleteTreatment(treatment.patientHN, treatment.date)}
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

export default TreatmentHistory;