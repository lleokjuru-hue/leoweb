import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FaqItem } from '../types';
import { StaggerContainer, StaggerItem, PREMIUM_EASE } from './ScrollReveal';

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'A consultoria possui vínculo com lojas ou revendas de insumos agrícolas?',
    answer:
      'Não. Nosso trabalho é 100% independente. Não recebemos comissão sobre venda de sementes, fertilizantes ou defensivos. Isso garante que você aplique apenas o que o solo e a lavoura realmente precisam, gerando economia imediata já na compra dos insumos.',
  },
  {
    question: 'Como funciona a coleta de solo e a primeira visita na propriedade?',
    answer:
      'Iniciamos com o levantamento histórico dos talhões ou piquetes e realizamos a amostragem técnica georreferenciada (0–20 cm e 20–40 cm quando necessário). Após o resultado do laboratório, entregamos o caderno completo de calagem, gessagem e adubação explicado passo a passo.',
  },
  {
    question: 'Vocês atendem pequenos e médios produtores ou apenas grandes fazendas?',
    answer:
      'Atendemos propriedades de diferentes portes — desde áreas familiares e sítios produtivos a partir de 20 hectares até fazendas comerciais de grãos e pecuária extensiva ou intensiva. O pacote técnico é dimensionado exatamente para a realidade da sua área.',
  },
  {
    question: 'Em quanto tempo vejo retorno financeiro sobre o valor da consultoria?',
    answer:
      'Na maioria das propriedades, apenas o ajuste fino na compra de calcário, fósforo, potássio e defensivos (cortando formulações caras desnecessárias) já paga integralmente o investimento da consultoria antes mesmo da colheita ou do giro do lote.',
  },
  {
    question: 'Também fazem projetos de reforma e divisão de pastagens para gado de corte e leite?',
    answer:
      'Sim. Projetamos a recuperação de pastos degradados, escolha da forrageira ideal para o seu tipo de solo e topografia, dimensionamento de piquetes para pastejo rotacionado e plano de suplementação estratégica na seca e nas águas.',
  },
  {
    question: 'Como faço para agendar uma conversa ou diagnóstico inicial?',
    answer:
      'Basta utilizar a calculadora acima ou preencher os dados na seção de contato abaixo. O atendimento é feito diretamente pelo Engenheiro Agrônomo responsável via WhatsApp, sem intermediários.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <StaggerContainer staggerDelay={0.08} amount={0.1} className="max-w-3xl mx-auto space-y-3">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <StaggerItem
            key={item.question}
            yOffset={20}
            className={`border rounded-2xl transition-colors ${
              isOpen
                ? 'bg-agro-surface border-agro-emerald/40'
                : 'bg-agro-surface/60 border-agro-border hover:border-agro-emerald/25'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4 cursor-pointer"
            >
              <span className="text-sm sm:text-base font-display font-semibold text-agro-cream leading-snug">
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-agro-muted transition-transform duration-300 shrink-0 ${
                  isOpen ? 'rotate-180 text-agro-emerald' : ''
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: PREMIUM_EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-5 sm:px-6 pb-6 pt-1 text-sm leading-relaxed text-agro-muted border-t border-agro-border/60">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
};
