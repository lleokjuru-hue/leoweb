import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Sprout, ArrowUpRight, Scale } from 'lucide-react';
import { FadeInUp, StaggerContainer, StaggerItem, PREMIUM_EASE } from './ScrollReveal';

type CommodityKey = 'soja' | 'milho' | 'boi';

interface CommodityData {
  id: CommodityKey;
  label: string;
  unit: string;
  yieldUnit: string;
  currentPrice: number;
  variation: string;
  months: string[];
  prices: number[];
  breakEvenYield: number;
  standardYield: number;
  technicalYield: number;
  regionRef: string;
  technicalInsight: string;
}

const COMMODITIES: Record<CommodityKey, CommodityData> = {
  soja: {
    id: 'soja',
    label: 'Soja Comercial',
    unit: 'R$ / sc 60kg',
    yieldUnit: 'sc/ha',
    currentPrice: 134.8,
    variation: '+6,4% na janela',
    months: ['Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar'],
    prices: [126.7, 128.5, 130.2, 129.4, 132.6, 134.8],
    breakEvenYield: 42,
    standardYield: 54.0,
    technicalYield: 68.8,
    regionRef: 'Indicador Médio Praça Brasil',
    technicalInsight:
      'Com custo operacional próximo de 42 sc/ha, elevar a lavoura de 54 para 68,8 sc/ha via correção de perfil de solo mais que dobra a margem líquida por hectare.',
  },
  milho: {
    id: 'milho',
    label: 'Milho Safrinha',
    unit: 'R$ / sc 60kg',
    yieldUnit: 'sc/ha',
    currentPrice: 68.4,
    variation: '+8,1% na janela',
    months: ['Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar'],
    prices: [63.3, 64.1, 65.8, 66.2, 67.5, 68.4],
    breakEvenYield: 78,
    standardYield: 95.0,
    technicalYield: 124.5,
    regionRef: 'Indicador Médio Mercado Interno',
    technicalInsight:
      'Na safrinha, o acerto na janela de plantio, população de plantas e manejo nitrogenado no estádio V4 garante +29,5 sc/ha mesmo sob veranico moderado.',
  },
  boi: {
    id: 'boi',
    label: 'Boi Gordo & Pasto',
    unit: 'R$ / arroba (@)',
    yieldUnit: '@/ha/ano',
    currentPrice: 312.0,
    variation: '+9,5% na janela',
    months: ['Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar'],
    prices: [285.0, 291.5, 298.0, 302.5, 307.0, 312.0],
    breakEvenYield: 5.2,
    standardYield: 7.4,
    technicalYield: 18.6,
    regionRef: 'Referência Arroba Terminação a Pasto',
    technicalInsight:
      'Pastagens corrigidas com divisão estratégica de piquetes e ajuste de lotação saltam de 7,4 para 18,6 @/ha/ano sem necessidade de abrir novas áreas.',
  },
};

export const ResultDemo: React.FC = () => {
  const [selectedCommodity, setSelectedCommodity] = useState<CommodityKey>('soja');
  const [activeMonthIdx, setActiveMonthIdx] = useState<number>(5);

  const data = COMMODITIES[selectedCommodity];
  const minPrice = Math.min(...data.prices) * 0.96;
  const maxPrice = Math.max(...data.prices) * 1.03;

  // Build SVG path coordinates (viewBox 600 x 200)
  const chartWidth = 600;
  const chartHeight = 190;
  const padX = 28;
  const padY = 22;

  const points = data.prices.map((price, idx) => {
    const x = padX + (idx / (data.prices.length - 1)) * (chartWidth - padX * 2);
    const normY = (price - minPrice) / (maxPrice - minPrice || 1);
    const y = chartHeight - padY - normY * (chartHeight - padY * 2);
    return { x, y, price, month: data.months[idx] };
  });

  const linePath = points
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`)
    .join(' ');

  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${chartHeight} L ${points[0].x.toFixed(1)} ${chartHeight} Z`;

  const netStandard = Math.max(0, (data.standardYield - data.breakEvenYield) * data.currentPrice);
  const netTechnical = Math.max(0, (data.technicalYield - data.breakEvenYield) * data.currentPrice);
  const extraMarginPerHa = Math.round(netTechnical - netStandard);

  const activePoint = points[activeMonthIdx] || points[points.length - 1];

  return (
    <FadeInUp
      yOffset={32}
      duration={0.75}
      amount={0.08}
      className="bg-agro-surface border border-agro-border rounded-3xl p-6 sm:p-10 lg:p-12"
    >
      {/* Header & Commodity Switcher */}
      <FadeInUp
        delay={0.06}
        yOffset={20}
        amount={0.1}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-agro-border"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-agro-emerald mb-2">
            Inteligência de Mercado & Margem Agrícola
          </p>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-agro-cream">
            Panorama de Cotações & Rentabilidade por Hectare
          </h3>
          <p className="text-sm sm:text-base text-agro-muted mt-2 leading-relaxed">
            Acompanhe o comportamento recente das principais commodities e veja como o manejo agronômico transforma preço de mercado em lucro líquido real por hectare.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 bg-agro-bg p-1.5 rounded-xl border border-agro-border self-start lg:self-auto">
          {(Object.keys(COMMODITIES) as CommodityKey[]).map((key) => {
            const item = COMMODITIES[key];
            const isActive = selectedCommodity === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSelectedCommodity(key);
                  setActiveMonthIdx(5);
                }}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-agro-emerald text-agro-bg shadow-sm'
                    : 'text-agro-muted hover:text-agro-cream'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </FadeInUp>

      {/* Main Content Grid */}
      <StaggerContainer
        staggerDelay={0.14}
        amount={0.08}
        className="grid lg:grid-cols-12 gap-8 pt-8 items-stretch"
      >
        {/* Left 7 Cols: Interactive Commodity Market Chart */}
        <StaggerItem
          yOffset={26}
          className="lg:col-span-7 bg-agro-bg border border-agro-border rounded-2xl p-6 flex flex-col justify-between"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-xs text-agro-muted block">{data.regionRef}</span>
              <motion.div
                key={`${selectedCommodity}-${activeMonthIdx}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: PREMIUM_EASE }}
                className="flex items-baseline gap-3 mt-1"
              >
                <span className="text-3xl sm:text-4xl font-mono font-bold tabular-nums text-agro-cream">
                  R$ {activePoint.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs font-mono text-agro-muted">({data.unit})</span>
              </motion.div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-agro-emerald">
                <ArrowUpRight className="w-4 h-4" />
                {data.variation}
              </span>
              <span className="text-xs text-agro-muted block mt-1">
                Mês selecionado: <strong className="text-agro-cream">{activePoint.month}</strong>
              </span>
            </div>
          </div>

          {/* SVG Market Curve */}
          <div className="relative w-full h-52 sm:h-60 select-none">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="agroMarketArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Subtle horizontal reference lines */}
              {[0.25, 0.5, 0.75].map((ratio) => (
                <line
                  key={ratio}
                  x1={padX}
                  x2={chartWidth - padX}
                  y1={chartHeight * ratio}
                  y2={chartHeight * ratio}
                  stroke="#1E352A"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              ))}

              {/* Area fill */}
              <motion.path
                key={`${selectedCommodity}-area`}
                d={areaPath}
                fill="url(#agroMarketArea)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: PREMIUM_EASE }}
              />

              {/* Price line */}
              <motion.path
                key={`${selectedCommodity}-line`}
                d={linePath}
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, ease: PREMIUM_EASE }}
              />

              {/* Active vertical guide */}
              <line
                x1={activePoint.x}
                x2={activePoint.x}
                y1={activePoint.y}
                y2={chartHeight - 10}
                stroke="#EAB308"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {/* Interactive nodes */}
              {points.map((pt, idx) => {
                const isSelected = idx === activeMonthIdx;
                return (
                  <g
                    key={pt.month}
                    onClick={() => setActiveMonthIdx(idx)}
                    onMouseEnter={() => setActiveMonthIdx(idx)}
                    className="cursor-pointer"
                  >
                    <circle cx={pt.x} cy={pt.y} r={16} fill="transparent" />
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? 6 : 4}
                      fill={isSelected ? '#EAB308' : '#070D0A'}
                      stroke={isSelected ? '#070D0A' : '#10B981'}
                      strokeWidth="2.5"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Month Selector Axis */}
          <div className="grid grid-cols-6 gap-2 pt-3 border-t border-agro-border">
            {points.map((pt, idx) => {
              const isSelected = idx === activeMonthIdx;
              return (
                <button
                  key={pt.month}
                  type="button"
                  onClick={() => setActiveMonthIdx(idx)}
                  className={`py-2 rounded-lg text-center transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-agro-elevated border border-agro-gold/40 text-agro-gold'
                      : 'text-agro-muted hover:text-agro-cream hover:bg-agro-surface'
                  }`}
                >
                  <span className="text-xs font-semibold block">{pt.month}</span>
                  <span className="text-[11px] font-mono tabular-nums opacity-80 hidden sm:block">
                    R$ {pt.price.toFixed(0)}
                  </span>
                </button>
              );
            })}
          </div>
        </StaggerItem>

        {/* Right 5 Cols: Yield & Margin Comparison */}
        <StaggerItem
          yOffset={26}
          className="lg:col-span-5 flex flex-col justify-between gap-6"
        >
          <div className="bg-agro-bg border border-agro-border rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-agro-muted">
                Impacto do Manejo na Safra
              </span>
              <Scale className="w-4 h-4 text-agro-gold" />
            </div>

            {/* Bar 1: Standard Management */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-agro-muted">Manejo Convencional (Sem Laudo)</span>
                <span className="font-mono font-semibold tabular-nums text-agro-cream">
                  {data.standardYield.toLocaleString('pt-BR')} {data.yieldUnit}
                </span>
              </div>
              <div className="w-full h-3 bg-agro-surface rounded-full overflow-hidden border border-agro-border">
                <motion.div
                  key={`${selectedCommodity}-std`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: Math.min(1, (data.standardYield / data.technicalYield) * 0.78) }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: PREMIUM_EASE }}
                  className="w-full h-full origin-left bg-agro-muted/50 rounded-full"
                />
              </div>
              <div className="flex justify-between text-xs text-agro-muted">
                <span>Custo equilíbrio: {data.breakEvenYield} {data.yieldUnit}</span>
                <span className="font-mono tabular-nums">
                  Sobram R$ {Math.round(netStandard).toLocaleString('pt-BR')}/ha
                </span>
              </div>
            </div>

            {/* Bar 2: Agronomic Precision Management */}
            <div className="space-y-2 pt-2 border-t border-agro-border">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="font-semibold text-agro-emerald flex items-center gap-1.5">
                  <Sprout className="w-4 h-4" /> Com Acompanhamento Agronômico
                </span>
                <span className="font-mono font-bold tabular-nums text-agro-emerald">
                  {data.technicalYield.toLocaleString('pt-BR')} {data.yieldUnit}
                </span>
              </div>
              <div className="w-full h-3 bg-agro-surface rounded-full overflow-hidden border border-agro-emerald/30">
                <motion.div
                  key={`${selectedCommodity}-tech`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 0.94 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.85, delay: 0.08, ease: PREMIUM_EASE }}
                  className="w-full h-full origin-left bg-gradient-to-r from-agro-emerald to-agro-gold rounded-full"
                />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-agro-muted">Margem líquida projetada</span>
                <span className="font-mono font-bold tabular-nums text-agro-gold">
                  R$ {Math.round(netTechnical).toLocaleString('pt-BR')}/ha
                </span>
              </div>
            </div>

            {/* Highlight Net Gain */}
            <div className="bg-agro-elevated border border-agro-emerald/30 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-agro-muted block">Ganho Líquido Adicional</span>
                <span className="text-sm font-semibold text-agro-cream">Diferença direta no bolso do produtor</span>
              </div>
              <span className="text-xl sm:text-2xl font-mono font-bold tabular-nums text-agro-emerald">
                +R$ {extraMarginPerHa.toLocaleString('pt-BR')}/ha
              </span>
            </div>
          </div>

          {/* Technical Note */}
          <div className="bg-agro-elevated/60 border border-agro-border rounded-2xl p-5 flex gap-3.5 items-start">
            <TrendingUp className="w-5 h-5 text-agro-gold shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-agro-cream/85 leading-relaxed">
              {data.technicalInsight}
            </p>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </FadeInUp>
  );
};
