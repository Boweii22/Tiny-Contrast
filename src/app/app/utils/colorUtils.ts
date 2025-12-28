// Convert hex color to RGB
export const hexToRgb = (hex: string): [number, number, number] | null => {
  // Remove # if present
  const hexValue = hex.replace('#', '');
  
  // Parse r, g, b values
  const r = parseInt(hexValue.substring(0, 2), 16);
  const g = parseInt(hexValue.substring(2, 4), 16);
  const b = parseInt(hexValue.substring(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return null;
  }

  return [r, g, b];
};

// Calculate relative luminance (WCAG 2.0)
export const getLuminance = (r: number, g: number, b: number): number => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

// Calculate contrast ratio between two colors
// Returns a ratio from 1 (no contrast) to 21 (max contrast)
export const getContrastRatio = (
  color1: string,
  color2: string
): number | null => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return null;

  const [r1, g1, b1] = rgb1;
  const [r2, g2, b2] = rgb2;

  const luminance1 = getLuminance(r1, g1, b1) + 0.05;
  const luminance2 = getLuminance(r2, g2, b2) + 0.05;

  const ratio =
    luminance1 > luminance2
      ? luminance1 / luminance2
      : luminance2 / luminance1;

  return parseFloat(ratio.toFixed(2));
};

// Get WCAG compliance level
export const getComplianceLevel = (
  contrastRatio: number,
  isLargeText: boolean = false,
  isBold: boolean = false
): { aa: boolean; aaa: boolean } => {
  const isLargeOrBold = isLargeText || isBold;
  
  return {
    aa: isLargeOrBold ? contrastRatio >= 3 : contrastRatio >= 4.5,
    aaa: isLargeOrBold ? contrastRatio >= 4.5 : contrastRatio >= 7,
  };
};

// Generate accessible color suggestions
export const getAccessibleColorSuggestions = (
  textColor: string,
  bgColor: string,
  isTextDark: boolean = false
): string[] => {
  const suggestions: string[] = [];
  const rgb = hexToRgb(isTextDark ? bgColor : textColor);
  
  if (!rgb) return [];
  
  const [r, g, b] = rgb;
  
  // Generate lighter/darker variants
  const factor = isTextDark ? 1.2 : 0.8; // Darken light colors, lighten dark colors
  
  // Generate 3 suggestions
  for (let i = 1; i <= 3; i++) {
    const newR = Math.max(0, Math.min(255, Math.round(r * Math.pow(factor, i))));
    const newG = Math.max(0, Math.min(255, Math.round(g * Math.pow(factor, i))));
    const newB = Math.max(0, Math.min(255, Math.round(b * Math.pow(factor, i))));
    
    const hex = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    
    // Only add if it's different from the original color
    if (hex.toLowerCase() !== (isTextDark ? bgColor : textColor).toLowerCase()) {
      suggestions.push(hex);
    }
    
    if (suggestions.length >= 3) break;
  }
  
  return suggestions;
};
