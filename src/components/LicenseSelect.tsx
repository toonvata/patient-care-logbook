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
    <select
      name="licenseNumber"
      value={licenseNumber}
      onChange={onChange}
      className="w-full p-2 border rounded"
    >
      <option value="">เลือกเลขที่ใบอนุญาต</option>
      <option value="57747">57747 (เวชกรรมแผนปัจจุบัน)</option>
      <option value="พทป.2381">พทป.2381 (แพทย์แผนไทยประยุกต์)</option>
    </select>
  </div>
);

export default LicenseSelect;