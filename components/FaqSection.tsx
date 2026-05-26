import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "O site possui algum tipo de mensalidade obrigatória?",
    answer: "Não. Nós criamos sites e landing pages que pertencem 100% a você. Você faz um investimento único pelo desenvolvimento. A única taxa periódica que existe na internet é o registro do seu domínio (cerca de R$ 40 por ano no Registro.br) e a sua conta de hospedagem (cerca de R$ 10 a R$ 25 por mês)."
  },
  {
    question: "Quanto tempo demora para meu projeto ficar online?",
    answer: "Uma Landing Page estratégica de alta conversão costuma ficar pronta entre 5 a 10 dias úteis. Projetos corporativos maiores ou plataformas institucionais de alta fidelidade levam em média de 3 a 4 semanas, a depender do número de telas e integrações selecionadas."
  },
  {
    question: "Como funciona se eu precisar fazer alterações no futuro?",
    answer: "Nossos códigos são limpos e modulares. Nós entregamos um guia em vídeo prático ensinando você ou seu time a mudar textos, fotos e links em poucos minutos. Caso prefira, também oferecemos planos de suporte técnico e manutenção preventiva sob demanda."
  },
  {
    question: "Não tenho textos nem imagens prontas. Vocês criam?",
    answer: "Sim! A consultoria criativa inclui a estruturação de textos persuasivos (copywriting) voltados para conversão e busca das melhores imagens e vetores licenciados para o seu segmento."
  },
  {
    question: "Como o site me ajuda a conseguir mais clientes no Google?",
    answer: "Todos os nossos projetos contam com indexação técnica nativa recomendada pelo Google (SEO de alto padrão). Isso significa códigos sem erros do Lighthouse, tags corretas e sitemap que aceleram o ranqueamento orgânico da sua marca nas pesquisas regionais."
  },
  {
    question: "Quais são as formas de pagamento disponíveis?",
    answer: "Trabalhamos de forma flexível: faturamento em 2x (sinal de 50% para início e 50% após aprovação pré-entrega) ou em até 12x no cartão de crédito via intermediador de pagamentos."
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className={`border rounded-3xl transition-all duration-300 ${
              isOpen 
                ? 'bg-blue-600/5 border-blue-500/20 shadow-lg shadow-blue-500/5' 
                : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.02]'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between p-6 md:p-8 text-left gap-4"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl border transition-colors ${
                  isOpen ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-900 border-white/5 text-blue-400'
                }`}>
                  <HelpCircle className="w-4 h-4" />
                </div>
                <span className="text-sm md:text-base font-bold uppercase tracking-tight text-white leading-snug">
                  {item.question}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300 shrink-0 ${
                isOpen ? 'rotate-180 text-blue-400' : ''
              }`} />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 md:px-8 pb-8 pt-2 text-xs md:text-sm font-light leading-relaxed text-white/60 border-t border-white/5">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
