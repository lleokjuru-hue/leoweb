
import React, { useState, useEffect, useRef, useCallback } from 'react';

// URL DA LOGO OFICIAL
const LOGO_URL = "https://i.ibb.co/sdcRqjMf/file-00000000bae0720eb4360633486b9fe7.png";

// --- COMPONENTES DE EFEITO ---

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; direction?: 'up' | 'down' | 'none' }> = ({ children, delay = 0, direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTranslate = () => {
    if (isVisible) return 'translate-y-0 opacity-100 scale-100';
    if (direction === 'up') return 'translate-y-12 opacity-0 scale-95';
    if (direction === 'down') return '-translate-y-12 opacity-0 scale-95';
    return 'opacity-0 scale-95';
  };

  return (
    <div ref={ref} className={`transition-all duration-[1200ms] cubic-bezier(0.2, 1, 0.3, 1) transform ${getTranslate()}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// Hook para o efeito de inclinação (Tilt) estável
const useStableTilt = (intensity = 10) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    const xDeg = (y - 0.5) * intensity;
    const yDeg = (x - 0.5) * -intensity;
    setStyle({
      transform: `perspective(1000px) rotateX(${xDeg}deg) rotateY(${yDeg}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out'
    });
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.6s cubic-bezier(0.2, 1, 0.3, 1)'
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (el) {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  return { ref, style };
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroTilt = useStableTilt(8);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = isScrolled ? 90 : 120;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-['Inter'] selection:bg-blue-600 overflow-x-hidden">
      
      {/* TEXTURA DE RUÍDO GLOBAL (EFEITO PREMIUM) */}
      <div className="fixed inset-0 z-[90] opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* 1. SPLASH SCREEN CINEMATOGRÁFICA */}
      <div className={`fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center transition-all duration-[1200ms] cubic-bezier(0.8, 0, 0.2, 1) ${loading ? 'opacity-100 visible' : 'opacity-0 invisible scale-110'}`}>
        <div className="relative">
          <img src={LOGO_URL} alt="Leonasc Loading" className="h-24 md:h-32 animate-pulse drop-shadow-[0_0_40px_rgba(59,130,246,0.4)]" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 animate-[loadingLine_2.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>

      {/* 2. HEADER INTELIGENTE (MORFING) */}
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
        isScrolled 
        ? 'py-4 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl' 
        : 'py-10 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="group flex items-center gap-3">
            <img src={LOGO_URL} alt="Logo" className="h-8 md:h-10 transition-transform group-hover:scale-110" />
            <span className={`font-black uppercase tracking-[0.4em] text-[10px] transition-all ${isScrolled ? 'opacity-100' : 'opacity-0 translate-x-4'}`}>Leonasc Web</span>
          </button>
          
          <nav className="hidden lg:flex items-center space-x-12">
            {['Serviços', 'Portfólio', 'Metodologia'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.toLowerCase())} 
                className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 hover:text-white transition-all relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 transition-all group-hover:w-full"></span>
              </button>
            ))}
            <button 
              onClick={() => scrollTo('contato')} 
              className="px-8 py-3 bg-white text-slate-950 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] active:scale-95"
            >
              Iniciar Projeto
            </button>
          </nav>

          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2">
            <div className="w-8 h-[2px] bg-white mb-2"></div>
            <div className="w-5 h-[2px] bg-white ml-auto"></div>
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[110] bg-slate-950 transition-all duration-700 cubic-bezier(0.8, 0, 0.2, 1) ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} flex flex-col items-center justify-center`}>
        <button onClick={() => setMobileMenuOpen(false)} className="absolute top-10 right-10 text-white p-4">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth={1}/></svg>
        </button>
        <div className="flex flex-col items-center space-y-10">
          {['Serviços', 'Portfólio', 'Metodologia', 'Contato'].map((item) => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-3xl font-black uppercase tracking-widest hover:text-blue-500 transition-colors italic">{item}</button>
          ))}
        </div>
      </div>

      {/* 3. HERO SECTION - O EPICENTRO VISUAL */}
      <main className="relative pt-32 lg:pt-52 pb-20 overflow-hidden">
        {/* Glows de Fundo Estáticos (Sem Bagunça) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-8 relative z-10 flex flex-col items-center text-center">
          <Reveal direction="down">
            <div 
              ref={heroTilt.ref}
              style={heroTilt.style}
              className="relative mb-16 md:mb-24 cursor-pointer"
            >
              <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full"></div>
              <img 
                src={LOGO_URL} 
                alt="Leonasc Hero" 
                className="h-48 md:h-[480px] w-auto object-contain relative z-10 drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]" 
              />
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="max-w-4xl mx-auto">
              <span className="inline-block px-6 py-2 border border-blue-500/20 rounded-full bg-blue-500/5 text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 mb-10">
                Engenharia de Software & Design Premium
              </span>
              <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.9] mb-10">
                Criamos <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-white">Autoridade Digital.</span>
              </h1>
              <p className="text-lg md:text-2xl text-white/40 font-light max-w-2xl mx-auto leading-relaxed mb-16">
                Sites ultrarrápidos, identidades exclusivas e tecnologia de ponta para profissionais que dominam seu mercado.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button 
                  onClick={() => scrollTo('contato')} 
                  className="w-full sm:w-auto px-16 py-6 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)]"
                >
                  Falar com Leonardo
                </button>
                <button 
                  onClick={() => scrollTo('portfolio')} 
                  className="w-full sm:w-auto px-16 py-6 border border-white/10 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white/5 transition-all"
                >
                  Ver Portfólio
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      {/* 4. SERVIÇOS - GRID DE ALTO NÍVEL */}
      <section id="servicos" className="py-32 md:py-60 bg-slate-950/50 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <Reveal>
            <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-10">
              <div className="max-w-2xl">
                <span className="text-blue-500 font-black uppercase tracking-[0.6em] text-[10px] mb-6 block">Nossas Armas</span>
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none italic">Foco Total em <br/>Performance.</h2>
              </div>
              <p className="text-white/30 text-xl max-w-sm font-light leading-relaxed">Não é apenas um site. É uma máquina de vendas operando 24h por dia para você.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Websites Pro", 
                desc: "Plataformas de alta fidelidade visual construídas com React e Next.js. O máximo de tecnologia disponível no mercado.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                )
              },
              { 
                title: "Landing Pages", 
                desc: "Estratégia pura de conversão. Design focado em guiar seu cliente até o botão de compra ou contato.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                )
              },
              { 
                title: "Design de Marca", 
                desc: "Identidade visual que respira luxo e autoridade. Logotipos e paletas que elevam seu valor percebido imediatamente.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                )
              }
            ].map((s, i) => (
              <Reveal key={i} delay={i * 200}>
                <div className="group p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] hover:bg-blue-600/10 hover:border-blue-500/30 transition-all duration-500 h-full flex flex-col">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-10 shadow-[0_15px_30px_rgba(37,99,235,0.2)] group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <h4 className="text-3xl font-black mb-8 uppercase italic tracking-tight group-hover:text-blue-400 transition-colors">{s.title}</h4>
                  <p className="text-white/40 text-lg leading-relaxed font-light group-hover:text-white/70 transition-colors flex-grow">{s.desc}</p>
                  <div className="mt-12 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-blue-500 transition-colors">
                    <span>Saber Mais</span>
                    <div className="w-8 h-px bg-white/10 group-hover:w-16 group-hover:bg-blue-500 transition-all"></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PORTFÓLIO - O CASE ALPHA */}
      <section id="portfolio" className="py-32 md:py-60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="w-full lg:w-[60%] order-2 lg:order-1">
              <Reveal direction="none">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-blue-600/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="relative rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1600" 
                      className="w-full h-[400px] md:h-[650px] object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
                      alt="Franco Auto Center Project" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="w-full lg:w-[40%] order-1 lg:order-2">
              <Reveal delay={200}>
                <span className="text-blue-500 font-black uppercase tracking-[0.6em] text-[10px] mb-8 block">Caso de Sucesso</span>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] italic mb-10">Franco <br/> Auto Center.</h2>
                <p className="text-xl text-white/40 mb-12 leading-relaxed font-light">
                  Uma reestruturação completa. De uma oficina offline para uma plataforma de agendamento inteligente com SEO regional imbatível. 
                  <span className="block mt-6 text-blue-400 font-bold italic">+400% de visibilidade local.</span>
                </p>
                <a 
                  href="https://www.francoautocenter.com.br" 
                  target="_blank" 
                  className="group inline-flex items-center gap-6 px-12 py-5 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                >
                  Visitar Plataforma
                  <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTATO - O PROTOCOLO DE ELITE */}
      <section id="contato" className="py-32 md:py-60 bg-black">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-gradient-to-br from-slate-900 to-black rounded-[5rem] p-12 md:p-32 border border-white/5 relative overflow-hidden shadow-2xl">
            {/* Elemento Decorativo */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(59,130,246,0.1),transparent_40%)] pointer-events-none"></div>

            <div className="grid lg:grid-cols-2 gap-24 relative z-10">
              <div>
                <Reveal direction="none">
                  <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] italic mb-16">
                    Mude Seu <br/> <span className="text-blue-500">Jogo.</span>
                  </h2>
                  <div className="space-y-12">
                    <div className="group cursor-pointer">
                      <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.6em] mb-4 block group-hover:text-blue-500 transition-colors">Linha Privada</span>
                      <p className="text-3xl md:text-5xl font-black tracking-tight group-hover:translate-x-4 transition-transform duration-500">contato@leonasc.com.br</p>
                    </div>
                    <div className="group cursor-pointer">
                      <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.6em] mb-4 block group-hover:text-green-500 transition-colors">WhatsApp Direct</span>
                      <p className="text-3xl md:text-5xl font-black tracking-tight group-hover:translate-x-4 transition-transform duration-500">(16) 99450-1318</p>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="bg-white p-12 md:p-20 rounded-[4rem] text-slate-950 flex flex-col justify-center">
                <Reveal delay={400}>
                  <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-12">Consultoria Técnica</h3>
                  <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                    <div className="border-b-2 border-slate-100 focus-within:border-blue-600 transition-all py-4">
                      <input type="text" placeholder="Seu Nome ou Empresa" className="w-full bg-transparent outline-none font-bold text-xl placeholder:text-slate-300" />
                    </div>
                    <div className="border-b-2 border-slate-100 focus-within:border-blue-600 transition-all py-4">
                      <textarea placeholder="O que você precisa dominar?" className="w-full bg-transparent outline-none font-bold text-xl placeholder:text-slate-300 resize-none" rows={3}></textarea>
                    </div>
                    <button className="w-full py-8 bg-slate-950 text-white rounded-3xl font-black uppercase tracking-[0.5em] text-[11px] hover:bg-blue-600 transition-all shadow-2xl active:scale-95">Solicitar Orçamento</button>
                  </form>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER - CLEAN AGENCIA LOOK */}
      <footer className="py-32 bg-slate-950 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-8">
          <Reveal direction="down">
            <img 
              src={LOGO_URL} 
              alt="Leonasc Footer" 
              className="h-32 md:h-48 mx-auto mb-20 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer" 
            />
          </Reveal>
          
          <Reveal delay={300}>
            <div className="grid md:grid-cols-3 items-center gap-12 pt-16 border-t border-white/5 opacity-20 text-[9px] font-black uppercase tracking-[0.6em]">
              <p className="text-left hidden md:block">&copy; {new Date().getFullYear()} Leonasc Web Enterprise</p>
              <div className="flex justify-center gap-10">
                <span className="hover:text-white transition-colors cursor-pointer">Privacidade</span>
                <span className="hover:text-white transition-colors cursor-pointer">Termos</span>
              </div>
              <p className="text-right hidden md:block italic">Handcrafted in Brazil</p>
              <p className="md:hidden">&copy; {new Date().getFullYear()} Leonasc Web</p>
            </div>
          </Reveal>
        </div>
      </footer>

      {/* WHATSAPP FLOAT - THE BRIDGE */}
      <a 
        href="https://wa.me/5516994501318" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-[120] bg-white text-slate-950 p-6 rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:scale-110 active:scale-95 transition-all group overflow-hidden"
      >
        <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        <svg className="w-8 h-8 relative z-10 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
      </a>

      {/* ESTILOS DINÂMICOS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loadingLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .cubic-bezier {
          transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
        }
        body {
          background-color: #020617;
          cursor: default;
        }
        html {
          scrollbar-width: thin;
          scrollbar-color: #1e293b #020617;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #020617;
        }
        ::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 20px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}} />
    </div>
  );
};

export default App;
