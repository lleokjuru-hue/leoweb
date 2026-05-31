import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  ExternalLink, 
  Zap, 
  Smartphone, 
  Globe, 
  Eye, 
  Maximize2,
  Lock,
  Compass,
  ArrowUpRight
} from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  category: 'doctors' | 'laywers' | 'ecommerce' | 'premium';
  categoryLabel: string;
  metrics: string;
  description: string;
  mockColors: { from: string; to: string; border: string };
  metricsLabel: string;
  features: string[];
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Dr. Henrique Vasconcelos',
    category: 'doctors',
    categoryLabel: 'Clínica & Cirurgia Plástica',
    metrics: 'Lighthouse 100/100',
    metricsLabel: 'Speed Score',
    description: 'Interface de luxo para conversão de tratamentos premium e agendamento direto de procedimentos estéticos.',
    mockColors: { 
      from: 'from-[#0d1f14] to-[#011409]', 
      border: 'border-br-green/30 group-hover:border-br-green' 
    },
    features: ['Agendamento WhatsApp', 'Copywriting Médico Especializado', 'Otimização Local SEO'],
    // We will draw beautifully inside the card
  },
  {
    id: 'p2',
    title: 'Almeida Advocacia de Elite',
    category: 'laywers',
    categoryLabel: 'Direito Corporativo & Tributário',
    metrics: '+280% Contatos',
    metricsLabel: 'Aumento de Conversão',
    description: 'Site institucional refinado com paleta sóbria em azul escuro e dourado focando em atrair grandes corporações.',
    mockColors: { 
      from: 'from-[#05162a] to-[#000814]', 
      border: 'border-blue-500/20 group-hover:border-blue-400' 
    },
    features: ['Identidade Visual Exclusiva', 'Artigos Técnicos Otimizados', 'Layout Ultraveloz'],
  },
  {
    id: 'p3',
    title: 'Vanguard Luxury Estate',
    category: 'premium',
    categoryLabel: 'Imóveis de Alto Padrão Network',
    metrics: '< 0.4s Carregamento',
    metricsLabel: 'Time-to-Interactive',
    description: 'Imobiliária boutique internacional. Filtro simplificado de portfólio físico e contatos integrados por região.',
    mockColors: { 
      from: 'from-[#1a1100] to-[#0d0800]', 
      border: 'border-br-yellow/30 group-hover:border-br-yellow' 
    },
    features: ['Galeria Inteligente', 'Design Imersivo Cinematográfico', 'Banco de Dados Rápido'],
  },
  {
    id: 'p4',
    title: 'NutriFit Labs Suplementos',
    category: 'ecommerce',
    categoryLabel: 'Suplementação Avançada',
    metrics: 'R$ 0 Mensalidade',
    metricsLabel: 'Infraestrutura Própria',
    description: 'Loja virtual completa com carrinho nativo customizado sem comissões presas ou taxas fixas por vendas.',
    mockColors: { 
      from: 'from-[#11052c] to-[#080216]', 
      border: 'border-purple-500/20 group-hover:border-purple-400' 
    },
    features: ['checkout Simplificado', 'Controle Integrado de Produtos', 'Pixel de Anúncios Correto'],
  }
];

export const PortfolioShowcase: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'doctors' | 'laywers' | 'ecommerce' | 'premium'>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredItems = filter === 'all' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === filter);

  return (
    <div className="space-y-12 text-left">
      
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 justify-start items-center">
        {[
          { id: 'all', label: 'Todos os Projetos' },
          { id: 'doctors', label: 'Médicos & Clínicas' },
          { id: 'laywers', label: 'Advocacia & Premium' },
          { id: 'ecommerce', label: 'Lojas e E-commerces' },
          { id: 'premium', label: 'Imobiliárias & Outros' }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id as any)}
            className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
              filter === btn.id
                ? 'bg-br-yellow text-slate-950 font-black shadow-md shadow-br-yellow/15'
                : 'bg-white/[0.02] hover:bg-white/5 border border-white/5 text-white/50 hover:text-white'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Grid containing high-fidelity mocked sites */}
      <div className="grid md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className={`group relative rounded-[2.5rem] bg-gradient-to-br ${project.mockColors.from} p-6 md:p-8 border ${project.mockColors.border} flex flex-col justify-between h-[450px] overflow-hidden transition-all duration-500`}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              
              {/* Glassmorphic Grid Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none"></div>
              
              <div>
                {/* Meta details */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[9px] font-bold tracking-[0.25em] text-white/40 uppercase bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-md">
                    {project.categoryLabel}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-br-green animate-pulse"></span>
                    <span className="text-[10px] font-bold text-white/60">Selo Veloz</span>
                  </div>
                </div>

                {/* Main Content */}
                <h4 className="text-2xl font-black uppercase text-white tracking-tight italic mb-3 group-hover:text-br-yellow transition-colors">
                  {project.title}
                </h4>
                
                <p className="text-xs text-white/50 font-light leading-relaxed max-w-sm mb-6">
                  {project.description}
                </p>

                {/* Key Metric highlight */}
                <div className="inline-flex flex-col bg-white/[0.03] border border-white/5 rounded-2xl p-4 mb-6">
                  <span className="text-lg font-black text-white italic tracking-tight leading-none">
                    {project.metrics}
                  </span>
                  <span className="text-[8px] font-black uppercase tracking-wider text-[#94a3b8]/40 mt-1 block">
                    {project.metricsLabel}
                  </span>
                </div>
              </div>

              {/* Graphical simulation resembling a high-tech website mockup */}
              <div className="relative h-28 w-full bg-black/60 rounded-2xl border border-white/5 overflow-hidden p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  </div>
                  <div className="text-[7.5px] font-mono text-white/30 truncate max-w-[150px]">
                    https://{project.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br
                  </div>
                  <Maximize2 className="w-2.5 h-2.5 text-white/30" />
                </div>
                
                {/* Simplified wireframe representation */}
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between items-center">
                    <div className="h-2 w-12 bg-white/20 rounded"></div>
                    <div className="flex gap-1.5">
                      <div className="h-1.5 w-6 bg-white/10 rounded"></div>
                      <div className="h-1.5 w-6 bg-white/10 rounded"></div>
                    </div>
                  </div>
                  <div className="h-4 w-full bg-gradient-to-r from-br-yellow/10 to-br-green/10 rounded border border-white/5 flex items-center justify-between px-2">
                    <span className="text-[6.5px] text-white/60 font-black uppercase tracking-widest italic">
                      Conversão Ativada
                    </span>
                    <ArrowUpRight className="w-2 h-2 text-br-yellow" />
                  </div>
                </div>
              </div>

              {/* Hover highlight element */}
              <div className="absolute bottom-5 right-5 p-3 rounded-full bg-white text-slate-950 opacity-0 group-hover:opacity-100 shadow-xl scale-75 group-hover:scale-100 transition-all duration-300">
                <ExternalLink className="w-4 h-4" />
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
};
