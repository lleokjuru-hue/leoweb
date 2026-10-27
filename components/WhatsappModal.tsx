import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  Copy,
  Check,
  UserPlus,
  PhoneCall,
  Smartphone,
  X,
  ExternalLink,
} from 'lucide-react';
import { PREMIUM_EASE } from './ScrollReveal';

// Número com 9º dígito (13 dígitos: DDI 55 + DDD 97 + 93618-1045)
export const WHATSAPP_WITH_9 = '5597936181045';
// Formato alternativo sem o 9º dígito (12 dígitos: contas pessoais no DDD 97 registradas no padrão antigo da Meta)
export const WHATSAPP_WITHOUT_9 = '559736181045';

export const WHATSAPP_DISPLAY = '+55 (97) 93618-1045';
export const WHATSAPP_COPY_VALUE = '+55 97 93618-1045';

// Links limpos sem ?text= para evitar bloqueio anti-spam em contas de WhatsApp Pessoal (não-Business)
export const WHATSAPP_CLEAN_URL = `https://wa.me/${WHATSAPP_WITH_9}`;
export const WHATSAPP_ALT_NO9_URL = `https://wa.me/${WHATSAPP_WITHOUT_9}`;
export const WHATSAPP_APP_URI = `whatsapp://send?phone=${WHATSAPP_WITH_9}`;
export const PHONE_CALL_URI = `tel:+${WHATSAPP_WITH_9}`;

// Cartão de contato vCard (.vcf) contendo ambos os formatos (com e sem 9º dígito)
// Ao salvar na agenda, o WhatsApp Pessoal sincroniza e libera a conversa em 100% dos aparelhos
const VCARD_CONTENT = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  'FN:Engenheiro Agrônomo - Consultoria Rural',
  'N:Agrônomo;Engenheiro;;;',
  'ORG:Consultoria & Engenharia Agronômica',
  `TEL;TYPE=CELL,VOICE:+${WHATSAPP_WITH_9}`,
  `TEL;TYPE=CELL:+${WHATSAPP_WITHOUT_9}`,
  'NOTE:Atendimento Técnico Agronômico - Solo, Lavoura e Pastagens',
  'END:VCARD',
].join('\r\n');

export const VCARD_DATA_URI = `data:text/vcard;charset=utf-8,${encodeURIComponent(VCARD_CONTENT)}`;

export async function copyToClipboardSafe(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback below for iframe / restricted WebView environments
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.className = 'fixed -left-[9999px] top-0 opacity-0 pointer-events-none';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);
    return copied;
  } catch {
    return false;
  }
}

interface WhatsappModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledMessage?: string;
}

export const WhatsappModal: React.FC<WhatsappModalProps> = ({
  isOpen,
  onClose,
  prefilledMessage,
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyPhone = async () => {
    const ok = await copyToClipboardSafe(WHATSAPP_COPY_VALUE);
    if (ok) {
      setCopiedPhone(true);
      window.setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const handleCopyMessage = async () => {
    if (!prefilledMessage) return;
    const ok = await copyToClipboardSafe(prefilledMessage);
    if (ok) {
      setCopiedMsg(true);
      window.setTimeout(() => setCopiedMsg(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="whatsapp-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.3, ease: PREMIUM_EASE }}
            className="relative z-10 w-full max-w-md bg-agro-surface border border-agro-border rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-agro-emerald block">
                  Atendimento Direto • WhatsApp Pessoal
                </span>
                <h3
                  id="whatsapp-modal-title"
                  className="text-xl sm:text-2xl font-display font-bold text-agro-cream mt-1"
                >
                  Chamar Engenheiro Agrônomo
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar janela"
                className="p-2 rounded-xl bg-agro-bg border border-agro-border text-agro-muted hover:text-agro-cream transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Selectable Number Box + Copy */}
            <div className="bg-agro-bg border border-agro-border rounded-2xl p-4 flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-agro-muted block">
                  Número direto (DDD 97):
                </span>
                <span className="text-base sm:text-lg font-mono font-bold text-agro-cream select-all block mt-0.5">
                  {WHATSAPP_DISPLAY}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyPhone}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                  copiedPhone
                    ? 'bg-agro-emerald text-agro-bg'
                    : 'bg-agro-elevated border border-agro-border text-agro-cream hover:border-agro-emerald/50'
                }`}
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-agro-emerald" />
                    Copiar
                  </>
                )}
              </button>
            </div>

            {/* Optional Pre-filled Message Box */}
            {prefilledMessage && (
              <div className="bg-agro-elevated/80 border border-agro-emerald/35 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-agro-emerald">
                    Resumo pronto para colar na conversa
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="text-xs font-semibold text-agro-gold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedMsg ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copiar texto
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-agro-muted whitespace-pre-line line-clamp-3">
                  {prefilledMessage}
                </p>
              </div>
            )}

            {/* Primary Native Clean Link (No ?text= query string to avoid Personal WhatsApp link errors) */}
            <div className="space-y-2.5">
              <a
                href={WHATSAPP_CLEAN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-5 bg-agro-emerald hover:bg-agro-leaf text-agro-bg rounded-xl font-display font-bold text-sm transition-colors flex items-center justify-center gap-2.5 shadow-lg shadow-agro-emerald/15"
              >
                <MessageCircle className="w-5 h-5" />
                Abrir Conversa no WhatsApp
                <ExternalLink className="w-4 h-4 opacity-75" />
              </a>

              <a
                href={WHATSAPP_APP_URI}
                className="w-full py-3 px-4 bg-agro-elevated hover:bg-agro-border/60 border border-agro-border text-agro-cream rounded-xl font-display font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Smartphone className="w-4 h-4 text-agro-emerald" />
                Abrir Direto no Aplicativo do Celular
              </a>
            </div>

            {/* Personal WhatsApp & DDD 97 Fallbacks */}
            <div className="pt-4 border-t border-agro-border space-y-3">
              <p className="text-xs text-agro-muted leading-relaxed">
                Como este é um <strong className="text-agro-cream">WhatsApp pessoal</strong> (não comercial), caso seu aparelho exiba aviso de link ou não abra de primeira, use uma das opções abaixo:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={VCARD_DATA_URI}
                  download="engenheiro-agronomo.vcf"
                  className="p-3 rounded-xl bg-agro-bg hover:bg-agro-elevated border border-agro-border hover:border-agro-emerald/40 transition-colors flex items-center gap-2.5 text-left"
                >
                  <div className="p-2 rounded-lg bg-agro-emerald/15 text-agro-emerald shrink-0">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-agro-cream block">
                      Salvar na Agenda
                    </span>
                    <span className="text-[11px] text-agro-muted block">
                      Libera o chat na hora
                    </span>
                  </div>
                </a>

                <a
                  href={WHATSAPP_ALT_NO9_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-agro-bg hover:bg-agro-elevated border border-agro-border hover:border-agro-gold/40 transition-colors flex items-center gap-2.5 text-left"
                >
                  <div className="p-2 rounded-lg bg-agro-gold/15 text-agro-gold shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-agro-cream block">
                      Link sem 9º dígito
                    </span>
                    <span className="text-[11px] text-agro-muted block">
                      Compatível DDD 97
                    </span>
                  </div>
                </a>
              </div>

              <a
                href={PHONE_CALL_URI}
                className="w-full py-2.5 px-4 rounded-xl bg-agro-bg hover:bg-agro-elevated border border-agro-border text-xs font-semibold text-agro-muted hover:text-agro-cream transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-agro-gold" />
                Ou ligar por chamada normal: (97) 93618-1045
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
