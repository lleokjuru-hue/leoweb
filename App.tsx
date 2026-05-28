import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Smartphone, 
  Palette, 
  CheckCircle2, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Users, 
  TrendingUp, 
  X,
  Menu,
  ChevronRight,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { BudgetCalculator } from './components/BudgetCalculator';
import { FaqSection } from './components/FaqSection';

// LOGO OFICIAL
const LOGO_URL = "https://i.ibb.co/sdcRqjMf/file-00000000bae0720eb4360633486b9fe7.png";

// Hook para o efeito de inclinação (Tilt) estável
const useStableTilt = (intensity = 8) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      const xDeg = (y - 0.5) * intensity;
      const yDeg = (x - 0.5) * -intensity;
      setStyle({
        transform: `perspective(1000px) rotateX(${xDeg}deg) rotateY(${yDeg}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: 'transform 0.1s ease-out'
      });
    };

    const handleMouseLeave = () => {
      setStyle({
        transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: 'transform 0.6s cubic-bezier(0.2, 1, 0.3, 1)'
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return { ref, style };
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Form state
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  
  // Budget Integration State
  const [simulatedSummary, setSimulatedSummary] = useState('');
  const [simulatedPrice, setSimulatedPrice] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const heroTilt = useStableTilt(8);
  const contactFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = isScrolled ? 80 : 100;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleEstimateCalculated = (summary: string, total: number) => {
    setSimulatedSummary(summary);
    setSimulatedPrice(total);
    
    // Auto-populate message for a premium onboarding flow
    const messageIntro = `Olá, configurei meu projeto no Simulador de Escopo do site.\n\n` +
      `Estou buscando um orçamento para:\n${summary}\n\n` +
      `Estimativa calculada: R$ ${total.toLocaleString('pt-BR')}\n\n` +
      `Gostaria de agendar uma breve reunião de alinhamento estratégico!`;
    
    setClientMessage(messageIntro);

    // Smooth scroll directly to the focused contact form
    const container = contactFormRef.current;
    if (container) {
      const offset = 90;
      const topPos = container.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
      
      // Give a tiny flash feedback
      setTimeout(() => {
        container.classList.add('ring-2', 'ring-green-500/85', 'scale-[1.01]');
        setTimeout(() => {
          container.classList.remove('ring-2', 'ring-green-500/85', 'scale-[1.01]');
        }, 1500);
      }, 500);
    }
  };

  const handleClearSimulation = () => {
    setSimulatedSummary('');
    setSimulatedPrice(null);
    setClientMessage('');
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      alert("Por favor, informe seu Nome e WhatsApp de contato.");
      return;
    }

    setFormSubmitted(true);

    // Format secure customized Whatsapp message
    let whatsappText = `Olá Leonardo, me chamo *${clientName}*.\n` + 
      `Gostaria de agendar uma consultoria para meu projeto.\n\n` +
      `*Meus Dados de Contato:*\n` +
      `- WhatsApp: ${clientPhone}\n\n`;

    if (simulatedPrice) {
      whatsappText += `*Projeto Simulado no Site (R$ ${simulatedPrice.toLocaleString('pt-BR')}):\n*` +
        `\`\`\`\n${simulatedSummary}\n\`\`\`\n\n`;
    }

    if (clientMessage && !simulatedPrice) {
      whatsappText += `*Minha Mensagem:*\n${clientMessage}`;
    }

    const encoded = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://wa.me/5516994501318?text=${encoded}`;

    // Gracefully open WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setFormSubmitted(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-br-dark text-slate-100 font-sans selection:bg-br-yellow selection:text-br-green overflow-x-hidden antialiased">
      
      {/* 1. SPLASH SCREEN CINEMATOGRÁFICA REFINADA */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.8, 0, 0.2, 1] }}
            className="fixed inset-0 z-[300] bg-slate-950 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="relative flex flex-col items-center">
              <motion.div 
                animate={{ scale: [0.95, 1.02, 0.95] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="relative z-10 filter drop-shadow-[0_0_35px_rgba(37,99,235,0.25)]"
              >
                <img src={LOGO_URL} alt="Leonasc Loading" className="h-16 md:h-20 object-contain" />
              </motion.div>
              <div className="mt-8 text-[9px] font-black uppercase tracking-[0.6em] text-white/30 truncate">
                Carregando Experiência Brasil
              </div>
              <div className="mt-4 w-40 h-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="relative h-full bg-gradient-to-r from-br-green via-br-yellow to-br-blue w-1/2"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HEADER MORPHING COMPACTO */}
      <header className={`fixed top-0 left-0 w-full z-[150] transition-all duration-500 ${
        isScrolled 
          ? 'py-4 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-xl' 
          : 'py-8 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex justify-between items-center">
          
          {/* Logo brand */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="group flex items-center gap-3 active:scale-95 transition-transform"
          >
            <img src={LOGO_URL} alt="Logo" className="h-7 sm:h-9 transition-all duration-300 group-hover:scale-105" />
            <div className="flex flex-col text-left">
              <span className="font-black uppercase tracking-[0.3em] text-[10px] md:text-[11px] leading-tight">
                Leonasc
              </span>
              <span className="text-[7.5px] font-bold text-br-yellow uppercase tracking-widest leading-none flex gap-1">
                Estúdio Web <span className="text-br-green">★★★★★</span>
              </span>
            </div>
          </button>
          
          {/* Menu links - Desktop */}
          <nav className="hidden lg:flex items-center space-x-10">
            {[
              { id: 'servicos', label: 'Serviços' },
              { id: 'simulador', label: 'Simulador' },
              { id: 'duvidas', label: 'Duvidas' }
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollTo(item.id)} 
                className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50 hover:text-white transition-all relative py-1 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-br-yellow transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            
            <button 
              onClick={() => scrollTo('contato')} 
              className="px-6 py-2.5 bg-white text-slate-950 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-br-yellow hover:text-br-green transition-all shadow-lg active:scale-95"
            >
              Iniciar Projeto
            </button>
          </nav>

          {/* Hamburger - Mobile */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 text-white/85 hover:text-white transition-colors"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[140] bg-slate-950/98 backdrop-blur-2xl pt-28 px-8 flex flex-col justify-start space-y-16"
          >
            <div className="flex flex-col space-y-6 text-left border-l-2 border-green-500/10 pl-6">
              {[
                { id: 'servicos', label: 'Nossos Serviços' },
                { id: 'simulador', label: 'Simulador de Escopo' },
                { id: 'duvidas', label: 'Dúvidas Frequentes' },
                { id: 'contato', label: 'Iniciar Projeto' }
              ].map((item, index) => (
                <button 
                  key={item.id} 
                  onClick={() => scrollTo(item.id)} 
                  className="text-2xl font-extrabold uppercase tracking-wide text-white/70 hover:text-br-yellow hover:translate-x-2 transition-all text-left italic"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-8 border-t border-white/5 space-y-4">
              <span className="text-[10px] font-black tracking-widest uppercase text-white/30 block">Atendimento Rápido</span>
              <a href="https://wa.me/5516994501318" target="_blank" className="text-lg font-bold text-br-green block hover:underline">
                (16) 99450-1318
              </a>
              <span className="text-xs text-white/45 block flex items-center justify-start gap-1">Ribeirão Preto / SP - Atendimento Brasil 🇧🇷⭐⭐⭐⭐⭐</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. HERO SECTION - REDESENHADA, IMPRESSIONANTE, SEM QUEBRAS */}
      <section className="relative pt-36 md:pt-48 pb-20 overflow-hidden min-h-[92vh] flex items-center">
        {/* Glows de Fundo Geométricos e Fluidos */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[90vw] md:w-[70vw] h-[50vw] bg-br-green/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-br-yellow/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        {/* Grid decorativa de fundo */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Texto do Hero */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-br-green/10 border border-br-green/30 text-br-yellow text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                <Cpu className="w-3.5 h-3.5" /> High Performance & Branding
              </div>

              {/* Título RESPONSIVO que nunca estoura o layout ou wrapa feio */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight italic leading-[1.05] break-words">
                Criamos <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-br-green via-br-yellow to-br-blue pl-0.5">
                  Autoridade Digital.
                </span>
              </h1>

              {/* Descritivo de Soluções reais */}
              <p className="text-base sm:text-lg md:text-xl text-white/50 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Desenvolvimento de sites profissionais, rápidos e ultra responsivos para profissionais liberais, médicos, advogados e pequenos negócios.
                <span className="block mt-3 text-white/80 font-semibold text-sm">✓ Sem mensalidades obrigatórias. Código 100% seu.</span>
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => scrollTo('simulador')} 
                  className="w-full sm:w-auto px-8 py-4.5 bg-br-green hover:brightness-110 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] active:scale-95 transition-all shadow-lg shadow-br-green/25 flex items-center justify-center gap-2.5"
                >
                  Simular Escopo <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scrollTo('contato')} 
                  className="w-full sm:w-auto px-8 py-4.5 border border-white/10 hover:bg-white/5 text-white/80 hover:text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all flex items-center justify-center"
                >
                  Iniciar Conversa
                </button>
              </div>

              {/* Social Proof metrics */}
              <div className="pt-8 border-t border-white/5 flex flex-wrap justify-center lg:justify-start gap-8 items-center text-left">
                <div>
                  <span className="text-2xl font-extrabold italic text-white leading-none block">100%</span>
                  <span className="text-[9px] text-white/30 uppercase tracking-widest font-black block mt-1">Lighthouse Speed</span>
                </div>
                <div className="w-px h-8 bg-white/5"></div>
                <div>
                  <span className="text-2xl font-extrabold italic text-white leading-none block">+50</span>
                  <span className="text-[9px] text-white/30 uppercase tracking-widest font-black block mt-1">Negócios Acelerados</span>
                </div>
                <div className="w-px h-8 bg-white/5"></div>
                <div>
                  <span className="text-2xl font-extrabold italic text-br-yellow leading-none block">R$ 0</span>
                  <span className="text-[9px] text-white/30 uppercase tracking-widest font-black block mt-1">Mensalidade Escravizante</span>
                </div>
              </div>

            </div>

            {/* Imagem do Hero Interativa */}
            <div className="lg:col-span-5 flex justify-center">
              <div 
                ref={heroTilt.ref}
                style={heroTilt.style}
                className="relative cursor-pointer transition-all duration-300 w-full max-w-[340px] md:max-w-[420px]"
                onClick={() => scrollTo('simulador')}
              >
                <div className="absolute inset-0 bg-green-500/15 blur-[80px] rounded-full"></div>
                
                {/* Frame flutuante simulando design elegante */}
                <div className="relative z-10 bg-gradient-to-br from-slate-900 to-slate-950 p-4 rounded-[2.5rem] border border-green-500/20 shadow-2xl overflow-hidden aspect-square flex flex-col justify-between items-center group">
                  
                  {/* Grid overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-15 pointer-events-none"></div>

                  <div className="w-full flex justify-between items-center">
                    <span className="text-[7.5px] font-mono tracking-widest text-green-400 uppercase font-black bg-green-500/10 px-2 py-1 rounded-md border border-green-500/20">
                      ESTÚDIO CRIATIVO
                    </span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                    </div>
                  </div>

                  {/* Logo centralizada de alta fidelidade */}
                  <div className="relative py-8">
                    <img 
                      src={LOGO_URL} 
                      alt="Leonasc Hero" 
                      className="h-28 md:h-36 w-auto object-contain relative z-10 drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-all duration-500" 
                    />
                  </div>

                  <div className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                    <span className="text-[9px] font-bold tracking-[0.25em] text-white/40 uppercase block mb-1">Engenharia Premium</span>
                    <span className="text-xs md:text-sm font-black italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-green-200 to-blue-300">
                      DESIGN FORA DA CURVA
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO INTRODUTÓRIA - PROPÓSITO E BENEFÍCIOS */}
      <section className="bg-slate-950/20 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Código 100% Seu", 
                desc: "Sem mensalidades presas a plataformas limitadas. Seu site é seu maior ativo digital definitivo.", 
                icon: ShieldCheck,
                color: "text-green-400"
              },
              { 
                title: "Velocidade Extrema", 
                desc: "Carregamento instantâneo no celular. Reduz a perda de clientes e garante a melhor experiência.", 
                icon: Zap,
                color: "text-yellow-400"
              },
              { 
                title: "SEO Google Booster", 
                desc: "Site inteiramente otimizado de forma técnica para aparecer no topo das buscas orgânicas locais.", 
                icon: TrendingUp,
                color: "text-green-300"
              },
              { 
                title: "Foco total em WhatsApp", 
                desc: "Facilitamos a ponte para que seus clientes entrem em contato direto com você em 1 clique.", 
                icon: MessageSquare,
                color: "text-blue-400"
              }
            ].map((badge, key) => {
              const Icon = badge.icon;
              return (
                <div key={key} className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-8 hover:border-white/10 hover:bg-slate-900/60 transition-all duration-300 group">
                  <div className={`p-3 rounded-2xl bg-white/[0.02] border border-white/5 inline-block mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${badge.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide tracking-tight">
                    {badge.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed font-light">
                    {badge.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SERVIÇOS - GRID DE ALTO NÍVEL */}
      <section id="servicos" className="py-24 md:py-36 bg-slate-950/40 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Header de Serviços */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
            <div className="max-w-2xl text-left">
              <span className="text-yellow-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Especialidades</span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none italic mb-4">
                Sistemas E Design<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-green-400 to-blue-400">
                  De Alto Nível.
                </span>
              </h2>
            </div>
            <p className="text-white/40 text-sm sm:text-base max-w-sm font-light leading-relaxed text-left">
              Não se trata apenas de 'fazer um site'. Projetamos autoridade e criamos máquinas de conversão dedicadas para captar clientes qualificados.
            </p>
          </div>

          {/* Cards de Serviços */}
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Landing Pages", 
                subtitle: "Máxima Conversão",
                desc: "Design focado em levar o visitante direto para a ação de compra ou contato. Ideal para campanhas de tráfego pago (Google/Meta Ads).",
                features: ["WhatsApp On-Click", "Textos persuasivos inclusos", "Tempo de carregamento < 1s", "Formulários integrados"],
                color: "from-green-500/20 to-blue-500/5",
                icon: Code2
              },
              { 
                title: "Websites Pro", 
                subtitle: "Institucionais Robustos",
                desc: "A solução completa para expor autoridade no mercado corporativo, clínicas e escritórios. Sessões dedicadas de serviços, depoimentos e blog integrado.",
                features: ["Múltiplas páginas customizadas", "Focado em Autoridade Local", "Painel administrativo de conteúdo", "Layout 100% exclusivo"],
                color: "from-yellow-500/20 to-orange-500/5",
                icon: Smartphone
              },
              { 
                title: "Identidade Visual", 
                subtitle: "Branding de Luxo",
                desc: "Paleta de cores de alta sofisticação, tipografia exclusiva e logotipos profissionais que elevam o valor de percepção da sua marca imediatamente.",
                features: ["Manual de uso completo", "Logotipo Vetorial escalável", "Visual Kit de Redes Sociais", "Assinatura elegante de e-mail"],
                color: "from-green-500/20 to-teal-500/5",
                icon: Palette
              }
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div 
                  key={i} 
                  className="group bg-slate-900/20 border border-white/5 rounded-[2.5rem] p-8 md:p-10 hover:border-green-500/30 hover:bg-slate-900/40 transition-all duration-500 h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Icon section */}
                    <div className="w-12 h-12 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-center mb-8 shadow-inner group-hover:bg-green-600 group-hover:border-green-500 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                      <Icon className="w-5 h-5 text-green-400 group-hover:text-white" />
                    </div>

                    <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-400 block mb-2">{s.subtitle}</span>
                    <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight mb-4 group-hover:text-green-400 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed font-light mb-8">
                      {s.desc}
                    </p>

                    {/* Features checklist */}
                    <div className="border-t border-white/5 pt-6 mt-6 space-y-3">
                      <span className="text-[9px] font-black tracking-widest uppercase text-white/30 block mb-2">Entregas Garantidas:</span>
                      {s.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2.5 text-xs text-white/70">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-white/5">
                    <button 
                      onClick={() => scrollTo('simulador')} 
                      className="w-full py-4 rounded-xl bg-white/[0.02] hover:bg-green-600 hover:text-white border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-white/60 hover:border-green-500 transition-all duration-300"
                    >
                      Calcular Projeto
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. SIMULADOR DE ESCOPO CLIENTE - DESTAQUE EXCLUSIVO */}
      <section id="simulador" className="py-24 md:py-36 bg-br-dark relative border-b border-white/5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-br-green/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Header do Simulador */}
          <div className="max-w-2xl text-left mb-16">
            <span className="text-yellow-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Transparência Total</span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none italic mb-4">
              Simulador De <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-300 to-white">
                Investimento.
              </span>
            </h2>
            <p className="text-white/40 text-sm sm:text-base font-light leading-relaxed">
              Odiamos mistério comercial. Ajuste os recursos, páginas e prazo para ver em tempo real o escopo estimado e envie diretamente para nossa análise de engenharia.
            </p>
          </div>

          {/* Calculator Container Component */}
          <BudgetCalculator onEstimateCalculated={handleEstimateCalculated} />

        </div>
      </section>

      {/* 7. DÚVIDAS FREQUENTES (FAQ) ACCORDION */}
      <section id="duvidas" className="py-24 md:py-36 bg-slate-950/20 relative border-b border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-yellow-600/[0.02] blur-[150px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          
          {/* Header FAQ */}
          <div className="max-w-2xl mx-auto text-center mb-20">
            <span className="text-yellow-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Esclarecimentos</span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none italic mb-4">
              Perguntas Frequentes.
            </h2>
            <p className="text-white/40 text-sm sm:text-base font-light leading-relaxed max-w-lg mx-auto">
              Tudo o que você precisa entender sobre o nosso processo de desenvolvimento de ponta.
            </p>
          </div>

          <FaqSection />

        </div>
      </section>

      {/* 8. CONTATO - O PROTOCOLO DE ELITE REDESENHADO */}
      <section id="contato" className="py-24 md:py-36 bg-slate-950/40 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div 
            ref={contactFormRef}
            className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[3rem] p-8 md:p-20 border border-white/5 relative overflow-hidden shadow-3xl transition-all duration-300"
          >
            {/* Elemento Decorativo */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(34,197,94,0.1),transparent_40%)] pointer-events-none"></div>

            <div className="grid lg:grid-cols-2 gap-16 relative z-10 items-center">
              
              {/* Informações da Agencia */}
              <div className="space-y-10 text-left">
                <div>
                  <span className="text-yellow-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Consultoria Técnica</span>
                  
                  {/* Headline do Contato RESPONSIVA */}
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight italic leading-[1.1] mb-6">
                    Mude Seu <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-300 pl-0.5">
                      Jogo Digital.
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base text-white/50 font-light leading-relaxed max-w-md">
                    Preencha os campos para receber uma análise técnica preliminar. Leonardo entrará em contato em menos de 24 horas via WhatsApp.
                  </p>
                </div>

                <div className="space-y-6">
                  
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl text-green-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#94a3b8]/40 block">E-mail Principal</span>
                      <a href="mailto:contato@leonasc.com.br" className="text-base sm:text-lg font-bold hover:text-green-400 transition-colors">
                        contato@leonasc.com.br
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl text-yellow-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#94a3b8]/40 block">WhatsApp Executivo</span>
                      <a href="https://wa.me/5516994501318" className="text-base sm:text-lg font-bold hover:text-yellow-400 transition-colors">
                        (16) 99450-1318
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl text-blue-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#94a3b8]/40 block">Atendimento</span>
                      <p className="text-sm font-semibold text-white/80">
                        Sediado em Ribeirão Preto - SP | Projetos para todo o Brasil
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Form de Conversao */}
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] text-slate-950 flex flex-col relative">
                
                <h3 className="text-2xl font-black uppercase tracking-tight italic text-slate-950 mb-1.5 text-left">
                  Iniciar Alinhamento
                </h3>
                <p className="text-xs text-slate-500 font-light text-left mb-8">
                  Respondemos rápido no seu WhatsApp.
                </p>

                {/* Simulated quote summary widget */}
                {simulatedPrice && (
                  <div className="mb-8 p-4.5 bg-green-50 border border-green-100 rounded-2xl text-left relative animate-pulse">
                    <button 
                      onClick={handleClearSimulation}
                      className="absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                      title="Remover Simulação"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[8px] font-black uppercase tracking-wider text-green-600 block mb-1">
                      Orçamento Escopo Simulado Pre-carregado
                    </span>
                    <div className="text-base font-black text-slate-900 mb-1 italic">
                      Estimativa: R$ {simulatedPrice.toLocaleString('pt-BR')}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight font-medium line-clamp-2">
                      {simulatedSummary.replace(/\n/g, ' | ')}
                    </p>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmitContact}>
                  
                  {/* Name Input */}
                  <div className="flex flex-col text-left space-y-1.5">
                    <label className="text-[9.5px] font-black uppercase tracking-wider text-slate-400">Seu Nome ou Empresa</label>
                    <div className="focus-within:ring-2 focus-within:ring-green-500/50 rounded-xl transition-all">
                      <input 
                        type="text" 
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Ex: Dr. Roberto Silva ou Almeida Advogados" 
                        className="w-full bg-slate-50 px-5 py-4 border border-slate-100 rounded-xl outline-none font-semibold text-[14px] text-slate-900 placeholder:text-slate-350" 
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div className="flex flex-col text-left space-y-1.5">
                    <label className="text-[9.5px] font-black uppercase tracking-wider text-slate-400">WhatsApp de Contato</label>
                    <div className="focus-within:ring-2 focus-within:ring-green-500/50 rounded-xl transition-all">
                      <input 
                        type="text" 
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="Ex: (16) 99450-1318" 
                        className="w-full bg-slate-50 px-5 py-4 border border-slate-100 rounded-xl outline-none font-semibold text-[14px] text-slate-900 placeholder:text-slate-350" 
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col text-left space-y-1.5">
                    <label className="text-[9.5px] font-black uppercase tracking-wider text-slate-400">O que seu negócio precisa dominar?</label>
                    <div className="focus-within:ring-2 focus-within:ring-green-500/50 rounded-xl transition-all">
                      <textarea 
                        value={clientMessage}
                        onChange={(e) => setClientMessage(e.target.value)}
                        placeholder="Ex: Preciso de uma Landing Page rápida para capturar leads para clínica estética com domínio personalizado." 
                        className="w-full bg-slate-50 px-5 py-4 border border-slate-100 rounded-xl outline-none font-semibold text-[14px] text-slate-900 placeholder:text-slate-350 resize-none" 
                        rows={3}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formSubmitted}
                    className="w-full py-5 bg-slate-950 hover:bg-green-600 text-white rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] sm:text-[11px] transition-all duration-300 shadow-xl active:scale-95 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formSubmitted ? (
                      <>Direcionando WhatsApp...</>
                    ) : (
                      <>Solicitar Orçamento / Reunião</>
                    )}
                  </button>

                  <span className="text-[9px] text-[#94a3b8] block text-center tracking-wide leading-tight mt-3">
                    Ao enviar, você será direcionado para o chat WhatsApp exclusivo de Leonardo Nascimento.
                  </span>

                </form>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER - CLEAN EDITORIAL LOOK */}
      <footer className="py-20 bg-slate-950 border-t border-white/5 text-center relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <img 
            src={LOGO_URL} 
            alt="Leonasc Footer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="h-20 md:h-28 mx-auto mb-16 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer active:scale-95" 
          />
          
          <div className="grid md:grid-cols-3 items-center gap-8 pt-12 border-t border-white/5 opacity-40 text-[9px] font-black uppercase tracking-[0.5,em]">
            <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Leonasc Web Enterprise.</p>
            <div className="flex justify-center gap-8">
              <span className="hover:text-yellow-400 cursor-pointer transition-colors" onClick={() => scrollTo('servicos')}>Serviços</span>
              <span className="hover:text-yellow-400 cursor-pointer transition-colors" onClick={() => scrollTo('simulador')}>Simulador</span>
              <span className="hover:text-yellow-400 cursor-pointer transition-colors" onClick={() => scrollTo('duvidas')}>Dúvidas</span>
            </div>
            <p className="text-center md:text-right italic select-none">Handcrafted with precision in Brazil &bull; 2026</p>
          </div>

        </div>
      </footer>

      {/* WHATSAPP FLOAT - THE BRIDGE */}
      <a 
        href="https://wa.me/5516994501318" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[160] bg-white text-slate-950 p-4.5 sm:p-5 rounded-full shadow-[0_15px_40px_rgba(34,197,94,0.3)] hover:scale-110 active:scale-95 transition-all group overflow-hidden border border-slate-200"
        title="Falar com Leonardo Nascimento"
      >
        <div className="absolute inset-0 bg-green-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        <svg className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
      </a>

      {/* ESTILOS DE SCROLLBAR PREMIUM */}
      <style dangerouslySetInnerHTML={{ __html: `
        html {
          scrollbar-width: thin;
          scrollbar-color: #1e293b #030712;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #030712;
        }
        ::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 99px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #22c55e;
        }
      `}} />
    </div>
  );
};

export default App;
