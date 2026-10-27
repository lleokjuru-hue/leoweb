import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sprout,
  Layers,
  ShieldCheck,
  Compass,
  Check,
  ArrowRight,
  Phone,
  MapPin,
  FileSpreadsheet,
  X,
  Menu,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  Copy,
  UserPlus,
} from 'lucide-react';
import { BudgetCalculator } from './components/BudgetCalculator';
import { FaqSection } from './components/FaqSection';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { ResultDemo } from './components/ResultDemo';
import { IllustrationFrame } from './components/IllustrationFrame';
import { FadeInUp, StaggerContainer, StaggerItem, PREMIUM_EASE } from './components/ScrollReveal';
import {
  WhatsappModal,
  WHATSAPP_DISPLAY,
  WHATSAPP_COPY_VALUE,
  WHATSAPP_CLEAN_URL,
  WHATSAPP_ALT_NO9_URL,
  WHATSAPP_APP_URI,
  VCARD_DATA_URI,
  copyToClipboardSafe,
} from './components/WhatsappModal';

import heroCampoImg from './src/assets/images/hero_campo_realista_1793057795734.jpg';
import soloLavouraImg from './src/assets/images/solo_lavoura_realista_1793057796140.jpg';
import propriedadePastagemImg from './src/assets/images/propriedade_pastagem_realista_1793057798602.jpg';

// LOGO OFICIAL PRESERVADA
const LOGO_URL = 'https://i.ibb.co/sdcRqjMf/file-00000000bae0720eb4360633486b9fe7.png';

const BrandMark: React.FC<{ className?: string }> = ({ className = 'h-8 sm:h-9' }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className="w-9 h-9 rounded-xl bg-agro-emerald/15 border border-agro-emerald/40 flex items-center justify-center text-agro-emerald">
        <Sprout className="w-5 h-5" />
      </div>
    );
  }

  return (
    <img
      src={LOGO_URL}
      alt="Logo Consultoria Agronômica"
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
      className={`${className} w-auto object-contain`}
    />
  );
};

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Personal WhatsApp Modal State
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | undefined>(undefined);
  const [copiedInlinePhone, setCopiedInlinePhone] = useState(false);

  // Contact Form State
  const [producerName, setProducerName] = useState('');
  const [producerCity, setProducerCity] = useState('');
  const [producerDetails, setProducerDetails] = useState('');
  const [validationError, setValidationError] = useState('');
  const [readyForWhatsapp, setReadyForWhatsapp] = useState(false);

  // Calculator Integration State
  const [simulatedSummary, setSimulatedSummary] = useState('');
  const [simulatedPrice, setSimulatedPrice] = useState<number | null>(null);

  const contactFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openDirectWhatsappModal = (customMsg?: string) => {
    setModalMessage(customMsg);
    setMobileMenuOpen(false);
    setWhatsappModalOpen(true);
  };

  const handleCopyPhoneInline = async () => {
    const ok = await copyToClipboardSafe(WHATSAPP_COPY_VALUE);
    if (ok) {
      setCopiedInlinePhone(true);
      window.setTimeout(() => setCopiedInlinePhone(false), 2500);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 88;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleEstimateCalculated = (summary: string, total: number) => {
    setSimulatedSummary(summary);
    setSimulatedPrice(total);
    setProducerDetails(summary);
    setReadyForWhatsapp(false);

    const container = contactFormRef.current;
    if (container) {
      const topPos = container.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    }
  };

  const handleClearSimulation = () => {
    setSimulatedSummary('');
    setSimulatedPrice(null);
    setProducerDetails('');
    setReadyForWhatsapp(false);
  };

  const buildPlainMessage = () => {
    let text = `Olá! Gostaria de falar com o Engenheiro Agrônomo sobre consultoria técnica rural.\n\n`;
    if (producerName.trim()) {
      text += `Produtor / Propriedade: ${producerName.trim()}\n`;
    }
    if (producerCity.trim()) {
      text += `Município / Região: ${producerCity.trim()}\n`;
    }
    if (simulatedPrice) {
      text += `\nSimulação Realizada no Site (Estimativa: R$ ${simulatedPrice.toLocaleString('pt-BR')}):\n${simulatedSummary}\n`;
    } else if (producerDetails.trim()) {
      text += `\nNecessidade na Propriedade:\n${producerDetails.trim()}\n`;
    }
    return text.trim();
  };

  const isFormValid = producerName.trim().length > 0 && producerCity.trim().length > 0;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setValidationError('Por favor, informe seu nome (ou nome da fazenda) e o município da propriedade.');
      return;
    }

    const msg = buildPlainMessage();
    setValidationError('');
    setReadyForWhatsapp(true);
    void copyToClipboardSafe(msg);
    openDirectWhatsappModal(msg);
  };

  const handleValidAnchorClick = () => {
    const msg = buildPlainMessage();
    setValidationError('');
    setReadyForWhatsapp(true);
    void copyToClipboardSafe(msg);
    setModalMessage(msg);
  };

  return (
    <div className="min-h-screen bg-agro-bg text-agro-cream font-sans overflow-x-hidden">
      <WhatsappModal
        isOpen={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
        prefilledMessage={modalMessage}
      />

      {/* 1. TOP NAVIGATION BAR (3-Zone Clean Architecture) */}
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: PREMIUM_EASE }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          isScrolled
            ? 'py-3.5 bg-agro-bg/90 backdrop-blur-xl border-b border-agro-border'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Lockup (Logo preserved, single clean brand label) */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-left cursor-pointer shrink-0"
          >
            <BrandMark />
            <span className="font-display font-bold text-base sm:text-lg tracking-tight text-agro-cream whitespace-nowrap">
              Engenharia Agronômica
            </span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { id: 'servicos', label: 'Serviços no Campo' },
              { id: 'mercado', label: 'Mercado & Safra' },
              { id: 'resultados', label: 'Resultados Reais' },
              { id: 'calculadora', label: 'Calculadora Rural' },
              { id: 'duvidas', label: 'Dúvidas' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className="text-sm font-medium text-agro-muted hover:text-agro-cream transition-colors whitespace-nowrap cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Single Primary WhatsApp CTA */}
          <div className="hidden lg:flex items-center shrink-0">
            <button
              type="button"
              onClick={() => openDirectWhatsappModal()}
              className="px-5 py-2.5 bg-agro-emerald hover:bg-agro-leaf text-agro-bg rounded-xl font-display font-bold text-xs tracking-wide transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              Agendar Visita Técnica
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-agro-cream hover:text-agro-emerald transition-colors cursor-pointer"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* MOBILE NAVIGATION DRAWER (Only WhatsApp — Zero other social media) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-agro-bg/98 backdrop-blur-xl pt-24 px-6 pb-10 flex flex-col justify-between lg:hidden"
          >
            <div className="flex flex-col space-y-5 pt-4">
              {[
                { id: 'servicos', label: 'Serviços no Campo' },
                { id: 'mercado', label: 'Mercado & Safra' },
                { id: 'resultados', label: 'Resultados Reais' },
                { id: 'calculadora', label: 'Calculadora Rural' },
                { id: 'duvidas', label: 'Dúvidas Frequentes' },
                { id: 'contato', label: 'Solicitar Diagnóstico' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="text-xl font-display font-bold text-agro-cream hover:text-agro-emerald text-left py-2 border-b border-agro-border/60 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="bg-agro-surface border border-agro-border rounded-2xl p-5 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-agro-muted block">
                Atendimento Direto • WhatsApp Pessoal
              </span>
              <span className="text-lg font-mono font-bold text-agro-emerald select-all block">
                {WHATSAPP_DISPLAY}
              </span>
              <button
                type="button"
                onClick={() => openDirectWhatsappModal()}
                className="w-full py-3 px-4 bg-agro-emerald text-agro-bg rounded-xl font-display font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                Chamar no WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HERO SECTION (Photorealistic Rural Crop Landscape + Clear Agronomic Proposition) */}
      <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
        {/* Subtle atmospheric glow */}
        <div className="absolute top-16 left-1/3 w-[42rem] h-[28rem] bg-agro-emerald/[0.07] blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Hero Copy */}
            <StaggerContainer
              immediate
              staggerDelay={0.1}
              delayChildren={0.06}
              className="lg:col-span-6 space-y-7 text-left"
            >
              <StaggerItem yOffset={20}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-agro-emerald">
                  Consultoria Agronômica Independente & Manejo de Precisão
                </p>
              </StaggerItem>

              <StaggerItem yOffset={24}>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display font-extrabold tracking-tight leading-[1.08] text-agro-cream">
                  Mais sacas e arrobas por hectare começam na{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-agro-emerald to-agro-gold">
                    ciência do solo.
                  </span>
                </h1>
              </StaggerItem>

              <StaggerItem yOffset={22}>
                <p className="text-base sm:text-lg text-agro-muted leading-relaxed max-w-xl">
                  Diagnóstico agronômico completo para lavouras de grãos, pastagens e culturas perenes. Eliminamos o desperdício na compra de adubos e defensivos com prescrições técnicas 100% isentas de vínculo comercial.
                </p>
              </StaggerItem>

              {/* Primary & Secondary Actions */}
              <StaggerItem yOffset={20} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() => scrollTo('calculadora')}
                  className="px-7 py-4 bg-agro-emerald hover:bg-agro-leaf text-agro-bg rounded-xl font-display font-bold text-sm transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-agro-emerald/15"
                >
                  Simular Produtividade da Área
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => openDirectWhatsappModal()}
                  className="px-7 py-4 bg-agro-surface hover:bg-agro-elevated border border-agro-border text-agro-cream rounded-xl font-display font-semibold text-sm transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-agro-emerald" />
                  Falar pelo WhatsApp
                </button>
              </StaggerItem>

              {/* Quantified Agronomic Proof Bar */}
              <StaggerItem yOffset={20} className="pt-7 border-t border-agro-border grid grid-cols-3 gap-6">
                <div>
                  <span className="text-2xl sm:text-3xl font-mono font-bold tabular-nums text-agro-cream block">
                    +14,8 sc
                  </span>
                  <span className="text-xs text-agro-muted block mt-1">
                    Ganho médio/ha em solos corrigidos
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-mono font-bold tabular-nums text-agro-gold block">
                    -28%
                  </span>
                  <span className="text-xs text-agro-muted block mt-1">
                    Redução em adubação mal alocada
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-mono font-bold tabular-nums text-agro-emerald block">
                    100%
                  </span>
                  <span className="text-xs text-agro-muted block mt-1">
                    Isento de revendas químicas
                  </span>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Hero Photorealistic Landscape Frame */}
            <FadeInUp
              immediate
              delay={0.22}
              duration={0.85}
              yOffset={34}
              className="lg:col-span-6"
            >
              <IllustrationFrame
                src={heroCampoImg}
                alt="Fotografia realista de lavoura comercial brasileira em solo fértil ao nascer do sol"
                aspectClass="aspect-[16/10]"
                caption="Manejo nutricional de precisão e construção de perfil radicular profundo"
                metricBadge="Safra de Alta Performance"
                priority
                className="shadow-2xl shadow-black/50"
              />
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* 3. CORE AGRONOMIC CAPABILITIES (Asymmetric Bento Grid + Realistic Soil & Pasture Photos) */}
      <section id="servicos" className="py-20 lg:py-28 border-t border-agro-border bg-agro-surface/35">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-14">
          <FadeInUp
            yOffset={28}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-agro-gold mb-2">
                Engenharia de Campo Aplicada
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-agro-cream">
                Soluções técnicas do preparo do solo ao fechamento da colheita.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-agro-muted max-w-md leading-relaxed">
              Atuação técnica estruturada para proteger o caixa do produtor rural, elevar a fertilidade da terra e estabilizar altas produtividades mesmo em anos de clima desafiador.
            </p>
          </FadeInUp>

          {/* Asymmetric Bento Grid */}
          <StaggerContainer
            staggerDelay={0.12}
            amount={0.08}
            className="grid lg:grid-cols-3 gap-6"
          >
            {/* 01. Marquee Span-2 Card: Fertilidade do Solo */}
            <StaggerItem
              yOffset={28}
              className="lg:col-span-2 bg-agro-surface border border-agro-border hover:border-agro-emerald/35 rounded-3xl p-6 sm:p-8 grid md:grid-cols-12 gap-6 items-center transition-colors duration-300"
            >
              <div className="md:col-span-7 space-y-4">
                <span className="font-mono text-xs font-semibold text-agro-emerald">
                  01. Nutrição & Perfil de Solo
                </span>
                <h3 className="text-2xl font-display font-bold text-agro-cream tracking-tight">
                  Análise de Solo, Calagem, Gessagem & Recomendação NPK
                </h3>
                <p className="text-sm text-agro-muted leading-relaxed">
                  Amostragem criteriosa por zona de manejo, neutralização do alumínio tóxico em profundidade e equilíbrio exato entre Cálcio, Magnésio, Potássio, Fósforo e micronutrientes.
                </p>
                <ul className="space-y-2 pt-2">
                  {[
                    'Cálculo preciso de PRNT e dose real de calcário e gesso agrícola',
                    'Corte de fórmulas comerciais caras que não atendem à necessidade do talhão',
                    'Construção de caixa produtivo para suportar veranicos',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-agro-cream/85">
                      <Check className="w-4 h-4 text-agro-emerald shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-5">
                <IllustrationFrame
                  src={soloLavouraImg}
                  alt="Solo fértil escuro com plantas jovens de milho e soja em pleno vigor vegetativo"
                  aspectClass="aspect-[4/3]"
                  caption="Arranque vegetativo uniforme"
                />
              </div>
            </StaggerItem>

            {/* 02. Span-1 Card: Manejo Fitossanitário MIP */}
            <StaggerItem
              yOffset={28}
              className="bg-agro-surface border border-agro-border hover:border-agro-gold/35 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-colors duration-300"
            >
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-agro-elevated border border-agro-border flex items-center justify-center text-agro-gold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-semibold text-agro-gold block">
                  02. Proteção de Lavoura
                </span>
                <h3 className="text-xl font-display font-bold text-agro-cream tracking-tight">
                  Manejo Integrado de Pragas, Doenças e Daninhas
                </h3>
                <p className="text-sm text-agro-muted leading-relaxed">
                  Vistoria técnica de talhões para entrada no nível exato de controle, rotacionando princípios ativos para evitar resistência e reduzindo pulverizações perdidas.
                </p>
              </div>
              <div className="pt-4 border-t border-agro-border text-xs text-agro-muted flex items-center justify-between">
                <span>Tecnologia de aplicação</span>
                <span className="font-mono text-agro-cream">Bicos, calda e alvo</span>
              </div>
            </StaggerItem>

            {/* 03. Span-1 Card: Agricultura de Precisão */}
            <StaggerItem
              yOffset={28}
              className="bg-agro-surface border border-agro-border hover:border-agro-emerald/35 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-colors duration-300"
            >
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-agro-elevated border border-agro-border flex items-center justify-center text-agro-emerald">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-semibold text-agro-emerald block">
                  03. Mapeamento & Dados
                </span>
                <h3 className="text-xl font-display font-bold text-agro-cream tracking-tight">
                  Agricultura de Precisão & Taxa Variável
                </h3>
                <p className="text-sm text-agro-muted leading-relaxed">
                  Identificação de manchas de baixa e alta fertilidade dentro do mesmo talhão para distribuir sementes e corretivos conforme o potencial real de cada hectare.
                </p>
              </div>
              <div className="pt-4 border-t border-agro-border text-xs text-agro-muted flex items-center justify-between">
                <span>Mapas de aplicação</span>
                <span className="font-mono text-agro-cream">Compatível GPS agrícola</span>
              </div>
            </StaggerItem>

            {/* 04. Marquee Span-2 Card: Reforma & Manejo de Pastagens */}
            <StaggerItem
              yOffset={28}
              className="lg:col-span-2 bg-agro-surface border border-agro-border hover:border-agro-gold/35 rounded-3xl p-6 sm:p-8 grid md:grid-cols-12 gap-6 items-center transition-colors duration-300"
            >
              <div className="md:col-span-5 order-2 md:order-1">
                <IllustrationFrame
                  src={propriedadePastagemImg}
                  alt="Propriedade rural brasileira com pastagens verdes divididas em piquetes rotacionados"
                  aspectClass="aspect-[4/3]"
                  caption="Pastejo rotacionado de alta lotação"
                />
              </div>
              <div className="md:col-span-7 order-1 md:order-2 space-y-4">
                <span className="font-mono text-xs font-semibold text-agro-gold">
                  04. Pecuária Intensiva a Pasto
                </span>
                <h3 className="text-2xl font-display font-bold text-agro-cream tracking-tight">
                  Reforma de Pastagens, Divisão de Piquetes & Lotação Animal
                </h3>
                <p className="text-sm text-agro-muted leading-relaxed">
                  Transformamos pasto rapado ou invadido em lavoura de capim altamente produtiva. Escolha técnica de cultivares (Brachiaria, Panicum/Mombaça, Zuri), adubação de manutenção e ajuste de carga animal.
                </p>
                <ul className="space-y-2 pt-2">
                  {[
                    'Aumento expressivo de UA/ha sem precisar comprar mais terra',
                    'Planejamento forrageiro para atravessar o período seco com segurança',
                    'Controle seletivo de plantas daninhas de pastagem',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-agro-cream/85">
                      <Check className="w-4 h-4 text-agro-gold shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 4. INTERACTIVE MARKET & HARVEST MARGIN CHART */}
      <section id="mercado" className="py-20 lg:py-28 border-t border-agro-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <ResultDemo />
        </div>
      </section>

      {/* 5. REALISTIC FIELD CASE STUDIES */}
      <section id="resultados" className="py-20 lg:py-28 border-t border-agro-border bg-agro-surface/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <FadeInUp yOffset={28} className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-agro-emerald mb-2">
              Comprovação Prática na Lavoura e no Pasto
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-agro-cream">
              Resultados construídos em campo.
            </h2>
            <p className="text-sm sm:text-base text-agro-muted mt-3 leading-relaxed">
              Conheça exemplos reais de intervenções agronômicas focadas em correção química de perfil, eficiência nutricional e manejo intensivo de pastagens.
            </p>
          </FadeInUp>

          <PortfolioShowcase />
        </div>
      </section>

      {/* 6. MODERN AGRONOMIC CALCULATOR */}
      <section id="calculadora" className="py-20 lg:py-28 border-t border-agro-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <FadeInUp yOffset={28} className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-agro-gold mb-2">
              Planejamento Transparente de Safra
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-agro-cream">
              Simulador de Produtividade & Consultoria Rural.
            </h2>
            <p className="text-sm sm:text-base text-agro-muted mt-3 leading-relaxed">
              Ajuste o tamanho da sua área, a cultura principal e os serviços desejados para visualizar na hora o potencial de retorno e enviar seu cenário direto para avaliação técnica.
            </p>
          </FadeInUp>

          <BudgetCalculator onEstimateCalculated={handleEstimateCalculated} />
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section id="duvidas" className="py-20 lg:py-28 border-t border-agro-border bg-agro-surface/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <FadeInUp yOffset={28} className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-agro-emerald mb-2">
              Perguntas Frequentes
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-agro-cream">
              Dúvidas comuns do produtor rural
            </h2>
            <p className="text-sm sm:text-base text-agro-muted mt-2">
              Entenda como funciona o acompanhamento agronômico independente na prática.
            </p>
          </FadeInUp>

          <FaqSection />
        </div>
      </section>

      {/* 8. DIRECT WHATSAPP CONSULTATION & FORM (Exclusively WhatsApp — Zero Social Networks) */}
      <section id="contato" className="py-20 lg:py-28 border-t border-agro-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div ref={contactFormRef}>
            <FadeInUp
              yOffset={32}
              duration={0.75}
              amount={0.08}
              className="bg-agro-surface border border-agro-border rounded-3xl p-6 sm:p-12 lg:p-16"
            >
              <StaggerContainer
                staggerDelay={0.14}
                amount={0.08}
                className="grid lg:grid-cols-12 gap-12 items-start"
              >
                {/* Left Info */}
                <StaggerItem yOffset={24} className="lg:col-span-5 space-y-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-agro-gold mb-2">
                    Atendimento Técnico Direto
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-agro-cream">
                    Solicite um diagnóstico para sua propriedade.
                  </h2>
                  <p className="text-sm sm:text-base text-agro-muted mt-3 leading-relaxed">
                    Envie os dados básicos da sua área ou fale agora mesmo diretamente pelo WhatsApp oficial. Sem intermediários e sem compromisso inicial.
                  </p>
                </div>

                <div className="space-y-5 pt-2">
                  <div className="p-5 rounded-2xl bg-agro-bg border border-agro-border space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-agro-emerald/15 text-agro-emerald shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-agro-muted block">
                          WhatsApp Pessoal Direto
                        </span>
                        <span className="text-lg font-mono font-bold text-agro-emerald select-all mt-0.5 block">
                          {WHATSAPP_DISPLAY}
                        </span>
                        <span className="text-xs text-agro-muted block mt-0.5">
                          Atendimento direto com o Engenheiro Agrônomo (sem robôs ou intermediários)
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => openDirectWhatsappModal()}
                        className="px-3.5 py-2 rounded-xl bg-agro-emerald hover:bg-agro-leaf text-agro-bg font-display font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Chamar Agora
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyPhoneInline}
                        className="px-3.5 py-2 rounded-xl bg-agro-surface hover:bg-agro-elevated border border-agro-border text-agro-cream text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedInlinePhone ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-agro-emerald" />
                            Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-agro-emerald" />
                            Copiar Número
                          </>
                        )}
                      </button>

                      <a
                        href={VCARD_DATA_URI}
                        download="engenheiro-agronomo.vcf"
                        className="px-3.5 py-2 rounded-xl bg-agro-surface hover:bg-agro-elevated border border-agro-border text-agro-cream text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                      >
                        <UserPlus className="w-3.5 h-3.5 text-agro-gold" />
                        Salvar na Agenda
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-agro-bg border border-agro-border">
                    <div className="p-3 rounded-xl bg-agro-gold/15 text-agro-gold shrink-0">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-agro-muted block">
                        Modalidades de Atendimento
                      </span>
                      <p className="text-sm font-medium text-agro-cream mt-0.5">
                        Visitas técnicas presenciais na fazenda & interpretação de análises de solo
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-agro-bg border border-agro-border">
                    <div className="p-3 rounded-xl bg-agro-elevated text-agro-cream shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-agro-muted block">
                        Abrangência Rural
                      </span>
                      <p className="text-sm font-medium text-agro-cream mt-0.5">
                        Atendimento regional em campo e planejamento remoto de safra para todo o Brasil
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* Right Form */}
              <StaggerItem
                yOffset={24}
                className="lg:col-span-7 bg-agro-bg border border-agro-border rounded-2xl p-6 sm:p-10"
              >
                <h3 className="text-xl sm:text-2xl font-display font-bold text-agro-cream">
                  Enviar Dados da Propriedade pelo WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-agro-muted mt-1 mb-6">
                  Preencha abaixo para estruturar sua mensagem técnica automaticamente.
                </p>

                {/* Pre-loaded Calculator Summary */}
                {simulatedPrice && (
                  <div className="mb-6 p-4 bg-agro-elevated border border-agro-emerald/40 rounded-xl relative">
                    <button
                      type="button"
                      onClick={handleClearSimulation}
                      className="absolute top-3 right-3 p-1 rounded-lg text-agro-muted hover:text-agro-cream hover:bg-agro-surface cursor-pointer"
                      title="Limpar simulação"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-agro-emerald block">
                      Simulação da Calculadora Anexada
                    </span>
                    <div className="text-base font-mono font-bold tabular-nums text-agro-gold mt-0.5">
                      Investimento estimado: R$ {simulatedPrice.toLocaleString('pt-BR')}
                    </div>
                    <p className="text-xs text-agro-muted mt-1 whitespace-pre-line">
                      {simulatedSummary}
                    </p>
                  </div>
                )}

                {validationError && (
                  <div className="mb-6 p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                {readyForWhatsapp && (
                  <div className="mb-6 p-4 rounded-xl bg-agro-emerald/15 border border-agro-emerald/40 text-agro-cream text-xs sm:text-sm space-y-3">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-agro-emerald shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block">
                          Resumo copiado automaticamente! Basta colar na conversa do WhatsApp.
                        </span>
                        <span className="text-xs text-agro-muted block mt-0.5">
                          Se o seu celular não abriu direto por ser WhatsApp Pessoal, use uma das alternativas rápidas:
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href={WHATSAPP_APP_URI}
                        className="px-3.5 py-2 bg-agro-emerald text-agro-bg font-bold rounded-lg text-xs"
                      >
                        Abrir Direto no App
                      </a>
                      <a
                        href={VCARD_DATA_URI}
                        download="engenheiro-agronomo.vcf"
                        className="px-3.5 py-2 bg-agro-surface border border-agro-border text-agro-cream font-semibold rounded-lg text-xs"
                      >
                        Salvar na Agenda
                      </a>
                      <a
                        href={WHATSAPP_ALT_NO9_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 bg-agro-surface border border-agro-border text-agro-gold font-semibold rounded-lg text-xs"
                      >
                        Link sem 9º dígito (DDD 97)
                      </a>
                    </div>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="producer-name"
                        className="text-xs font-semibold text-agro-muted block"
                      >
                        Seu Nome ou Nome da Fazenda *
                      </label>
                      <input
                        id="producer-name"
                        type="text"
                        required
                        value={producerName}
                        onChange={(e) => {
                          setProducerName(e.target.value);
                          if (validationError) setValidationError('');
                        }}
                        placeholder="Ex: Fazenda Santa Luzia / João"
                        className="w-full bg-agro-surface px-4 py-3.5 border border-agro-border rounded-xl outline-none text-sm text-agro-cream placeholder:text-agro-muted/45 focus:border-agro-emerald transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="producer-city"
                        className="text-xs font-semibold text-agro-muted block"
                      >
                        Município / Estado (UF) *
                      </label>
                      <input
                        id="producer-city"
                        type="text"
                        required
                        value={producerCity}
                        onChange={(e) => {
                          setProducerCity(e.target.value);
                          if (validationError) setValidationError('');
                        }}
                        placeholder="Ex: Humaitá - AM / Sorriso - MT"
                        className="w-full bg-agro-surface px-4 py-3.5 border border-agro-border rounded-xl outline-none text-sm text-agro-cream placeholder:text-agro-muted/45 focus:border-agro-emerald transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="producer-details"
                      className="text-xs font-semibold text-agro-muted block"
                    >
                      Cultura, Tamanho da Área ou Objetivo Principal
                    </label>
                    <textarea
                      id="producer-details"
                      rows={4}
                      value={producerDetails}
                      onChange={(e) => setProducerDetails(e.target.value)}
                      placeholder="Ex: Tenho 150 ha de pastagem precisando de reforma e análise de solo para intensificar lotação."
                      className="w-full bg-agro-surface px-4 py-3.5 border border-agro-border rounded-xl outline-none text-sm text-agro-cream placeholder:text-agro-muted/45 focus:border-agro-emerald transition-colors resize-none"
                    />
                  </div>

                  {isFormValid ? (
                    <a
                      href={WHATSAPP_CLEAN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleValidAnchorClick}
                      className="w-full py-4 px-6 bg-agro-emerald hover:bg-agro-leaf text-agro-bg rounded-xl font-display font-bold text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-agro-emerald/15 active:scale-[0.99]"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Abrir WhatsApp & Copiar Dados
                    </a>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-agro-emerald hover:bg-agro-leaf text-agro-bg rounded-xl font-display font-bold text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-agro-emerald/15 active:scale-[0.99]"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Iniciar Atendimento no WhatsApp
                    </button>
                  )}
                </form>
              </StaggerItem>
            </StaggerContainer>
          </FadeInUp>
          </div>
        </div>
      </section>

      {/* 9. QUIET EDITORIAL FOOTER (Preserved Official Logo + Only WhatsApp, Zero Other Socials) */}
      <footer className="py-14 bg-agro-bg border-t border-agro-border">
        <FadeInUp
          yOffset={20}
          duration={0.6}
          amount={0.2}
          className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-3.5">
            <BrandMark className="h-9" />
            <div>
              <span className="font-display font-bold text-sm text-agro-cream block">
                Consultoria & Engenharia Agronômica
              </span>
              <span className="text-xs text-agro-muted block">
                Manejo de Solo, Lavouras e Pastagens de Alta Produtividade
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-agro-muted">
            <button
              type="button"
              onClick={() => scrollTo('servicos')}
              className="hover:text-agro-cream transition-colors cursor-pointer"
            >
              Serviços
            </button>
            <button
              type="button"
              onClick={() => scrollTo('mercado')}
              className="hover:text-agro-cream transition-colors cursor-pointer"
            >
              Mercado
            </button>
            <button
              type="button"
              onClick={() => scrollTo('resultados')}
              className="hover:text-agro-cream transition-colors cursor-pointer"
            >
              Resultados
            </button>
            <button
              type="button"
              onClick={() => scrollTo('calculadora')}
              className="hover:text-agro-cream transition-colors cursor-pointer"
            >
              Calculadora
            </button>
            <button
              type="button"
              onClick={() => openDirectWhatsappModal()}
              className="text-agro-emerald font-mono font-semibold hover:underline cursor-pointer"
            >
              WhatsApp: {WHATSAPP_DISPLAY}
            </button>
          </div>

          <p className="text-xs text-agro-muted text-center md:text-right">
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </FadeInUp>
      </footer>

      {/* FLOATING WHATSAPP CTA BUTTON */}
      <motion.button
        type="button"
        onClick={() => openDirectWhatsappModal()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: PREMIUM_EASE }}
        aria-label="Falar com Engenheiro Agrônomo no WhatsApp"
        title="Atendimento Direto via WhatsApp Pessoal"
        className="fixed bottom-6 right-6 z-40 bg-agro-emerald hover:bg-agro-leaf text-agro-bg p-4 rounded-full shadow-xl shadow-black/40 hover:scale-105 active:scale-95 transition-transform flex items-center gap-2.5 cursor-pointer"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline font-display font-bold text-xs pr-1">
          Falar no WhatsApp
        </span>
      </motion.button>
    </div>
  );
};

export default App;
