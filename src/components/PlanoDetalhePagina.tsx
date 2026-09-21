import React, { useState, useEffect } from 'react';
import { PlanoRemocao } from '../types/remocao';
import { useMaster } from '../context/MasterContext';
import { GeradorFichaRemocao } from './GeradorFichaRemocao';
import { 
  ArrowLeft,
  Copy, 
  Check, 
  ExternalLink, 
  Phone, 
  Mail, 
  AlertTriangle, 
  FileText, 
  Lock, 
  Truck, 
  CheckCircle2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Printer, 
  Sparkles,
  ClipboardList,
  Eye,
  EyeOff,
  MessageSquare,
  ShieldCheck,
  Building2,
  Clock,
  BookOpen,
  Ambulance,
  ChevronRight
} from 'lucide-react';

interface PlanoDetalhePaginaProps {
  plano: PlanoRemocao;
  onVoltar: () => void;
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

export const PlanoDetalhePagina: React.FC<PlanoDetalhePaginaProps> = ({
  plano,
  onVoltar,
  onSimular
}) => {
  const { isMaster, updatePlano, resetSinglePlano } = useMaster();
  
  const planId = plano.id.toLowerCase();
  const supportsCareMed = CARE_MED_PLANS.includes(planId);
  const supportsLissCare = LISS_CARE_PLANS.includes(planId);
  const supportsBoth = supportsCareMed && supportsLissCare;

  const [providerTab, setProviderTab] = useState<'caremed' | 'lisscare' | 'geral'>(() => {
    if (planId === 'servir') return 'lisscare';
    if (supportsCareMed) return 'caremed';
    if (supportsLissCare) return 'lisscare';
    return 'geral';
  });

  const [activeSubTab, setActiveSubTab] = useState<'detalhes' | 'ficha' | 'master'>('detalhes');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState<Record<number, boolean>>({});

  // Master editor draft
  const [editDraft, setEditDraft] = useState<PlanoRemocao>(() => JSON.parse(JSON.stringify(plano)));
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  useEffect(() => {
    setEditDraft(JSON.parse(JSON.stringify(plano)));
    setActiveSubTab('detalhes');
    if (planId === 'servir') setProviderTab('lisscare');
    else if (supportsCareMed) setProviderTab('caremed');
    else if (supportsLissCare) setProviderTab('lisscare');
    else setProviderTab('geral');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [plano, planId, supportsCareMed, supportsLissCare]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const togglePasswordMask = (index: number) => {
    setShowPasswords(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleSaveMaster = () => {
    updatePlano(editDraft);
    setSaveFeedback('Alterações salvas com sucesso!');
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  const handleResetToDefault = () => {
    if (window.confirm(`Deseja restaurar as informações padrão do convênio ${plano.nome}?`)) {
      resetSinglePlano(plano.id);
      setSaveFeedback('Restaurado para os dados de fábrica!');
      setTimeout(() => setSaveFeedback(null), 3000);
    }
  };

  // Determinar lista de passos operacionais de acordo com a empresa parceira selecionada
  const isCareMedActive = supportsCareMed && (providerTab === 'caremed' || !supportsLissCare);
  const isLissCareActive = supportsLissCare && (providerTab === 'lisscare' || !supportsCareMed);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* ---------------------------------------------------- */}
      {/* TOPO: BARRA DE NAVEGAÇÃO, TÍTULO DO PLANO E AÇÕES     */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white border border-slate-200 rounded-[22px] p-4 sm:px-6 sm:py-4 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-4 sm:gap-5">
        {/* Lado Esquerdo: Botão Voltar + Nome do Convênio */}
        <div className="flex items-center gap-4 sm:gap-5 flex-shrink-0">
          <button
            onClick={onVoltar}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#ECF7F6] hover:bg-[#d8eceb] text-[#167876] border border-[#CEE9E8] flex items-center justify-center text-center transition-all cursor-pointer shadow-2xs group flex-shrink-0"
            title="Voltar para a lista de convênios"
          >
            <ArrowLeft className="w-5 h-5 text-[#167876] group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <div className="flex flex-col justify-center flex-shrink-0">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#167876] whitespace-nowrap leading-none block select-none">
              REMOÇÕES / CONVÊNIO
            </span>
            <div className="flex items-center gap-2 mt-1.5">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase leading-none whitespace-nowrap">
                {plano.nome}
              </h1>
              {isMaster && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold inline-flex items-center gap-1 whitespace-nowrap">
                  <Edit3 className="w-3 h-3 flex-shrink-0" />
                  <span>Master</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Lado Direito: Botões de Ação exatamente como no modelo da imagem */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 flex-wrap sm:flex-nowrap">
          <button
            onClick={() => onSimular(plano.id)}
            className="h-11 px-4 sm:px-5 rounded-xl bg-[#167876] hover:bg-[#126260] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 shadow-xs transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
          >
            <Sparkles className="w-4 h-4 flex-shrink-0 text-white" />
            <span>Assistente de Remoção</span>
          </button>

          <button
            onClick={() => window.print()}
            className="h-11 px-4 sm:px-5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 shadow-2xs transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
          >
            <Printer className="w-4 h-4 text-slate-700 flex-shrink-0" />
            <span>Imprimir Informações</span>
          </button>

          <button
            onClick={onVoltar}
            className="h-11 px-4 sm:px-5 rounded-xl bg-[#F1F5F9] hover:bg-slate-200/80 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 shadow-2xs transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-slate-700 flex-shrink-0" />
            <span>Voltar aos Planos</span>
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* SELETORES DE AMBULÂNCIA / PROVEDOR HOMOLOGADO        */}
      {/* ---------------------------------------------------- */}
      {(supportsBoth || supportsCareMed || supportsLissCare || plano.id === 'bradesco' || isMaster) && (
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs flex items-center gap-3 overflow-x-auto">
          {supportsBoth && (
            <>
              <button
                onClick={() => {
                  setProviderTab('caremed');
                  setActiveSubTab('detalhes');
                }}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeSubTab === 'detalhes' && providerTab === 'caremed'
                    ? 'bg-[#9E1B4F] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Remoção CareMed</span>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Maior Parceria
                </span>
              </button>

              <button
                onClick={() => {
                  setProviderTab('lisscare');
                  setActiveSubTab('detalhes');
                }}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeSubTab === 'detalhes' && providerTab === 'lisscare'
                    ? 'bg-[#1D787A] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Remoção LissCare</span>
              </button>
            </>
          )}

          {supportsCareMed && !supportsLissCare && (
            <button
              onClick={() => {
                setProviderTab('caremed');
                setActiveSubTab('detalhes');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeSubTab === 'detalhes'
                  ? 'bg-[#9E1B4F] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Remoção CareMed</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                Maior Parceria
              </span>
            </button>
          )}

          {!supportsCareMed && supportsLissCare && (
            <button
              onClick={() => {
                setProviderTab('lisscare');
                setActiveSubTab('detalhes');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeSubTab === 'detalhes'
                  ? 'bg-[#1D787A] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Remoção LissCare</span>
            </button>
          )}

          {plano.id === 'servir' && (
            <button
              onClick={() => setActiveSubTab('ficha')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeSubTab === 'ficha'
                  ? 'bg-[#1D787A] text-white shadow-xs'
                  : 'bg-teal-50 hover:bg-teal-100 text-[#1D787A] border border-teal-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Gerar Ficha Oficial SERVIR (TO)</span>
            </button>
          )}

          {plano.id === 'bradesco' && (
            <button
              onClick={() => setActiveSubTab('ficha')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeSubTab === 'ficha'
                  ? 'bg-[#1D787A] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Gerar Ficha de Remoção Bradesco</span>
            </button>
          )}

          {isMaster && (
            <button
              onClick={() => setActiveSubTab(activeSubTab === 'master' ? 'detalhes' : 'master')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ml-auto ${
                activeSubTab === 'master'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>{activeSubTab === 'master' ? 'Ver Dados do Convênio' : 'Editor Master'}</span>
            </button>
          )}
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* ABA: GERADOR DE FICHA DE TRANSPORTE                  */}
      {/* ---------------------------------------------------- */}
      {activeSubTab === 'ficha' && (plano.id === 'bradesco' || plano.id === 'servir') && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <GeradorFichaRemocao planos={[plano]} initialPlanoId={plano.id} />
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* ABA: EDIÇÃO MASTER                                   */}
      {/* ---------------------------------------------------- */}
      {activeSubTab === 'master' && isMaster && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          <div className="flex items-center justify-between pb-6 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Editar Informações do Convênio — {plano.nome}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Modifique os dados operacionais, regras e telefones.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleResetToDefault}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restaurar Padrão</span>
              </button>
              <button
                onClick={handleSaveMaster}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Alterações</span>
              </button>
            </div>
          </div>

          {saveFeedback && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{saveFeedback}</span>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Status / Resumo Geral
              </label>
              <textarea
                value={editDraft.statusTexto}
                onChange={(e) => setEditDraft({ ...editDraft, statusTexto: e.target.value })}
                rows={3}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#1D787A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Empresa Credenciada Principal
              </label>
              <input
                type="text"
                value={editDraft.empresaCredenciadaPrincipal}
                onChange={(e) => setEditDraft({ ...editDraft, empresaCredenciadaPrincipal: e.target.value })}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#1D787A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Link do Portal
              </label>
              <input
                type="text"
                value={editDraft.portalUrl || ''}
                onChange={(e) => setEditDraft({ ...editDraft, portalUrl: e.target.value })}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#1D787A] focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* VISUALIZAÇÃO PRINCIPAL: ESPAÇOSA, VERTICAL E CLARA   */}
      {/* ---------------------------------------------------- */}
      {activeSubTab === 'detalhes' && (
        <div className="space-y-10">

          {/* 1. SEÇÃO: STATUS & DIRETRIZ OPERACIONAL */}
          <section className="bg-white border border-slate-200 rounded-[28px] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#ECF7F6] text-[#167876] border border-[#CEE9E8]/80 flex items-center justify-center flex-shrink-0 shadow-2xs">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Status & Diretriz Operacional
                </h2>
                <p className="text-sm sm:text-base text-slate-500 font-normal mt-0.5">
                  Regras gerais e regulação para o transporte de pacientes
                </p>
              </div>
            </div>

            <div className="bg-[#F2FAF9] border border-[#CEE9E8] border-l-[5px] border-l-[#167876] rounded-2xl p-6 sm:p-7 space-y-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#E0F2F1] text-[#167876] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#167876]">
                  DIRETRIZ DE REGULAÇÃO
                </span>
              </div>
              <p className="text-base sm:text-lg font-bold leading-relaxed text-slate-900">
                {isCareMedActive && (
                  plano.id === 'geap'
                    ? 'A remoção dentro do município deve ser solicitada à empresa CARE MED SOLUTIONS. A CARE MED é quem solicitará a autorização ao plano GEAP.'
                    : 'A remoção dentro do município deve ser solicitada preferencialmente à empresa CARE MED SOLUTIONS (Maior Parceria HPM). A CARE MED solicitará a autorização ao plano.'
                )}
                {isLissCareActive && (
                  plano.id === 'servir'
                    ? 'A remoção dentro do município deve ser solicitada com o Formulário do SERVIR e autorização no site oficial. Empresa citada no POP: LISS CARE. Acompanhar pelo grupo de WhatsApp da Central caso fique em análise.'
                    : plano.id === 'postalsaude'
                    ? 'No pacote de pronto-socorro da Postal Saúde, as despesas com acompanhantes e REMOÇÃO são ITENS EXCLUÍDOS. Solicitações de remoção devem ser enviadas para centralderemocao@postalsaude.com.br.'
                    : `A remoção dentro do município deve ser solicitada à empresa LISS CARE. A LISS CARE solicitará a autorização junto ao convênio ${plano.nome}.`
                )}
                {!isCareMedActive && !isLissCareActive && plano.statusTexto}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span>Empresa Referência: <strong className="font-bold text-slate-900">{isCareMedActive ? 'CARE MED SOLUTIONS' : isLissCareActive ? 'LISS CARE' : plano.empresaCredenciadaPrincipal}</strong></span>
                </div>
                <div className="h-4 w-px bg-slate-300 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span>Prazo de Resposta: <strong className="font-bold text-slate-900">{plano.prazoResposta}</strong></span>
                </div>
              </div>
            </div>

            {/* Suporte de Ambulâncias */}
            <div className="pt-1">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2.5">
                TIPOS DE AMBULÂNCIA COBERTOS / HOMOLOGADOS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                {plano.tipoAmbulanciaSuportada.map((tipo, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between gap-2.5 shadow-2xs transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#ECF7F6] text-[#167876] border border-[#CEE9E8]/70 flex items-center justify-center flex-shrink-0">
                        <Ambulance className="w-4 h-4 text-[#167876]" />
                      </div>
                      <span className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight">
                        {tipo === 'basica' && 'Ambulância Simples / Básica (Tipo B)'}
                        {tipo === 'uti_adulto' && 'UTI Móvel Adulto (Tipo D)'}
                        {tipo === 'uti_neo_ped' && 'UTI Neonatal / Pediátrica'}
                        {tipo === 'aerea' && 'Aeromédico / UTI Aérea'}
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* 2. SEÇÃO: DOCUMENTOS OBRIGATÓRIOS */}
          <section className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <div className="w-11 h-11 rounded-2xl bg-rose-50 text-[#9E1B4F] flex items-center justify-center flex-shrink-0 shadow-2xs">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Documentos Obrigatórios para a Solicitação
                </h2>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  Reúna toda a documentação necessária antes de enviar a solicitação
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(isCareMedActive ? (
                plano.id === 'geap' ? [
                  'Pedido Médico circunstanciado com carimbo e CRM',
                  `Cópia da carteira do plano ${plano.nome}`,
                  'Cópia do documento oficial com foto do paciente',
                  'Justificativa de insuficiência de leitos (se transferência do HPM para Santa Thereza)'
                ] : [
                  'Pedido Médico circunstanciado com carimbo e CRM',
                  `Cópia da carteira do plano ${plano.nome}`,
                  'Cópia do documento oficial com foto do paciente'
                ]
              ) : plano.checklistDocumentos).map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-2xl p-5 flex items-start gap-4 transition-colors"
                >
                  <span className="w-8 h-8 rounded-xl bg-[#9E1B4F] text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {doc.replace(/^\d+[\.\)\-]\s*/, '')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>


          {/* 3. SEÇÃO: CANAIS DE ATENDIMENTO, E-MAILS & TELEFONES */}
          <section className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs space-y-8">
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <div className="w-11 h-11 rounded-2xl bg-[#EBF5F5] text-[#1D787A] flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Canais de Atendimento, E-mails & Telefones
                </h2>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  Contatos diretos da empresa reguladora e e-mails obrigatórios em cópia
                </p>
              </div>
            </div>

            {/* Banner Especial CareMed / LissCare */}
            {isCareMedActive && (
              <div className="bg-rose-50/80 border border-rose-200/90 rounded-2xl p-6 text-slate-800 space-y-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#9E1B4F] text-white flex items-center justify-center">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-slate-900">
                        CARE MED SOLUTIONS 🚑🚨
                      </h4>
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                        Maior Parceria HPM
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/556333221423?text=${encodeURIComponent(`Olá, solicito remoção de paciente pelo Hospital Palmas Medical - Convênio ${plano.nome}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp CareMed (63) 3322-1423</span>
                    </a>
                  </div>
                </div>

                <div className="bg-white/90 border border-rose-200 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="w-5 h-5 text-[#9E1B4F] flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">E-mail Principal para Solicitação</span>
                      <span className="text-sm sm:text-base font-black text-slate-900 font-mono truncate">remocaocaremed@gmail.com</span>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('remocaocaremed@gmail.com', 'caremed-main-email')}
                    className="p-2 bg-rose-50 hover:bg-rose-100 text-[#9E1B4F] rounded-lg transition-colors cursor-pointer"
                    title="Copiar"
                  >
                    {copiedText === 'caremed-main-email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {isLissCareActive && (
              <div className="bg-teal-50/80 border border-teal-200/90 rounded-2xl p-6 text-slate-800 space-y-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1D787A] text-white flex items-center justify-center">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-slate-900">
                        LISS CARE REMOÇÕES MÉDICAS 🚑
                      </h4>
                      <span className="text-xs text-slate-500 font-semibold">Empresa Homologada para Transporte</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/5563991049287?text=${encodeURIComponent(`Olá, solicito informações de remoção pelo Hospital Palmas Medical - Convênio ${plano.nome}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp LissCare (63) 99104-9287</span>
                    </a>
                  </div>
                </div>

                <div className="bg-white/90 border border-teal-200 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="w-5 h-5 text-[#1D787A] flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">E-mail Operacional Liss Care</span>
                      <span className="text-sm sm:text-base font-black text-slate-900 font-mono truncate">lisscareremocao@gmail.com</span>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('lisscareremocao@gmail.com', 'liss-main-email')}
                    className="p-2 bg-teal-50 hover:bg-teal-100 text-[#1D787A] rounded-lg transition-colors cursor-pointer"
                    title="Copiar"
                  >
                    {copiedText === 'liss-main-email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* E-mails Obrigatórios em Cópia (CC) */}
            <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-amber-950 font-black text-sm">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>E-mails Obrigatórios em Cópia (CC) no HPM:</span>
                </div>
                <button
                  onClick={() => copyToClipboard('janaina.gomes@redemedical.com.br, hpm.recepcao@redemedical.com.br', 'all-cc')}
                  className="px-3 py-1.5 bg-amber-200 hover:bg-amber-300 text-amber-950 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedText === 'all-cc' ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copiar Todos os CCs</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-white border border-amber-200/80 rounded-xl p-3 flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-slate-800 truncate">janaina.gomes@redemedical.com.br</span>
                  <button
                    onClick={() => copyToClipboard('janaina.gomes@redemedical.com.br', 'cc-janaina')}
                    className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
                    title="Copiar"
                  >
                    {copiedText === 'cc-janaina' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="bg-white border border-amber-200/80 rounded-xl p-3 flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-slate-800 truncate">hpm.recepcao@redemedical.com.br</span>
                  <button
                    onClick={() => copyToClipboard('hpm.recepcao@redemedical.com.br', 'cc-recepcao')}
                    className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
                    title="Copiar"
                  >
                    {copiedText === 'cc-recepcao' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Outros E-mails cadastrados do convênio */}
            {plano.emails && plano.emails.length > 0 && (
              <div className="space-y-4 pt-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                  Outros E-mails do Convênio
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plano.emails.map((email, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 hover:bg-slate-100/90 border border-slate-200 rounded-2xl p-5 flex items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">
                            E-mail de Operação {idx + 1}
                          </span>
                          <p className="text-sm sm:text-base font-black text-slate-900 font-mono truncate">
                            {email}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => copyToClipboard(email, `email-${idx}`)}
                        className="p-2.5 rounded-xl bg-white hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex-shrink-0"
                        title="Copiar e-mail"
                      >
                        {copiedText === `email-${idx}` ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Telefones do Convênio */}
            {plano.telefones && plano.telefones.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                  Telefones e Centrais Telefônicas
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {plano.telefones.map((tel, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 hover:bg-slate-100/90 border border-slate-200 rounded-2xl p-5 flex items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-black text-slate-900 leading-snug">
                            {tel}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => copyToClipboard(tel, `tel-${idx}`)}
                        className="p-2.5 rounded-xl bg-white hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex-shrink-0"
                        title="Copiar telefone"
                      >
                        {copiedText === `tel-${idx}` ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Portal do Convênio */}
            {plano.portalUrl && (
              <div className="pt-4 border-t border-slate-100">
                <div className="bg-[#EBF5F5]/60 border border-[#A9D2D1] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#1D787A] text-white flex items-center justify-center">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        Portal Oficial do Prestador / Convênio
                      </h4>
                      <p className="text-xs text-slate-600">
                        Acesse para emissão de guias TISS, conferência de token e autorização online.
                      </p>
                    </div>
                  </div>

                  <a
                    href={plano.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-[#1D787A] hover:bg-[#165B5D] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all whitespace-nowrap self-start sm:self-center"
                  >
                    <span>Acessar Portal Agora</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </section>


          {/* 4. SEÇÃO: CREDENCIAIS DE ACESSO & LOGINS INSTITUCIONAIS */}
          {plano.logins && plano.logins.length > 0 && (
            <section className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Credenciais de Acesso & Logins Institucionais
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Utilize para entrar no portal de autorizações do convênio
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {plano.logins.map((cred, idx) => {
                  const isMasked = cred.mask && !showPasswords[idx];
                  return (
                    <div
                      key={idx}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2 flex flex-col justify-between"
                    >
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        {cred.label}
                      </span>
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <span className="text-sm sm:text-base font-black text-slate-900 font-mono select-all truncate">
                          {isMasked ? '••••••••••••' : cred.valor}
                        </span>

                        <div className="flex items-center gap-1">
                          {cred.mask && (
                            <button
                              type="button"
                              onClick={() => togglePasswordMask(idx)}
                              className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
                              title={showPasswords[idx] ? 'Ocultar' : 'Exibir'}
                            >
                              {showPasswords[idx] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => copyToClipboard(cred.valor, `cred-${idx}`)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
                            title="Copiar"
                          >
                            {copiedText === `cred-${idx}` ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}


          {/* 5. SEÇÃO: CÓDIGOS TUSS / TABELA DE REMOÇÃO */}
          {plano.codigosRemocao && plano.codigosRemocao.length > 0 && (
            <section className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <div className="w-11 h-11 rounded-2xl bg-[#EBF5F5] text-[#1D787A] flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Códigos TUSS & Procedimentos de Remoção
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Insira estes códigos na guia de solicitação SP/SADT
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {plano.codigosRemocao.map((cod, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors"
                  >
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-base sm:text-lg font-black text-[#1D787A] bg-white border border-[#A9D2D1] px-3 py-1 rounded-xl">
                          {cod.codigo}
                        </span>
                        <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-slate-200/80 text-slate-700">
                          {cod.tipo === 'uti' && 'UTI Móvel / Com Médico'}
                          {cod.tipo === 'basica' && 'Básica / Sem Médico'}
                          {cod.tipo === 'km' && 'Quilômetro Rodado (Intermunicipal)'}
                          {cod.tipo === 'aerea' && 'UTI Aérea'}
                          {cod.tipo === 'outro' && 'Procedimento Base / Outro'}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base font-bold text-slate-900 pt-1">
                        {cod.descricao}
                      </p>
                      {cod.observacao && (
                        <p className="text-xs text-slate-500 font-medium">
                          Observação: {cod.observacao}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => copyToClipboard(cod.codigo, `cod-${idx}`)}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2 self-start md:self-center transition-colors cursor-pointer"
                    >
                      {copiedText === `cod-${idx}` ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700">Código Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copiar Código</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}


          {/* 6. SEÇÃO: FLUXO PASSO A PASSO DA SOLICITAÇÃO */}
          <section className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 shadow-2xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Fluxo Passo a Passo da Solicitação
                </h2>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  Siga ordenadamente as etapas para assegurar agilidade no transporte
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {(isCareMedActive ? [
                `Reunir os documentos obrigatórios: Pedido Médico, Cópia da carteira do plano ${plano.nome} e cópia do documento oficial com foto.`,
                plano.id === 'geap' ? `Caso a remoção seja do Hospital Palmas Medical para o Hospital Santa Thereza, anexar justificativa médica circunstanciada de insuficiência de leitos.` : null,
                `Enviar e-mail para a EMPRESA CARE MED SOLUTIONS no endereço remocaocaremed@gmail.com (ou acionar WhatsApp 63 3322-1423) solicitando a remoção com os documentos em anexo.`,
                `Colocar SEMPRE em cópia obrigatória (CC): janaina.gomes@redemedical.com.br e hpm.recepcao@redemedical.com.br.`,
                `A CARE MED SOLUTIONS solicitará a autorização para remoção diretamente junto ao plano ${plano.nome}.`,
                `Acompanhar a liberação da guia e direcionamento da ambulância até a chegada no Hospital Palmas Medical.`
              ].filter(Boolean) as string[] : plano.fluxoPassoAPasso).map((passo, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-start gap-4"
                >
                  <span className="w-8 h-8 rounded-xl bg-[#1D787A] text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed min-w-0 flex-1">
                    {passo.replace(/^\d+[\.\)\-]\s*/, '')}
                  </div>
                </div>
              ))}
            </div>
          </section>


          {/* 7. SEÇÃO: REGRAS E DIRETRIZES DE AUTORIZAÇÃO */}
          {plano.regrasAutorizacao && plano.regrasAutorizacao.length > 0 && (
            <section className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Regras de Autorização do Convênio
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Critérios e exigências para emissão de guias e validação
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {plano.regrasAutorizacao.map((regra, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-start gap-3.5"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                    <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
                      {regra}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}


          {/* 8. SEÇÃO: PONTOS CRÍTICOS & ATENÇÃO */}
          {((plano.observacoesCriticas && plano.observacoesCriticas.length > 0) || (plano.id === 'geap')) && (
            <section className="bg-amber-50/50 border border-amber-200/80 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
              <div className="flex items-center gap-3.5 pb-4 border-b border-amber-200/60">
                <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-amber-950 tracking-tight">
                    Pontos Críticos & Observações Obrigatórias
                  </h2>
                  <p className="text-xs text-amber-800/80 mt-0.5 font-medium">
                    Avisos operacionais indispensáveis para evitar glosas ou cancelamentos
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {plano.id === 'geap' && (
                  <div className="bg-white/90 border border-amber-300 rounded-2xl p-5 flex items-start gap-3.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                    <p className="text-sm sm:text-base font-bold text-amber-950 leading-relaxed">
                      <strong>Transferência para o Hospital Santa Thereza:</strong> Caso a remoção seja do Hospital Palmas Medical para o Hospital Santa Thereza, é obrigatório anexar no pedido a justificativa de insuficiência de leitos.
                    </p>
                  </div>
                )}
                {plano.observacoesCriticas.map((obs, idx) => (
                  <div
                    key={idx}
                    className="bg-white/90 border border-amber-200 rounded-2xl p-5 flex items-start gap-3.5"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                    <p className="text-sm sm:text-base font-bold text-amber-950 leading-relaxed">
                      {obs}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      )}

      {/* Botão de retorno inferior */}
      <div className="pt-4 flex items-center justify-center">
        <button
          onClick={onVoltar}
          className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-sm font-bold flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar à Lista de Convênios</span>
        </button>
      </div>

    </div>
  );
};
