import React, { useState, useMemo } from 'react';
import { PlanoRemocao } from '../types/remocao';
import { CabecalhoOficialServir, LogoGovernoTocantins, LogoServir, BrasaoTocantinsVector, EmblemaServirVector } from './ServirLogos';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  Printer, 
  Download,
  FileText, 
  RotateCcw, 
  Sparkles,
  Building2, 
  User, 
  Check, 
  Copy, 
  MessageSquare,
  FileCheck2,
  Calendar,
  Clock,
  ShieldCheck,
  AlertCircle,
  Loader2
} from 'lucide-react';

export interface FormularioRemocaoState {
  modelo: 'servir' | 'padrao';
  beneficiarioNome: string;
  matricula: string;
  plano: string;
  idade: string;
  peso: string;
  sexo: 'M' | 'F' | '';
  localOrigem: string;
  enderecoOrigem: string;
  nomeContatoOrigem: string;
  telefoneOrigem: string;
  unidadeAtendimento: 'ps_pa' | 'uti' | 'internado' | '';
  numeroAcomodacao: string;
  profissionalSolicitante: string;
  crmSolicitante: string;
  telefoneSolicitante: string;
  tipoRemocao: 'hospital_hospital' | 'hospital_sadt' | 'hospital_residencia' | '';
  tipoTrajeto: 'somente_ida' | 'ida_e_volta' | '';
  localDestino: string;
  profissionalAdmissao: string;
  telefoneAdmissao: string;
  dataRemocao: string;
  horarioChegadaOrigem: string;
  horarioChegadaDestino: string;
  homeCareInternacao: boolean | null;
  homeCareAtendimentoPontual: boolean | null;
  homeCareQualAtendimento: string;
  acompanhamentoEnfermeiro: '6' | '12' | '24' | '';
  empresaHomeCare: string;
  condClinicaClinico: boolean;
  condClinicaCirurgico: boolean;
  condClinicaConsciente: boolean;
  acidenteAutomovel: boolean;
  acidenteQueda: boolean;
  acidenteConvulsao: boolean;
  acidenteArmaFogo: boolean;
  acidenteArmaBranca: boolean;
  localFerimento: string;
  utilizandoOxigenio: boolean | null;
  possuiConcentradorAlta: boolean | null;
  locomoverAjudaTerceiros: boolean | null;
  estaAcamado: boolean | null;
  locomoverCadeiraRodas: boolean | null;
  andarBengala: boolean | null;
  andarAndador: boolean | null;
  limitacaoFisica: string;
  controleTronco: boolean | null;
  indicacaoPosicaoDeitada: boolean | null;
  justificativaPosicaoDeitada: string;
  ambulanciaTipo: 'simples' | 'simples_oxigenio' | 'uti_completa' | '';
  quadroClinicoJustificativa: string;
  dataAssinatura: string;
  medicoAssinatura: string;
  crmAssinatura: string;
  acompanhanteAssinatura: string;
}

interface GeradorFichaRemocaoProps {
  planos?: PlanoRemocao[];
  initialPlanoId?: string;
  embedded?: boolean;
}

export const GeradorFichaRemocao: React.FC<GeradorFichaRemocaoProps> = ({ 
  planos = [], 
  initialPlanoId = 'servir',
  embedded = false
}) => {
  const getInitialState = (): FormularioRemocaoState => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    const defaultModel = initialPlanoId === 'servir' ? 'servir' : 'padrao';
    const defaultPlanoName = initialPlanoId === 'servir' ? 'SERVIR' : (initialPlanoId ? initialPlanoId.toUpperCase() : 'SERVIR');

    return {
      modelo: defaultModel,
      beneficiarioNome: '',
      matricula: '',
      plano: defaultPlanoName,
      idade: '',
      peso: '',
      sexo: '',
      localOrigem: 'Hospital Palmas Medical (HPM)',
      enderecoOrigem: '102 Sul, ACSU-SE 10, Palmas - TO',
      nomeContatoOrigem: 'Recepção / Enfermagem HPM',
      telefoneOrigem: '(63) 3215-8000',
      unidadeAtendimento: 'ps_pa',
      numeroAcomodacao: '',
      profissionalSolicitante: '',
      crmSolicitante: '',
      telefoneSolicitante: '',
      tipoRemocao: 'hospital_hospital',
      tipoTrajeto: 'somente_ida',
      localDestino: '',
      profissionalAdmissao: '',
      telefoneAdmissao: '',
      dataRemocao: formattedDate,
      horarioChegadaOrigem: '',
      horarioChegadaDestino: '',
      homeCareInternacao: false,
      homeCareAtendimentoPontual: false,
      homeCareQualAtendimento: '',
      acompanhamentoEnfermeiro: '',
      empresaHomeCare: '',
      condClinicaClinico: true,
      condClinicaCirurgico: false,
      condClinicaConsciente: true,
      acidenteAutomovel: false,
      acidenteQueda: false,
      acidenteConvulsao: false,
      acidenteArmaFogo: false,
      acidenteArmaBranca: false,
      localFerimento: '',
      utilizandoOxigenio: false,
      possuiConcentradorAlta: false,
      locomoverAjudaTerceiros: false,
      estaAcamado: false,
      locomoverCadeiraRodas: false,
      andarBengala: false,
      andarAndador: false,
      limitacaoFisica: 'Nenhuma',
      controleTronco: true,
      indicacaoPosicaoDeitada: false,
      justificativaPosicaoDeitada: '',
      ambulanciaTipo: 'simples',
      quadroClinicoJustificativa: '',
      dataAssinatura: formattedDate,
      medicoAssinatura: '',
      crmAssinatura: '',
      acompanhanteAssinatura: ''
    };
  };

  const [form, setForm] = useState<FormularioRemocaoState>(getInitialState);
  const [activeTab, setActiveTab] = useState<'formulario' | 'visualizacao'>('formulario');
  const [copied, setCopied] = useState(false);

  // Pre-load Servir Example
  const handleLoadServirPreset = () => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    
    setForm({
      modelo: 'servir',
      beneficiarioNome: 'Maria de Fátima Alves dos Santos',
      matricula: '984512-0',
      plano: 'SERVIR',
      idade: '58',
      peso: '64 kg',
      sexo: 'F',
      localOrigem: 'Hospital Palmas Medical (PS HPM)',
      enderecoOrigem: '102 Sul, Conjunto 01, Lote 08, Palmas - TO',
      nomeContatoOrigem: 'Enf. Responsável Pronto-Socorro',
      telefoneOrigem: '(63) 3215-8000',
      unidadeAtendimento: 'ps_pa',
      numeroAcomodacao: 'Box 04 - Observação',
      profissionalSolicitante: 'Dr. Carlos Eduardo Pinheiro',
      crmSolicitante: '3421-TO',
      telefoneSolicitante: '(63) 98411-2233',
      tipoRemocao: 'hospital_hospital',
      tipoTrajeto: 'somente_ida',
      localDestino: 'Hospital Geral de Palmas (HGP) - Enfermaria',
      profissionalAdmissao: 'Médico Regulador / Plantonista HGP',
      telefoneAdmissao: '(63) 3218-7800',
      dataRemocao: formattedDate,
      horarioChegadaOrigem: '14:30',
      horarioChegadaDestino: '15:15',
      homeCareInternacao: false,
      homeCareAtendimentoPontual: false,
      homeCareQualAtendimento: '',
      acompanhamentoEnfermeiro: '',
      empresaHomeCare: '',
      condClinicaClinico: true,
      condClinicaCirurgico: false,
      condClinicaConsciente: true,
      acidenteAutomovel: false,
      acidenteQueda: true,
      acidenteConvulsao: false,
      acidenteArmaFogo: false,
      acidenteArmaBranca: false,
      localFerimento: 'FÊMUR ESQUERDO',
      utilizandoOxigenio: false,
      possuiConcentradorAlta: false,
      locomoverAjudaTerceiros: true,
      estaAcamado: true,
      locomoverCadeiraRodas: false,
      andarBengala: false,
      andarAndador: false,
      limitacaoFisica: 'Dor intensa e impotência funcional em membro inferior esquerdo devido a fratura de fêmur.',
      controleTronco: true,
      indicacaoPosicaoDeitada: true,
      justificativaPosicaoDeitada: 'Fratura de fêmur esquerdo imobilizada em tala aguardando intervenção cirúrgica; impossibilidade de permanência sentada.',
      ambulanciaTipo: 'simples',
      quadroClinicoJustificativa: 'Paciente vítima de queda da própria altura com dor aguda e fratura fechada de fêmur esquerdo. Consciente, orientada, hemodinamicamente estável (PA: 125/80 mmHg, FC: 78 bpm, SpO2: 97% em ar ambiente). Necessita de remoção em ambulância com maca e equipe de apoio para transferência segura e continuidade da assistência cirúrgica ortopédica.',
      dataAssinatura: formattedDate,
      medicoAssinatura: 'Dr. Carlos Eduardo Pinheiro',
      crmAssinatura: '3421-TO',
      acompanhanteAssinatura: 'João Paulo Alves dos Santos (Filho)'
    });
  };

  const handleReset = () => {
    setForm(getInitialState());
  };

  const [isPrinting, setIsPrinting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Download direto do arquivo PDF com alta fidelidade (A4 2 Páginas)
  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    // Garantir que a aba de visualização esteja ativa para renderização no DOM
    setActiveTab('visualizacao');

    setTimeout(async () => {
      try {
        const page1Elem = document.getElementById('ficha-remocao-pagina-1');
        const page2Elem = document.getElementById('ficha-remocao-pagina-2');

        if (!page1Elem || !page2Elem) {
          window.print();
          setIsDownloading(false);
          return;
        }

        const canvasOptions = {
          scale: 2, // 2x para nitidez e clareza de impressão
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
        };

        const canvas1 = await html2canvas(page1Elem, canvasOptions);
        const canvas2 = await html2canvas(page2Elem, canvasOptions);

        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true,
        });

        const pdfWidth = 210;
        const pdfHeight = 297;
        const margin = 8;
        const contentWidth = pdfWidth - margin * 2;

        // Página 1
        const imgData1 = canvas1.toDataURL('image/jpeg', 0.95);
        const imgHeight1 = (canvas1.height * contentWidth) / canvas1.width;
        const finalHeight1 = Math.min(imgHeight1, pdfHeight - margin * 2);
        pdf.addImage(imgData1, 'JPEG', margin, margin, contentWidth, finalHeight1);

        // Página 2
        pdf.addPage();
        const imgData2 = canvas2.toDataURL('image/jpeg', 0.95);
        const imgHeight2 = (canvas2.height * contentWidth) / canvas2.width;
        const finalHeight2 = Math.min(imgHeight2, pdfHeight - margin * 2);
        pdf.addImage(imgData2, 'JPEG', margin, margin, contentWidth, finalHeight2);

        // Nome do Arquivo
        const pacienteSanitizado = form.beneficiarioNome
          ? form.beneficiarioNome.trim().replace(/[^a-zA-Z0-9À-ÿ_-]/g, '_')
          : 'Paciente';
        const modelTag = form.modelo === 'servir' ? 'SERVIR_TO' : 'Padrao_Hospitalar';
        const filename = `Ficha_Remocao_${modelTag}_${pacienteSanitizado}.pdf`;

        // Executar download direto no navegador
        pdf.save(filename);
      } catch (err) {
        console.error('Erro ao gerar PDF para download:', err);
        window.print();
      } finally {
        setIsDownloading(false);
      }
    }, 300);
  };

  const handlePrint = () => {
    // Switch to visual formatted view so the user can also preview the document
    setActiveTab('visualizacao');
    setIsPrinting(true);

    setTimeout(() => {
      try {
        const docElem = document.getElementById('ficha-remocao-document-root');
        if (!docElem) {
          window.print();
          setIsPrinting(false);
          return;
        }

        // Create or reuse hidden printing iframe
        let printIframe = document.getElementById('print-service-iframe') as HTMLIFrameElement | null;
        if (!printIframe) {
          printIframe = document.createElement('iframe');
          printIframe.id = 'print-service-iframe';
          printIframe.style.position = 'fixed';
          printIframe.style.right = '0';
          printIframe.style.bottom = '0';
          printIframe.style.width = '0';
          printIframe.style.height = '0';
          printIframe.style.border = '0';
          printIframe.style.visibility = 'hidden';
          document.body.appendChild(printIframe);
        }

        const iframeDoc = printIframe.contentWindow?.document || printIframe.contentDocument;
        if (!iframeDoc) {
          window.print();
          setIsPrinting(false);
          return;
        }

        // Collect stylesheets
        const styleElements = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
          .map(el => el.outerHTML)
          .join('\n');

        const docTitle = form.modelo === 'servir' 
          ? `Ficha_Remocao_SERVIR_${form.beneficiarioNome ? form.beneficiarioNome.replace(/\s+/g, '_') : 'Paciente'}`
          : `Ficha_Remocao_Padrao_${form.beneficiarioNome ? form.beneficiarioNome.replace(/\s+/g, '_') : 'Paciente'}`;

        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html lang="pt-BR">
            <head>
              <meta charset="utf-8" />
              <title>${docTitle}</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              ${styleElements}
              <style>
                @page {
                  size: A4 portrait;
                  margin: 8mm;
                }
                * {
                  box-sizing: border-box;
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
                body {
                  margin: 0;
                  padding: 0;
                  background-color: #ffffff !important;
                  color: #000000 !important;
                  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                }
                .page-break {
                  page-break-after: always !important;
                  break-after: page !important;
                }
                #ficha-remocao-document-root {
                  width: 100% !important;
                  max-width: 100% !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  border: none !important;
                  box-shadow: none !important;
                }
              </style>
            </head>
            <body>
              ${docElem.outerHTML}
            </body>
          </html>
        `);
        iframeDoc.close();

        setTimeout(() => {
          if (printIframe?.contentWindow) {
            printIframe.contentWindow.focus();
            printIframe.contentWindow.print();
          } else {
            window.print();
          }
          setIsPrinting(false);
        }, 500);

      } catch (e) {
        console.error('Falha ao imprimir via iframe:', e);
        window.print();
        setIsPrinting(false);
      }
    }, 200);
  };

  // Build a concise WhatsApp/Text summary
  const whatsappSummary = useMemo(() => {
    const headerTitle = form.modelo === 'servir' 
      ? 'SOLICITAÇÃO DE REMOÇÃO - GOVERNO DO TOCANTINS / SERVIR' 
      : `FORMULÁRIO DE SOLICITAÇÃO DE REMOÇÃO (${form.plano || 'CONVÊNIO'})`;

    return `*${headerTitle}*

* Paciente: ${form.beneficiarioNome || '---'}
* Matrícula: ${form.matricula || '---'} | Plano: ${form.plano || 'SERVIR'}
* Idade: ${form.idade || '--'} | Sexo: ${form.sexo || '-'} | Peso: ${form.peso || '--'}
* Origem: ${form.localOrigem || 'PS HPM'} (${form.unidadeAtendimento.toUpperCase()})
* Destino: ${form.localDestino || '---'}
* Tipo: ${form.tipoRemocao.replace('_', ' ').toUpperCase()} | Trajeto: ${form.tipoTrajeto.replace('_', ' ').toUpperCase()}
* Solicitante: ${form.profissionalSolicitante || '---'} (CRM: ${form.crmSolicitante || '---'})
* Ambulância: ${form.ambulanciaTipo.replace('_', ' ').toUpperCase()}
* Posição Deitada?: ${form.indicacaoPosicaoDeitada ? 'SIM' : 'NÃO'} ${form.justificativaPosicaoDeitada ? `(${form.justificativaPosicaoDeitada})` : ''}

*Justificativa Clínica:*
${form.quadroClinicoJustificativa || 'Paciente estável, indicado transporte em ambulância.'}`;
  }, [form]);

  const handleCopyText = () => {
    navigator.clipboard.writeText(whatsappSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      
      {/* PAINEL DE CONTROLE SUPERIOR */}
      <div className={`bg-white ${embedded ? 'p-4 sm:p-5 rounded-2xl' : 'p-5 sm:p-6 rounded-2xl'} border border-slate-200 shadow-xs space-y-5`}>
        
        {/* Linha 1: Título e Ações Principais */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF5F5] border border-[#C8E4E3] flex items-center justify-center flex-shrink-0 text-[#1D787A]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  Ficha de Solicitação de Remoção
                </h2>
                {form.modelo === 'servir' ? (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1D787A] bg-[#EBF5F5] border border-[#C8E4E3] px-2 py-0.5 rounded-md">
                    SERVIR • TOCANTINS
                  </span>
                ) : (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-md">
                    PADRÃO HOSPITALAR
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Preencha os dados clínicos para emissão e impressão da guia oficial (A4 Frente e Verso).
              </p>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleLoadServirPreset}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors flex items-center gap-1.5"
              title="Preencher com exemplo de caso clínico"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Exemplo</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Limpar formulário"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Limpar</span>
            </button>

            {/* BOTÃO PRINCIPAL: BAIXAR PDF DIRETO */}
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isDownloading || isPrinting}
              className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-[#9E1B4F] hover:bg-[#82133F] disabled:bg-slate-400 shadow-sm transition-all flex items-center gap-1.5 ml-1 cursor-pointer active:scale-98"
              title="Baixar arquivo PDF diretamente para o seu computador ou celular"
            >
              {isDownloading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
              ) : (
                <Download className="w-3.5 h-3.5 text-white" />
              )}
              <span>{isDownloading ? 'Baixando PDF...' : 'Baixar PDF'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              disabled={isPrinting || isDownloading}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 disabled:bg-slate-100 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
              title="Abrir pré-visualização e imprimir"
            >
              <Printer className={`w-3.5 h-3.5 ${isPrinting ? 'animate-spin' : ''}`} />
              <span>{isPrinting ? 'Abrindo...' : 'Imprimir'}</span>
            </button>
          </div>
        </div>

        {/* Linha 2: Seletor de Modelo (Nível Superior) */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setForm(prev => ({ ...prev, modelo: 'servir', plano: prev.plano === 'SERVIR' || !prev.plano ? 'SERVIR' : prev.plano }))}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              form.modelo === 'servir'
                ? 'bg-[#1D787A] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <span>1. SERVIR (TO)</span>
          </button>

          <button
            type="button"
            onClick={() => setForm(prev => ({ ...prev, modelo: 'padrao' }))}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              form.modelo === 'padrao'
                ? 'bg-[#1D787A] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <span>2. Padrão Hospitalar</span>
          </button>
        </div>

        {/* Linha 3: Sub-Abas do Modelo Selecionado (Formulário vs Guia Formatada) */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="inline-flex bg-slate-200/70 p-1 rounded-xl border border-slate-300/60 self-start">
            <button
              type="button"
              onClick={() => setActiveTab('formulario')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'formulario'
                  ? 'bg-white text-teal-950 shadow-2xs border border-slate-300/80'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-teal-700" />
              <span>Formulário de Preenchimento</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('visualizacao')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'visualizacao'
                  ? 'bg-white text-teal-950 shadow-2xs border border-slate-300/80'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Printer className="w-3.5 h-3.5 text-teal-700" />
              <span>Guia Formatada (Frente & Verso)</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-2 font-medium px-2">
            <span className={`w-2 h-2 rounded-full ${form.beneficiarioNome ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            <span className="truncate max-w-[280px]">
              {form.beneficiarioNome ? `Paciente: ${form.beneficiarioNome}` : 'Campos em aberto'}
            </span>
          </div>
        </div>
      </div>

      {/* TAB 1: FORMULÁRIO DE PREENCHIMENTO */}
      {activeTab === 'formulario' && (
        <div className="space-y-5">
          
          {/* Banner de Identificação Visual do SERVIR */}
          {form.modelo === 'servir' && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
              <CabecalhoOficialServir compact={false} />
            </div>
          )}

          {/* Seção 1: Cabeçalho & Dados do Beneficiário */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <User className="w-4 h-4 text-teal-700" />
              1. Identificação do Beneficiário e Plano
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
              <div className="sm:col-span-6">
                <label className="font-bold text-slate-700 block mb-1">Nome do beneficiário *</label>
                <input
                  type="text"
                  value={form.beneficiarioNome}
                  placeholder="Nome completo do paciente"
                  onChange={(e) => setForm({ ...form, beneficiarioNome: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium focus:bg-white"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="font-bold text-slate-700 block mb-1">Matrícula</label>
                <input
                  type="text"
                  value={form.matricula}
                  placeholder="Ex: 984512-0"
                  onChange={(e) => setForm({ ...form, matricula: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-mono font-medium focus:bg-white"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="font-bold text-slate-700 block mb-1">Plano / Convênio</label>
                <input
                  type="text"
                  value={form.plano}
                  placeholder="Ex: SERVIR, BRADESCO, UNIMED"
                  onChange={(e) => setForm({ ...form, plano: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-bold uppercase focus:bg-white"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="font-bold text-slate-700 block mb-1">Idade</label>
                <input
                  type="text"
                  value={form.idade}
                  placeholder="Ex: 58 anos"
                  onChange={(e) => setForm({ ...form, idade: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium focus:bg-white"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="font-bold text-slate-700 block mb-1">Peso</label>
                <input
                  type="text"
                  value={form.peso}
                  placeholder="Ex: 64 kg"
                  onChange={(e) => setForm({ ...form, peso: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium focus:bg-white"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="font-bold text-slate-700 block mb-1">Sexo</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, sexo: 'M' })}
                    className={`flex-1 py-2 rounded-xl font-bold border transition-all ${
                      form.sexo === 'M' ? 'bg-teal-800 text-white border-teal-800' : 'bg-slate-50 text-slate-700 border-slate-300'
                    }`}
                  >
                    M (Masculino)
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, sexo: 'F' })}
                    className={`flex-1 py-2 rounded-xl font-bold border transition-all ${
                      form.sexo === 'F' ? 'bg-teal-800 text-white border-teal-800' : 'bg-slate-50 text-slate-700 border-slate-300'
                    }`}
                  >
                    F (Feminino)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 2: Origem, Destino e Solicitante */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Building2 className="w-4 h-4 text-teal-700" />
              2. Origem, Destino e Equipe Solicitante
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
              <div className="sm:col-span-6">
                <label className="font-bold text-slate-700 block mb-1">Local de origem</label>
                <input
                  type="text"
                  value={form.localOrigem}
                  onChange={(e) => setForm({ ...form, localOrigem: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="sm:col-span-6">
                <label className="font-bold text-slate-700 block mb-1">Endereço de origem</label>
                <input
                  type="text"
                  value={form.enderecoOrigem}
                  onChange={(e) => setForm({ ...form, enderecoOrigem: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="sm:col-span-6">
                <label className="font-bold text-slate-700 block mb-1">Nome do contato na origem</label>
                <input
                  type="text"
                  value={form.nomeContatoOrigem}
                  onChange={(e) => setForm({ ...form, nomeContatoOrigem: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="sm:col-span-6">
                <label className="font-bold text-slate-700 block mb-1">Telefone da origem</label>
                <input
                  type="text"
                  value={form.telefoneOrigem}
                  onChange={(e) => setForm({ ...form, telefoneOrigem: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="sm:col-span-6">
                <label className="font-bold text-slate-700 block mb-1">Unidade de atendimento onde está o paciente</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, unidadeAtendimento: 'ps_pa' })}
                    className={`flex-1 py-2 rounded-xl font-bold border ${form.unidadeAtendimento === 'ps_pa' ? 'bg-teal-800 text-white' : 'bg-slate-50 text-slate-700'}`}
                  >
                    (X) PS/PA
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, unidadeAtendimento: 'uti' })}
                    className={`flex-1 py-2 rounded-xl font-bold border ${form.unidadeAtendimento === 'uti' ? 'bg-teal-800 text-white' : 'bg-slate-50 text-slate-700'}`}
                  >
                    (X) UTI
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, unidadeAtendimento: 'internado' })}
                    className={`flex-1 py-2 rounded-xl font-bold border ${form.unidadeAtendimento === 'internado' ? 'bg-teal-800 text-white' : 'bg-slate-50 text-slate-700'}`}
                  >
                    (X) Internado
                  </button>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="font-bold text-slate-700 block mb-1">Número da acomodação / Leito</label>
                <input
                  type="text"
                  value={form.numeroAcomodacao}
                  placeholder="Ex: Leito 204, Box 02"
                  onChange={(e) => setForm({ ...form, numeroAcomodacao: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="font-bold text-slate-700 block mb-1">Profissional solicitante</label>
                <input
                  type="text"
                  value={form.profissionalSolicitante}
                  placeholder="Nome do médico solicitante"
                  onChange={(e) => setForm({ ...form, profissionalSolicitante: e.target.value, medicoAssinatura: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="font-bold text-slate-700 block mb-1">CRM</label>
                <input
                  type="text"
                  value={form.crmSolicitante}
                  placeholder="Ex: 3421-TO"
                  onChange={(e) => setForm({ ...form, crmSolicitante: e.target.value, crmAssinatura: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="font-bold text-slate-700 block mb-1">Telefone solicitante</label>
                <input
                  type="text"
                  value={form.telefoneSolicitante}
                  placeholder="Ex: (63) 98411-2233"
                  onChange={(e) => setForm({ ...form, telefoneSolicitante: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="sm:col-span-6">
                <label className="font-bold text-slate-700 block mb-1">Tipo da remoção</label>
                <select
                  value={form.tipoRemocao}
                  onChange={(e) => setForm({ ...form, tipoRemocao: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-bold"
                >
                  <option value="hospital_hospital">Hospital p/ hospital</option>
                  <option value="hospital_sadt">Hospital p/ serviço de SADT</option>
                  <option value="hospital_residencia">Hospital p/ residência</option>
                </select>
              </div>

              <div className="sm:col-span-6">
                <label className="font-bold text-slate-700 block mb-1">Trajeto</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, tipoTrajeto: 'somente_ida' })}
                    className={`flex-1 py-2 rounded-xl font-bold border ${form.tipoTrajeto === 'somente_ida' ? 'bg-teal-800 text-white' : 'bg-slate-50 text-slate-700'}`}
                  >
                    (X) Somente ida
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, tipoTrajeto: 'ida_e_volta' })}
                    className={`flex-1 py-2 rounded-xl font-bold border ${form.tipoTrajeto === 'ida_e_volta' ? 'bg-teal-800 text-white' : 'bg-slate-50 text-slate-700'}`}
                  >
                    (X) Ida e volta
                  </button>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="font-bold text-slate-700 block mb-1">Local para onde o beneficiário será removido</label>
                <input
                  type="text"
                  value={form.localDestino}
                  placeholder="Nome do hospital ou clínica de destino"
                  onChange={(e) => setForm({ ...form, localDestino: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="font-bold text-slate-700 block mb-1">Profissional admissão</label>
                <input
                  type="text"
                  value={form.profissionalAdmissao}
                  placeholder="Médico ou responsável"
                  onChange={(e) => setForm({ ...form, profissionalAdmissao: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="font-bold text-slate-700 block mb-1">Telefone admissão</label>
                <input
                  type="text"
                  value={form.telefoneAdmissao}
                  placeholder="Telefone do destino"
                  onChange={(e) => setForm({ ...form, telefoneAdmissao: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="font-bold text-slate-700 block mb-1">Data da remoção</label>
                <input
                  type="text"
                  value={form.dataRemocao}
                  onChange={(e) => setForm({ ...form, dataRemocao: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="font-bold text-slate-700 block mb-1">Horário de chegada na origem</label>
                <input
                  type="text"
                  value={form.horarioChegadaOrigem}
                  placeholder="Ex: 14:00"
                  onChange={(e) => setForm({ ...form, horarioChegadaOrigem: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="font-bold text-slate-700 block mb-1">Horário de chegada no destino</label>
                <input
                  type="text"
                  value={form.horarioChegadaDestino}
                  placeholder="Ex: 15:00"
                  onChange={(e) => setForm({ ...form, horarioChegadaDestino: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Seção 3: Home Care & Condições Clínicas / Físicas */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              3. Home Care e Avaliação de Condições Clínicas & Locomoção
            </h3>

            {/* Home Care */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <span className="font-extrabold text-slate-800 uppercase block text-[11px]">Dados de Home Care</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="font-semibold text-slate-700">Está com home care em internação domiciliar?</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, homeCareInternacao: false })}
                      className={`px-2.5 py-1 rounded-lg font-bold text-xs ${!form.homeCareInternacao ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      (X) Não
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, homeCareInternacao: true })}
                      className={`px-2.5 py-1 rounded-lg font-bold text-xs ${form.homeCareInternacao ? 'bg-teal-800 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      (X) Sim
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="font-semibold text-slate-700">Atendimento domiciliar pontual?</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, homeCareAtendimentoPontual: false })}
                      className={`px-2.5 py-1 rounded-lg font-bold text-xs ${!form.homeCareAtendimentoPontual ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      (X) Não
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, homeCareAtendimentoPontual: true })}
                      className={`px-2.5 py-1 rounded-lg font-bold text-xs ${form.homeCareAtendimentoPontual ? 'bg-teal-800 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      (X) Sim
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Informar qual atendimento:</label>
                  <input
                    type="text"
                    value={form.homeCareQualAtendimento}
                    placeholder="Ex: ATENDIMENTO HOME CARE 24 HORAS"
                    onChange={(e) => setForm({ ...form, homeCareQualAtendimento: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Qual a empresa de Home Care?</label>
                  <input
                    type="text"
                    value={form.empresaHomeCare}
                    placeholder="Ex: VIVENTI HOME CARE"
                    onChange={(e) => setForm({ ...form, empresaHomeCare: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Possui acompanhamento diário com enfermeiro:</label>
                  <div className="flex gap-2">
                    {['6', '12', '24'].map((horas) => (
                      <button
                        key={horas}
                        type="button"
                        onClick={() => setForm({ ...form, acompanhamentoEnfermeiro: form.acompanhamentoEnfermeiro === horas ? '' : (horas as any) })}
                        className={`py-1.5 px-4 rounded-xl font-bold text-xs border ${
                          form.acompanhamentoEnfermeiro === horas
                            ? 'bg-teal-800 text-white border-teal-800'
                            : 'bg-white text-slate-700 border-slate-300'
                        }`}
                      >
                        ( {form.acompanhamentoEnfermeiro === horas ? 'X' : ' '} ) {horas} horas
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Condições Clínicas e Acidentes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block">Condições Clínicas:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, condClinicaClinico: !form.condClinicaClinico })}
                    className={`px-3 py-1 rounded-lg font-bold border ${form.condClinicaClinico ? 'bg-teal-800 text-white border-teal-800' : 'bg-white text-slate-700'}`}
                  >
                    ({form.condClinicaClinico ? 'X' : ' '}) Clínico
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, condClinicaCirurgico: !form.condClinicaCirurgico })}
                    className={`px-3 py-1 rounded-lg font-bold border ${form.condClinicaCirurgico ? 'bg-teal-800 text-white border-teal-800' : 'bg-white text-slate-700'}`}
                  >
                    ({form.condClinicaCirurgico ? 'X' : ' '}) Cirúrgico
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, condClinicaConsciente: !form.condClinicaConsciente })}
                    className={`px-3 py-1 rounded-lg font-bold border ${form.condClinicaConsciente ? 'bg-teal-800 text-white border-teal-800' : 'bg-white text-slate-700'}`}
                  >
                    ({form.condClinicaConsciente ? 'X' : ' '}) Está consciente
                  </button>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block">Sofreu Acidente de:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, acidenteAutomovel: !form.acidenteAutomovel })}
                    className={`px-2.5 py-1 rounded-lg font-bold border ${form.acidenteAutomovel ? 'bg-rose-700 text-white border-rose-700' : 'bg-white text-slate-700'}`}
                  >
                    ({form.acidenteAutomovel ? 'X' : ' '}) Automóvel
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, acidenteQueda: !form.acidenteQueda })}
                    className={`px-2.5 py-1 rounded-lg font-bold border ${form.acidenteQueda ? 'bg-rose-700 text-white border-rose-700' : 'bg-white text-slate-700'}`}
                  >
                    ({form.acidenteQueda ? 'X' : ' '}) Queda
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, acidenteConvulsao: !form.acidenteConvulsao })}
                    className={`px-2.5 py-1 rounded-lg font-bold border ${form.acidenteConvulsao ? 'bg-rose-700 text-white border-rose-700' : 'bg-white text-slate-700'}`}
                  >
                    ({form.acidenteConvulsao ? 'X' : ' '}) Convulsão
                  </button>
                </div>
              </div>

              <div className="sm:col-span-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-4">
                  <span className="font-bold text-slate-800 block mb-1">Acidente com:</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, acidenteArmaFogo: !form.acidenteArmaFogo })}
                      className={`px-2.5 py-1 rounded-lg font-bold border ${form.acidenteArmaFogo ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'}`}
                    >
                      ({form.acidenteArmaFogo ? 'X' : ' '}) Arma de fogo
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, acidenteArmaBranca: !form.acidenteArmaBranca })}
                      className={`px-2.5 py-1 rounded-lg font-bold border ${form.acidenteArmaBranca ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'}`}
                    >
                      ({form.acidenteArmaBranca ? 'X' : ' '}) Branca
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-8">
                  <label className="font-bold text-slate-800 block mb-1">Local do ferimento:</label>
                  <input
                    type="text"
                    value={form.localFerimento}
                    placeholder="Ex: FÊMUR, TÓRAX, CRÂNIO..."
                    onChange={(e) => setForm({ ...form, localFerimento: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs text-slate-900 font-medium uppercase"
                  />
                </div>
              </div>

              {/* Oxigênio e Locomoção */}
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-800">Está utilizando oxigênio?</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, utilizandoOxigenio: true })}
                    className={`px-3 py-1 rounded-lg font-bold ${form.utilizandoOxigenio ? 'bg-teal-800 text-white' : 'bg-white text-slate-700'}`}
                  >
                    (X) Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, utilizandoOxigenio: false })}
                    className={`px-3 py-1 rounded-lg font-bold ${!form.utilizandoOxigenio ? 'bg-slate-800 text-white' : 'bg-white text-slate-700'}`}
                  >
                    (X) Não
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-800">Possui concentrador portátil na alta?</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, possuiConcentradorAlta: true })}
                    className={`px-3 py-1 rounded-lg font-bold ${form.possuiConcentradorAlta ? 'bg-teal-800 text-white' : 'bg-white text-slate-700'}`}
                  >
                    (X) Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, possuiConcentradorAlta: false })}
                    className={`px-3 py-1 rounded-lg font-bold ${!form.possuiConcentradorAlta ? 'bg-slate-800 text-white' : 'bg-white text-slate-700'}`}
                  >
                    (X) Não
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-800">Consegue se locomover c/ terceiros?</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, locomoverAjudaTerceiros: true })}
                    className={`px-3 py-1 rounded-lg font-bold ${form.locomoverAjudaTerceiros ? 'bg-teal-800 text-white' : 'bg-white text-slate-700'}`}
                  >
                    (X) Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, locomoverAjudaTerceiros: false })}
                    className={`px-3 py-1 rounded-lg font-bold ${!form.locomoverAjudaTerceiros ? 'bg-slate-800 text-white' : 'bg-white text-slate-700'}`}
                  >
                    (X) Não
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-800">Está acamado?</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, estaAcamado: true })}
                    className={`px-3 py-1 rounded-lg font-bold ${form.estaAcamado ? 'bg-teal-800 text-white' : 'bg-white text-slate-700'}`}
                  >
                    (X) Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, estaAcamado: false })}
                    className={`px-3 py-1 rounded-lg font-bold ${!form.estaAcamado ? 'bg-slate-800 text-white' : 'bg-white text-slate-700'}`}
                  >
                    (X) Não
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-800">Locomove c/ cadeira de rodas?</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, locomoverCadeiraRodas: true })}
                    className={`px-3 py-1 rounded-lg font-bold ${form.locomoverCadeiraRodas ? 'bg-teal-800 text-white' : 'bg-white text-slate-700'}`}
                  >
                    (X) Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, locomoverCadeiraRodas: false })}
                    className={`px-3 py-1 rounded-lg font-bold ${!form.locomoverCadeiraRodas ? 'bg-slate-800 text-white' : 'bg-white text-slate-700'}`}
                  >
                    (X) Não
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-800">Anda c/ bengala / andador?</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, andarBengala: !form.andarBengala })}
                    className={`px-2.5 py-1 rounded-lg font-bold ${form.andarBengala ? 'bg-teal-800 text-white' : 'bg-white text-slate-700'}`}
                  >
                    ({form.andarBengala ? 'X' : ' '}) Bengala
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, andarAndador: !form.andarAndador })}
                    className={`px-2.5 py-1 rounded-lg font-bold ${form.andarAndador ? 'bg-teal-800 text-white' : 'bg-white text-slate-700'}`}
                  >
                    ({form.andarAndador ? 'X' : ' '}) Andador
                  </button>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 block mb-1">Qual a limitação/dificuldade física do participante?</label>
                <input
                  type="text"
                  value={form.limitacaoFisica}
                  onChange={(e) => setForm({ ...form, limitacaoFisica: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="sm:col-span-2 flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-800">Participante possui controle de tronco/tórax/braços?</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, controleTronco: true })}
                    className={`px-3 py-1 rounded-lg font-bold ${form.controleTronco ? 'bg-teal-800 text-white' : 'bg-white text-slate-700'}`}
                  >
                    (X) Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, controleTronco: false })}
                    className={`px-3 py-1 rounded-lg font-bold ${!form.controleTronco ? 'bg-rose-700 text-white' : 'bg-white text-slate-700'}`}
                  >
                    (X) Não
                  </button>
                </div>
              </div>

              <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-amber-50 p-3 rounded-xl border border-amber-200">
                <span className="font-bold text-amber-950">Indicação formal para ser transportado apenas em posição horizontal/deitada?</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, indicacaoPosicaoDeitada: true })}
                    className={`px-3 py-1 rounded-lg font-bold ${form.indicacaoPosicaoDeitada ? 'bg-amber-800 text-white' : 'bg-white text-slate-700'}`}
                  >
                    (X) Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, indicacaoPosicaoDeitada: false })}
                    className={`px-3 py-1 rounded-lg font-bold ${!form.indicacaoPosicaoDeitada ? 'bg-slate-800 text-white' : 'bg-white text-slate-700'}`}
                  >
                    (X) Não
                  </button>
                </div>
              </div>

              {form.indicacaoPosicaoDeitada && (
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Justifique a posição horizontal/deitada:</label>
                  <input
                    type="text"
                    value={form.justificativaPosicaoDeitada}
                    placeholder="Ex: Fratura de fêmur imobilizada; pós-operatório ortopédico imediato..."
                    onChange={(e) => setForm({ ...form, justificativaPosicaoDeitada: e.target.value })}
                    className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                  />
                </div>
              )}

              <div className="sm:col-span-2">
                <label className="font-bold text-slate-800 block mb-1">Ambulância para remoção:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, ambulanciaTipo: 'simples' })}
                    className={`p-2.5 rounded-xl font-bold text-xs border text-center ${form.ambulanciaTipo === 'simples' ? 'bg-teal-800 text-white border-teal-800' : 'bg-slate-50 text-slate-700'}`}
                  >
                    (X) Ambulância simples
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, ambulanciaTipo: 'simples_oxigenio' })}
                    className={`p-2.5 rounded-xl font-bold text-xs border text-center ${form.ambulanciaTipo === 'simples_oxigenio' ? 'bg-teal-800 text-white border-teal-800' : 'bg-slate-50 text-slate-700'}`}
                  >
                    (X) Simples c/ oxigênio
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, ambulanciaTipo: 'uti_completa' })}
                    className={`p-2.5 rounded-xl font-bold text-xs border text-center ${form.ambulanciaTipo === 'uti_completa' ? 'bg-rose-700 text-white border-rose-700' : 'bg-slate-50 text-slate-700'}`}
                  >
                    (X) UTI completa
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Seção 4: Quadro Clínico do Paciente & Assinaturas (Página 2) */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <FileText className="w-4 h-4 text-teal-700" />
              4. Quadro Clínico do Paciente - Justificativa da Remoção (Página 2 / Verso)
            </h3>

            <div>
              <label className="font-bold text-slate-700 block mb-1 text-xs">
                Descreva o quadro clínico detalhado e a justificativa técnica para a solicitação da remoção:
              </label>
              <textarea
                rows={6}
                value={form.quadroClinicoJustificativa}
                placeholder="Histórico da doença atual, hipótese diagnóstica, estabilidade hemodinâmica, necessidade de transporte em maca/ambulância..."
                onChange={(e) => setForm({ ...form, quadroClinicoJustificativa: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3 text-xs text-slate-900 font-medium leading-relaxed focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs pt-2">
              <div className="sm:col-span-4">
                <label className="font-bold text-slate-700 block mb-1">Data:</label>
                <input
                  type="text"
                  value={form.dataAssinatura}
                  onChange={(e) => setForm({ ...form, dataAssinatura: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="font-bold text-slate-700 block mb-1">Assinatura do médico solicitante:</label>
                <input
                  type="text"
                  value={form.medicoAssinatura}
                  placeholder="Nome do médico"
                  onChange={(e) => setForm({ ...form, medicoAssinatura: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="font-bold text-slate-700 block mb-1">CRM:</label>
                <input
                  type="text"
                  value={form.crmAssinatura}
                  placeholder="CRM do médico"
                  onChange={(e) => setForm({ ...form, crmAssinatura: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="sm:col-span-12">
                <label className="font-bold text-slate-700 block mb-1">Assinatura do Acompanhante:</label>
                <input
                  type="text"
                  value={form.acompanhanteAssinatura}
                  placeholder="Nome completo do acompanhante responsável"
                  onChange={(e) => setForm({ ...form, acompanhanteAssinatura: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                />
              </div>
            </div>

            <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl flex items-center gap-2.5 text-xs text-rose-900 font-black uppercase">
              <AlertCircle className="w-4 h-4 text-rose-700 flex-shrink-0" />
              <span>ATENÇÃO: A REMOÇÃO SERÁ REALIZADA SOMENTE COM A PRESENÇA DO ACOMPANHANTE NO LOCAL</span>
            </div>
          </div>

          {/* Quick Copy / WhatsApp text box */}
          <div className="bg-emerald-50 border border-emerald-300 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                  RESUMO DA SOLICITAÇÃO (WHATSAPP / PRONTUÁRIO)
                </span>
                <h4 className="text-sm font-extrabold text-emerald-950">
                  Texto Formatado para Comunicação Rápida
                </h4>
              </div>

              <button
                onClick={handleCopyText}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all self-start sm:self-center"
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copiado!' : 'Copiar Resumo'}</span>
              </button>
            </div>

            <div className="bg-slate-900 text-emerald-300 p-4 rounded-2xl font-mono text-xs whitespace-pre-wrap select-all">
              {whatsappSummary}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2 & PRINTABLE VIEW: GUIA OFICIAL (PÁGINAS 1 E 2) */}
      {(activeTab === 'visualizacao' || true) && (
        <div className={activeTab === 'visualizacao' ? 'block' : 'hidden print:block'}>
          
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-5 print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md">
                  Pré-visualização Oficial A4
                </span>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  (Frente & Verso / 2 Páginas)
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {form.modelo === 'servir' ? 'Modelo SERVIR • Governo do Tocantins' : 'Modelo Formulário Padrão Hospitalar'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Arquivo de 2 páginas (Frente & Verso) pronto para <strong>Download Direto em PDF</strong> ou Impressão.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap self-start sm:self-center">
              <button
                type="button"
                onClick={() => setActiveTab('formulario')}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Voltar ao Formulário</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isDownloading || isPrinting}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-400 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                title="Baixar arquivo PDF imediatamente"
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <Download className="w-4 h-4 text-white" />
                )}
                <span>{isDownloading ? 'Gerando e Baixando...' : 'Baixar PDF'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                disabled={isPrinting || isDownloading}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 disabled:bg-slate-100 shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Printer className={`w-4 h-4 ${isPrinting ? 'animate-spin' : ''}`} />
                <span>{isPrinting ? 'Abrindo...' : 'Imprimir'}</span>
              </button>
            </div>
          </div>

          {/* DOCUMENT CONTAINER (PÁGINAS 1 E 2) */}
          <div 
            id="ficha-remocao-document-root" 
            className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-md text-black font-sans text-xs max-w-4xl mx-auto space-y-0 print:border-none print:p-0 print:m-0 print:shadow-none"
          >
            
            {/* PÁGINA 1 */}
            <div 
              id="ficha-remocao-pagina-1" 
              className="bg-white border border-black p-4 space-y-2 mb-8 print:mb-0 print:page-break-after-always"
            >
              
              {/* CABEÇALHO DO DOCUMENTO */}
              {form.modelo === 'servir' ? (
                <div className="border-b-2 border-black pb-2.5 mb-3">
                  <CabecalhoOficialServir compact={false} />
                </div>
              ) : (
                <div className="border-b border-black pb-3 mb-3 text-center">
                  <h1 className="text-base sm:text-lg font-black uppercase tracking-wider">
                    FORMULÁRIO DE SOLICITAÇÃO DE REMOÇÃO
                  </h1>
                </div>
              )}

              {/* TABELA DE CAMPOS - PÁGINA 1 */}
              <div className="border border-black divide-y divide-black text-[11px]">
                
                {/* Linha 1 */}
                <div className="grid grid-cols-12 divide-x divide-black">
                  <div className="col-span-6 p-1.5">
                    <span className="font-bold">Nome do beneficiário:</span> {form.beneficiarioNome}
                  </div>
                  <div className="col-span-3 p-1.5">
                    <span className="font-bold">Matrícula:</span> {form.matricula}
                  </div>
                  <div className="col-span-3 p-1.5 font-bold">
                    <span>Plano:</span> {form.plano || 'SERVIR'}
                  </div>
                </div>

                {/* Linha 2 */}
                <div className="grid grid-cols-12 divide-x divide-black">
                  <div className="col-span-4 p-1.5">
                    <span className="font-bold">Idade:</span> {form.idade}
                  </div>
                  <div className="col-span-4 p-1.5">
                    <span className="font-bold">Peso:</span> {form.peso}
                  </div>
                  <div className="col-span-4 p-1.5 font-bold">
                    <span>Sexo:</span> M ( {form.sexo === 'M' ? 'X' : ' '} ) &nbsp;&nbsp; F ( {form.sexo === 'F' ? 'X' : ' '} )
                  </div>
                </div>

                {/* Linha 3 */}
                <div className="p-1.5">
                  <span className="font-bold">Local de origem:</span> {form.localOrigem}
                </div>

                {/* Linha 4 */}
                <div className="p-1.5">
                  <span className="font-bold">Endereço de origem:</span> {form.enderecoOrigem}
                </div>

                {/* Linha 5 */}
                <div className="grid grid-cols-12 divide-x divide-black">
                  <div className="col-span-8 p-1.5">
                    <span className="font-bold">Nome do contato na origem:</span> {form.nomeContatoOrigem}
                  </div>
                  <div className="col-span-4 p-1.5">
                    <span className="font-bold">Telefone:</span> {form.telefoneOrigem}
                  </div>
                </div>

                {/* Linha 6 */}
                <div className="p-1.5">
                  <span className="font-bold">Unidade de atendimento onde está o paciente:</span><br />
                  ( {form.unidadeAtendimento === 'ps_pa' ? 'X' : ' '} ) PS/PA &nbsp;&nbsp;&nbsp;
                  ( {form.unidadeAtendimento === 'uti' ? 'X' : ' '} ) UTI &nbsp;&nbsp;&nbsp;
                  ( {form.unidadeAtendimento === 'internado' ? 'X' : ' '} ) INTERNADO / Número da acomodação: <u>&nbsp;{form.numeroAcomodacao || '___________________'}&nbsp;</u>
                </div>

                {/* Linha 7 */}
                <div className="grid grid-cols-12 divide-x divide-black">
                  <div className="col-span-5 p-1.5">
                    <span className="font-bold">Profissional solicitante:</span> {form.profissionalSolicitante}
                  </div>
                  <div className="col-span-3 p-1.5">
                    <span className="font-bold">CRM:</span> {form.crmSolicitante}
                  </div>
                  <div className="col-span-4 p-1.5">
                    <span className="font-bold">Telefone:</span> {form.telefoneSolicitante}
                  </div>
                </div>

                {/* Linha 8 */}
                <div className="p-1.5">
                  <span className="font-bold">Tipo da remoção:</span> 
                  ( {form.tipoRemocao === 'hospital_hospital' ? 'X' : ' '} ) Hospital p/ hospital &nbsp;&nbsp;
                  ( {form.tipoRemocao === 'hospital_sadt' ? 'X' : ' '} ) Hospital p/ serviço de SADT &nbsp;&nbsp;
                  ( {form.tipoRemocao === 'hospital_residencia' ? 'X' : ' '} ) Hospital p/ residência<br />
                  ( {form.tipoTrajeto === 'somente_ida' ? 'X' : ' '} ) Somente ida &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  ( {form.tipoTrajeto === 'ida_e_volta' ? 'X' : ' '} ) Ida e volta RESIDÊNCIA/CLÍNICA
                </div>

                {/* Linha 9 */}
                <div className="p-1.5">
                  <span className="font-bold">Local para onde o beneficiário será removido:</span> {form.localDestino}
                </div>

                {/* Linha 10 */}
                <div className="grid grid-cols-12 divide-x divide-black">
                  <div className="col-span-8 p-1.5">
                    <span className="font-bold">Profissional responsável pela admissão do paciente:</span> {form.profissionalAdmissao}
                  </div>
                  <div className="col-span-4 p-1.5">
                    <span className="font-bold">Telefone:</span> {form.telefoneAdmissao}
                  </div>
                </div>

                {/* Linha 11 */}
                <div className="p-1.5">
                  <span className="font-bold">Data da remoção:</span> {form.dataRemocao}
                </div>

                {/* Linha 12 */}
                <div className="grid grid-cols-12 divide-x divide-black">
                  <div className="col-span-6 p-1.5">
                    <span className="font-bold">Horário de chegada na origem:</span> {form.horarioChegadaOrigem}
                  </div>
                  <div className="col-span-6 p-1.5">
                    <span className="font-bold">Horário de chegada no destino:</span> {form.horarioChegadaDestino}
                  </div>
                </div>

                {/* Linha 13 */}
                <div className="p-1.5">
                  Está com home care em internação domiciliar ( {form.homeCareInternacao === false ? 'X' : ' '} ) não &nbsp;&nbsp;&nbsp; ( {form.homeCareInternacao === true ? 'X' : ' '} ) sim
                </div>

                {/* Linha 14 */}
                <div className="p-1.5">
                  Esta com home care em atendimento domiciliar pontual ( {form.homeCareAtendimentoPontual === false ? 'X' : ' '} ) não &nbsp;&nbsp;&nbsp; ( {form.homeCareAtendimentoPontual === true ? 'X' : ' '} ) sim
                </div>

                {/* Linha 15 */}
                <div className="p-1.5">
                  <span className="font-bold">Informar qual atendimento:</span> {form.homeCareQualAtendimento || '____________________________________________________________________'}
                </div>

                {/* Linha 16 */}
                <div className="p-1.5">
                  Possui acompanhamento diário com enfermeiro ( {form.acompanhamentoEnfermeiro === '6' ? 'X' : ' '} ) 6 horas &nbsp;&nbsp; ( {form.acompanhamentoEnfermeiro === '12' ? 'X' : ' '} ) 12 horas &nbsp;&nbsp; ( {form.acompanhamentoEnfermeiro === '24' ? 'X' : ' '} ) 24 horas
                </div>

                {/* Linha 17 */}
                <div className="p-1.5">
                  <span className="font-bold">Qual a empresa de Home care?</span> {form.empresaHomeCare || '____________________________________________________________________'}
                </div>

                {/* Linha 18 */}
                <div className="p-1.5">
                  <span className="font-bold">Condições clinicas:</span> &nbsp;&nbsp;&nbsp;
                  ( {form.condClinicaClinico ? 'X' : ' '} ) Clínico &nbsp;&nbsp;&nbsp;
                  ( {form.condClinicaCirurgico ? 'X' : ' '} ) Cirúrgico &nbsp;&nbsp;&nbsp;
                  ( {form.condClinicaConsciente ? 'X' : ' '} ) Está consciente
                </div>

                {/* Linha 19 */}
                <div className="p-1.5">
                  Sofreu acidente de &nbsp;&nbsp;
                  ( {form.acidenteAutomovel ? 'X' : ' '} ) Automóvel &nbsp;&nbsp;&nbsp;
                  ( {form.acidenteQueda ? 'X' : ' '} ) Queda &nbsp;&nbsp;&nbsp;
                  ( {form.acidenteConvulsao ? 'X' : ' '} ) convulsão
                </div>

                {/* Linha 20 */}
                <div className="p-1.5">
                  Acidente com &nbsp;&nbsp;
                  ( {form.acidenteArmaFogo ? 'X' : ' '} ) arma de fogo &nbsp;&nbsp;&nbsp;
                  ( {form.acidenteArmaBranca ? 'X' : ' '} ) branca &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="font-bold">Local do ferimento:</span> <u>&nbsp;{form.localFerimento || '____________________'}&nbsp;</u>
                </div>

                {/* Linha 21 */}
                <div className="p-1.5">
                  Está utilizando oxigênio? ( {form.utilizandoOxigenio === true ? 'X' : ' '} ) Sim &nbsp;&nbsp; ( {form.utilizandoOxigenio === false ? 'X' : ' '} ) Não
                </div>

                {/* Linha 22 */}
                <div className="p-1.5">
                  Possui concentrador portátio no momento da alta? ( {form.possuiConcentradorAlta === true ? 'X' : ' '} ) Sim &nbsp;&nbsp; ( {form.possuiConcentradorAlta === false ? 'X' : ' '} ) Não
                </div>

                {/* Linha 23 */}
                <div className="p-1.5">
                  Consegue se locomover com ajuda de terceiros? ( {form.locomoverAjudaTerceiros === true ? 'X' : ' '} ) Sim &nbsp;&nbsp; ( {form.locomoverAjudaTerceiros === false ? 'X' : ' '} ) Não &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Está acamado? ( {form.estaAcamado === true ? 'X' : ' '} ) Sim &nbsp;&nbsp; ( {form.estaAcamado === false ? 'X' : ' '} ) Não
                </div>

                {/* Linha 24 */}
                <div className="p-1.5">
                  Consegue se locomover com cadeira de rodas? ( {form.locomoverCadeiraRodas === true ? 'X' : ' '} ) Sim &nbsp;&nbsp; ( {form.locomoverCadeiraRodas === false ? 'X' : ' '} ) Não
                </div>

                {/* Linha 25 */}
                <div className="p-1.5">
                  Consegue andar com bengala? ( {form.andarBengala === true ? 'X' : ' '} ) sim &nbsp;&nbsp; ( {form.andarBengala === false ? 'X' : ' '} ) não &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Consegue andar com andador? ( {form.andarAndador === true ? 'X' : ' '} ) sim &nbsp;&nbsp; ( {form.andarAndador === false ? 'X' : ' '} ) não
                </div>

                {/* Linha 26 */}
                <div className="p-1.5">
                  <span className="font-bold">Qual a limitação/dificuldade física do participante?</span> {form.limitacaoFisica || '____________________________________________________'}
                </div>

                {/* Linha 27 */}
                <div className="p-1.5">
                  participante possui "controle de tronco/toráx/braços? ( {form.controleTronco === true ? 'X' : ' '} ) sim &nbsp;&nbsp; ( {form.controleTronco === false ? 'X' : ' '} ) não
                </div>

                {/* Linha 28 */}
                <div className="p-1.5">
                  Possui indicação formal para ser transportado apenas em posição horizontal/deitada? ( {form.indicacaoPosicaoDeitada === true ? 'X' : ' '} ) sim &nbsp;&nbsp; ( {form.indicacaoPosicaoDeitada === false ? 'X' : ' '} ) não
                </div>

                {/* Linha 29 */}
                <div className="p-1.5">
                  <span className="font-bold">Justifique:</span> {form.justificativaPosicaoDeitada || '_________________________________________________________________________________________________'}
                </div>

                {/* Linha 30 */}
                <div className="p-1.5">
                  <span className="font-bold">Ambulância para remoção:</span> &nbsp;&nbsp;&nbsp;
                  ( {form.ambulanciaTipo === 'simples' ? 'X' : ' '} ) Ambulância simples &nbsp;&nbsp;&nbsp;
                  ( {form.ambulanciaTipo === 'simples_oxigenio' ? 'X' : ' '} ) Ambulância simples com oxigênio &nbsp;&nbsp;&nbsp;
                  ( {form.ambulanciaTipo === 'uti_completa' ? 'X' : ' '} ) UTI completa
                </div>

              </div>
            </div>

            {/* PÁGINA 2: QUADRO CLÍNICO & ASSINATURAS */}
            <div 
              id="ficha-remocao-pagina-2" 
              className="bg-white border border-black p-4 space-y-4 pt-6"
            >
              
              {/* CABEÇALHO PÁGINA 2 */}
              {form.modelo === 'servir' ? (
                <div className="border-b-2 border-black pb-2.5 mb-3">
                  <CabecalhoOficialServir compact={true} />
                </div>
              ) : null}

              {/* TÍTULO QUADRO CLÍNICO */}
              <div className="border border-black font-bold text-center py-1.5 bg-slate-50 text-[12px] uppercase">
                Quadro clínico do paciente - Justificativa para a solicitação da remoção
              </div>

              {/* ÁREA DE TEXTO / JUSTIFICATIVA CLÍNICA */}
              <div className="border border-black p-4 min-h-[380px] font-mono text-[11px] leading-relaxed whitespace-pre-wrap">
                {form.quadroClinicoJustificativa || (
                  <div className="text-slate-400 italic">
                    (Espaço reservado para descrição detalhada da evolução clínica, diagnóstico, condições hemodinâmicas e justificativa técnica da necessidade de transporte em ambulância)
                  </div>
                )}
              </div>

              {/* RODAPÉ E ASSINATURAS */}
              <div className="border border-black divide-y divide-black text-[11px]">
                <div className="p-2">
                  <span className="font-bold">Data:</span> {form.dataAssinatura}
                </div>

                <div className="grid grid-cols-12 divide-x divide-black">
                  <div className="col-span-8 p-2">
                    <span className="font-bold">Assinatura do médico solicitante:</span> {form.medicoAssinatura}
                  </div>
                  <div className="col-span-4 p-2">
                    <span className="font-bold">CRM:</span> {form.crmAssinatura}
                  </div>
                </div>

                <div className="p-2">
                  <span className="font-bold">ASSINATURA DO ACOMPANHANTE:</span> {form.acompanhanteAssinatura}
                </div>

                <div className="p-2.5 font-bold text-center uppercase tracking-wide bg-slate-50 text-[10px]">
                  ATENÇÃO: A REMOÇÃO SERÁ REALIZADA SOMENTE COM A PRESENÇA DO ACOMPANHANTE NO LOCAL
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
