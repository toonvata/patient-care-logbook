import React from 'react';

interface LicenseSelectProps {
  licenseType: string;
  licenseNumber: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const LicenseSelect: React.FC<LicenseSelectProps> = ({ licenseType, licenseNumber, onChange }) => (
  <div>
    <select
      name="licenseType"
      value={licenseType}
      onChange={onChange}
      className="w-full p-2 border rounded mb-2"
    >
      <option value="">เลือกประเภทใบอนุญาต</option>
      <option value="เวชกรรมแผนปัจจุบัน">เวชกรรมแผนปัจจุบัน</option>
      <option value="แพทย์แผนไทยประยุกต์">แพทย์แผนไทยประยุกต์</option>
    </select>
    <input
      type="text"
      name="licenseNumber"
      value={licenseNumber}
      onChange={onChange}
      placeholder="เลขที่ใบอนุญาต"
      className="w-full p-2 border rounded"
      readOnly
    />
  </div>
);

export default LicenseSelect;