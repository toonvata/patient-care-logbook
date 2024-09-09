import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="mb-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-blue-500 hover:text-blue-700">ข้อมูลผู้ป่วย</Link>
        </li>
        <li>
          <Link to="/treatment" className="text-blue-500 hover:text-blue-700">บันทึกการรักษา</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;