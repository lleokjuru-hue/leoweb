import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Flame, 
  Smartphone, 
  TrendingUp, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle,
  Clock, 
  Activity, 
  Award, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export const ResultDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leonasc' | 'competitor'>('leonasc');

  // Stats definition
  const stats = {
    leonasc: {
      performance: 100,
      seo: 100,
      loadingTime: "0.3s",
      conversionRate: "4.2%",
      userSatisfaction: "99.8%",
      scoreColor: "stroke-br-green",
      scoreText: "text-br-green",
      bgBorder: "border-br-green/30 shadow-lg shadow-br-green/10",
      leadsGrowth: [15, 45, 98, 160, 245, 380] // Monthly leads
    },
    competitor: {
      performance: 34,
      seo: 48,
      loadingTime: "4.8s",
      conversionRate: "0.9%",
      userSatisfaction: "42.0%",
      scoreColor: "stroke-red-500",
      scoreText: "text-red-500",
      bgBorder: "border-red-500/20 shadow-lg shadow-red-500/5",
      leadsGrowth: [10, 14, 18, 15, 20, 22] // Monthly leads
    }
  };

  const current = stats[activeTab];

  return (
    <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden shadow-2xl">
      {/* Background Neon Orbs */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-700 ${
        activeTab === 'leonasc' ? 'bg-br-green/10' : 'bg-red-500/5'
      }`}></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-br-yellow/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 space-y-10">
        
        {/* Header inside the panel with high converting copywriting */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-white/5">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-br-yellow text-[10px] font-black uppercase tracking-widest mb-3">
              <Activity className="w-3.5 h-3.5" /> Simulador de Performance & ROI
            </div>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight italic">
              Demonstração de <span className="text-br-yellow">Resultados Reais</span>
            </h3>
            <p className="text-xs md:text-sm text-white/50 mt-1 max-w-xl">
              Compare as engrenagens de um projeto assinado por nós contra sites comuns lentos criados em plataformas amadoras de arrastar-e-soltar.
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex bg-black/60 p-1.5 rounded-2xl border border-white/10 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('leonasc')}
              className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'leonasc' 
                  ? 'bg-gradient-to-r from-br-green to-emerald-600 text-white shadow-md shadow-br-green/20' 
                  : 'text-white/40 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" /> Leonasc Studio Pro
            </button>
            <button
              onClick={() => setActiveTab('competitor')}
              className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'competitor' 
                  ? 'bg-red-500/20 border border-red-500/30 text-red-400' 
                  : 'text-white/40 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" /> Sites Comuns (Lentos)
            </button>
          </div>
        </div>

        {/* Dashboard Grid and metrics */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Column 1: Lighthouse Scores Circular Meters & Basic Speeds */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            
            <div className="grid grid-cols-2 gap-4">
              {/* Performance Score Circular */}
              <div className="bg-black/40 border border-white/5 rounded-2xl p-5 text-center flex flex-col items-center justify-center">
                <span className="text-[9px] font-black tracking-widest uppercase text-white/45 mb-3 block">Performance</span>
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" className="stroke-white/5 fill-transparent" strokeWidth="6" />
                    <motion.circle 
                      cx="48" 
                      cy="48" 
                      r="40" 
                      className={`fill-transparent transition-all duration-1000 ${current.scoreColor}`} 
                      strokeWidth="6"
                      strokeDasharray={251.2}
                      initial={{ strokeDashoffset: 251.2 }}
                      animate={{ strokeDashoffset: 251.2 - (251.2 * current.performance) / 100 }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className={`absolute text-2xl font-black italic tracking-tighter ${current.scoreText}`}>
                    {current.performance}
                  </span>
                </div>
                <span className="text-[9px] font-mono mt-3 uppercase tracking-widest text-white/30 truncate">
                  Lighthouse Score
                </span>
              </div>

              {/* SEO Score Circular */}
              <div className="bg-black/40 border border-white/5 rounded-2xl p-5 text-center flex flex-col items-center justify-center">
                <span className="text-[9px] font-black tracking-widest uppercase text-white/45 mb-3 block">SEO Google</span>
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" className="stroke-white/5 fill-transparent" strokeWidth="6" />
                    <motion.circle 
                      cx="48" 
                      cy="48" 
                      r="40" 
                      className={`fill-transparent transition-all duration-1000 ${current.scoreColor}`} 
                      strokeWidth="6"
                      strokeDasharray={251.2}
                      initial={{ strokeDashoffset: 251.2 }}
                      animate={{ strokeDashoffset: 251.2 - (251.2 * current.seo) / 100 }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className={`absolute text-2xl font-black italic tracking-tighter ${current.scoreText}`}>
                    {current.seo}
                  </span>
                </div>
                <span className="text-[9px] font-mono mt-3 uppercase tracking-widest text-white/30 truncate">
                  Google Indexer
                </span>
              </div>
            </div>

            {/* Micro details panel */}
            <div className={`border rounded-3xl p-6 text-left transition-all duration-500 ${current.bgBorder} bg-black/30`}>
              <span className="text-[8px] font-black tracking-widest uppercase text-white/30 block mb-4">Informações Técnicas</span>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-xs text-white/50 font-light">Tempo de Carregamento</span>
                  <span className={`text-base font-black italic ${activeTab === 'leonasc' ? 'text-br-green' : 'text-red-400'}`}>
                    {current.loadingTime}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-xs text-white/50 font-light">Taxa de Conversão</span>
                  <span className="text-sm font-extrabold text-white">
                    {current.conversionRate}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/50 font-light">Satisfação do Usuário</span>
                  <span className="text-sm font-extrabold text-white">
                    {current.userSatisfaction}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2: Lead Generation Graphic Representation */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-black/40 border border-white/5 rounded-3xl p-6 md:p-8 relative">
            <div className="text-left mb-6">
              <span className="text-[9.5px] font-black uppercase tracking-wider text-[#94a3b8]/40 block mb-1">Impacto de Conversão</span>
              <h4 className="text-lg font-black uppercase italic text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-br-yellow" /> Captação Mensal de Leads (WhatsApp)
              </h4>
              <p className="text-[11px] text-white/40 font-light mt-1">
                Evolução simulada ao longo de 6 meses com campanhas pagas direcionadas.
              </p>
            </div>

            {/* Custom Interactive SVG Graph or Bars with high-tech details */}
            <div className="h-44 flex items-end justify-between gap-2.5 pt-6 relative border-b border-white/10 pb-2">
              {current.leadsGrowth.map((val, i) => {
                const maxVal = 400;
                const percentageHeight = (val / maxVal) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center group relative cursor-pointer">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-slate-950 text-[10px] font-black tracking-widest px-2 py-1 rounded-md shadow-lg z-20 pointer-events-none">
                      {val} Leads
                    </div>
                    {/* Glowing bar */}
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${percentageHeight}%` }}
                      transition={{ type: "spring", stiffness: 60, delay: i * 0.1 }}
                      className={`w-full rounded-t-lg transition-all duration-300 relative overflow-hidden ${
                        activeTab === 'leonasc'
                          ? 'bg-gradient-to-t from-br-green/50 to-br-green hover:brightness-125'
                          : 'bg-gradient-to-t from-red-500/20 to-red-400 hover:brightness-110'
                      }`}
                    >
                      <div className="absolute inset-x-0 top-0 h-1 bg-white/40"></div>
                    </motion.div>
                    
                    <span className="text-[8.5px] font-black tracking-wider text-white/30 uppercase mt-2 block">
                      Mês {i + 1}
                    </span>
                  </div>
                );
              })}

              {/* Decorative crosshair lines */}
              <div className="absolute top-[25%] left-0 right-0 h-px bg-white/[0.03] pointer-events-none"></div>
              <div className="absolute top-[50%] left-0 right-0 h-px bg-white/[0.03] pointer-events-none"></div>
              <div className="absolute top-[75%] left-0 right-0 h-px bg-white/[0.03] pointer-events-none"></div>
            </div>

            <div className="text-left mt-4 text-[10px] text-white/40 leading-relaxed italic">
              {activeTab === 'leonasc' ? (
                <span className="text-br-green">✓ Carregamento instantâneo evita a desistência de até 74% dos potenciais clientes interessados via anúncios de tráfego pago.</span>
              ) : (
                <span className="text-red-400">✗ Sites lentos perdem mais de 60% dos clientes antes mesmo que o botão de WhatsApp logue na tela do usuário.</span>
              )}
            </div>

          </div>

          {/* Column 3: Bulletproof tech features explaining why */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-6">
            
            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 text-left space-y-4">
              <span className="text-[8.5px] font-black tracking-widest uppercase text-white/30 block">
                {activeTab === 'leonasc' ? 'POR QUE FUNCCIONA?' : 'QUAIS OS ERROS COMUNS?'}
              </span>

              {activeTab === 'leonasc' ? (
                /* Pro features */
                <div className="space-y-4 text-xs">
                  <div className="flex gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-br-green shrink-0 mt-0.5" />
                    <div>
                      <p className="font-extrabold text-white">Código Customizado</p>
                      <p className="text-white/50 text-[10px] leading-tight mt-0.5">Sem scripts pesados desnecessários.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <Zap className="w-5 h-5 text-br-yellow shrink-0 mt-0.5" />
                    <div>
                      <p className="font-extrabold text-white">Cache de Borda Ultra</p>
                      <p className="text-white/50 text-[10px] leading-tight mt-0.5">Hospedagem em nuvem global próxima.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <Smartphone className="w-5 h-5 text-[#3b82f6] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-extrabold text-white">Mobile-First Nativo</p>
                      <p className="text-white/50 text-[10px] leading-tight mt-0.5">Perfeito em qualquer celular.</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Con features */
                <div className="space-y-4 text-xs">
                  <div className="flex gap-2.5">
                    <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-extrabold text-white">Código Duplicado / Lixo</p>
                      <p className="text-white/50 text-[10px] leading-tight mt-0.5">Plataformas antigas e infladas.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <Clock className="w-5 h-5 text-red-300 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-extrabold text-white">Carregamento Lento</p>
                      <p className="text-white/50 text-[10px] leading-tight mt-0.5">Frustra o cliente em conexões 4G.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-extrabold text-white">Zero Otimização SEO</p>
                      <p className="text-white/50 text-[10px] leading-tight mt-0.5">Invisível no mapa de busca local.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Elegant action callout inside the demo */}
            <div className="bg-gradient-to-br from-slate-950 to-black p-5 rounded-3xl border border-white/5 text-left">
              <span className="text-[10px] text-br-yellow font-black block tracking-widest uppercase mb-1">★★★★★</span>
              <p className="text-[11px] text-white/50 font-light leading-tight">
                Garantimos o selo mecânico de velocidade máxima em cada entrega. Seu cliente não espera.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
