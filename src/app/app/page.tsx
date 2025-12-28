"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
// Assuming these utils exist based on your provided snippet
// import { getContrastRatio, getComplianceLevel } from './utils/colorUtils';

// --- Sub-Component: Help Modal ---
const HelpModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[32px] p-8 md:p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Dashboard Guide</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="space-y-6 text-slate-600">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">palette</span> Color Editor
              </h4>
              <p className="text-xs">Use the hex inputs or the color picker to test background and foreground pairings.</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
              <h4 className="font-bold text-emerald-900 mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">verified</span> WCAG Levels
              </h4>
              <p className="text-xs">AA (4.5:1) is the standard requirement. AAA (7:1) is for enhanced accessibility.</p>
            </div>
          </div>

          <section className="space-y-3">
            <h3 className="font-bold text-slate-900">How to use the Lab</h3>
            <p className="text-sm leading-relaxed">
              The central "Experiment Lab" shows you exactly how your chosen colors will look in a real UI context. 
              The floating badge in the top right provides real-time feedback on your contrast ratio.
            </p>
          </section>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tiny Contrast Pro v1.0</p>
            <button onClick={onClose} className="text-blue-600 font-bold text-sm hover:underline">Got it, thanks!</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App Page ---
export default function AppPage() {
  const [textColor, setTextColor] = useState('#0D141C');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [contrastRatio, setContrastRatio] = useState<number>(21);
  const [compliance, setCompliance] = useState({ aa: true, aaa: true });
  const [isHelpOpen, setIsHelpOpen] = useState(false); // Modal State

  // Function to convert hex to RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    // Remove # if present
    hex = hex.replace(/^#/, '');
    
    // Handle shorthand hex (e.g., #03F)
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }
    
    const num = parseInt(hex, 16);
    return [num >> 16, (num >> 8) & 255, num & 255];
  };

  // Function to calculate relative luminance (WCAG 2.0)
  const getLuminance = (r: number, g: number, b: number): number => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  // Function to calculate contrast ratio between two colors
  const getContrastRatio = (color1: string, color2: string): number => {
    try {
      const [r1, g1, b1] = hexToRgb(color1);
      const [r2, g2, b2] = hexToRgb(color2);
      
      const lum1 = getLuminance(r1, g1, b1);
      const lum2 = getLuminance(r2, g2, b2);
      
      // Ensure lum1 is the lighter color
      const lighter = Math.max(lum1, lum2);
      const darker = Math.min(lum1, lum2);
      
      // Calculate contrast ratio (WCAG 2.0 formula)
      const ratio = (lighter + 0.05) / (darker + 0.05);
      
      // Round to 1 decimal place
      return Math.round(ratio * 10) / 10;
    } catch (e) {
      // Return a default value if color parsing fails
      return 1;
    }
  };

  // Update contrast ratio and compliance when colors change
  useEffect(() => {
    const ratio = getContrastRatio(backgroundColor, textColor); // Note: background first, then text
    setContrastRatio(ratio);
    setCompliance({
      aa: ratio >= 4.5,
      aaa: ratio >= 7
    });
  }, [textColor, backgroundColor]);

  const swapColors = () => {
    const temp = textColor;
    setTextColor(backgroundColor);
    setBackgroundColor(temp);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0F172A] selection:bg-blue-500 selection:text-white pb-12">
      <Head>
        <title>Tiny Contrast Pro | Dashboard</title>
      </Head>

      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
              <span className="material-symbols-outlined text-[20px] font-bold">contrast</span>
            </div>
            <span className="text-xl font-black tracking-tighter">Tiny Contrast <span className="text-blue-600">PRO</span></span>
          </div>
          <div className="flex items-center gap-4 md:gap-6 text-sm font-bold text-slate-500">
            {/* Help Trigger */}
            <button 
              onClick={() => setIsHelpOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <span className="material-symbols-outlined">help</span>
            </button>
            <a 
              href="https://github.com/Boweii22/Tiny-Contrast" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex hover:text-blue-600 transition-colors items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">open_in_new</span>
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* 1. CONTROL CENTER */}
          <aside className="xl:col-span-4 space-y-6">
            <section className="bg-white rounded-[32px] p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Palette Editor</h2>
                <button 
                  onClick={swapColors}
                  className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-all hover:rotate-180 duration-500"
                >
                  <span className="material-symbols-outlined text-[20px]">swap_vert</span>
                </button>
              </div>

              <div className="space-y-6">
                <ColorInputGroup label="Text Color" value={textColor} setter={setTextColor} icon="title" />
                <ColorInputGroup label="Background" value={backgroundColor} setter={setBackgroundColor} icon="format_paint" />
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Accessible Presets</h3>
                <div className="flex flex-wrap gap-2">
                  {['#0F172A', '#2563EB', '#7C3AED', '#DB2777', '#059669', '#FFFFFF', '#F8FAFC'].map((c) => (
                    <button 
                      key={c}
                      onClick={() => setTextColor(c)}
                      className="w-8 h-8 rounded-full border border-slate-200 shadow-sm hover:scale-110 transition-transform"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 2. COMPLIANCE MATRIX */}
            <section className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Compliance Matrix</h2>
              <div className="space-y-3">
                <ComplianceTag label="WCAG AA Normal" pass={compliance.aa} description="Minimum for standard text (4.5:1)" />
                <ComplianceTag label="WCAG AAA Normal" pass={compliance.aaa} description="Enhanced for standard text (7:1)" />
                <ComplianceTag label="Large Text / UI" pass={contrastRatio >= 3} description="Headings & Components (3:1)" />
              </div>
            </section>
          </aside>

          {/* 3. EXPERIMENT LAB */}
          <div className="xl:col-span-8 space-y-8">
            <section 
              className="rounded-[48px] p-8 md:p-16 transition-all duration-700 ease-in-out border border-slate-200 min-h-[600px] relative overflow-hidden flex flex-col justify-center"
              style={{ backgroundColor }}
            >
              <div className="absolute top-8 right-8 flex items-center gap-3 bg-white/10 backdrop-blur-xl p-2 pr-6 rounded-full border border-white/20 shadow-2xl">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                  {contrastRatio.toFixed(1)}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase opacity-60" style={{ color: textColor }}>Contrast Ratio</span>
                  <span className="text-sm font-bold" style={{ color: textColor }}>{contrastRatio >= 4.5 ? 'Optimized' : 'Suboptimal'}</span>
                </div>
              </div>

              <div className="max-w-2xl space-y-8">
                <motion.h2 
                  key={textColor}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]"
                  style={{ color: textColor }}
                >
                  Design with <br />confidence.
                </motion.h2>
                <p className="text-xl md:text-2xl font-medium leading-relaxed opacity-80" style={{ color: textColor }}>
                  The best interfaces are the ones everyone can use. This tool ensures your typography remains crisp and legible across all devices.
                </p>
                <div className="flex flex-wrap gap-4 pt-6">
                  <button className="px-10 py-4 rounded-[20px] font-black text-sm transition-all shadow-xl hover:-translate-y-1" style={{ backgroundColor: textColor, color: backgroundColor }}>
                    Primary Action
                  </button>
                  <button className="px-10 py-4 rounded-[20px] font-black text-sm border-2 transition-all" style={{ borderColor: textColor, color: textColor }}>
                    Secondary
                  </button>
                </div>
              </div>
            </section>

            {/* 4. COMPONENT BENCHMARK */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Navigation Elements</h3>
                  <div className="space-y-4">
                     <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100" style={{ color: textColor }}>
                        <span className="material-symbols-outlined">home</span>
                        <span className="font-bold flex-grow">Dashboard Home</span>
                     </div>
                  </div>
               </div>

               <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Typography Scale</h3>
                  <div className="space-y-2">
                     <div className="text-3xl font-black" style={{ color: textColor }}>Heading One</div>
                     <div className="text-sm opacity-70" style={{ color: textColor }}>Legible even at 12px.</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* RENDER MODAL AT BOTTOM */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}

// Sub-components
function ColorInputGroup({ label, value, setter, icon }: any) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between ml-1">
        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">{label}</label>
        <span className="material-symbols-outlined text-slate-300 text-[18px]">{icon}</span>
      </div>
      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-3">
        <input 
          type="text" 
          value={value} 
          onChange={(e) => setter(e.target.value)} 
          className="bg-transparent flex-grow font-mono font-bold text-sm outline-none uppercase" 
        />
        <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200">
          <input 
            type="color" 
            value={value} 
            onChange={(e) => setter(e.target.value)} 
            className="absolute -inset-2 w-12 h-12 cursor-pointer" 
          />
        </div>
      </div>
    </div>
  );
}

function ComplianceTag({ label, pass, description }: { label: string, pass: boolean, description: string }) {
  return (
    <div className={`p-4 rounded-2xl border transition-all ${pass ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : 'bg-rose-50 border-rose-100 text-rose-900'}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-black uppercase tracking-tighter">{label}</span>
        <span className="material-symbols-outlined text-[20px]">{pass ? 'check_circle' : 'error'}</span>
      </div>
      <p className="text-[10px] font-bold opacity-60">{description}</p>
    </div>
  );
}