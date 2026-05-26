import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  Sparkles, 
  Zap, 
  Layers, 
  MessageSquare, 
  Globe, 
  Search, 
  Layout, 
  ShoppingBag, 
  Sliders, 
  Clock, 
  Send 
} from 'lucide-react';

interface CalculatorProps {
  onEstimateCalculated: (summary: string, total: number) => void;
}

export const BudgetCalculator: React.FC<CalculatorProps> = ({ onEstimateCalculated }) => {
  const [projectType, setProjectType] = useState<'landing' | 'institutional' | 'ecommerce' | 'custom'>('landing');
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [designLevel, setDesignLevel] = useState<'standard' | 'premium' | 'cinematic'>('premium');
  const [urgency, setUrgency] = useState<'normal' | 'fast' | 'express'>('normal');
  
  // Custom features
  const [features, setFeatures] = useState({
    whatsapp: true,
    blog: false,
    dashboard: false,
    seo: true,
    multilingual: false,
  });

  const [totalPrice, setTotalPrice] = useState<number>(1500);

  const calculateEstimate = () => {
    // Base prices
    let base = 1500;
    if (projectType === 'landing') {
      base = 1500;
    } else if (projectType === 'institutional') {
      base = 2800;
    } else if (projectType === 'ecommerce') {
      base = 4500;
    } else if (projectType === 'custom') {
      base = 6500;
    }

    // Pages cost (for institutional and custom, landing is 1, ecommerce is base + products)
    let pagesCost = 0;
    if (projectType === 'institutional' || projectType === 'custom') {
      pagesCost = Math.max(0, pagesCount - 3) * 250; // first 3 pages included
    } else if (projectType === 'landing') {
      pagesCost = 0; // always 1 page
    } else if (projectType === 'ecommerce') {
      pagesCost = Math.max(0, pagesCount - 5) * 150; // first 5 category/product custom pages included
    }

    // Design Multiplier
    let designMultiplier = 1.0;
    if (designLevel === 'standard') designMultiplier = 0.95; // Simple & lightweight
    if (designLevel === 'premium') designMultiplier = 1.2;  // High fidelity & gorgeous micro-utils
    if (designLevel === 'cinematic') designMultiplier = 1.7; // Immersive scroll, high motion, high-end 3D style

    // Feature flat-addons
    let featuresCost = 0;
    if (features.whatsapp) featuresCost += 150;
    if (features.blog) featuresCost += 700;
    if (features.dashboard) featuresCost += 1800;
    if (features.seo) featuresCost += 400;
    if (features.multilingual) featuresCost += 800;

    // Urgency Multiplier
    let urgencyMultiplier = 1.0;
    if (urgency === 'fast') urgencyMultiplier = 1.25; // 2 Weeks
    if (urgency === 'express') urgencyMultiplier = 1.6; // 1 Week

    const subtotal = (base + pagesCost) * designMultiplier + featuresCost;
    const finalPrice = Math.round(subtotal * urgencyMultiplier);
    
    setTotalPrice(finalPrice);
  };

  useEffect(() => {
    calculateEstimate();
  }, [projectType, pagesCount, designLevel, features, urgency]);

  const toggleFeature = (name: keyof typeof features) => {
    setFeatures(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleApplyEstimate = () => {
    // Create text summary
    const typeNames = {
      landing: 'Landing Page de Alta Conversão',
      institutional: 'Website Institucional',
      ecommerce: 'Loja Virtual / E-commerce',
      custom: 'Portal ou Plataforma Web Customizada',
    };

    const designNames = {
      standard: 'Clean & Minimalista',
      premium: 'Design Premium de Autoridade',
      cinematic: 'Imersivo & Cinematográfico (Animações Avançadas)',
    };

    const urgencyNames = {
      normal: 'Prazo Padrão (3-4 semanas)',
      fast: 'Prazo Acelerado (2 semanas)',
      express: 'Ultra Express (1 semana - Alta Prioridade)',
    };

    const activeFeaturesList = Object.keys(features)
      .filter(f => features[f as keyof typeof features])
      .map(f => {
        if (f === 'whatsapp') return 'Botão e Link Inteligente de WhatsApp';
        if (f === 'blog') return 'Painel de Blog / Gestão de Conteúdo';
        if (f === 'dashboard') return 'Área de Membros / Banco de Dados / Admin';
        if (f === 'seo') return 'Otimização Avançada de SEO (Google)';
        if (f === 'multilingual') return 'Suporte Multi-idioma (Inglês/Espanhol)';
        return f;
      });

    const summary = `Tipo: ${typeNames[projectType]}\n` +
      `Páginas Estimadas: ${projectType === 'landing' ? 1 : pagesCount}\n` +
      `Nível de Design: ${designNames[designLevel]}\n` +
      `Prazo: ${urgencyNames[urgency]}\n` +
      `Recursos Opcionais: ${activeFeaturesList.length > 0 ? activeFeaturesList.join(', ') : 'Nenhum'}`;

    onEstimateCalculated(summary, totalPrice);
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 grid lg:grid-cols-12 gap-10">
        
        {/* Parametros do Projeto */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4">
              <Sliders className="w-3 h-3 animate-pulse" /> Simulador de Escopo
            </span>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight italic">
              Planeje sua <span className="text-blue-500">Presença Digital</span>
            </h3>
            <p className="text-sm text-white/50 mt-1">
              Selecione o escopo ideal para ver uma estimativa transparente de investimento.
            </p>
          </div>

          {/* 1. Tipo de Projeto */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block">1. Tipo de Solução</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: 'landing', label: 'Landing Page', icon: Layout, desc: 'Foco em Vendas' },
                { id: 'institutional', label: 'Institucional', icon: Layers, desc: 'Empresas & Clínicas' },
                { id: 'ecommerce', label: 'E-commerce', icon: ShoppingBag, desc: 'Loja Completa' },
                { id: 'custom', label: 'Custom App', icon: Zap, desc: 'Sistemas & Portais' },
              ].map((t) => {
                const Icon = t.icon;
                const isSelected = projectType === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setProjectType(t.id as any);
                      if (t.id === 'landing') setPagesCount(1);
                      else if (t.id === 'ecommerce') setPagesCount(5);
                      else setPagesCount(3);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-28 ${
                      isSelected 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20 scale-[1.03]' 
                        : 'bg-white/[0.02] border-white/5 text-white/70 hover:bg-white/[0.04] hover:border-white/10'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-blue-400'}`} />
                    <div>
                      <span className="text-[11px] font-black uppercase block tracking-wider leading-tight">{t.label}</span>
                      <span className={`text-[10px] block mt-0.5 font-light ${isSelected ? 'text-white/70' : 'text-white/40'}`}>{t.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Quantidade de Páginas */}
          {projectType !== 'landing' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
                  2. Quantidade de Páginas / Seções: <span className="text-blue-400 font-bold">{pagesCount}</span>
                </label>
                <span className="text-[10.5px] font-semibold text-white/40">
                  {projectType === 'ecommerce' ? 'Até 5 páginas/categorias inclusas' : 'Até 3 páginas inclusas'}
                </span>
              </div>
              <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                <input 
                  type="range" 
                  min="2" 
                  max="20" 
                  value={pagesCount} 
                  onChange={(e) => setPagesCount(parseInt(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-1.5 rounded-lg bg-slate-800"
                />
                <div className="flex items-center justify-center bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold rounded-xl px-3 py-1.5 w-12 text-sm">
                  {pagesCount}
                </div>
              </div>
            </div>
          )}

          {/* 3. Nível Visual / Design */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block">3. Direção de Arte & Visual</label>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { id: 'standard', label: 'Clean & Minimalista', desc: 'Leve, limpo e direto, focado em alta velocidade de carregamento.', icon: Check },
                { id: 'premium', label: 'Premium Autoridade', desc: 'Gráficos sob medida, micro-interações refinadas, excelente branding.', icon: Sparkles },
                { id: 'cinematic', label: 'Animações Avançadas', desc: 'Animações 3D de rolagem imersiva, transições complexas, design digno de prêmio.', icon: Zap },
              ].map((d) => {
                const Icon = d.icon;
                const isSelected = designLevel === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDesignLevel(d.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col gap-2 ${
                      isSelected 
                        ? 'bg-blue-950/40 border-blue-500/80 text-white shadow-xl ring-1 ring-blue-500/50' 
                        : 'bg-white/[0.02] border-white/5 text-white/70 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded-md ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-white/50'}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider">{d.label}</span>
                    </div>
                    <p className="text-[10px] text-white/40 leading-relaxed font-light">{d.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Recursos / Funcionalidades Opcionais */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block">4. Funcionalidades de Performance</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { id: 'whatsapp', label: 'WhatsApp Inteligente', desc: 'Links e balões de roteamento direto', icon: MessageSquare },
                { id: 'seo', label: 'SEO Google Booster', desc: 'Carregamento instantâneo indexável', icon: Search },
                { id: 'blog', label: 'Blog / Painel CMS', desc: 'Gestão dinâmica de artigos e notícias', icon: Layers },
                { id: 'dashboard', label: 'Banco de Dados / Login', desc: 'Painel privado com login do cliente', icon: Layout },
                { id: 'multilingual', label: 'Multi-idiomas', desc: 'Inglês/Espanhol com chave seletora', icon: Globe },
              ].map((feat) => {
                const Icon = feat.icon;
                const isSelected = features[feat.id as keyof typeof features];
                return (
                  <button
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id as any)}
                    className={`p-4 rounded-[1.25rem] border text-left transition-all flex items-start gap-3 ${
                      isSelected 
                        ? 'bg-blue-600/10 border-blue-500/40 text-white' 
                        : 'bg-white/[0.01] border-white/5 text-white/50 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className={`mt-0.5 p-1.5 rounded-lg ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-white/40'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-bold uppercase block tracking-wide">{feat.label}</span>
                      <span className="text-[9.5px] text-white/30 block leading-tight font-light mt-0.5">{feat.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Urgência do Projeto */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block">5. Cronograma e Prioridade</label>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { id: 'normal', label: 'Cronograma Padrão', delay: '3 a 4 semanas', desc: 'No ritmo de engenharia e QA' },
                { id: 'fast', label: 'Prazo Express', delay: '2 semanas', desc: 'Sobrecarga de engenharia dedicada (+25%)' },
                { id: 'express', label: 'Prazo Emergencial', delay: '7 dias!', desc: 'Equipe exclusiva e foco total (+60%)' },
              ].map((u) => {
                const isSelected = urgency === u.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => setUrgency(u.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected 
                        ? 'bg-blue-950/40 border-blue-500/80 text-white shadow-md' 
                        : 'bg-white/[0.02] border-white/5 text-white/70 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-black uppercase tracking-wider">{u.label}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-white/40'}`}>{u.delay}</span>
                    </div>
                    <p className="text-[10px] text-white/40 leading-tight font-light">{u.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Resumo Financeiro e Acao */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-black/40 border border-white/5 rounded-3xl p-6 md:p-10 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-3xl"></div>
          
          <div className="space-y-8">
            <div>
              <span className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase block mb-1">Valor Estimado</span>
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <span className="text-3xl font-extrabold text-blue-500">R$</span>
                <span className="text-5xl md:text-6xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-white">
                  {totalPrice.toLocaleString('pt-BR')}
                </span>
                <span className="text-[10px] font-bold uppercase text-white/40 block tracking-wider">Investimento Único</span>
              </div>
              <p className="text-[10.5px] text-white/30 italic font-light mt-1.5 leading-tight">
                *Este simulador calcula uma estimativa confiável baseada em nossa tabela geral. Sem taxas ou mensalidades surpresas.
              </p>
            </div>

            <div className="border-t border-white/5 pt-6 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block">Escopo Configurado</span>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <div className="mt-0.5 p-0.5 rounded-full bg-blue-500/20 text-blue-400">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white/80 block leading-snug">
                      {projectType === 'landing' ? 'Landing Page Pro' : projectType === 'institutional' ? 'Site Institucional Premium' : projectType === 'ecommerce' ? 'E-commerce Completo' : 'Web App Cloud Customizado'}
                    </span>
                    <span className="text-[10.5px] text-white/40 block">
                      {projectType === 'landing' ? '1 Seção mestre principal de alta conversão' : `${pagesCount} páginas projetadas sob medida`}
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="mt-0.5 p-0.5 rounded-full bg-blue-500/20 text-blue-400">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white/80 block leading-snug">
                      Direção Criativa: {designLevel === 'standard' ? 'Minimalista' : designLevel === 'premium' ? 'Design de Autoridade' : 'Animações Cinematográficas'}
                    </span>
                    <span className="text-[10.5px] text-white/40 block">
                      Estilos e tipografias de luxo voltados ao seu nicho.
                    </span>
                  </div>
                </li>
                {urgency !== 'normal' && (
                  <li className="flex items-start gap-2.5">
                    <div className="mt-0.5 p-0.5 rounded-full bg-blue-500/20 text-blue-400">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white/80 block leading-snug">
                        Entrega Prioritária: {urgency === 'fast' ? 'Cronograma de 14 dias' : 'Equipe Dedicada 7 dias'}
                      </span>
                      <span className="text-[10.5px] text-white/40 block">
                        Foco exclusivo dos programadores para acelerar sua estreia.
                      </span>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-2">
              <span className="text-[9.5px] font-black uppercase text-white/40 tracking-wider block">O que está garantido:</span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] text-white/60 font-medium">
                <div className="flex items-center gap-1.5">✓ Site Ultrarrápido</div>
                <div className="flex items-center gap-1.5">✓ Responsivo (Celular)</div>
                <div className="flex items-center gap-1.5">✓ Hospedagem Própria</div>
                <div className="flex items-center gap-1.5">✓ Código Limpo & Seguro</div>
                <div className="flex items-center gap-1.5">✓ Sem Mensalidade</div>
                <div className="flex items-center gap-1.5">✓ Entrega Garantida</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <button
              onClick={handleApplyEstimate}
              className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 active:scale-95 shadow-[0_15px_30px_rgba(37,99,235,0.25)]"
            >
              <Send className="w-4 h-4" /> Enviar Proposta Estimada
            </button>
            <span className="text-[9px] text-center block text-white/40 mt-3 tracking-wide">
              *Ir para o formulário de contato com os detalhes pré-carregados
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
