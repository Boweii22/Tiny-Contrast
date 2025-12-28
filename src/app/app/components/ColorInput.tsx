import React from 'react';
import { motion } from 'framer-motion';

interface ColorInputProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

const ColorInput: React.FC<ColorInputProps> = ({
  label,
  color,
  onChange,
  className = '',
}) => {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^#?([0-9A-F]{3}){1,2}$/i.test(value) || value === '') {
      const hexValue = value.startsWith('#') ? value : `#${value}`;
      if (hexValue.length <= 7) {
        onChange(hexValue);
      }
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="h-10 w-10 cursor-pointer rounded-md border-2 border-gray-200 bg-white p-0.5 transition-all hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800"
          />
          <div
            className="absolute inset-0 rounded-md border border-white shadow-inner"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width=\'16\' height=\'16\' viewBox=\'0 0 16 16\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h8v8H0V0zm8 8h8v8H8V8z\' fill=\'%23e5e7eb\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
              backgroundSize: '8px 8px',
              pointerEvents: 'none',
            }}
          />
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500">#</span>
          </div>
          <input
            type="text"
            value={color.replace('#', '')}
            onChange={handleHexChange}
            maxLength={6}
            className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-7 pr-3 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="FFFFFF"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorInput;
