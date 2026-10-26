import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, MapPin } from 'lucide-react';
import { FieldCase } from '../types';
import { IllustrationFrame } from './IllustrationFrame';
import { FadeInUp, PREMIUM_EASE } from './ScrollReveal';

import heroCampoImg from '../src/assets/images/hero_campo_realista_1793057795734.jpg';
import soloLavouraImg from '../src/assets/images/solo_lavoura_realista_1793057796140.jpg';
import propriedadePastagemImg from '../src/assets/images/propriedade_pastagem_realista_1793057798602.jpg';
import colheitaPrecisaoImg from '../src/assets/images/colheita_precisao_realista_1793057798213.jpg';

const FIELD_CASES: FieldCase[] = [
  {
    id: 'case-soja-perfil',
    title: 'Correção de Perfil & Teto Produtivo na Soja',
    region: 'Área de Grãos — 480 hectares',
    category: 'graos',
    categoryLabel: 'Grãos & Lavoura',
    description:
      'Diagnóstico por malha georreferenciada identificou barreira química de alumínio em subsuperfície. Com calagem ajustada e gessagem localizada, o sistema radicular atingiu maior profundidade e resistiu a 14 dias de estiagem.',
    primaryMetric: '+15,4 sc/ha',
    secondaryMetric: 'Média final: 71,2 sc/ha',
    image: heroCampoImg,
    imageAlt: 'Lavoura comercial de soja vigorosa ao amanhecer em solo fértil corrigido',
    highlights: [
      'Elevação da saturação por bases (V%) para 65%',
      'Redução de 24% no gasto com potássio mal distribuído',
      'Padronização de estande e fechamento rápido de entrelinha',
    ],
  },
  {
    id: 'case-pastagem-rotacionada',
    title: 'Reforma & Intensificação em Pastejo Rotacionado',
    region: 'Pecuária de Corte — 320 hectares',
    category: 'pastagem',
    categoryLabel: 'Pastagem & Pecuária',
    description:
      'Recuperação de pastagem degradada sem necessidade de abertura de área nova. Dimensionamento hidráulico, divisão técnica de piquetes, fosfatagem corretiva e ajuste preciso de altura de entrada e saída.',
    primaryMetric: '3,3 UA/ha',
    secondaryMetric: 'Antes: 1,1 UA/ha na mesma área',
    image: propriedadePastagemImg,
    imageAlt: 'Vista aérea realista de propriedade rural com piquetes verdes de pastejo rotacionado e aguada',
    highlights: [
      'Triplicação da capacidade de suporte nas águas',
      'Eliminação de plantas invasoras sem reforma mecânica total',
      'Ganho médio diário (GMD) elevado com forragem de alta proteína',
    ],
  },
  {
    id: 'case-solo-fertilidade',
    title: 'Nutrição de Base & Equilíbrio Químico do Solo',
    region: 'Sistema Soja / Milho — 210 hectares',
    category: 'solo',
    categoryLabel: 'Correção de Solo',
    description:
      'Substituição de formulações comerciais engessadas por recomendação independente baseada em análise completa de macro e micronutrientes (Boro, Zinco e Enxofre), cortando excessos e destravando o arranque inicial.',
    primaryMetric: '-29% Custo NPK',
    secondaryMetric: 'Economia de R$ 610/ha em adubação',
    image: soloLavouraImg,
    imageAlt: 'Fotografia realista em close de solo agrícola escuro e fértil com plantas jovens de milho e soja',
    highlights: [
      'Laudo 100% isento, sem vínculo com revendas de insumos',
      'Desenvolvimento radicular vigoroso nos primeiros 25 dias',
      'Maior aproveitamento de fósforo remanescente no solo',
    ],
  },
  {
    id: 'case-colheita-safrinha',
    title: 'Planejamento Fitossanitário & Colheita de Precisão',
    region: 'Sucessão Safra / Safrinha — 850 hectares',
    category: 'graos',
    categoryLabel: 'Grãos & Lavoura',
    description:
      'Monitoramento presencial semanal de pragas e doenças (MIP) eliminou duas pulverizações desnecessárias e posicionou fungicidas preventivos no momento exato, preservando área foliar sadia até o enchimento de grãos.',
    primaryMetric: '+26 sc/ha Milho',
    secondaryMetric: 'Perda na colheita reduzida para < 0,8%',
    image: colheitaPrecisaoImg,
    imageAlt: 'Campo dourado de grãos em ponto de colheita ao pôr do sol com colheitadeira ao fundo',
    highlights: [
      'Controle rigoroso de cigarrinha e percevejo no limiar econômico',
      'Regulagem técnica de plataforma na pré-colheita',
      'Relatório de rentabilidade talhão por talhão',
    ],
  },
];

export const PortfolioShowcase: React.FC = () => {
  const [filter, setFilter] = useState<'todos' | 'graos' | 'pastagem' | 'solo'>('todos');

  const filteredCases =
    filter === 'todos' ? FIELD_CASES : FIELD_CASES.filter((item) => item.category === filter);

  return (
    <div className="space-y-10">
      {/* Filter Controls */}
      <FadeInUp delay={0.05} yOffset={20} amount={0.2} className="flex flex-wrap gap-2">
        {[
          { id: 'todos', label: 'Todos os Resultados' },
          { id: 'graos', label: 'Grãos & Lavoura' },
          { id: 'pastagem', label: 'Pastagem & Pecuária' },
          { id: 'solo', label: 'Correção de Solo' },
        ].map((btn) => {
          const isActive = filter === btn.id;
          return (
            <button
              key={btn.id}
              type="button"
              onClick={() => setFilter(btn.id as typeof filter)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-agro-emerald text-agro-bg shadow-sm'
                  : 'bg-agro-surface border border-agro-border text-agro-muted hover:text-agro-cream hover:border-agro-emerald/40'
              }`}
            >
              {btn.label}
            </button>
          );
        })}
      </FadeInUp>

      {/* Case Studies Grid */}
      <FadeInUp delay={0.1} yOffset={28} amount={0.08}>
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCases.map((item, idx) => (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.07,
                  ease: PREMIUM_EASE,
                }}
                className="bg-agro-surface border border-agro-border hover:border-agro-emerald/40 hover:-translate-y-0.5 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300"
              >
              <div className="p-4 sm:p-5 pb-0">
                <IllustrationFrame
                  src={item.image}
                  alt={item.imageAlt}
                  aspectClass="aspect-[4/3]"
                  caption={item.categoryLabel}
                  metricBadge={item.primaryMetric}
                />
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-agro-muted mb-2">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-agro-emerald" />
                      {item.region}
                    </span>
                    <span className="font-mono tabular-nums text-agro-gold font-medium">
                      {item.secondaryMetric}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-agro-cream tracking-tight mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-agro-muted leading-relaxed">{item.description}</p>
                </div>

                <ul className="pt-5 border-t border-agro-border space-y-2.5">
                  {item.highlights.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-agro-cream/85">
                      <Check className="w-4 h-4 text-agro-emerald shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
          </AnimatePresence>
        </div>
      </FadeInUp>
    </div>
  );
};
