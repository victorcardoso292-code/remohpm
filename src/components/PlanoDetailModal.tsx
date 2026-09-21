import React, { useState } from 'react';
import { PlanoRemocao } from '../types/remocao';
import { planosRemocaoData } from '../data/planosRemocao';
import { useMaster } from '../context/MasterContext';
import { GeradorFichaRemocao } from './GeradorFichaRemocao';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Eye, 
  EyeOff, 
  Phone, 
  Mail, 
  AlertTriangle, 
  FileText, 
  KeyRound, 
  Truck, 
  CheckCircle2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Printer, 
  Sparkles,
  ClipboardList,
  BookOpen,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Building2,
  Activity
} from 'lucide-react';

interface PlanoDetailModalProps {
  plano: PlanoRemocao | null;
  onClose: () => void;
  onSimular: (planoId: string) => void;
}

export const CARE_MED_PLANS = ['servir', 'geap', 'cassi', 'assefaz'];
export const LISS_CARE_PLANS = [
  'servir',
  'cassi',
  'bradesco',
  'geap',
  'postalsaude',
  'tre',
  'tre-to'
];

export const PlanoDetailModal: React.FC<PlanoDetailModalProps> = ({
  plano,
  onClose,
  onSimular
}) => {
  const { isMaster, updatePlano, resetSinglePlano } = useMaster();
  const [providerTab, setProviderTab] = useState<'caremed' | 'lisscare' | 'none'>('caremed');
  const [activeTab, setActiveTab] = useState<'remocao' | 'ficha' | 'editor'>('remocao');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Master Edit Draft state
  const [editDraft, setEditDraft] = useState<PlanoRemocao | null>(null);
  const [editSuccess, setEditSuccess] = useState<boolean>(false);

  const planId = plano ? plano.id.toLowerCase() : '';
  const supportsCareMed = CARE_MED_PLANS.includes(planId);
  const supportsLissCare = LISS_CARE_PLANS.includes(planId);
  const supportsBoth = supportsCareMed && supportsLissCare;
  const hasNoProvider = !supportsCareMed && !supportsLissCare;

  React.useEffect(() => {
    if (plano) {
      setEditDraft(JSON.parse(JSON.stringify(plano)));
      setActiveTab('remocao');
      const pId = plano.id.toLowerCase();
      const isCareMed = CARE_MED_PLANS.includes(pId);
      const isLissCare = LISS_CARE_PLANS.includes(pId);
      if (pId === 'servir') {
        setProviderTab('lisscare');
      } else if (isCareMed) {
        setProviderTab('caremed');
      } else if (isLissCare) {
        setProviderTab('lisscare');
      } else {
        setProviderTab('none');
      }
    }
  }, [plano]);

  if (!plano || !editDraft) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSaveMasterEdits = () => {
    if (editDraft) {
      updatePlano(editDraft);
      setEditSuccess(true);
      setTimeout(() => setEditSuccess(false), 2500);
    }
  };

  const handleResetToOriginal = () => {
    if (window.confirm(`Restaurar o POP do convênio ${plano.nome} para os dados originais padrão?`)) {
      resetSinglePlano(plano.id);
      onClose();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Helper: Format step text with clean paragraph and sub-item line breaks
  const renderFormattedStep = (rawStep: string) => {
    // Remove leading step number like "1. ", "1) ", "1 - "
    const cleaned = rawStep.replace(/^\d+[\.\)\-]\s*/, '').trim();

    // Check if step contains sub-enumerations like "1)", "1.", "a)", or existing newlines
    if (
      cleaned.includes('1)') || 
      cleaned.includes('1.') || 
      cleaned.includes('1 -') || 
      cleaned.includes('a)') || 
      cleaned.includes('\n')
    ) {
      const normalized = cleaned
        .replace(/:\s*([1-9a-z][\)\.\-])/gi, ':\n\n$1')
        .replace(/;\s*([1-9a-z][\)\.\-])/gi, ';\n\n$1');

      const paragraphs = normalized.split('\n').map(p => p.trim()).filter(Boolean);

      if (paragraphs.length > 1) {
        return (
          <div className="space-y-3 sm:space-y-4 text-slate-900 text-sm sm:text-base font-normal leading-relaxed">
            {paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="break-words">
                {p}
              </p>
            ))}
          </div>
        );
      }
    }

    return (
      <p className="text-slate-900 text-sm sm:text-base font-normal leading-relaxed break-words">
        {cleaned}
      </p>
    );
  };

  // Helper: Extract primary contact / provider info
  const primaryProviderName = () => {
    const raw = plano.empresaCredenciadaPrincipal || '';
    return raw.split('(')[0].trim() || 'LISS CARE';
  };

  const primaryEmailOrContact = () => {
    if (plano.emails && plano.emails.length > 0) {
      return plano.emails[0];
    }
    if (plano.portalUrl) {
      return plano.portalUrl;
    }
    if (plano.telefones && plano.telefones.length > 0) {
      return plano.telefones[0];
    }
    return 'Regulação Direta do Convênio';
  };

  const stepsList = plano.fluxoPassoAPasso && plano.fluxoPassoAPasso.length > 0
    ? plano.fluxoPassoAPasso
    : [
        `1. Reunir os documentos obrigatórios do paciente.`,
        `2. Enviar a solicitação completa para a empresa ${primaryProviderName()}.`,
        `3. A ${primaryProviderName()} solicitará a autorização para remoção junto ao convênio ${plano.nome}.`,
        `4. Aguardar liberação e direcionamento da ambulância regulada.`
      ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* Modal Header */}
        <div className="bg-white p-5 sm:p-7 border-b border-slate-200/80 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
            title="Fechar (Esc)"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-800 text-white font-extrabold text-lg flex items-center justify-center flex-shrink-0 shadow-2xs">
                {plano.badge}
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
                  CONVÊNIO SELECIONADO
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {plano.nome}
                  </h1>
                  {isMaster && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                      <Edit3 className="w-3 h-3" /> Master Ativo
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Central de informações para remoção de pacientes
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2.5 self-start sm:self-center">
              <button
                onClick={handlePrint}
                className="border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-xl px-4 py-2 text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Imprimir informações</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation / Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pt-5 mt-4 border-t border-slate-100 scrollbar-none">
            {/* Caso 1: Plano atendido por AMBAS as empresas (CareMed e LissCare) */}
            {supportsBoth && (
              <>
                {/* 1º: Remoção CareMed */}
                <button
                  onClick={() => {
                    setProviderTab('caremed');
                    setActiveTab('remocao');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs ${
                    activeTab === 'remocao' && providerTab === 'caremed'
                      ? 'bg-rose-700 text-white ring-2 ring-rose-600/30'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Truck className="w-4 h-4 text-white" />
                  <span>Remoção CareMed</span>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Maior Parceria
                  </span>
                </button>

                {/* 2º: Remoção LissCare */}
                <button
                  onClick={() => {
                    setProviderTab('lisscare');
                    setActiveTab('remocao');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs ${
                    activeTab === 'remocao' && providerTab === 'lisscare'
                      ? 'bg-teal-800 text-white ring-2 ring-teal-700/30'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Remoção LissCare</span>
                </button>
              </>
            )}

            {/* Caso 2: Plano atendido SOMENTE pela CareMed (ex: ASSEFAZ) */}
            {supportsCareMed && !supportsLissCare && (
              <button
                onClick={() => {
                  setProviderTab('caremed');
                  setActiveTab('remocao');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs ${
                  activeTab === 'remocao'
                    ? 'bg-rose-700 text-white ring-2 ring-rose-600/30'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Truck className="w-4 h-4 text-white" />
                <span>Remoção CareMed</span>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Maior Parceria
                </span>
              </button>
            )}

            {/* Caso 3: Plano atendido SOMENTE pela LissCare (ex: BRADESCO, POSTAL SAÚDE, TRE-TO, MEDISERVICE, SETE, UNIMED) */}
            {!supportsCareMed && supportsLissCare && (
              <button
                onClick={() => {
                  setProviderTab('lisscare');
                  setActiveTab('remocao');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs ${
                  activeTab === 'remocao'
                    ? 'bg-teal-800 text-white ring-2 ring-teal-700/30'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Remoção LissCare</span>
              </button>
            )}

            {/* Caso 4: Plano sem empresa homologada direta (em branco / a definir) */}
            {hasNoProvider && (
              <button
                onClick={() => setActiveTab('remocao')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs ${
                  activeTab === 'remocao'
                    ? 'bg-slate-800 text-white ring-2 ring-slate-700/30'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Regulação & POP do Convênio</span>
              </button>
            )}

            {/* APENAS PARA O BRADESCO: Campo depois de Remoção LissCare do mesmo tamanho */}
            {plano.id === 'bradesco' && (
              <button
                onClick={() => setActiveTab('ficha')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs ${
                  activeTab === 'ficha'
                    ? 'bg-teal-800 text-white ring-2 ring-teal-700/30'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Ficha de Remoção</span>
              </button>
            )}

            {isMaster && (
              <button
                onClick={() => setActiveTab(activeTab === 'editor' ? 'remocao' : 'editor')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                  activeTab === 'editor'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span>{activeTab === 'editor' ? 'Voltar à Remoção' : 'Editor Master'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6 text-slate-800 bg-slate-50/40">
          
          {/* TAB 1: VISUAL PRINCIPAL DE REMOÇÃO */}
          {activeTab === 'remocao' && (
            <div className="space-y-5">
              {/* RENDERIZAÇÃO ESPECÍFICA: CARE MED SOLUTIONS (Quando suportado e ativo) */}
              {supportsCareMed && (providerTab === 'caremed' || !supportsLissCare) && (
                <>
                  {/* Banner Top CareMed */}
                  <div className="bg-rose-50/80 border border-rose-200/90 rounded-2xl p-4 sm:p-4.5 flex items-center gap-3.5 text-slate-800 shadow-2xs">
                    <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div className="text-xs sm:text-sm leading-relaxed">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-rose-950">Solicitação de remoção — CARE MED SOLUTIONS 🚑🚨</span>
                        <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                          ⭐ Maior Parceria HPM
                        </span>
                      </div>
                      <p className="text-slate-700 mt-0.5 font-normal">
                        {plano.id === 'geap' ? (
                          <>A remoção dentro do município deve ser solicitada à empresa <strong>CARE MED SOLUTIONS</strong>. A CARE MED é quem solicitará a autorização ao plano <strong>GEAP</strong>.</>
                        ) : (
                          <>A remoção dentro do município deve ser solicitada à empresa <strong>CARE MED SOLUTIONS</strong>, Solicitar Autorização e avisar assim que estiver tudo pronto.</>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* 2-Columns Grid: Documentos Obrigatórios & Canal de Atendimento CareMed */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    
                    {/* Card 1: DOCUMENTOS OBRIGATÓRIOS */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-start gap-3.5 mb-5">
                          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700">
                            <ClipboardList className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                              DOCUMENTOS OBRIGATÓRIOS
                            </span>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                              Enviar para a solicitação
                            </h3>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {(plano.id === 'geap' ? [
                            'Pedido Médico',
                            `Cópia da carteira do plano ${plano.nome}`,
                            'Cópia do documento com foto',
                            'Justificativa de insuficiência de leitos (se transferência do HPM para Santa Thereza)'
                          ] : [
                            'Pedido Médico',
                            `Cópia da carteira do plano ${plano.nome}`,
                            'Cópia do documento com foto'
                          ]).map((doc, idx) => (
                            <div 
                              key={idx} 
                              className="bg-slate-50/80 hover:bg-slate-100/70 border border-slate-200/60 rounded-xl p-4 flex items-center gap-3.5 transition-colors"
                            >
                              <span className="w-7 h-7 rounded-full bg-rose-700 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-2xs">
                                {idx + 1}
                              </span>
                              <span className="text-sm font-semibold text-slate-800 leading-snug">
                                {doc}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card 2: CANAL DE ATENDIMENTO CARE MED */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3.5 mb-2">
                          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                                CANAL DE ATENDIMENTO
                              </span>
                              <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-full">
                                MAIOR PARCERIA
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                              CARE MED SOLUTIONS 🚑🚨
                            </h3>
                          </div>
                        </div>

                        {/* Email Principal CareMed */}
                        <div>
                          <p className="text-xs sm:text-sm text-slate-500 mb-2">
                            Envie a documentação para:
                          </p>

                          <div className="bg-rose-50/80 border border-rose-200/90 rounded-xl p-3.5 sm:p-4 flex items-center justify-between gap-3 text-rose-950 shadow-2xs">
                            <div className="flex items-center gap-3 min-w-0">
                              <Mail className="w-5 h-5 text-rose-700 flex-shrink-0" />
                              <span className="text-sm sm:text-base font-bold truncate">
                                remocaocaremed@gmail.com
                              </span>
                            </div>

                            <button
                              onClick={() => copyToClipboard('remocaocaremed@gmail.com', 'caremed-email')}
                              className="p-2 text-rose-700 hover:text-rose-900 hover:bg-rose-100 rounded-lg transition-colors flex-shrink-0"
                              title="Copiar e-mail"
                            >
                              {copiedText === 'caremed-email' ? (
                                <Check className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* E-mails Obrigatórios em Cópia (CC) */}
                        <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-3 sm:p-3.5 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                              <span>E-mails obrigatórios em cópia (CC):</span>
                            </div>
                            <button
                              onClick={() => copyToClipboard('janaina.gomes@redemedical.com.br, hpm.recepcao@redemedical.com.br', 'all-cc')}
                              className="px-2 py-1 bg-amber-200/80 hover:bg-amber-300 text-amber-950 rounded text-[11px] font-bold flex items-center gap-1 transition-colors"
                              title="Copiar todos os e-mails de cópia"
                            >
                              {copiedText === 'all-cc' ? (
                                <Check className="w-3 h-3 text-emerald-700" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                              <span>Copiar CCs</span>
                            </button>
                          </div>

                          <div className="space-y-1.5 font-mono text-xs">
                            <div className="flex items-center justify-between bg-white/80 border border-amber-200/60 rounded-lg px-2.5 py-1.5">
                              <span className="text-slate-800 font-semibold truncate">janaina.gomes@redemedical.com.br</span>
                              <button
                                onClick={() => copyToClipboard('janaina.gomes@redemedical.com.br', 'cc-janaina')}
                                className="p-1 text-slate-400 hover:text-amber-800 transition-colors"
                                title="Copiar e-mail"
                              >
                                {copiedText === 'cc-janaina' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>

                            <div className="flex items-center justify-between bg-white/80 border border-amber-200/60 rounded-lg px-2.5 py-1.5">
                              <span className="text-slate-800 font-semibold truncate">hpm.recepcao@redemedical.com.br</span>
                              <button
                                onClick={() => copyToClipboard('hpm.recepcao@redemedical.com.br', 'cc-recepcao')}
                                className="p-1 text-slate-400 hover:text-amber-800 transition-colors"
                                title="Copiar e-mail"
                              >
                                {copiedText === 'cc-recepcao' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* WhatsApp / Telefone CareMed */}
                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                            Contato CareMed (WhatsApp & Atendimento)
                          </span>
                          
                          <div className="bg-slate-50 hover:bg-slate-100/90 border border-slate-200/90 rounded-xl p-3 flex items-center justify-between gap-2.5 transition-all">
                            <div className="min-w-0">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                                Central & WhatsApp
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono">
                                (63) 3322-1423
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <a
                                href={`https://wa.me/556333221423?text=${encodeURIComponent(`Olá, solicito remoção de paciente pelo Hospital Palmas Medical - Convênio ${plano.nome}.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
                                title="Abrir conversa no WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </a>
                              <button
                                onClick={() => copyToClipboard('(63) 3322-1423', 'caremed-phone')}
                                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                                title="Copiar telefone"
                              >
                                {copiedText === 'caremed-phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                          A <strong className="font-semibold text-slate-800">CARE MED SOLUTIONS</strong> solicitará à <strong className="font-semibold text-slate-800">{plano.nome}</strong> a autorização para a remoção do paciente.
                        </p>
                      </div>

                      {plano.portalUrl && (
                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-slate-500">Portal oficial do convênio:</span>
                          <a 
                            href={plano.portalUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1.5"
                          >
                            <span>Acessar Portal</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Card 3: PONTO DE ATENÇÃO (Apenas GEAP) */}
                  {plano.id === 'geap' && (
                    <div className="bg-amber-50/40 border border-amber-200/90 rounded-2xl p-6 sm:p-7 shadow-2xs border-l-4 border-l-amber-500">
                      <div className="flex items-start gap-3.5">
                        <div className="p-2 rounded-xl bg-amber-100 text-amber-800 flex-shrink-0 mt-0.5">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 block">
                            PONTO DE ATENÇÃO
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                            Hospital Santa Thereza
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-700 mt-1.5 leading-relaxed">
                            Caso a remoção seja do Hospital Palmas Medical para o Hospital Santa Thereza, justificar a insuficiência de leitos.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card 4: FLUXO OPERACIONAL CARE MED */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
                    <div className="flex items-start gap-3.5 mb-8 pb-4 border-b border-slate-100">
                      <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                          FLUXO OPERACIONAL
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                          Como solicitar (CARE MED SOLUTIONS)
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-8 sm:space-y-10 max-w-3xl">
                      {(plano.id === 'geap' ? [
                        `Reunir os documentos obrigatórios: 1) Pedido Médico; 2) Cópia da carteira do plano ${plano.nome}; 3) Cópia do documento com foto.`,
                        `Caso a remoção seja do Hospital Palmas Medical para o Hospital Santa Thereza, anexar justificativa de insuficiência de leitos.`,
                        `Enviar e-mail para a EMPRESA CARE MED SOLUTIONS no endereço: remocaocaremed@gmail.com (ou acionar WhatsApp 63 3322-1423) solicitando a remoção dentro do município com os documentos em anexo (colocar sempre em cópia: janaina.gomes@redemedical.com.br e hpm.recepcao@redemedical.com.br).`,
                        `A CARE MED SOLUTIONS solicitará a autorização ao plano ${plano.nome} para a remoção do paciente.`
                      ] : [
                        `Reunir os documentos obrigatórios: 1) Pedido Médico; 2) Cópia da carteira do plano ${plano.nome}; 3) Cópia do documento com foto.`,
                        `Enviar e-mail para a EMPRESA CARE MED SOLUTIONS no endereço: remocaocaremed@gmail.com (ou acionar WhatsApp 63 3322-1423) solicitando a remoção dentro do município com os documentos em anexo (colocar sempre em cópia: janaina.gomes@redemedical.com.br e hpm.recepcao@redemedical.com.br).`,
                        `A CARE MED SOLUTIONS solicitará a autorização ao plano ${plano.nome} para a remoção do paciente.`
                      ]).map((step, idx) => (
                        <div key={idx} className="flex flex-col space-y-3">
                          <div className="text-xl sm:text-2xl font-bold text-slate-950 font-sans tracking-tight">
                            {idx + 1}
                          </div>
                          <div className="pl-0.5">
                            {renderFormattedStep(step)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* RENDERIZAÇÃO: LISS CARE REMOÇÕES MÉDICAS (Quando suportado e ativo) */}
              {supportsLissCare && (providerTab === 'lisscare' || !supportsCareMed) && (
                <>
                  {/* Banner Top: Solicitação de remoção LissCare */}
                  <div className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-4 sm:p-4.5 flex items-center gap-3.5 text-slate-800 shadow-2xs">
                    <div className="w-9 h-9 rounded-xl bg-teal-100/80 text-teal-800 flex items-center justify-center flex-shrink-0">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div className="text-xs sm:text-sm leading-relaxed">
                      <span className="font-bold text-teal-950">Solicitação de remoção — {plano.nome}</span>
                      <span className="text-slate-700 ml-1.5 font-normal">
                        {plano.id === 'servir' ? (
                          <>A remoção dentro do município deve ser solicitada com o <strong>Formulário do SERVIR</strong> e autorização no site oficial. Empresa citada no POP: <strong>LISS CARE</strong>. Acompanhar pelo grupo de WhatsApp da Central caso fique em análise.</>
                        ) : plano.id === 'postalsaude' ? (
                          <>No pacote de pronto-socorro da Postal Saúde, as despesas com acompanhantes e REMOÇÃO são <strong>ITENS EXCLUÍDOS</strong>. Solicitações de remoção devem ser enviadas para o e-mail oficial: <strong>centralderemocao@postalsaude.com.br</strong> (com cópia para a empresa de ambulância).</>
                        ) : (
                          <>A remoção dentro do município deve ser solicitada à empresa <strong>LISS CARE</strong>. A LISS CARE é quem solicitará a autorização ao plano <strong>{plano.nome}</strong>.</>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* 2-Columns Grid: Documentos Obrigatórios & Canal de Atendimento */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    
                    {/* Card 1: DOCUMENTOS OBRIGATÓRIOS */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-start gap-3.5 mb-5">
                          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700">
                            <ClipboardList className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                              DOCUMENTOS OBRIGATÓRIOS
                            </span>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                              Enviar para a solicitação
                            </h3>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {plano.checklistDocumentos.map((doc, idx) => {
                            const cleaned = doc.replace(/^\d+[\.\)\-]\s*/, '').trim();
                            return (
                              <div 
                                key={idx} 
                                className="bg-slate-50/80 hover:bg-slate-100/70 border border-slate-200/60 rounded-xl p-4 flex items-center gap-3.5 transition-colors"
                              >
                                <span className="w-7 h-7 rounded-full bg-teal-800 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-2xs">
                                  {idx + 1}
                                </span>
                                <span className="text-sm font-semibold text-slate-800 leading-snug">
                                  {cleaned}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Card 2: CANAL DE ATENDIMENTO LISS CARE */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3.5 mb-2">
                          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                              CANAL DE ATENDIMENTO
                            </span>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                              {plano.id === 'servir' ? 'SERVIR / LISS CARE' : plano.id === 'postalsaude' ? 'CENTRAL DE REMOÇÃO POSTAL SAÚDE' : 'LISS CARE REMOÇÕES MÉDICAS'}
                            </h3>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs sm:text-sm text-slate-500 mb-2">
                            {plano.id === 'servir' ? 'E-mail oficial de remoção (enviar com formulário):' : plano.id === 'postalsaude' ? 'E-mail oficial para solicitação de remoção:' : 'Envie a documentação para:'}
                          </p>

                          <div className="bg-teal-50/90 border border-teal-200/90 rounded-xl p-3.5 sm:p-4 flex items-center justify-between gap-3 text-teal-950 shadow-2xs">
                            <div className="flex items-center gap-3 min-w-0">
                              <Mail className="w-5 h-5 text-teal-700 flex-shrink-0" />
                              <span className="text-sm sm:text-base font-bold truncate">
                                {plano.id === 'servir' ? 'remocaoservir@impactomedica.com.br' : plano.id === 'postalsaude' ? 'centralderemocao@postalsaude.com.br' : 'lisscareremocao@gmail.com'}
                              </span>
                            </div>

                            <button
                              onClick={() => copyToClipboard(plano.id === 'servir' ? 'remocaoservir@impactomedica.com.br' : plano.id === 'postalsaude' ? 'centralderemocao@postalsaude.com.br' : 'lisscareremocao@gmail.com', 'primary-contact')}
                              className="p-2 text-teal-700 hover:text-teal-900 hover:bg-teal-100 rounded-lg transition-colors flex-shrink-0"
                              title="Copiar contato"
                            >
                              {copiedText === 'primary-contact' ? (
                                <Check className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {(plano.id === 'servir' || plano.id === 'postalsaude') && (
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-2 text-xs">
                            <div className="min-w-0">
                              <span className="text-slate-500 font-semibold block">Empresa Executora (Liss Care):</span>
                              <span className="font-mono font-bold text-slate-800">lisscareremocao@gmail.com</span>
                            </div>
                            <button
                              onClick={() => copyToClipboard('lisscareremocao@gmail.com', 'liss-contact')}
                              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                              title="Copiar e-mail"
                            >
                              {copiedText === 'liss-contact' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        )}

                        {/* E-mails Obrigatórios em Cópia (CC) */}
                        <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3 sm:p-3.5 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                              <span>E-mails obrigatórios em cópia (CC):</span>
                            </div>
                            <button
                              onClick={() => copyToClipboard('janaina.gomes@redemedical.com.br, hpm.recepcao@redemedical.com.br', 'all-cc')}
                              className="px-2 py-1 bg-amber-200/80 hover:bg-amber-300 text-amber-950 rounded text-[11px] font-bold flex items-center gap-1 transition-colors"
                              title="Copiar todos os e-mails de cópia"
                            >
                              {copiedText === 'all-cc' ? (
                                <Check className="w-3 h-3 text-emerald-700" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                              <span>Copiar CCs</span>
                            </button>
                          </div>

                          <div className="space-y-1.5 font-mono text-xs">
                            <div className="flex items-center justify-between bg-white/80 border border-amber-200/60 rounded-lg px-2.5 py-1.5">
                              <span className="text-slate-800 font-semibold truncate">janaina.gomes@redemedical.com.br</span>
                              <button
                                onClick={() => copyToClipboard('janaina.gomes@redemedical.com.br', 'cc-janaina')}
                                className="p-1 text-slate-400 hover:text-amber-800 transition-colors"
                                title="Copiar e-mail"
                              >
                                {copiedText === 'cc-janaina' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>

                            <div className="flex items-center justify-between bg-white/80 border border-amber-200/60 rounded-lg px-2.5 py-1.5">
                              <span className="text-slate-800 font-semibold truncate">hpm.recepcao@redemedical.com.br</span>
                              <button
                                onClick={() => copyToClipboard('hpm.recepcao@redemedical.com.br', 'cc-recepcao')}
                                className="p-1 text-slate-400 hover:text-amber-800 transition-colors"
                                title="Copiar e-mail"
                              >
                                {copiedText === 'cc-recepcao' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Contatos WhatsApp LissCare (Telefone 24h & Telefone Comercial) */}
                        <div className="space-y-2.5 pt-3 border-t border-slate-100">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                            Contatos LissCare (Plantão & WhatsApp)
                          </span>
                          
                          {/* Telefone 24h */}
                          <div className="bg-slate-50 hover:bg-slate-100/90 border border-slate-200/90 rounded-xl p-3 flex items-center justify-between gap-2.5 transition-all">
                            <div className="min-w-0">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                                Telefone 24h
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono">
                                (63) 99104-9287
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <a
                                href={`https://wa.me/5563991049287?text=${encodeURIComponent(`Olá, solicito informações de remoção pelo Hospital Palmas Medical - Convênio ${plano.nome}.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
                                title="Abrir no WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </a>
                              <button
                                onClick={() => copyToClipboard('(63) 99104-9287', 'liss-24h')}
                                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                                title="Copiar telefone 24h"
                              >
                                {copiedText === 'liss-24h' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>

                          {/* Telefone Comercial */}
                          <div className="bg-slate-50 hover:bg-slate-100/90 border border-slate-200/90 rounded-xl p-3 flex items-center justify-between gap-2.5 transition-all">
                            <div className="min-w-0">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                                Telefone Comercial
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono">
                                (63) 98447-9504
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <a
                                href={`https://wa.me/5563984479504?text=${encodeURIComponent(`Olá, contato comercial LissCare referente à remoção do Hospital Palmas Medical - Convênio ${plano.nome}.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
                                title="Abrir no WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </a>
                              <button
                                onClick={() => copyToClipboard('(63) 98447-9504', 'liss-comercial')}
                                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                                title="Copiar telefone comercial"
                              >
                                {copiedText === 'liss-comercial' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                          A <strong className="font-semibold text-slate-800">LISS CARE</strong> solicitará à <strong className="font-semibold text-slate-800">{plano.nome}</strong> a autorização para a remoção do paciente.
                        </p>
                      </div>

                      {plano.portalUrl && (
                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-slate-500">Portal oficial do convênio:</span>
                          <a 
                            href={plano.portalUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1.5"
                          >
                            <span>Acessar Portal</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Card 3: PONTO DE ATENÇÃO DO POP */}
                  {(plano.id === 'geap' || plano.id === 'servir' || plano.id === 'postalsaude') && (
                    <div className="bg-amber-50/40 border border-amber-200/90 rounded-2xl p-6 sm:p-7 shadow-2xs border-l-4 border-l-amber-500">
                      <div className="flex items-start gap-3.5">
                        <div className="p-2 rounded-xl bg-amber-100 text-amber-800 flex-shrink-0 mt-0.5">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div className="space-y-2 flex-1">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 block">
                            DIRETRIZES ESPECÍFICAS DO POP — {plano.nome}
                          </span>
                          {plano.id === 'servir' ? (
                            <div className="text-xs sm:text-sm text-slate-700 space-y-1.5 leading-relaxed">
                              <p>• <strong>E-mail de Remoção:</strong> <span className="font-mono font-bold text-slate-900">remocaoservir@impactomedica.com.br</span>.</p>
                              <p>• <strong>Formulário do SERVIR:</strong> Envio estritamente obrigatório do formulário padrão do convênio preenchido.</p>
                              <p>• <strong>Empresa citada no POP:</strong> LISS CARE.</p>
                              <p>• <strong>Autorização no Site:</strong> Quando a solicitação for feita à LISS CARE, deve-se solicitar a autorização no site oficial do SERVIR.</p>
                              <p>• <strong>Acompanhamento:</strong> Colocar a solicitação no grupo de WhatsApp da Central para acompanhar caso fique em análise.</p>
                              <p>• <strong>Códigos municipais (Palmas, Araguaína ou Gurupi):</strong> <span className="font-mono font-bold text-slate-900">60501002</span> (Com médico) ou <span className="font-mono font-bold text-slate-900">60501001</span> (Sem médico).</p>
                            </div>
                          ) : plano.id === 'postalsaude' ? (
                            <div className="text-xs sm:text-sm text-slate-700 space-y-1.5 leading-relaxed">
                              <p>• <strong>Pacote de Pronto-Socorro:</strong> Despesas com acompanhantes e REMOÇÃO são <strong>ITENS EXCLUÍDOS</strong> (não estão inclusas no pacote de PS).</p>
                              <p>• <strong>Novo e-mail oficial para remoção:</strong> <span className="font-mono font-bold text-slate-900">centralderemocao@postalsaude.com.br</span>.</p>
                              <p>• <strong>Canais de suporte do POP:</strong> Prestador Assuntos Gerais 24h: <strong>0800 888 8116</strong> | Faturamento Eletrônico: <strong>0800 888 9404</strong> (8h às 18h) | Tocantins: <strong>(63) 3213-4000</strong>.</p>
                              <p>• <strong>Fluxo:</strong> Encaminhar a solicitação de remoção para a Central de Remoção Postal Saúde com cópia para a empresa executora (LISS CARE).</p>
                            </div>
                          ) : (
                            <div>
                              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                                Hospital Santa Thereza
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-700 mt-1.5 leading-relaxed">
                                {plano.observacoesCriticas?.[0] || 'Caso a remoção seja do Hospital Palmas Medical para o Hospital Santa Thereza, justificar a insuficiência de leitos.'}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card 4: FLUXO OPERACIONAL (FORMATO VERTICAL NORMATIVO COM ESPAÇAMENTO ABNT) */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
                    <div className="flex items-start gap-3.5 mb-8 pb-4 border-b border-slate-100">
                      <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                          FLUXO OPERACIONAL
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                          Como solicitar (LISS CARE)
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-8 sm:space-y-10 max-w-3xl">
                      {stepsList.map((step, idx) => (
                        <div 
                          key={idx}
                          className="flex flex-col space-y-3"
                        >
                          <div className="text-xl sm:text-2xl font-bold text-slate-950 font-sans tracking-tight">
                            {idx + 1}
                          </div>
                          <div className="pl-0.5">
                            {renderFormattedStep(step)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* RENDERIZAÇÃO: PLANOS SEM EMPRESA HOMOLOGADA (A DEFINIR / EM BRANCO ATÉ DEFINIR A EMPRESA) */}
              {hasNoProvider && (
                <div className="space-y-6">
                  {/* Banner Top personalizado por Convênio */}
                  <div className={`border rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-2xs ${
                    plano.id === 'prosocial' ? 'bg-indigo-50/70 border-indigo-200/90 text-indigo-950' :
                    plano.id === 'marinha' ? 'bg-sky-50/70 border-sky-200/90 text-sky-950' :
                    plano.id === 'gama' ? 'bg-purple-50/70 border-purple-200/90 text-purple-950' :
                    plano.id === 'notredame' ? 'bg-amber-50/70 border-amber-200/90 text-amber-950' :
                    'bg-slate-100/90 border-slate-300/80 text-slate-800'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plano.id === 'prosocial' ? 'bg-indigo-100 text-indigo-700' :
                      plano.id === 'marinha' ? 'bg-sky-100 text-sky-700' :
                      plano.id === 'gama' ? 'bg-purple-100 text-purple-700' :
                      plano.id === 'notredame' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {plano.id === 'prosocial' ? <FileText className="w-5 h-5" /> :
                       plano.id === 'marinha' ? <Truck className="w-5 h-5" /> :
                       plano.id === 'gama' ? <Mail className="w-5 h-5" /> :
                       plano.id === 'notredame' ? <Phone className="w-5 h-5" /> :
                       <Building2 className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-extrabold text-base sm:text-lg">
                          {plano.id === 'prosocial' ? 'Regulação Pro-Social TRF1 — Portaria/PRESI/SECBE 187 de 23/05/14' :
                           plano.id === 'marinha' ? 'Solicitação de Ambulância — Tabela Própria (Página 4 do POP)' :
                           plano.id === 'gama' ? 'Canal Oficial de Remoção — GAMA SAÚDE' :
                           plano.id === 'notredame' ? 'Central para Transferência — NOTRE DAME / HAPVIDA' :
                           'Empresa de Remoção: A DEFINIR / NÃO HOMOLOGADA'}
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          plano.id === 'prosocial' ? 'bg-indigo-200 text-indigo-900' :
                          plano.id === 'marinha' ? 'bg-sky-200 text-sky-900' :
                          plano.id === 'gama' ? 'bg-purple-200 text-purple-900' :
                          plano.id === 'notredame' ? 'bg-amber-200 text-amber-900' :
                          'bg-slate-200 text-slate-700'
                        }`}>
                          {plano.id === 'prosocial' ? 'Portal Autorizador Exclusivo' :
                           plano.id === 'marinha' ? 'Valores Contratuais Fixos' :
                           plano.id === 'gama' ? 'Canal Específico POP' :
                           plano.id === 'notredame' ? 'Central de Regulação' :
                           'Aguardando Definição'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm mt-1.5 leading-relaxed opacity-90">
                        {plano.id === 'prosocial' ? (
                          <>Remoções terrestres regidas pela <strong>Portaria/PRESI/SECBE nº 187 de 23/05/2014</strong>. As autorizações devem ser solicitadas <strong>EXCLUSIVAMENTE pelo Portal Autorizador do Pro-Social</strong>. Atenção: Pedidos de autorização enviados por e-mail <strong>NÃO serão autorizados</strong>!</>
                        ) : plano.id === 'marinha' ? (
                          <>Classificação de viaturas com valores fixos contratuais constantes na <strong>Página 4 do POP</strong>: Tipo A (R$ 100,00), Tipo B (R$ 300,00), Tipo C (R$ 450,00), Tipo D (R$ 700,00) e KM rodado (R$ 4,20/km). O POP não traz código TUSS ou e-mail de remoção.</>
                        ) : plano.id === 'gama' ? (
                          <>Conforme o POP, o canal direto para remoção é o e-mail: <strong>remocao.gama@gamasaude.com.br</strong> e telefone geral <strong>(35) 3629-8000</strong>. O POP não estipula códigos de ambulância, valores ou tipo de viatura na seção de remoção.</>
                        ) : plano.id === 'notredame' ? (
                          <>O POP identifica expressamente o telefone <strong>(11) 3155-2355</strong> para <strong>TRANSFERÊNCIA</strong> e regulação de leitos de UTI. O arquivo não possui seção de remoção detalhando se contempla ambulância própria, terceirizada, tipos de suporte ou códigos.</>
                        ) : (
                          <>Este convênio ainda não possui empresa de remoção direta (<strong>CareMed</strong> ou <strong>LissCare</strong>) cadastrada para atendimento imediato. A remoção inter-hospitalar deve ser regulada caso a caso diretamente com o convênio <strong>{plano.nome}</strong> ou aguardar homologação da operadora.</>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Card Ponto de Atenção POP para Planos Específicos */}
                  {plano.observacoesCriticas && plano.observacoesCriticas.length > 0 && (
                    <div className="bg-amber-50/40 border border-amber-200/90 rounded-2xl p-6 shadow-2xs border-l-4 border-l-amber-500">
                      <div className="flex items-start gap-3.5">
                        <div className="p-2 rounded-xl bg-amber-100 text-amber-800 flex-shrink-0 mt-0.5">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div className="space-y-2 flex-1">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 block">
                            DIRETRIZES ESPECÍFICAS DO POP — {plano.nome}
                          </span>
                          <div className="text-xs sm:text-sm text-slate-700 space-y-1.5 leading-relaxed">
                            {plano.observacoesCriticas.map((obs, oIdx) => (
                              <p key={oIdx}>• {obs}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Informações de Acesso & Centrais */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    
                    {/* Logins & Acesso ao Portal */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-start gap-3.5 mb-4">
                          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                            <KeyRound className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                              ACESSO AO PORTAL
                            </span>
                            <h3 className="text-base font-bold text-slate-900 mt-0.5">
                              Credenciais do Convênio
                            </h3>
                          </div>
                        </div>

                        {plano.logins && plano.logins.length > 0 ? (
                          <div className="space-y-2.5">
                            {plano.logins.map((login, lIdx) => (
                              <div key={lIdx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
                                <div>
                                  <span className="text-slate-500 font-semibold block">{login.label}:</span>
                                  <span className="font-mono font-bold text-slate-900">{login.valor}</span>
                                </div>
                                <button
                                  onClick={() => copyToClipboard(login.valor, `login-${lIdx}`)}
                                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                                  title="Copiar"
                                >
                                  {copiedText === `login-${lIdx}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500 italic">
                            Nenhuma credencial específica cadastrada. Acessar diretamente pelo portal do prestador.
                          </p>
                        )}
                      </div>

                      {plano.portalUrl && (
                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="text-slate-500">Link oficial:</span>
                          <a
                            href={plano.portalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1.5"
                          >
                            <span>Acessar Portal do Convênio</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Telefones da Central do Convênio */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-start gap-3.5 mb-4">
                          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                            <Phone className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                              CENTRAIS DE ATENDIMENTO
                            </span>
                            <h3 className="text-base font-bold text-slate-900 mt-0.5">
                              Contatos da Operadora
                            </h3>
                          </div>
                        </div>

                        {plano.telefones && plano.telefones.length > 0 ? (
                          <div className="space-y-2">
                            {plano.telefones.map((tel, tIdx) => (
                              <div key={tIdx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
                                <span className="font-semibold text-slate-800">{tel}</span>
                                <button
                                  onClick={() => copyToClipboard(tel, `tel-${tIdx}`)}
                                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                                  title="Copiar telefone"
                                >
                                  {copiedText === `tel-${tIdx}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500 italic">
                            Consultar a central de atendimento do convênio {plano.nome}.
                          </p>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Códigos de Remoção TUSS / Tabela Própria */}
                  {plano.codigosRemocao && plano.codigosRemocao.length > 0 && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-2xs">
                      <div className="flex items-start gap-3.5 mb-4">
                        <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                          <Activity className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                            CÓDIGOS DE FATURAMENTO / GUIA TISS
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                            Códigos de Remoção do Convênio
                          </h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {plano.codigosRemocao.map((cod, cIdx) => (
                          <div key={cIdx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-extrabold text-sm text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                                  {cod.codigo}
                                </span>
                                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                                  {cod.tipo}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 mt-1.5 font-medium leading-snug">
                                {cod.descricao}
                              </p>
                              {cod.valorEstimado && (
                                <p className="text-[11px] text-teal-700 font-semibold mt-1">
                                  Valor: {cod.valorEstimado}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => copyToClipboard(cod.codigo, `cod-${cIdx}`)}
                              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors flex-shrink-0"
                              title="Copiar código"
                            >
                              {copiedText === `cod-${cIdx}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Checklist de Documentos Obrigatórios */}
                  {plano.checklistDocumentos && plano.checklistDocumentos.length > 0 && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-2xs">
                      <div className="flex items-start gap-3.5 mb-4">
                        <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                            DOCUMENTAÇÃO OBRIGATÓRIA
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                            Checklist de Documentos para Solicitação
                          </h3>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {plano.checklistDocumentos.map((doc, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">
                            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs flex-shrink-0 font-bold">
                              {dIdx + 1}
                            </span>
                            <span>{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fluxo Operacional Passo a Passo */}
                  {plano.fluxoPassoAPasso && plano.fluxoPassoAPasso.length > 0 && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-2xs">
                      <div className="flex items-start gap-3.5 mb-4">
                        <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                            FLUXO OPERACIONAL
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                            Passo a Passo de Regulação / Solicitação
                          </h3>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {plano.fluxoPassoAPasso.map((passo, pIdx) => (
                          <div key={pIdx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3.5">
                            <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-extrabold flex-shrink-0 mt-0.5">
                              {pIdx + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                                {passo}
                              </p>
                            </div>
                            <button
                              onClick={() => copyToClipboard(passo, `passo-${pIdx}`)}
                              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors flex-shrink-0"
                              title="Copiar passo"
                            >
                              {copiedText === `passo-${pIdx}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Regras e Normas */}
                  {plano.regrasAutorizacao && plano.regrasAutorizacao.length > 0 && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-2xs">
                      <div className="flex items-start gap-3.5 mb-4">
                        <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                          <ClipboardList className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                            NORMAS E REGRAS
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                            Regras Gerais de Atendimento
                          </h3>
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        {plano.regrasAutorizacao.map((regra, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 flex-shrink-0" />
                            <span className="leading-relaxed font-medium">{regra}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Observações Críticas */}
                  {plano.observacoesCriticas && plano.observacoesCriticas.length > 0 && (
                    <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs">
                      <div className="flex items-start gap-3.5 mb-3">
                        <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 block">
                            ATENÇÃO / OBSERVAÇÕES
                          </span>
                          <h4 className="text-sm font-bold text-amber-950 mt-0.5">
                            Pontos de Atenção Críticos
                          </h4>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {plano.observacoesCriticas.map((obs, oIdx) => (
                          <p key={oIdx} className="text-xs sm:text-sm text-amber-900 font-medium leading-relaxed pl-2 border-l-2 border-amber-400">
                            {obs}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

          {/* TAB 2: FICHA DE REMOÇÃO & WHATSAPP (INTEGRADA DENTRO DA MODAL DO PLANO / BRADESCO) */}
          {activeTab === 'ficha' && (
            <div className="space-y-4">
              <GeradorFichaRemocao 
                planos={planosRemocaoData} 
                initialPlanoId={plano.id} 
                embedded={true} 
              />
            </div>
          )}

          {/* TAB: EDITOR MASTER */}
          {activeTab === 'editor' && isMaster && (
            <div className="space-y-5 bg-white p-5 sm:p-6 rounded-2xl border border-emerald-300">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h4 className="text-sm font-extrabold text-emerald-900">Modo Editor Master Ativo</h4>
                  <p className="text-xs text-slate-500">Edite dados, e-mails, empresa e regras deste convênio.</p>
                </div>
                {editSuccess && (
                  <div className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5 animate-bounce">
                    <Check className="w-4 h-4" /> Alterações salvas com sucesso!
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status / Regra Resumida</label>
                  <input
                    type="text"
                    value={editDraft.statusTexto}
                    onChange={(e) => setEditDraft({ ...editDraft, statusTexto: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Empresa Credenciada Principal</label>
                  <input
                    type="text"
                    value={editDraft.empresaCredenciadaPrincipal}
                    onChange={(e) => setEditDraft({ ...editDraft, empresaCredenciadaPrincipal: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleResetToOriginal}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restaurar Dados Originais
                </button>

                <button
                  type="button"
                  onClick={handleSaveMasterEdits}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  Salvar Alterações no Sistema
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-medium">
            Protocolo Hospitalar de Remoção • Hospital Palmas Medical
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={() => onSimular(plano.id)}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center justify-center gap-1.5 shadow-xs transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Simular Remoção</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
