import React, { useState, useMemo } from 'react';
import {
  Sprout,
  Layers,
  ShieldCheck,
  Compass,
  Send,
  Check,
  TrendingUp,
  Calculator,
} from 'lucide-react';
import { FadeInUp, StaggerContainer, StaggerItem } from './ScrollReveal';

interface CalculatorProps {
  onEstimateCalculated: (summary: string, total: number) => void;
}

type CropType = 'soja' | 'milho' | 'pastagem' | 'perenes';
type SoilCondition = 'degradado' | 'medio' | 'tecnificado';

const CROP_CONFIG: Record<
  CropType,
  {
    label: string;
    unitLabel: string;
    unitPrice: number;
    baseYield: number;
    baseFeePerHa: number;
    inputSavingsPerHa: number;
  }
> = {
  soja: {
    label: 'Soja Comercial',
    unitLabel: 'sc/ha',
    unitPrice: 134.8,
    baseYield: 54,
    baseFeePerHa: 48,
    inputSavingsPerHa: 290,
  },
  milho: {
    label: 'Milho Safra / Safrinha',
    unitLabel: 'sc/ha',
    unitPrice: 68.4,
    baseYield: 96,
    baseFeePerHa: 45,
    inputSavingsPerHa: 260,
  },
  pastagem: {
    label: 'Pastagem & Pecuária',
    unitLabel: '@/ha/ano',
    unitPrice: 312.0,
    baseYield: 7.5,
    baseFeePerHa: 38,
    inputSavingsPerHa: 210,
  },
  perenes: {
    label: 'Café / Culturas Perenes',
    unitLabel: 'sc/ha',
    unitPrice: 1180.0,
    baseYield: 28,
    baseFeePerHa: 85,
    inputSavingsPerHa: 540,
  },
};

export const BudgetCalculator: React.FC<CalculatorProps> = ({ onEstimateCalculated }) => {
  const [crop, setCrop] = useState<CropType>('soja');
  const [hectares, setHectares] = useState<number>(180);
  const [soilCondition, setSoilCondition] = useState<SoilCondition>('medio');

  // Agronomic modules
  const [modSoil, setModSoil] = useState<boolean>(true);
  const [modMip, setModMip] = useState<boolean>(true);
  const [modPrecision, setModPrecision] = useState<boolean>(false);
  const [modFullSeason, setModFullSeason] = useState<boolean>(false);

  const metrics = useMemo(() => {
    const cfg = CROP_CONFIG[crop];

    // Scale discount for larger properties
    const scaleFactor =
      hectares > 1000 ? 0.72 : hectares > 500 ? 0.8 : hectares > 200 ? 0.88 : 1.0;

    let feePerHa = cfg.baseFeePerHa;
    let yieldGainPct = 0.06;
    let savingsMultiplier = 0.35;

    if (modSoil) {
      feePerHa += 22;
      yieldGainPct += 0.11;
      savingsMultiplier += 0.45;
    }
    if (modMip) {
      feePerHa += 18;
      yieldGainPct += 0.06;
      savingsMultiplier += 0.3;
    }
    if (modPrecision) {
      feePerHa += 26;
      yieldGainPct += 0.08;
      savingsMultiplier += 0.35;
    }
    if (modFullSeason) {
      feePerHa += 30;
      yieldGainPct += 0.07;
      savingsMultiplier += 0.2;
    }

    // Soil condition response potential
    if (soilCondition === 'degradado') {
      yieldGainPct *= 1.28;
    } else if (soilCondition === 'tecnificado') {
      yieldGainPct *= 0.78;
    }

    const adjustedFeePerHa = Math.max(32, Math.round(feePerHa * scaleFactor));
    const totalInvestment = Math.max(1800, adjustedFeePerHa * hectares);

    const extraYieldPerHa = Number((cfg.baseYield * yieldGainPct).toFixed(1));
    const projectedYieldPerHa = Number((cfg.baseYield + extraYieldPerHa).toFixed(1));

    const extraRevenuePerHa = extraYieldPerHa * cfg.unitPrice;
    const inputSavingsPerHa = Math.round(cfg.inputSavingsPerHa * savingsMultiplier);

    const totalFinancialBenefit = Math.round(
      (extraRevenuePerHa + inputSavingsPerHa) * hectares
    );

    const roiMultiple = Number(
      Math.max(1.9, totalFinancialBenefit / Math.max(1, totalInvestment)).toFixed(1)
    );

    return {
      cfg,
      adjustedFeePerHa,
      totalInvestment,
      extraYieldPerHa,
      projectedYieldPerHa,
      inputSavingsTotal: inputSavingsPerHa * hectares,
      extraRevenueTotal: Math.round(extraRevenuePerHa * hectares),
      totalFinancialBenefit,
      roiMultiple,
    };
  }, [crop, hectares, soilCondition, modSoil, modMip, modPrecision, modFullSeason]);

  const handleSendSimulation = () => {
    const selectedModules: string[] = [];
    if (modSoil) selectedModules.push('Análise de Solo, Calagem e Recomendação NPK');
    if (modMip) selectedModules.push('Manejo Integrado de Pragas e Doenças (MIP)');
    if (modPrecision) selectedModules.push('Agricultura de Precisão / Mapas de Taxa Variável');
    if (modFullSeason) selectedModules.push('Acompanhamento Técnico Presencial de Safra');

    if (selectedModules.length === 0) {
      selectedModules.push('Diagnóstico Agronômico Inicial');
    }

    const conditionText =
      soilCondition === 'degradado'
        ? 'Solo sem correção recente / Baixa fertilidade'
        : soilCondition === 'medio'
        ? 'Fertilidade média regional'
        : 'Área já tecnificada buscando teto produtivo';

    const summary =
      `Cultura: ${metrics.cfg.label} | Área: ${hectares} ha\n` +
      `Condição da Área: ${conditionText}\n` +
      `Escopo Técnico: ${selectedModules.join(', ')}\n` +
      `Meta Produtiva Estimada: +${metrics.extraYieldPerHa} ${metrics.cfg.unitLabel} (Total projetado: ${metrics.projectedYieldPerHa} ${metrics.cfg.unitLabel})\n` +
      `Investimento Técnico Estimado: R$ ${metrics.adjustedFeePerHa}/ha`;

    onEstimateCalculated(summary, metrics.totalInvestment);
  };

  return (
    <FadeInUp
      yOffset={32}
      duration={0.75}
      amount={0.06}
      className="bg-agro-surface border border-agro-border rounded-3xl p-6 sm:p-10 lg:p-12"
    >
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Producer Configuration */}
        <StaggerContainer
          staggerDelay={0.09}
          amount={0.08}
          className="lg:col-span-7 space-y-8"
        >
          <StaggerItem yOffset={20}>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-agro-emerald mb-2">
              <Calculator className="w-4 h-4" /> Calculadora Agronômica Interativa
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-agro-cream tracking-tight">
              Configure a Área e os Serviços da Propriedade
            </h3>
            <p className="text-sm text-agro-muted mt-1.5 leading-relaxed">
              Simule o investimento técnico por hectare, a economia em adubação corretiva e o incremento esperado de produtividade na safra.
            </p>
          </StaggerItem>

          {/* 1. Crop Type Selector */}
          <StaggerItem yOffset={20} className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-agro-muted block">
              1. Cultura ou Sistema Produtivo Principal
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(Object.keys(CROP_CONFIG) as CropType[]).map((key) => {
                const isSelected = crop === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCrop(key)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-agro-elevated border-agro-emerald text-agro-cream'
                        : 'bg-agro-bg border-agro-border text-agro-muted hover:text-agro-cream'
                    }`}
                  >
                    <span className="text-xs font-bold block leading-snug">
                      {CROP_CONFIG[key].label}
                    </span>
                    <span className="text-[11px] font-mono text-agro-emerald/80 block mt-1">
                      Base: {CROP_CONFIG[key].baseYield} {CROP_CONFIG[key].unitLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </StaggerItem>

          {/* 2. Property Area Slider */}
          <StaggerItem
            yOffset={20}
            className="bg-agro-bg border border-agro-border rounded-2xl p-5 space-y-4"
          >
            <div className="flex flex-wrap justify-between items-baseline gap-2">
              <label
                htmlFor="hectares-range"
                className="text-xs font-semibold uppercase tracking-wider text-agro-muted"
              >
                2. Área Produtiva a Manejar
              </label>
              <span className="text-2xl font-mono font-bold tabular-nums text-agro-gold">
                {hectares.toLocaleString('pt-BR')} hectares
              </span>
            </div>

            <input
              id="hectares-range"
              type="range"
              min={20}
              max={2500}
              step={10}
              value={hectares}
              onChange={(e) => setHectares(Number(e.target.value))}
              className="w-full accent-[#10B981] cursor-pointer h-2 rounded-lg bg-agro-elevated"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span className="text-xs text-agro-muted">Atalhos rápidos de área:</span>
              <div className="flex flex-wrap gap-1.5">
                {[50, 180, 500, 1200, 2500].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setHectares(preset)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono tabular-nums transition-colors cursor-pointer ${
                      hectares === preset
                        ? 'bg-agro-emerald text-agro-bg font-bold'
                        : 'bg-agro-surface border border-agro-border text-agro-muted hover:text-agro-cream'
                    }`}
                  >
                    {preset} ha
                  </button>
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* 3. Soil Condition */}
          <StaggerItem yOffset={20} className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-agro-muted block">
              3. Situação Atual do Solo e Manejo
            </label>
            <div className="grid sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: 'degradado',
                  title: 'Baixa Fertilidade',
                  sub: 'Sem análise recente ou pasto degradado',
                },
                {
                  id: 'medio',
                  title: 'Manejo Regional',
                  sub: 'Adubação padrão, busca mais sacas/@',
                },
                {
                  id: 'tecnificado',
                  title: 'Alto Investimento',
                  sub: 'Foco em ajuste fino e teto produtivo',
                },
              ].map((opt) => {
                const isSelected = soilCondition === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSoilCondition(opt.id as SoilCondition)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-agro-elevated border-agro-gold/60 text-agro-cream'
                        : 'bg-agro-bg border-agro-border text-agro-muted hover:text-agro-cream'
                    }`}
                  >
                    <span className="text-xs font-bold block">{opt.title}</span>
                    <span className="text-[11px] text-agro-muted block mt-0.5 leading-snug">
                      {opt.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </StaggerItem>

          {/* 4. Agronomic Service Modules */}
          <StaggerItem yOffset={20} className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-agro-muted block">
              4. Etapas Técnicas Inclusas no Projeto
            </label>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  active: modSoil,
                  toggle: () => setModSoil(!modSoil),
                  icon: Layers,
                  title: 'Solo, Calagem & Adubação NPK',
                  desc: 'Coleta orientada, interpretação laboratorial, gessagem e prescrição sem desperdício.',
                },
                {
                  active: modMip,
                  toggle: () => setModMip(!modMip),
                  icon: ShieldCheck,
                  title: 'Manejo Fitossanitário (MIP)',
                  desc: 'Controle técnico de pragas, doenças e daninhas no momento exato de entrada.',
                },
                {
                  active: modPrecision,
                  toggle: () => setModPrecision(!modPrecision),
                  icon: Compass,
                  title: 'Agricultura de Precisão',
                  desc: 'Mapeamento de manchas de solo e recomendação em taxa variável por talhão.',
                },
                {
                  active: modFullSeason,
                  toggle: () => setModFullSeason(!modFullSeason),
                  icon: Sprout,
                  title: 'Acompanhamento de Safra',
                  desc: 'Visitas técnicas presenciais do pré-plantio até a regulagem de colheita.',
                },
              ].map((mod) => {
                const Icon = mod.icon;
                return (
                  <button
                    key={mod.title}
                    type="button"
                    onClick={mod.toggle}
                    className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                      mod.active
                        ? 'bg-agro-elevated border-agro-emerald/60 text-agro-cream'
                        : 'bg-agro-bg border-agro-border text-agro-muted hover:text-agro-cream'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                        mod.active
                          ? 'bg-agro-emerald text-agro-bg'
                          : 'bg-agro-surface text-agro-muted'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold">{mod.title}</span>
                        {mod.active && <Check className="w-3.5 h-3.5 text-agro-emerald shrink-0" />}
                      </div>
                      <span className="text-[11px] text-agro-muted leading-snug block mt-1">
                        {mod.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Right Column: Live Diagnostic & Investment Summary */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <FadeInUp
            delay={0.16}
            yOffset={28}
            amount={0.1}
            className="bg-agro-bg border border-agro-border rounded-2xl p-6 sm:p-8 space-y-6"
          >
            <div className="pb-5 border-b border-agro-border flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-agro-muted block">
                Investimento Técnico Estimado
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-lg font-mono font-semibold text-agro-emerald">R$</span>
                <span className="text-4xl font-mono font-bold tabular-nums text-agro-cream">
                  {metrics.totalInvestment.toLocaleString('pt-BR')}
                </span>
              </div>
              <span className="text-xs font-mono tabular-nums text-agro-muted block mt-1">
                Equivalente a R$ {metrics.adjustedFeePerHa}/ha ({hectares} ha)
              </span>
            </div>

            <div className="bg-agro-elevated border border-agro-gold/30 rounded-xl px-3.5 py-2.5 text-right shrink-0">
              <span className="text-[11px] text-agro-muted block">Retorno Projetado</span>
              <span className="text-lg font-mono font-bold tabular-nums text-agro-gold">
                {metrics.roiMultiple}x na safra
              </span>
            </div>
          </div>

          {/* Key Projected Agronomic Gains */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-agro-surface border border-agro-border rounded-xl p-4">
              <span className="text-[11px] text-agro-muted block">Ganho de Produtividade</span>
              <span className="text-lg font-mono font-bold tabular-nums text-agro-emerald block mt-1">
                +{metrics.extraYieldPerHa} {metrics.cfg.unitLabel}
              </span>
              <span className="text-[11px] text-agro-muted block mt-0.5">
                Alvo: {metrics.projectedYieldPerHa} {metrics.cfg.unitLabel}
              </span>
            </div>

            <div className="bg-agro-surface border border-agro-border rounded-xl p-4">
              <span className="text-[11px] text-agro-muted block">Economia em Insumos</span>
              <span className="text-lg font-mono font-bold tabular-nums text-agro-cream block mt-1">
                R$ {metrics.inputSavingsTotal.toLocaleString('pt-BR')}
              </span>
              <span className="text-[11px] text-agro-muted block mt-0.5">
                Adubos e defensivos otimizados
              </span>
            </div>
          </div>

          {/* Total Gross Harvest Impact */}
          <div className="bg-agro-elevated/80 border border-agro-emerald/30 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-agro-muted">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-agro-emerald" /> Impacto Financeiro Total na Área
              </span>
              <span className="font-mono tabular-nums">{hectares} ha</span>
            </div>
            <div className="text-2xl font-mono font-bold tabular-nums text-agro-gold">
              +R$ {metrics.totalFinancialBenefit.toLocaleString('pt-BR')}
            </div>
            <p className="text-[11px] text-agro-muted leading-snug">
              Soma da produção adicional estimada (R$ {metrics.extraRevenueTotal.toLocaleString('pt-BR')}) + redução de compras desnecessárias de corretivos e químicos.
            </p>
          </div>

          {/* Guarantees */}
          <div className="space-y-2 pt-1 text-xs text-agro-cream/85">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-agro-emerald shrink-0" />
              <span>Recomendação 100% técnica e independente de revendas</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-agro-emerald shrink-0" />
              <span>Laudo assinado por Engenheiro Agrônomo com CREA ativo</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-agro-emerald shrink-0" />
              <span>Planejamento entregue com cronograma operacional claro</span>
            </div>
          </div>

            <button
              type="button"
              onClick={handleSendSimulation}
              className="w-full py-4 px-6 bg-agro-gold hover:bg-agro-amber text-agro-bg rounded-xl font-display font-bold text-sm transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-agro-gold/10 cursor-pointer active:scale-[0.99]"
            >
              <Send className="w-4 h-4" />
              Receber Proposta Técnica no WhatsApp
            </button>
          </FadeInUp>
        </div>
      </div>
    </FadeInUp>
  );
};
