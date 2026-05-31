import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Sparkles, 
  Zap, 
  Layers, 
  MessageSquare, 
  Globe, 
  Search, 
  Layout, 
  Sliders, 
  TrendingUp, 
  ArrowUpRight, 
  Percent, 
  Clock, 
  Briefcase,
  DollarSign,
  Send,
  Cpu,
  BarChart3,
  HelpCircle
} from 'lucide-react';

interface CalculatorProps {
  onEstimateCalculated: (summary: string, total: number) => void;
}

// Years and market data points
const MARKET_YEARS = ['2023', '2024', '2025', '2026', '2027 (Proj)'];

export const BudgetCalculator: React.FC<CalculatorProps> = ({ onEstimateCalculated }) => {
  // Simulator state variables
  const [revenue, setRevenue] = useState<number>(35000); // Monthly business revenue in BRL
  const [wastedHours, setWastedHours] = useState<number>(30); // Hours wasted per month in repetitive tasks
  const [traffic, setTraffic] = useState<number>(2500); // Current monthly visitors
  
  // Enabled technological solutions
  const [webElite, setWebElite] = useState<boolean>(true);
  const [automations, setAutomations] = useState<boolean>(false);
  const [aiAgents, setAiAgents] = useState<boolean>(false);
  const [premiumDesign, setPremiumDesign] = useState<boolean>(true);

  // Dynamic calculations based on strategy config
  const [roiMetrics, setRoiMetrics] = useState({
    suggestedInvestment: 2500,
    timeSavedCostValue: 1200,
    conversionIncreaseMultiplier: 1.5,
    estimatedNewRevenue: 3750,
    projectedRoiMultiplier: 4.5,
  });

  // Selected year in chart for details tooltip
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(3); // 2026 default

  useEffect(() => {
    // Calculo de Engenharia de Valor & Retorno sobre Investimento
    let baseInvestment = 1500;
    let multiplier = 1.0;
    
    if (webElite) {
      baseInvestment += 1300;
      multiplier += 0.3;
    }
    if (automations) {
      baseInvestment += 2100;
      multiplier += 0.55;
    }
    if (aiAgents) {
      baseInvestment += 3800;
      multiplier += 0.9;
    }
    if (premiumDesign) {
      baseInvestment += 1400;
      multiplier += 0.4;
    }

    // High performance SEO / conversion multiplier adjusts
    const finalInvestment = Math.max(1900, Math.round(baseInvestment));

    // Dynamic calculated business metrics
    // Hourly rate considered at R$ 60 BRL
    const monthlyTimeValueSaved = wastedHours * 65; 
    
    // Improvement in capture conversion rate
    let conversionImprovement = 1.25;
    if (webElite && premiumDesign) conversionImprovement = 2.1;
    if (automations) conversionImprovement += 0.6;
    if (aiAgents) conversionImprovement += 0.8;

    // Projected new revenue calculation (from traffic, converting to leads, multiplying conversion increase)
    // baseline average lead value assumed from monthly revenue
    const estimatedConversionRateBaseline = 0.015; // 1.5%
    const averageTicketValue = revenue / Math.max(1, (traffic * estimatedConversionRateBaseline));
    const baselineLeadsCount = traffic * estimatedConversionRateBaseline;
    const elevatedLeadsCount = baselineLeadsCount * conversionImprovement;
    const leadsDiff = Math.max(0, elevatedLeadsCount - baselineLeadsCount);
    
    const monthlyRevenueGain = Math.round(leadsDiff * averageTicketValue * 0.42); // 42% closing rate impact
    const calculatedRoi = Math.max(1.8, Number(((monthlyRevenueGain * 12) / finalInvestment).toFixed(1)));

    setRoiMetrics({
      suggestedInvestment: finalInvestment,
      timeSavedCostValue: Math.round(monthlyTimeValueSaved),
      conversionIncreaseMultiplier: Number(conversionImprovement.toFixed(2)),
      estimatedNewRevenue: monthlyRevenueGain || Math.round(revenue * 0.12),
      projectedRoiMultiplier: calculatedRoi,
    });
  }, [revenue, wastedHours, traffic, webElite, automations, aiAgents, premiumDesign]);

  const handleApplyEstimate = () => {
    const activeTechList: string[] = [];
    if (webElite) activeTechList.push('Web de Elite (Lighthouse 100%)');
    if (automations) activeTechList.push('Automações Operacionais Inteligentes (WhatsApp/CRM)');
    if (aiAgents) activeTechList.push('Agentes de IA e Modelagem Cognitiva');
    if (premiumDesign) activeTechList.push('Direção de Arte High-Contrast Premium');

    const summary = `SIMULADOR ROI DE MERCADO:\n` +
      `- Faturamento Mensal do Cliente: R$ ${revenue.toLocaleString('pt-BR')}\n` +
      `- Gargalo Operacional: ${wastedHours} horas/mês desperdiçadas\n` +
      `- Configuração Tecnológica Ativa: ${activeTechList.join(' | ')}\n` +
      `- Otimização de Conversão: +${Math.round((roiMetrics.conversionIncreaseMultiplier - 1) * 100)}% de Eficiência de Leads\n` +
      `- Economia Operacional Esperada: R$ ${roiMetrics.timeSavedCostValue.toLocaleString('pt-BR')}/mês\n` +
      `- Ganho Estimado (12 meses): R$ ${(roiMetrics.estimatedNewRevenue * 12).toLocaleString('pt-BR')}`;

    onEstimateCalculated(summary, roiMetrics.suggestedInvestment);

    // Scroll to contact form smoothly
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Coordinates data for the responsive SVG Market Chart
  // Represents growth/conversion performance index over years (out of 100)
  const ourTechCurve = [35, 55, 78, 96, 120]; // Exponential dominance path
  const basicTechCurve = [45, 40, 28, 16, 9];   // Obsolete slow standard system path

  return (
    <div className="bg-slate-950/70 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-6 lg:p-12 relative overflow-hidden shadow-2xl">
      {/* Decorative localized glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-br-yellow/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-br-green/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 text-left">
        
        {/* LEFT COLUMN: Strategic inputs & Modern Sliders */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-br-yellow/10 rounded-full border border-br-yellow/20 text-br-yellow text-[10px] font-black uppercase tracking-widest mb-4">
              <TrendingUp className="w-3.5 h-3.5" /> Simulador Tático de Transformação Digital
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight italic text-white">
              Simule o <span className="text-transparent bg-clip-text bg-gradient-to-r from-br-yellow to-emerald-400">Poder de Escala</span> da Sua Empresa
            </h3>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light mt-2 max-w-xl">
              Altere os controles interativos abaixo para mapear as perdas operacionais atuais, o investimento tático necessário e o retorno tecnológico projetado.
            </p>
          </div>

          <div className="space-y-6">
            {/* Slider 1: Revenue Scale */}
            <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-br-yellow" /> Faturamento Mensal Atual
                </span>
                <span className="text-sm font-black text-br-yellow">
                  R$ {revenue.toLocaleString('pt-BR')}
                </span>
              </div>
              <input 
                type="range" 
                min="5000" 
                max="250000" 
                step="5000"
                value={revenue} 
                onChange={(e) => setRevenue(parseInt(e.target.value))}
                className="w-full accent-br-yellow cursor-pointer h-1 rounded-lg bg-white/10"
              />
              <div className="flex justify-between text-[9px] text-white/20 uppercase font-bold pt-1">
                <span>Iniciante (R$ 5K)</span>
                <span>Médio Alto (R$ 120K)</span>
                <span>Enterprise (R$ 250K+)</span>
              </div>
            </div>

            {/* Slider 2: Wasted labor hours */}
            <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-br-green" /> Desperdício de Tempo de Equipe
                </span>
                <span className="text-sm font-black text-white">
                  {wastedHours} horas / mês
                </span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="120" 
                step="5"
                value={wastedHours} 
                onChange={(e) => setWastedHours(parseInt(e.target.value))}
                className="w-full accent-br-green cursor-pointer h-1 rounded-lg bg-white/10"
              />
              <p className="text-[9.5px] text-white/30 font-light italic leading-tight">
                *Tempo consumido respondendo manualmente mensagens idênticas, criando relatórios ou alimentando planilhas desintegradas.
              </p>
            </div>

            {/* Slider 3: Traffic volume */}
            <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#0066ff]" /> Tráfego Mensal Estimado (Acessos)
                </span>
                <span className="text-sm font-black text-white">
                  {traffic.toLocaleString('pt-BR')} visualizações
                </span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="30000" 
                step="100"
                value={traffic} 
                onChange={(e) => setTraffic(parseInt(e.target.value))}
                className="w-full accent-[#0066ff] cursor-pointer h-1 rounded-lg bg-white/10"
              />
            </div>
            
            {/* Technologies Selection (Upgrade Boxes) */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 block mb-1">
                Selecione as Tecnologias Premium que você deseja integrar:
              </label>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {/* Checkbox 1 */}
                <button
                  type="button"
                  onClick={() => setWebElite(!webElite)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 select-none relative ${
                    webElite 
                      ? 'bg-br-green/10 border-br-green/45 text-white shadow-md' 
                      : 'bg-white/[0.01] border-white/5 text-white/40 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className={`p-1.5 rounded-md mt-0.5 ${webElite ? 'bg-br-green text-white' : 'bg-white/5 text-white/40'}`}>
                    <Layout className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider block">Web de Elite (Full Optimization)</span>
                    <span className="text-[9.5px] font-light leading-tight block mt-0.5 text-white/50">Lighthouse 100/100, sem dependência de templates lentos.</span>
                  </div>
                </button>

                {/* Checkbox 2 */}
                <button
                  type="button"
                  onClick={() => setAutomations(!automations)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 select-none relative ${
                    automations 
                      ? 'bg-br-green/10 border-br-green/45 text-white shadow-md' 
                      : 'bg-white/[0.01] border-white/5 text-white/40 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className={`p-1.5 rounded-md mt-0.5 ${automations ? 'bg-br-green text-white' : 'bg-white/5 text-white/40'}`}>
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider block">Automação com WhatsApp</span>
                    <span className="text-[9.5px] font-light leading-tight block mt-0.5 text-white/50">Disparos de leads automatizados e sincronização com CRM.</span>
                  </div>
                </button>

                {/* Checkbox 3 */}
                <button
                  type="button"
                  onClick={() => setAiAgents(!aiAgents)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 select-none relative ${
                    aiAgents 
                      ? 'bg-br-green/10 border-br-green/45 text-white shadow-md' 
                      : 'bg-white/[0.01] border-white/5 text-white/40 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className={`p-1.5 rounded-md mt-0.5 ${aiAgents ? 'bg-br-green text-white' : 'bg-white/5 text-white/40'}`}>
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider block">Inteligência Artificial</span>
                    <span className="text-[9.5px] font-light leading-tight block mt-0.5 text-white/50">Atendimento cognitivo robótico e triagem contextual de leads.</span>
                  </div>
                </button>

                {/* Checkbox 4 */}
                <button
                  type="button"
                  onClick={() => setPremiumDesign(!premiumDesign)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 select-none relative ${
                    premiumDesign 
                      ? 'bg-br-green/10 border-br-green/45 text-white shadow-md' 
                      : 'bg-white/[0.01] border-white/5 text-white/40 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className={`p-1.5 rounded-md mt-0.5 ${premiumDesign ? 'bg-br-green text-white' : 'bg-white/5 text-white/40'}`}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider block">Design Imersivo Cinematográfico</span>
                    <span className="text-[9.5px] font-light leading-tight block mt-0.5 text-white/50">Animações de alto padrão, tipografia marcante e exclusividade visual.</span>
                  </div>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Market Chart & ROI Summary */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          
          {/* REALTIME MARKET PERFORMANCE CHART */}
          <div className="bg-slate-900 border border-white/5 p-6 rounded-3xl space-y-5 relative overflow-hidden flex flex-col">
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-br-green/10 border border-br-green/20 px-2 py-0.5 rounded-md text-[9px] text-br-green font-black uppercase">
              <span className="w-1.5 h-1.5 bg-br-green rounded-full animate-pulse"></span>
              Live Market Data
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8]/40 block">Visualização Comparativa de Impacto</span>
              <h4 className="text-base font-black uppercase italic tracking-tight text-white mt-1">
                Evolução da Eficiência de Conversão: <span className="text-br-green">Empresas High-Tech</span> vs Comuns
              </h4>
              <p className="text-[10.5px] text-[#94a3b8]/50 font-light leading-snug">
                Sites obsoletos perdem tração rapidamente. A curva verde mostra o poder de conversão escalável com nosso sistema refinado de carregamento instantâneo + inteligência artificial.
              </p>
            </div>

            {/* Simulated Interactive SVG Chart Canvas */}
            <div className="relative w-full h-40 bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col justify-between mt-2">
              
              {/* Grid Horizontal Guide Lines */}
              <div className="absolute inset-x-0 top-1/4 border-b border-white/[0.02] pointer-events-none"></div>
              <div className="absolute inset-x-0 top-2/4 border-b border-white/[0.02] pointer-events-none"></div>
              <div className="absolute inset-x-0 top-3/4 border-b border-white/[0.02] pointer-events-none"></div>
              
              {/* Animated Glowing Curves inside SVG */}
              <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="ourTechGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#009c3b" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#009c3b" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="basicTechGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Curve 2: Traditional Legacy templates (WordPress/Wix) - DECLINING (Red) */}
                <motion.path
                  d="M 0 60 C 50 65, 100 80, 150 90 C 200 100, 250 110, 300 120"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  strokeOpacity="0.6"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />

                {/* Curve 1: Custom Tech Stack (Bespoke AI + Optimized Speed) - ACCELERATING (Green/Yellow) */}
                <motion.path
                  d="M 0 90 C 50 80, 100 50, 150 35 C 200 20, 250 10, 300 2"
                  fill="none"
                  stroke="#ffdf00"
                  strokeWidth="3.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                />

                {/* Highlight node circle matching interactive state */}
                <circle cx="225" cy="15" r="4" fill="#009c3b" className="animate-ping" />
                <circle cx="225" cy="15" r="3" fill="#ffdf00" />
              </svg>

              {/* Dynamic Overlay labels */}
              <div className="relative z-10 flex justify-between h-full items-end pb-1 font-mono text-[8px] text-white/30">
                {MARKET_YEARS.map((yr, idx) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setSelectedYearIndex(idx)}
                    className={`flex flex-col items-center gap-1 font-bold focus:outline-none transition-all cursor-pointer ${
                      selectedYearIndex === idx ? 'text-br-yellow scale-110 font-bold' : 'hover:text-white/60'
                    }`}
                  >
                    <span className="text-[7px]">
                      {idx === 0 ? 'Origem' : idx === 4 ? 'Domínio' : ''}
                    </span>
                    <span className="bg-black/30 border border-white/5 px-1.5 py-0.5 rounded mt-0.5">
                      {yr}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Data Point Feedback Card */}
            <div className="bg-black/40 border border-white/5 p-3 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-br-yellow rounded-full"></div>
                <div className="text-left">
                  <span className="text-[8px] uppercase tracking-wider text-white/35 font-mono block">Mapeamento em {MARKET_YEARS[selectedYearIndex]}</span>
                  <span className="text-[11px] font-black uppercase text-white tracking-tight">Sistemas Inteligentes Otimizados</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-[#94a3b8]/40 block">Poder de Capturar Leads</span>
                <span className="text-xs font-mono font-black italic text-br-green">
                  {ourTechCurve[selectedYearIndex] * 3}% de Retenção
                </span>
              </div>
            </div>
          </div>

          {/* REAL ESTIMATED STRATEGY VALUE & PROJECTION DATA CARD */}
          <div className="bg-black border border-white/5 hover:border-br-yellow/20 rounded-3xl p-6 lg:p-8 relative transition-colors">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-br-green via-br-yellow to-[#0066ff] rounded-t-3xl"></div>
            
            <div className="space-y-6">
              
              {/* ROI & Cost Reduction Breakdown Heading */}
              <div className="flex items-center justify-between border-b border-light border-white/5 pb-4">
                <div>
                  <span className="text-white/40 text-[9px] font-black tracking-widest uppercase block">Valor Justo Estimado</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xl font-bold text-br-green">R$</span>
                    <span className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white">
                      {roiMetrics.suggestedInvestment.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <span className="text-[9px] text-white/30 block mt-1">Investimento único. Sem taxas ocultas.</span>
                </div>

                <div className="text-right bg-br-green/10 border border-br-green/30 rounded-2xl p-3">
                  <span className="text-[8px] font-black uppercase tracking-wider text-br-yellow block">Aumento de Conversão</span>
                  <span className="text-lg font-black text-white italic block mt-0.5">
                    +{Math.round((roiMetrics.conversionIncreaseMultiplier - 1) * 100)}%
                  </span>
                  <span className="text-[8px] text-white/45 font-mono">Índice Projetado</span>
                </div>
              </div>

              {/* Three Pill Stats Dashboard */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3 text-left">
                  <span className="text-[8px] tracking-wider font-black text-white/30 uppercase block">Retorno Financeiro (ROI)</span>
                  <span className="text-sm font-black text-br-green italic mt-1 block">
                     ~ {roiMetrics.projectedRoiMultiplier}x no ano
                  </span>
                  <span className="text-[9px] text-white/40 block leading-tight font-light">Estimado sobre investimento</span>
                </div>
                
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3 text-left">
                  <span className="text-[8px] tracking-wider font-black text-white/30 uppercase block">Processos Automatizados</span>
                  <span className="text-sm font-black text-white italic mt-1 block">
                    {wastedHours}h salvas/mês
                  </span>
                  <span className="text-[9px] text-white/40 block leading-tight font-light">Equivalente a R$ {roiMetrics.timeSavedCostValue} economizado</span>
                </div>
              </div>

              {/* Dynamic bullet items detailing what they get */}
              <div className="space-y-2 bg-white/[0.01] border border-white/5 rounded-2xl p-4">
                <h5 className="text-[9.5px] font-black uppercase text-white/30 tracking-wider">Metas Tecnológicas Inclusas:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-white/70">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-br-green shrink-0" />
                    <span>Velocidade Sub 0.5s garantida</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-br-green shrink-0" />
                    <span>Backup e Cloud inclusos</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-br-green shrink-0" />
                    <span>Layout Autêntico Sem Modelos</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-br-green shrink-0" />
                    <span>Segurança Web Militar</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Simulated Action trigger */}
            <div className="mt-6 pt-5 border-t border-white/5 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleApplyEstimate}
                className="w-full py-4 bg-br-yellow hover:brightness-110 text-slate-950 rounded-2xl font-black text-xs sm:text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2.5 active:scale-95 shadow-[0_12px_24px_rgba(255,223,0,0.15)] cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-slate-950" /> Consolidar e Planejar no WhatsApp
              </button>
              <span className="text-[8.5px] text-center block text-white/30 tracking-wider">
                *O orçamento simulado será copiado para o formulário e disparado ao especialista Leonardo Nascimento.
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
