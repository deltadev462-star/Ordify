const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full animate-float animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, hsl(175 80% 50% / 0.15) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full animate-float-delayed animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, hsl(280 80% 60% / 0.12) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(200 90% 55% / 0.1) 0%, transparent 70%)',
          animationDelay: '-3s',
        }}
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(175 80% 50%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(175 80% 50%) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating geometric shapes */}
      <div className="absolute top-[15%] left-[15%] w-20 h-20 border border-primary/20 rounded-lg rotate-45 animate-float" style={{ animationDelay: '-1s' }} />
      <div className="absolute bottom-[25%] left-[8%] w-12 h-12 border border-primary/15 rounded-full animate-float-delayed" />
      <div className="absolute top-[60%] right-[12%] w-16 h-16 border border-primary/10 rounded-lg rotate-12 animate-float" style={{ animationDelay: '-4s' }} />
      <div className="absolute top-[10%] right-[20%] w-8 h-8 bg-primary/5 rounded-full animate-pulse-slow" />
      <div className="absolute bottom-[15%] right-[25%] w-6 h-6 bg-accent/5 rounded-full animate-float" style={{ animationDelay: '-2s' }} />
    </div>
  );
};

export default BackgroundElements;
