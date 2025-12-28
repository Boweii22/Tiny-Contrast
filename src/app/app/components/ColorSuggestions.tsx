// src/app/app/components/ColorSuggestions.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';
import { getContrastRatio, getComplianceLevel } from '../utils/colorUtils';

interface ColorSuggestionProps {
  textColor: string;
  backgroundColor: string;
  onColorSelect: (color: string) => void;
}

const getAccessibleColor = (bgColor: string, isDark: boolean, amount: number) => {
  // Simple function to generate accessible colors
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const factor = isDark ? 1 + (amount * 0.2) : 1 - (amount * 0.2);
  const newR = Math.min(255, Math.max(0, Math.round(r * factor)));
  const newG = Math.min(255, Math.max(0, Math.round(g * factor)));
  const newB = Math.min(255, Math.max(0, Math.round(b * factor)));

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

const ColorSuggestion: React.FC<{ 
  color: string; 
  isSelected: boolean;
  onClick: () => void;
  isDark: boolean;
}> = ({ color, isSelected, onClick, isDark }) => (
  <motion.button
    type="button"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`w-10 h-10 rounded-full border-2 ${
      isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'border-transparent'
    }`}
    style={{ backgroundColor: color }}
    aria-label={`Select color ${color}`}
  >
    {isSelected && (
      <span className="flex items-center justify-center h-full">
        <CheckIcon className={`h-5 w-5 ${isDark ? 'text-white' : 'text-black'}`} />
      </span>
    )}
  </motion.button>
);

const ColorSuggestions: React.FC<ColorSuggestionProps> = ({ 
  textColor, 
  backgroundColor,
  onColorSelect 
}) => {
  const isDark = (() => {
    // Simple brightness calculation
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 128;
  })();

  const suggestions = [1, 2, 3].map(amount => 
    getAccessibleColor(backgroundColor, isDark, amount)
  ).filter(color => {
    // Only show suggestions that meet AA contrast
    const ratio = getContrastRatio(color, backgroundColor);
    return ratio && ratio >= 4.5;
  });

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Suggested accessible colors:
      </h3>
      <div className="flex gap-2">
        {suggestions.map((color, index) => (
          <ColorSuggestion
            key={index}
            color={color}
            isSelected={color.toLowerCase() === textColor.toLowerCase()}
            onClick={() => onColorSelect(color)}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSuggestions;