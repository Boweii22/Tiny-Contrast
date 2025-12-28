"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { getContrastRatio, getComplianceLevel } from './utils/colorUtils';

export default function AppPage() {
  const [textColor, setTextColor] = useState('#0D141C');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [contrastRatio, setContrastRatio] = useState<number>(21);
  const [compliance, setCompliance] = useState({ aa: true, aaa: true });
  const [activeTab, setActiveTab] = useState('preview');

  useEffect(() => {
    const ratio = getContrastRatio(textColor, backgroundColor);
    setContrastRatio(ratio || 0);
    setCompliance(getComplianceLevel(ratio || 0));
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

      {/* Top Glassmorphic Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
              <span className="material-symbols-outlined text-[20px] font-bold">contrast</span>
            </div>
            <span className="text-xl font-black tracking-tighter">Tiny Contrast <span className="text-blue-600">PRO</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-500">
            <button className="text-slate-400 hover:text-slate-600">
            <span className="material-symbols-outlined">help</span>
          </button>
          <button className="hover:text-blue-600 transition-colors">GitHub</button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* 1. CONTROL CENTER (Left Side) */}
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

              {/* Suggestions Section */}
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

          {/* 3. EXPERIMENT LAB (Right Side) */}
          <div className="xl:col-span-8 space-y-8">
            {/* Main Preview Screen */}
            <section 
              className="rounded-[48px] p-8 md:p-16 transition-all duration-700 ease-in-out border border-slate-200 min-h-[600px] relative overflow-hidden flex flex-col justify-center"
              style={{ backgroundColor }}
            >
              {/* Floating Ratio Badge */}
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
                  <button className="px-10 py-4 rounded-[20px] font-black text-sm border-2 transition-all hover:bg-current hover:bg-opacity-5" style={{ borderColor: textColor, color: textColor }}>
                    Secondary
                  </button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-12 right-12 opacity-10 flex gap-4 pointer-events-none">
                 <span className="material-symbols-outlined text-[120px]" style={{ color: textColor }}>brush</span>
              </div>
            </section>

            {/* 4. COMPONENT BENCHMARK (Bottom Bento) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Navigation Elements</h3>
                  <div className="space-y-4">
                     <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100" style={{ color: textColor }}>
                        <span className="material-symbols-outlined">home</span>
                        <span className="font-bold flex-grow">Dashboard Home</span>
                        <span className="bg-blue-600 text-white text-[10px] px-2 py-1 rounded-md font-black italic">NEW</span>
                     </div>
                     <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 opacity-50">
                        <span className="material-symbols-outlined">settings</span>
                        <span className="font-bold">Settings & API</span>
                     </div>
                  </div>
               </div>

               <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Typography Scale</h3>
                  <div className="space-y-2">
                     <div className="text-3xl font-black" style={{ color: textColor }}>Heading One</div>
                     <div className="text-xl font-bold" style={{ color: textColor }}>Subheading Example</div>
                     <div className="text-sm opacity-70" style={{ color: textColor }}>Small descriptive body text that needs to be legible even at 12px.</div>
                     <div className="pt-4 flex gap-4">
                        <a href="#" className="text-sm font-black underline underline-offset-4 decoration-2" style={{ color: textColor }}>Inline Link</a>
                        <a href="#" className="text-sm font-black flex items-center gap-1" style={{ color: textColor }}>
                          Arrow Link <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-components for cleaner code
function ColorInputGroup({ label, value, setter, icon }: any) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between ml-1">
        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">{label}</label>
        <span className="material-symbols-outlined text-slate-300 text-[18px]">{icon}</span>
      </div>
      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-3 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
        <input 
          type="text" 
          value={value} 
          onChange={(e) => setter(e.target.value)} 
          className="bg-transparent flex-grow font-mono font-bold text-sm outline-none uppercase" 
        />
        <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 shadow-inner">
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