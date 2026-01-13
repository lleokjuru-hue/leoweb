import React, { useState, useEffect, useCallback } from 'react';

// URL DA LOGO OFICIAL
const LOGO_URL = "https://i.ibb.co/sdcRqjMf/file-00000000bae0720eb4360633486b9fe7.png";

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentFeedback, setCurrentFeedback] = useState(0);

  const slides = [
    {
      title: "Sua Marca com Autoridade Absoluta",
      subtitle: "Criamos ecossistemas digitais de alto impacto que posicionam seu negócio no topo do mercado.",
      buttonText: "Ver Nossos Serviços",
      link: "#servicos",
      bg: "bg-slate-900"
    },
    {
      title: "Performance Sem Mensalidades",
      subtitle: "Sites velozes, otimizados para o Google e totalmente seguros. Investimento único para resultados duradouros.",
      buttonText: "Conhecer Metodologia",
      link: "#metodologia",
      bg: "bg-blue-900"
    },
    {
      title: "Pronto Para Elevar o Nível?",
      subtitle: "Fale diretamente com Leonardo Nascimento e descubra como podemos transformar sua presença online hoje.",
      buttonText: "Chamar no WhatsApp",
      link: "https://wa.me/5516994501318",
      bg: "bg-slate-950"
    }
  ];

  const feedbacks = [
    {
      name: "Dra. Beatriz Faria",
      role: "Odontologia Especializada",
      text: "O Leonardo captou exatamente a essência da minha marca. O site ficou elegante, rápido e passa total confiança para meus pacientes.",
      stars: 5
    },
    {
      name: "Marcos Oliveira",
      role: "Diretor • Engenharia & Cia",
      text: "Minha empresa agora tem outra cara no digital. O site é moderno e a navegação é perfeita. Resultado profissional de verdade.",
      stars: 5
    },
    {
      name: "Cláudia Ramos",
      role: "Consultoria de Moda • SP",
      text: "Excelente trabalho! Atendimento ágil e um design que superou todas as expectativas. Recomendo para quem busca o melhor.",
      stars: 5
    },
    {
      name: "Dr. Ricardo Santos",
      role: "Advocacia Criminal",
      text: "O site trouxe o nível de seriedade que minha profissão exige. Meus clientes agora me encontram com facilidade no Google e elogiam o visual.",
      stars: 5
    },
    {
      name: "Juliana Mello",
      role: "Clínica de Estética",
      text: "Visual impecável e muito fácil de usar. Minha agenda de atendimentos aumentou logo na primeira semana após o novo site ir ao ar.",
      stars: 5
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const nextFeedback = useCallback(() => {
    setCurrentFeedback((prev) => (prev + 1) % feedbacks.length);
  }, [feedbacks.length]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    
    const heroTimer = setInterval(nextSlide, 6000);
    const feedbackTimer = setInterval(nextFeedback, 5000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(heroTimer);
      clearInterval(feedbackTimer);
    };
  }, [nextSlide, nextFeedback]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (id.startsWith('http')) return;
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = isScrolled ? 70 : 180;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] font-['Inter'] selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* HEADER ESCURO SÓLIDO */}
      <header className={`fixed w-full z-50 transition-all duration-500 ease-in-out bg-slate-950 ${
        isScrolled 
        ? 'py-3 shadow-2xl border-b border-white/10' 
        : 'py-10 md:py-32 border-b border-white/5'
      }`}>
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center">
          <a 
            href="#inicio" 
            onClick={(e) => scrollToSection(e, 'inicio')} 
            className={`transition-all duration-500 transform hover:scale-[1.01] active:scale-95 flex items-center justify-center ${
              isScrolled ? 'h-24 md:h-36' : 'h-64 md:h-[750px]'
            }`}
          >
            <img 
              src={LOGO_URL} 
              alt="Leonasc Web" 
              className="h-full w-auto object-contain max-w-full block"
            />
          </a>

          <nav className={`mt-16 transition-all duration-500 ${
            isScrolled ? 'h-0 opacity-0 pointer-events-none mt-0 overflow-hidden' : 'h-auto opacity-100'
          } hidden lg:block`}>
            <div className="flex items-center space-x-10 text-[11px] font-bold text-white uppercase tracking-[0.3em]">
              <a href="#servicos" onClick={(e) => scrollToSection(e, 'servicos')} className="hover:text-blue-400 transition-colors">Serviços</a>
              <a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')} className="hover:text-blue-400 transition-colors">Portfólio</a>
              <a href="#metodologia" onClick={(e) => scrollToSection(e, 'metodologia')} className="hover:text-blue-400 transition-colors">Metodologia</a>
              <a href="#contato" onClick={(e) => scrollToSection(e, 'contato')} className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-500 transition-all">Contato</a>
            </div>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden absolute right-6 top-1/2 -translate-y-1/2 text-white p-2">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-950 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-300">
          <img src={LOGO_URL} className="h-48 w-auto mb-6 object-contain" alt="Logo" />
          <div className="text-xl font-bold text-white flex flex-col items-center space-y-6 uppercase tracking-widest">
            <a href="#servicos" onClick={(e) => scrollToSection(e, 'servicos')}>Serviços</a>
            <a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')}>Portfólio</a>
            <a href="#metodologia" onClick={(e) => scrollToSection(e, 'metodologia')}>Metodologia</a>
            <a href="#contato" onClick={(e) => scrollToSection(e, 'contato')}>Contato</a>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="px-8 py-3 bg-white/10 rounded-full text-white font-bold text-xs tracking-widest uppercase">Fechar Menu</button>
        </div>
      )}

      {/* HERO SLIDER - OTIMIZADO MOBILE */}
      <section id="inicio" className="relative w-full h-screen md:h-[850px] min-h-[600px] overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              } ${slide.bg}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 opacity-50"></div>
              
              {/* Content Box com padding-bottom para não bater nos dots */}
              <div className="relative z-10 max-w-[900px] w-full text-center px-6 pt-20 pb-32 md:pb-0">
                <span className="inline-block px-4 py-1 mb-6 border border-white/20 rounded-full text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase text-white/60">
                  Leonardo Nascimento • Leonasc Web
                </span>
                <h2 className="text-3xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6 md:mb-8 tracking-tighter uppercase">
                  {slide.title}
                </h2>
                <p className="text-base md:text-xl text-white/80 mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <a 
                    href={slide.link} 
                    onClick={(e) => scrollToSection(e, slide.link.replace('#', ''))}
                    className="w-full md:w-auto inline-block px-10 md:px-12 py-4 md:py-5 bg-white text-slate-950 rounded-xl font-black text-base md:text-lg hover:bg-blue-600 hover:text-white transition-all shadow-2xl uppercase tracking-widest"
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Indicadores - Reposicionados para não sobrepor texto */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentSlide(index)} 
              className={`h-1.5 transition-all duration-500 rounded-full ${index === currentSlide ? 'w-10 md:w-12 bg-blue-500' : 'w-3 md:w-4 bg-white/20'}`}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </section>

      {/* FEEDBACKS - OTIMIZADO MOBILE */}
      <section id="feedbacks" className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="text-[15rem] md:text-[20rem] font-black absolute -top-10 -left-10">"</span>
          <span className="text-[15rem] md:text-[20rem] font-black absolute -bottom-10 -right-10">"</span>
        </div>
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-blue-600 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[10px] mb-3 block">Confiança & Credibilidade</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight uppercase leading-none">O que dizem nossos clientes</h2>
          </div>
          
          <div className="relative min-h-[450px] md:min-h-[350px] max-w-[900px] mx-auto">
            {feedbacks.map((item, i) => (
              <div 
                key={i} 
                className={`absolute inset-0 transition-all duration-1000 ease-in-out flex flex-col items-center text-center ${
                  i === currentFeedback ? 'opacity-100 translate-y-0 scale-100 z-10' : 'opacity-0 translate-y-8 scale-95 z-0 pointer-events-none'
                }`}
              >
                <div className="flex text-yellow-400 mb-6 md:mb-8 gap-1">
                  {[...Array(item.stars)].map((_, starIndex) => (
                    <svg key={starIndex} className="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg md:text-3xl text-slate-800 font-medium leading-relaxed mb-8 md:mb-10 italic max-w-3xl px-4">
                  "{item.text}"
                </p>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-900 rounded-full flex items-center justify-center text-white font-black text-lg md:text-xl mb-3 md:mb-4 border-4 border-white shadow-xl">
                    {item.name.charAt(0)}
                  </div>
                  <h4 className="font-black text-slate-950 text-base md:text-lg uppercase tracking-tight">{item.name}</h4>
                  <span className="text-blue-600 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 md:mt-8 flex justify-center gap-2 md:gap-3">
            {feedbacks.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentFeedback(index)}
                className={`h-2 rounded-full transition-all duration-500 ${index === currentFeedback ? 'w-8 md:w-10 bg-blue-600' : 'w-2 bg-slate-300'}`}
                aria-label={`Feedback ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicos" className="py-24 md:py-32 bg-slate-950 text-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <span className="text-blue-500 font-bold uppercase tracking-widest text-[10px] mb-4 block">Especialidades</span>
            <h2 className="text-3xl md:text-6xl font-black tracking-tight uppercase leading-none">O que eu faço por você</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Sites de Autoridade", desc: "Design exclusivo para profissionais que buscam o topo do Google e uma imagem impecável." },
              { title: "Landing Pages", desc: "Páginas focadas 100% em conversão, transformando visitantes em novos clientes." },
              { title: "Identidade Visual", desc: "Criação de marcas modernas que transmitem confiança desde o primeiro contato." }
            ].map((s, i) => (
              <div key={i} className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-3xl hover:border-blue-500/50 transition-all group">
                <h4 className="text-xl md:text-2xl font-bold mb-4 text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">{s.title}</h4>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 md:py-32 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200" className="w-full grayscale hover:grayscale-0 transition-all duration-1000" alt="Franco Auto Center" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <span className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-4 block">Case de Sucesso</span>
              <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-950 uppercase tracking-tighter leading-none">Franco Auto Center</h2>
              <p className="text-base md:text-lg text-slate-700 mb-8 leading-relaxed font-medium">Desenvolvimento completo do ecossistema digital, com agendamento online e otimização total para buscas. Um projeto focado em conveniência e autoridade.</p>
              <a href="https://www.francoautocenter.com.br" target="_blank" className="w-full md:w-auto inline-block px-10 py-4 bg-slate-950 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-xl uppercase tracking-widest text-center">Visitar Site Oficial</a>
            </div>
          </div>
        </div>
      </section>

      {/* METODOLOGIA */}
      <section id="metodologia" className="py-24 md:py-32 bg-slate-50 border-y border-slate-100 text-center">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-12 md:mb-16 text-slate-950 uppercase tracking-tight">Meu Processo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 text-left">
            {[
              { step: "Discovery", desc: "Análise técnica do seu negócio e concorrência." },
              { step: "Design", desc: "Interface exclusiva focada em conversão." },
              { step: "Build", desc: "Código limpo, veloz e otimizado." },
              { step: "Launch", desc: "Publicação, indexação e suporte." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 transition-all hover:border-blue-200">
                <span className="text-blue-600 font-black text-2xl md:text-3xl mb-4 block">0{i+1}</span>
                <h4 className="font-bold text-slate-950 uppercase text-[10px] md:text-xs mb-3 tracking-widest">{item.step}</h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="py-24 md:py-32 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="bg-slate-950 rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-white flex flex-col lg:flex-row gap-12 md:gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Vamos construir seu domínio digital?</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth={2}/></svg>
                  </div>
                  <span className="text-base md:text-lg font-bold break-all">contato@leonasc.com.br</span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-green-600 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                  </div>
                  <span className="text-base md:text-lg font-bold">(16) 99450-1318</span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="bg-white p-8 md:p-12 rounded-[1.5rem] md:rounded-3xl text-slate-950 shadow-2xl">
                <h3 className="text-xl md:text-2xl font-black mb-6 md:mb-8 text-center uppercase tracking-tight">Solicitar Consultoria</h3>
                <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Nome Completo" className="w-full bg-slate-50 p-4 md:p-5 rounded-xl border border-slate-200 outline-none focus:border-blue-600 transition-all font-bold text-sm md:text-base" />
                  <textarea placeholder="Como posso ajudar seu negócio?" className="w-full bg-slate-50 p-4 md:p-5 rounded-xl border border-slate-200 outline-none focus:border-blue-600 transition-all font-bold resize-none text-sm md:text-base" rows={3}></textarea>
                  <button className="w-full py-4 md:py-5 bg-blue-600 text-white rounded-xl font-black text-base md:text-lg hover:bg-blue-700 transition-all shadow-xl active:scale-95 uppercase tracking-widest">Enviar Agora</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 border-t border-slate-100 pt-12 md:pt-16">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex flex-col items-center">
               <svg className="w-8 h-8 md:w-12 md:h-12 text-slate-900 mb-2 md:mb-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-2.52 5.4-7.84 5.4-4.6 0-8.36-3.8-8.36-8.6s3.76-8.6 8.36-8.6c2.6 0 4.36 1.08 5.36 2.04l2.6-2.6c-1.68-1.56-3.84-2.52-7.96-2.52-6.64 0-12 5.36-12 12s5.36 12 12 12c6.92 0 11.52-4.88 11.52-11.72 0-.8-.08-1.4-.2-2.04h-11.32z"/></svg>
               <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">SEO Google</span>
            </div>
            <div className="flex flex-col items-center">
               <svg className="w-8 h-8 md:w-12 md:h-12 text-slate-900 mb-2 md:mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-7.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
               <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">Site Seguro SSL</span>
            </div>
            <div className="flex flex-col items-center">
               <svg className="w-8 h-8 md:w-12 md:h-12 text-slate-900 mb-2 md:mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
               <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">Velocidade</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 md:py-24 bg-slate-950 text-center border-t border-white/5">
        <div className="max-w-[1100px] mx-auto px-6">
          <img src={LOGO_URL} className="h-32 md:h-[600px] w-auto mx-auto mb-8 md:mb-12 opacity-80 object-contain max-w-full block" alt="Footer Logo" />
          
          {/* SELOS DE SEGURANÇA E VERIFICAÇÃO NO RODAPÉ */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-10 opacity-50 hover:opacity-100 transition-opacity duration-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="text-[9px] md:text-[10px] text-white font-black uppercase tracking-[0.2em]">Google Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <span className="text-[9px] md:text-[10px] text-white font-black uppercase tracking-[0.2em]">SSL Secured 256-bit</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
              <span className="text-[9px] md:text-[10px] text-white font-black uppercase tracking-[0.2em]">Safe Browsing</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 md:pt-12 border-t border-white/5">
            <div className="text-center md:text-left">
              <p className="text-slate-500 font-bold uppercase text-[9px] md:text-[10px] tracking-[0.3em]">&copy; {new Date().getFullYear()} Leonardo Nascimento - Leonasc Web.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 items-center">
              <span className="text-[8px] md:text-[9px] text-slate-600 font-bold uppercase tracking-widest hover:text-white transition-colors cursor-pointer">Privacidade</span>
              <div className="hidden md:block w-px h-4 bg-white/5"></div>
              <span className="text-[8px] md:text-[9px] text-slate-600 font-bold uppercase tracking-widest hover:text-white transition-colors cursor-pointer">Termos</span>
              <div className="hidden md:block w-px h-4 bg-white/5"></div>
              <span className="text-[8px] md:text-[9px] text-white font-black uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Site Verificado
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/5516994501318" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3 md:p-4 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-3"
      >
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
        <div className="flex flex-col items-start leading-none pr-1">
          <span className="text-[8px] font-black uppercase tracking-widest opacity-80 mb-0.5">Falar Agora</span>
          <span className="font-black text-xs md:text-sm uppercase">WhatsApp</span>
        </div>
      </a>
    </div>
  );
};

export default App;