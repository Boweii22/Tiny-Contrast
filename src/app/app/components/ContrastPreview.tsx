import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, XMarkIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { getContrastRatio, getComplianceLevel } from '../utils/colorUtils';

interface ContrastPreviewProps {
  textColor: string;
  backgroundColor: string;
  className?: string;
}

const ContrastPreview: React.FC<ContrastPreviewProps> = ({
  textColor,
  backgroundColor,
  className = '',
}) => {
  const [textSize, setTextSize] = useState<'normal' | 'large'>('normal');
  const [isBold, setIsBold] = useState(false);

  const contrastRatio = getContrastRatio(textColor, backgroundColor) || 0;
  const { aa, aaa } = getComplianceLevel(contrastRatio, textSize === 'large', isBold);
  
  const isDarkBackground = () => {
    const rgb = backgroundColor.replace('#', '');
    const r = parseInt(rgb.substring(0, 2), 16);
    const g = parseInt(rgb.substring(2, 4), 16);
    const b = parseInt(rgb.substring(4, 6), 16);
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  };

  const textSizeClass = textSize === 'large' ? 'text-2xl' : 'text-base';
  const fontWeightClass = isBold ? 'font-bold' : 'font-normal';

  return (
    <div className={`space-y-6 ${className}`}>
      <div 
        className="relative flex h-48 items-center justify-center rounded-xl p-6 shadow-lg transition-all duration-300"
        style={{ backgroundColor }}
      >
        <motion.div
          key={`${textColor}-${textSize}-${isBold}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p 
            className={`${textSizeClass} ${fontWeightClass} transition-all duration-300`}
            style={{ color: textColor }}
          >
            The quick brown fox jumps over the lazy dog
          </p>
        </motion.div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Text Size</div>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setTextSize('normal')}
              className={`px-3 py-1 text-sm font-medium rounded-l-lg border ${
                textSize === 'normal'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Normal
            </button>
            <button
              type="button"
              onClick={() => setTextSize('large')}
              className={`px-3 py-1 text-sm font-medium rounded-r-lg border ${
                textSize === 'large'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Large (18pt+)
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Font Weight</div>
          <button
            type="button"
            onClick={() => setIsBold(!isBold)}
            className={`px-3 py-1 text-sm font-medium rounded-lg border ${
              isBold
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {isBold ? 'Bold' : 'Normal'}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Contrast Ratio</span>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {contrastRatio.toFixed(2)}:1
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">WCAG AA</span>
              <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex items-center">
              {aa ? (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  <CheckIcon className="mr-1 h-3 w-3" />
                  Pass
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                  <XMarkIcon className="mr-1 h-3 w-3" />
                  Fail
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">WCAG AAA</span>
              <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex items-center">
              {aaa ? (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  <CheckIcon className="mr-1 h-3 w-3" />
                  Pass
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                  <XMarkIcon className="mr-1 h-3 w-3" />
                  Fail
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContrastPreview;
