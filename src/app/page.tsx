"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// --- Sub-Component: Help Modal ---
const HelpModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[32px] p-8 md:p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <span className="material-symbols-outlined text-[20px]">info</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">About Tiny Contrast</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="space-y-8 text-slate-600">
          <section>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Welcome to Tiny Contrast</h3>
            <p className="leading-relaxed">
              A modern tool for checking color contrast ratios and ensuring your designs meet 
              <span className="text-slate-900 font-semibold"> WCAG 2.1 accessibility standards</span>. 
              Our mission is to make the web readable for everyone, one pixel at a time.
            </p>
          </section>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="material-symbols-outlined text-blue-600 mb-2">check_circle</span>
              <h4 className="font-bold text-slate-900 mb-1">Compliance</h4>
              <p className="text-sm">Instant AA and AAA validation for normal and large text sizes.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="material-symbols-outlined text-blue-600 mb-2">palette</span>
              <h4 className="font-bold text-slate-900 mb-1">Live Preview</h4>
              <p className="text-sm">See how your colors look on buttons, links, and long-form text.</p>
            </div>
          </div>
          
          <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-sm font-bold text-slate-900">Tiny Contrast PRO</p>
              <p className="text-xs text-slate-400">Version 1.0.0 • Created with ❤️ for Designers</p>
            </div>
            <a 
              href="https://github.com/Boweii22/Tiny-Contrast" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all"
            >
              <span className="material-symbols-outlined text-base">code</span>
              View Source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function Home() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-[#1F2937] flex flex-col">
      <Head>
        <title>Tiny Contrast — Color Accessibility Checker</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
      </Head>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
              <span className="material-symbols-outlined text-[20px] font-bold">contrast</span>
            </div>
            <span className="text-xl font-black tracking-tighter">Tiny Contrast <span className="text-blue-600">PRO</span></span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6 text-sm font-bold text-slate-500">
            <button 
              onClick={() => setIsHelpOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              aria-label="Open Help"
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

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center pt-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-[40px] font-extrabold tracking-tight mb-3">Check color accessibility</h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            Ensure your design is accessible to everyone with our real-time WCAG contrast ratio calculator.
          </p>
          <div className="mt-8">
            <Link href="/app" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-[#0D7FF2] hover:bg-blue-600 transition-all shadow-md hover:shadow-lg">
              Get Started
              <span className="ml-2 material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Tool UI Preview */}
        <div className="w-full max-w-[900px] bg-[#F8FAFC] rounded-[32px] p-1 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 mb-20">
          <div className="bg-white rounded-[28px] overflow-hidden shadow-sm">
            <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center border-b border-slate-50">
              <ColorInput label="Text Color" color="#1F2937" icon="font_download" />
              <button className="p-3 bg-slate-100 rounded-full text-slate-400 hover:bg-slate-200 transition-colors">
                <span className="material-symbols-outlined">swap_horiz</span>
              </button>
              <ColorInput label="Background Color" color="#F3F4F6" icon="format_paint" />
            </div>

            <div className="px-8 py-6 bg-white flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Contrast Ratio</div>
                <div className="text-[44px] font-extrabold leading-none">15.4:1</div>
                <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span> Excellent
                </div>
              </div>
              <div className="flex gap-2">
                <Badge label="WCAG AA" status="Pass" />
                <Badge label="WCAG AAA" status="Pass" />
                <Badge label="GRAPHICAL" status="Pass" />
              </div>
            </div>

            <div className="bg-[#F3F4F6] p-8 md:p-12 grid md:grid-cols-[1.5fr_1fr] gap-12 text-[#1F2937]">
              <div>
                <h2 className="text-[48px] font-bold leading-[1.1] mb-8">The quick brown fox jumps over the lazy dog.</h2>
                <p className="text-lg leading-relaxed">Color contrast is a critical part of web accessibility.</p>
              </div>
              <div className="flex flex-col gap-4">
                <button className="bg-[#1F2937] text-white py-4 rounded-lg font-semibold">Primary Action</button>
                <button className="border-2 border-[#1F2937] py-4 rounded-lg font-semibold">Secondary Action</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-16 px-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <FooterSection icon="info" title="Understanding Contrast">
            Accessibility is essential. <strong className="text-slate-900">AA Level</strong> requires 4.5:1, while <strong className="text-slate-900">AAA</strong> requires 7:1.
          </FooterSection>
          <FooterSection icon="article" title="Resources">
            <ul className="space-y-2 font-bold text-slate-600">
              <li><Link href="#" className="hover:text-blue-600">W3C Guidelines</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Success Criterion 1.4.3</Link></li>
            </ul>
          </FooterSection>
          <FooterSection icon="share" title="Share Tool">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-100 rounded-lg font-bold text-sm">Twitter</button>
              <button className="px-4 py-2 bg-slate-100 rounded-lg font-bold text-sm">LinkedIn</button>
            </div>
          </FooterSection>
        </div>
      </footer>

      {/* MODAL MOVED TO ROOT LEVEL */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}

// --- Helper Components ---

function ColorInput({ label, color, icon }: { label: string; color: string; icon: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[12px] font-bold uppercase tracking-wider text-slate-500 flex justify-between">
        {label} <span className="material-symbols-outlined text-sm">{icon}</span>
      </label>
      <div className="flex items-center bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 px-4">
        <div className={`w-8 h-8 rounded-lg mr-3 border border-slate-200`} style={{ backgroundColor: color }}></div>
        <span className="flex-grow font-mono text-slate-700">{color}</span>
        <span className="material-symbols-outlined text-slate-400">colorize</span>
      </div>
    </div>
  );
}

function Badge({ label, status }: { label: string; status: string }) {
  return (
    <div className="border border-slate-200 rounded-xl p-3 px-5 text-center min-w-[100px] bg-white">
      <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">{label}</div>
      <div className="text-green-600 font-bold text-sm flex items-center justify-center gap-1">
        <span className="material-symbols-outlined text-[14px]">check</span> {status}
      </div>
    </div>
  );
}

function FooterSection({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h4 className="flex items-center gap-3 text-[#0D7FF2] font-black text-xs uppercase tracking-[0.2em]">
        <span className="material-symbols-outlined text-xl">{icon}</span> {title}
      </h4>
      <div className="text-slate-500 text-[15px] leading-relaxed font-medium">{children}</div>
    </div>
  );
}