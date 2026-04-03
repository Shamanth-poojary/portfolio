export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center relative py-20 px-8 lg:px-24">
      {/* Container */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-12 items-center">
        
        {/* Left Content */}
        <div className="z-10 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 bg-brand-dim border border-[rgba(232,98,26,0.25)] rounded-full px-4 py-1.5 text-xs text-brand-light font-body font-medium tracking-wide mb-6 opacity-0 animate-[fade-up_0.6s_0.1s_forwards]">
            <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            Available for hire
          </div>
          
          <div className="font-body text-lg font-light text-text-muted mb-2 opacity-0 animate-[fade-up_0.6s_0.2s_forwards]">
            Hey there, I&apos;m
          </div>
          
          <h1 className="font-display text-[clamp(52px,6vw,80px)] font-extrabold leading-[0.95] tracking-tight text-text-main opacity-0 animate-[fade-up_0.6s_0.3s_forwards]">
            Noah<span className="text-brand block">Carter.</span>
          </h1>
          
          <p className="font-display text-[clamp(20px,2.5vw,28px)] font-medium text-text-muted mt-3 mb-5 opacity-0 animate-[fade-up_0.6s_0.4s_forwards]">
            Full-Stack Web Developer
          </p>
          
          <p className="text-[15px] leading-relaxed text-text-muted max-w-[420px] mb-8 font-light opacity-0 animate-[fade-up_0.6s_0.5s_forwards]">
            I craft high-performance digital experiences — from pixel-perfect interfaces to scalable backend systems. Turning ideas into products that people love.
          </p>
          
          <div className="flex flex-wrap gap-4 items-center opacity-0 animate-[fade-up_0.6s_0.6s_forwards]">
            <a href="#work" className="glass-button inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body text-sm font-medium decoration-none">
              View my work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
            <a href="#contact" className="bg-transparent text-text-muted border border-border-2 px-6 py-3.5 rounded-full font-body text-sm font-normal transition-all duration-200 hover:border-brand hover:text-brand-light hover:-translate-y-[1px]">
              Let&apos;s talk
            </a>
          </div>
        </div>

        {/* Right Content / Visual */}
        <div className="relative h-[400px] lg:h-[520px] w-full flex justify-center items-end opacity-0 animate-[fade-up_0.8s_0.5s_forwards]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] w-[380px] h-[380px] rounded-full border border-[rgba(232,98,26,0.12)] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] w-[460px] h-[460px] rounded-full border border-[rgba(232,98,26,0.12)] pointer-events-none opacity-50" />

          <div className="absolute bottom-0 w-[340px] h-[460px] flex items-end justify-center pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(232,98,26,0.12) 0%, transparent 70%)' }}>
            {/* Character Placeholder */}
            <div className="relative w-[280px] h-[380px] rounded-t-[140px] rounded-b-[40px] glass-card flex flex-col items-center justify-center gap-3 overflow-hidden pointer-events-auto">
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(232,98,26,0.06) 0%, transparent 60%)' }} />
              <div className="w-20 h-20 rounded-full bg-brand-dim border border-[rgba(232,98,26,0.3)] flex items-center justify-center z-10">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(232,98,26,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M3 21c0-5 9-5 9-5s9 0 9 5"/></svg>
              </div>
              <span className="text-xs text-text-dim font-body z-10">Your 3D character here</span>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-[10%] left-0 animate-[float_4s_ease-in-out_infinite] glass-card px-3 py-2 flex items-center gap-2 rounded-xl backdrop-blur-md">
             <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[rgba(227,76,38,0.15)]">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 3h18l-1.5 13.5L12 21l-7.5-4.5L3 3Z" stroke="#e34c26" strokeWidth="1.5"/><path d="M12 8v5m0 3h.01" stroke="#e34c26" strokeWidth="1.5" strokeLinecap="round"/></svg>
             </div>
             <span className="text-xs font-body text-text-muted">HTML5</span>
          </div>

          <div className="absolute top-[25%] right-[-10px] sm:right-[-20px] animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: '-1.3s' }}>
             <div className="glass-card px-3 py-2 flex items-center gap-2 rounded-xl backdrop-blur-md">
               <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[rgba(38,77,228,0.15)]">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 3h18l-1.5 13.5L12 21l-7.5-4.5L3 3Z" stroke="#264de4" strokeWidth="1.5"/><path d="M8 8h8m-8 4h6" stroke="#264de4" strokeWidth="1.5" strokeLinecap="round"/></svg>
               </div>
               <span className="text-xs font-body text-text-muted">CSS3</span>
             </div>
          </div>

          <div className="absolute top-[50%] left-[-20px] sm:left-[-30px] animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: '-2.6s' }}>
             <div className="glass-card px-3 py-2 flex items-center gap-2 rounded-xl backdrop-blur-md">
               <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[rgba(104,160,99,0.15)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#68a063" strokeWidth="1.5"/><path d="M8 12l4-4 4 4M12 8v8" stroke="#68a063" strokeWidth="1.5" strokeLinecap="round"/></svg>
               </div>
               <span className="text-xs font-body text-text-muted">Node.js</span>
             </div>
          </div>

          <div className="absolute bottom-[20%] right-0 animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: '-0.8s' }}>
             <div className="glass-card px-3 py-2 flex items-center gap-2 rounded-xl backdrop-blur-md">
               <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[rgba(97,219,251,0.1)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill="#61dbfb"/><circle cx="12" cy="12" r="9" stroke="#61dbfb" strokeWidth="1.2"/><ellipse cx="12" cy="12" rx="9" ry="4" stroke="#61dbfb" strokeWidth="1.2"/></svg>
               </div>
               <span className="text-xs font-body text-text-muted">React</span>
             </div>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border-1 hidden sm:flex w-full items-stretch">
        {[
          { num: "5+", label: "Years of experience" },
          { num: "48", label: "Projects delivered" },
          { num: "32", label: "Happy clients" },
          { num: "12", label: "Open source repos" }
        ].map((stat, i) => (
          <div key={i} className="flex-1 py-5 px-6 border-r border-border-1 last:border-r-0 opacity-0 animate-[fade-up_0.5s_forwards]" style={{ animationDelay: `${0.7 + i * 0.15}s` }}>
            <div className="font-display text-[28px] font-extrabold text-brand leading-none mb-1">{stat.num}</div>
            <div className="text-xs text-text-dim font-normal">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
