"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Mail, MapPin, Clock } from "lucide-react";

export function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="py-20 lg:py-24 px-8 lg:px-24 flex flex-col justify-center">
      <div className="w-full max-w-7xl mx-auto" ref={ref}>
        <div className={cn("mb-12 transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
          <div className="text-[11px] tracking-[0.12em] uppercase text-brand font-body font-medium mb-2.5">
            Get in touch
          </div>
          <h2 className="font-display text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-none text-text-main">
            Let&apos;s <span className="text-brand">Connect</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full items-start">
          <div className={cn("flex flex-col transition-all duration-700 delay-100", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            <p className="text-[15px] leading-relaxed text-text-muted mb-8 font-light">
              Have a project in mind or just want to chat? I&apos;m always open to discussing new opportunities, creative ideas, or ways to bring your vision to life.
            </p>
            
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-text-muted font-body">
                <div className="w-9 h-9 rounded-xl bg-brand-dim flex items-center justify-center text-brand shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                shamanthpoojary111@gmail.com
              </div>
              <div className="flex items-center gap-3 text-sm text-text-muted font-body">
                <div className="w-9 h-9 rounded-xl bg-brand-dim flex items-center justify-center text-brand shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                Remote — Bengaluru, IN
              </div>
              <div className="flex items-center gap-3 text-sm text-text-muted font-body">
                <div className="w-9 h-9 rounded-xl bg-brand-dim flex items-center justify-center text-brand shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                Usually responds within 24h
              </div>
            </div>

            <div>
              <a href="mailto:hello@noahcarter.dev" className="glass-button inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body text-sm font-medium decoration-none w-auto">
                Send a message
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>

          <div className={cn("glass-card p-6 md:p-8 rounded-2xl flex flex-col gap-4 transition-all duration-700 delay-300", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-text-dim font-body tracking-[0.04em]">Your name</label>
                <input 
                  type="text" 
                  placeholder="Jane Smith" 
                  className="bg-[rgba(255,255,255,0.02)] border border-border-1 rounded-xl px-4 py-3 font-body text-sm text-text-main outline-none transition-colors duration-200 focus:border-[rgba(232,98,26,0.4)] focus:bg-[rgba(255,255,255,0.04)] placeholder:text-text-dim"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-text-dim font-body tracking-[0.04em]">Email address</label>
                <input 
                  type="email" 
                  placeholder="jane@company.com" 
                  className="bg-[rgba(255,255,255,0.02)] border border-border-1 rounded-xl px-4 py-3 font-body text-sm text-text-main outline-none transition-colors duration-200 focus:border-[rgba(232,98,26,0.4)] focus:bg-[rgba(255,255,255,0.04)] placeholder:text-text-dim"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-text-dim font-body tracking-[0.04em]">Subject</label>
              <input 
                type="text" 
                placeholder="Project inquiry" 
                className="bg-[rgba(255,255,255,0.02)] border border-border-1 rounded-xl px-4 py-3 font-body text-sm text-text-main outline-none transition-colors duration-200 focus:border-[rgba(232,98,26,0.4)] focus:bg-[rgba(255,255,255,0.04)] placeholder:text-text-dim"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-text-dim font-body tracking-[0.04em]">Message</label>
              <textarea 
                rows={5} 
                placeholder="Tell me about your project..." 
                className="bg-[rgba(255,255,255,0.02)] border border-border-1 rounded-xl px-4 py-3 font-body text-sm text-text-main outline-none transition-colors duration-200 focus:border-[rgba(232,98,26,0.4)] focus:bg-[rgba(255,255,255,0.04)] placeholder:text-text-dim resize-none"
              />
            </div>
            
            <button className="glass-button w-full flex items-center justify-center gap-2 mt-2 px-7 py-3.5 rounded-xl font-body text-sm font-medium">
              Send message
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
