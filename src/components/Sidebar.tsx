"use client";

import { useState, useEffect } from "react";
import { Home, Lightbulb, Briefcase, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "hero", icon: Home, label: "Home" },
  { id: "skills", icon: Lightbulb, label: "Skills" },
  { id: "work", icon: Briefcase, label: "Work" },
  { id: "contact", icon: Mail, label: "Contact" },
];

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((s) => observer.observe(s));

    return () => {
      sections.forEach((s) => observer.unobserve(s));
    };
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile Top/Bottom Sticky Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around h-16 lg:hidden glass-nav pb-safe">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleScroll(e, item.id)}
            className={cn(
              "p-3 rounded-xl transition-all duration-300 relative",
              activeSection === item.id
                ? "text-brand bg-brand-dim"
                : "text-text-dim hover:text-text-muted hover:bg-surface-2"
            )}
            aria-label={item.label}
          >
            <item.icon className="w-5 h-5" />
          </a>
        ))}
      </nav>

      {/* Desktop Vertical Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[80px] flex-col items-center py-8 z-50 glass-card rounded-none border-t-0 border-b-0 border-l-0 border-r border-border-1">
        <div className="font-display font-extrabold text-2xl text-brand tracking-tighter mb-12">
          N.
        </div>

        <nav className="flex flex-col gap-4 flex-1 w-full items-center">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleScroll(e, item.id)}
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group relative",
                activeSection === item.id
                  ? "text-brand bg-brand-dim"
                  : "text-text-dim hover:text-text-muted hover:bg-surface-2"
              )}
            >
              <div
                className={cn(
                  "absolute left-[-16px] w-[3px] h-6 bg-brand rounded-full transition-opacity duration-300",
                  activeSection === item.id ? "opacity-100" : "opacity-0"
                )}
              />
              <item.icon className="w-5 h-5" strokeWidth={2} />
              <span className="absolute left-[calc(100%+16px)] top-1/2 -translate-y-1/2 bg-dark-100 border border-border-2 text-text-main text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-4 mt-auto">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-brand/50 to-transparent my-2" />
          <a
            href="#"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-text-dim hover:text-text-muted hover:bg-surface-1 transition-all"
            aria-label="GitHub"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-text-dim hover:text-text-muted hover:bg-surface-1 transition-all"
            aria-label="LinkedIn"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-text-dim hover:text-text-muted hover:bg-surface-1 transition-all"
            aria-label="Mail"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </a>
        </div>
      </aside>
    </>
  );
}
