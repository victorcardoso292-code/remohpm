import React, { useState, useMemo } from 'react';
import { PlanoRemocao } from '../types/remocao';
import { 
  CabecalhoOficialServir, 
  LogoGovernoTocantins, 
  LogoServir, 
  BrasaoTocantinsVector, 
  EmblemaServirVector,
  getServirHeaderCanvasDataUrl
} from './ServirLogos';
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
  Loader2,
  ExternalLink,
  X,
  CheckCircle2
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
  const [printFeedback, setPrintFeedback] = useState<string | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [previewPdfBlobUrl, setPreviewPdfBlobUrl] = useState<string | null>(null);

  // Gerador Vetorial Nativo Direto jsPDF (2 Páginas A4 - Frente e Verso)
  const generateFichaFiles = (formData: FormularioRemocaoState) => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pw = 210;
    const mx = 8;
    const my = 8;
    const cw = pw - mx * 2; // 194mm

    // ==========================================
    // PÁGINA 1 (FRENTE)
    // ==========================================
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.4);
    pdf.rect(mx, my, cw, 276);

    let curY = my + 2;

    // Cabeçalho Página 1
    const isServir = formData.modelo === 'servir';
    if (isServir) {
      const headerImgData = getServirHeaderCanvasDataUrl();
      if (headerImgData) {
        pdf.addImage(headerImgData, 'PNG', mx, curY - 1, cw, 14);
        curY += 13.5;
      } else {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7.5);
        pdf.setTextColor(0, 0, 0);
        pdf.text('Secretaria da administração', mx + 3, curY + 4);
        pdf.setFontSize(10);
        pdf.text('GOVERNO DO TOCANTINS', mx + 3, curY + 9);

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(15);
        pdf.setTextColor(0, 71, 133);
        pdf.text('Servir', pw - mx - 3, curY + 5, { align: 'right' });
        pdf.setFontSize(6.5);
        pdf.setTextColor(0, 0, 0);
        pdf.text('SAÚDE PARA QUEM CUIDA DO TOCANTINS', pw - mx - 3, curY + 9, { align: 'right' });
        curY += 12;
      }

      pdf.setLineWidth(0.4);
      pdf.line(mx, curY, mx + cw, curY);
    } else {
      // FORMULÁRIO 2: SEM NENHUM TIPO DE LOGO, APENAS O TÍTULO
      pdf.setFillColor(245, 245, 245);
      pdf.rect(mx, curY, cw, 10, 'FD');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      pdf.text('FORMULÁRIO DE SOLICITAÇÃO DE REMOÇÃO', mx + cw / 2, curY + 6.5, { align: 'center' });

      curY += 10;
      pdf.setLineWidth(0.4);
      pdf.line(mx, curY, mx + cw, curY);
    }

    // Auxiliar de desenho de linhas da tabela
    const drawRow = (
      height: number,
      cols: Array<{ widthRatio: number; label: string; value: string; isBold?: boolean }>
    ) => {
      const rowY = curY;
      let colX = mx;

      cols.forEach((col, idx) => {
        const colW = cw * col.widthRatio;
        if (idx > 0) {
          pdf.line(colX, rowY, colX, rowY + height);
        }

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7);
        pdf.setTextColor(0, 0, 0);
        const labelW = pdf.getTextWidth(col.label);
        pdf.text(col.label, colX + 1.5, rowY + 3.8);

        if (col.value) {
          pdf.setFont('helvetica', col.isBold ? 'bold' : 'normal');
          if (col.value.includes('\n')) {
            const lines = col.value.split('\n');
            pdf.text(lines[0], colX + 1.5 + labelW + 1, rowY + 3.8);
            if (lines[1]) {
              pdf.text(lines[1].trim(), colX + 1.5 + labelW + 1, rowY + 7.5);
            }
          } else {
            pdf.text(col.value, colX + 1.5 + labelW + 1, rowY + 3.8);
          }
        }

        colX += colW;
      });

      curY += height;
      pdf.line(mx, curY, mx + cw, curY);
    };

    // Linha 1
    drawRow(6.5, [
      { widthRatio: 0.5, label: 'Nome do beneficiário: ', value: formData.beneficiarioNome },
      { widthRatio: 0.25, label: 'Matrícula: ', value: formData.matricula },
      { widthRatio: 0.25, label: 'Plano: ', value: formData.plano || 'SERVIR', isBold: true },
    ]);

    // Linha 2
    drawRow(6.5, [
      { widthRatio: 0.33, label: 'Idade: ', value: formData.idade },
      { widthRatio: 0.33, label: 'Peso: ', value: formData.peso },
      { widthRatio: 0.34, label: 'Sexo: ', value: `M ( ${formData.sexo === 'M' ? 'X' : ' '} )   F ( ${formData.sexo === 'F' ? 'X' : ' '} )` },
    ]);

    // Linha 3
    drawRow(6.5, [{ widthRatio: 1, label: 'Local de origem: ', value: formData.localOrigem }]);

    // Linha 4
    drawRow(6.5, [{ widthRatio: 1, label: 'Endereço de origem: ', value: formData.enderecoOrigem }]);

    // Linha 5
    drawRow(6.5, [
      { widthRatio: 0.65, label: 'Nome do contato na origem: ', value: formData.nomeContatoOrigem },
      { widthRatio: 0.35, label: 'Telefone: ', value: formData.telefoneOrigem },
    ]);

    // Linha 6
    drawRow(9.5, [{
      widthRatio: 1,
      label: 'Unidade de atendimento onde está o paciente: ',
      value: `( ${formData.unidadeAtendimento === 'ps_pa' ? 'X' : ' '} ) PS/PA     ( ${formData.unidadeAtendimento === 'uti' ? 'X' : ' '} ) UTI     ( ${formData.unidadeAtendimento === 'internado' ? 'X' : ' '} ) INTERNADO / Número da acomodação: ${formData.numeroAcomodacao || '________'}`
    }]);

    // Linha 7
    drawRow(6.5, [
      { widthRatio: 0.5, label: 'Profissional solicitante: ', value: formData.profissionalSolicitante },
      { widthRatio: 0.25, label: 'CRM: ', value: formData.crmSolicitante },
      { widthRatio: 0.25, label: 'Telefone: ', value: formData.telefoneSolicitante },
    ]);

    // Linha 8
    drawRow(10, [{
      widthRatio: 1,
      label: 'Tipo da remoção: ',
      value: `( ${formData.tipoRemocao === 'hospital_hospital' ? 'X' : ' '} ) Hospital p/ hospital   ( ${formData.tipoRemocao === 'hospital_sadt' ? 'X' : ' '} ) Hospital p/ serviço de SADT   ( ${formData.tipoRemocao === 'hospital_residencia' ? 'X' : ' '} ) Hospital p/ residência\n                      ( ${formData.tipoTrajeto === 'somente_ida' ? 'X' : ' '} ) Somente ida       ( ${formData.tipoTrajeto === 'ida_e_volta' ? 'X' : ' '} ) Ida e volta RESIDÊNCIA/CLÍNICA`
    }]);

    // Linha 9
    drawRow(6.5, [{ widthRatio: 1, label: 'Local para onde o beneficiário será removido: ', value: formData.localDestino }]);

    // Linha 10
    drawRow(6.5, [
      { widthRatio: 0.65, label: 'Profissional responsável pela admissão do paciente: ', value: formData.profissionalAdmissao },
      { widthRatio: 0.35, label: 'Telefone: ', value: formData.telefoneAdmissao },
    ]);

    // Linha 11
    drawRow(6.5, [{ widthRatio: 1, label: 'Data da remoção: ', value: formData.dataRemocao }]);

    // Linha 12
    drawRow(6.5, [
      { widthRatio: 0.5, label: 'Horário de chegada na origem: ', value: formData.horarioChegadaOrigem },
      { widthRatio: 0.5, label: 'Horário de chegada no destino: ', value: formData.horarioChegadaDestino },
    ]);

    // Linha 13
    drawRow(6.5, [{ widthRatio: 1, label: 'Está com home care em internação domiciliar ', value: `( ${formData.homeCareInternacao === false ? 'X' : ' '} ) não     ( ${formData.homeCareInternacao === true ? 'X' : ' '} ) sim` }]);

    // Linha 14
    drawRow(6.5, [{ widthRatio: 1, label: 'Esta com home care em atendimento domiciliar pontual ', value: `( ${formData.homeCareAtendimentoPontual === false ? 'X' : ' '} ) não     ( ${formData.homeCareAtendimentoPontual === true ? 'X' : ' '} ) sim` }]);

    // Linha 15
    drawRow(6.5, [{ widthRatio: 1, label: 'Informar qual atendimento: ', value: formData.homeCareQualAtendimento || '____________________________________________________________________' }]);

    // Linha 16
    drawRow(6.5, [{ widthRatio: 1, label: 'Possui acompanhamento diário com enfermeiro ', value: `( ${formData.acompanhamentoEnfermeiro === '6' ? 'X' : ' '} ) 6 horas   ( ${formData.acompanhamentoEnfermeiro === '12' ? 'X' : ' '} ) 12 horas   ( ${formData.acompanhamentoEnfermeiro === '24' ? 'X' : ' '} ) 24 horas` }]);

    // Linha 17
    drawRow(6.5, [{ widthRatio: 1, label: 'Qual a empresa de Home care? ', value: formData.empresaHomeCare || '____________________________________________________________________' }]);

    // Linha 18
    drawRow(6.5, [{ widthRatio: 1, label: 'Condições clinicas:     ', value: `( ${formData.condClinicaClinico ? 'X' : ' '} ) Clínico     ( ${formData.condClinicaCirurgico ? 'X' : ' '} ) Cirúrgico     ( ${formData.condClinicaConsciente ? 'X' : ' '} ) Está consciente` }]);

    // Linha 19
    drawRow(6.5, [{ widthRatio: 1, label: 'Sofreu acidente de   ', value: `( ${formData.acidenteAutomovel ? 'X' : ' '} ) Automóvel     ( ${formData.acidenteQueda ? 'X' : ' '} ) Queda     ( ${formData.acidenteConvulsao ? 'X' : ' '} ) convulsão` }]);

    // Linha 20
    drawRow(6.5, [{ widthRatio: 1, label: 'Acidente com   ', value: `( ${formData.acidenteArmaFogo ? 'X' : ' '} ) arma de fogo     ( ${formData.acidenteArmaBranca ? 'X' : ' '} ) branca     Local do ferimento: ${formData.localFerimento || '____________________'}` }]);

    // Linha 21
    drawRow(6.5, [{ widthRatio: 1, label: 'Está utilizando oxigênio? ', value: `( ${formData.utilizandoOxigenio === true ? 'X' : ' '} ) Sim   ( ${formData.utilizandoOxigenio === false ? 'X' : ' '} ) Não` }]);

    // Linha 22
    drawRow(6.5, [{ widthRatio: 1, label: 'Possui concentrador portátio no momento da alta? ', value: `( ${formData.possuiConcentradorAlta === true ? 'X' : ' '} ) Sim   ( ${formData.possuiConcentradorAlta === false ? 'X' : ' '} ) Não` }]);

    // Linha 23
    drawRow(6.5, [{ widthRatio: 1, label: 'Consegue se locomover com ajuda de terceiros? ', value: `( ${formData.locomoverAjudaTerceiros === true ? 'X' : ' '} ) Sim   ( ${formData.locomoverAjudaTerceiros === false ? 'X' : ' '} ) Não       Está acamado? ( ${formData.estaAcamado === true ? 'X' : ' '} ) Sim   ( ${formData.estaAcamado === false ? 'X' : ' '} ) Não` }]);

    // Linha 24
    drawRow(6.5, [{ widthRatio: 1, label: 'Consegue se locomover com cadeira de rodas? ', value: `( ${formData.locomoverCadeiraRodas === true ? 'X' : ' '} ) Sim   ( ${formData.locomoverCadeiraRodas === false ? 'X' : ' '} ) Não` }]);

    // Linha 25
    drawRow(6.5, [{ widthRatio: 1, label: 'Consegue andar com bengala? ', value: `( ${formData.andarBengala === true ? 'X' : ' '} ) sim   ( ${formData.andarBengala === false ? 'X' : ' '} ) não       Consegue andar com andador? ( ${formData.andarAndador === true ? 'X' : ' '} ) sim   ( ${formData.andarAndador === false ? 'X' : ' '} ) não` }]);

    // Linha 26
    drawRow(6.5, [{ widthRatio: 1, label: 'Qual a limitação/dificuldade física do participante? ', value: formData.limitacaoFisica || 'Nenhuma' }]);

    // Linha 27
    drawRow(6.5, [{ widthRatio: 1, label: 'participante possui "controle de tronco/toráx/braços? ', value: `( ${formData.controleTronco === true ? 'X' : ' '} ) sim   ( ${formData.controleTronco === false ? 'X' : ' '} ) não` }]);

    // Linha 28
    drawRow(6.5, [{ widthRatio: 1, label: 'Possui indicação formal para ser transportado apenas em posição horizontal/deitada? ', value: `( ${formData.indicacaoPosicaoDeitada === true ? 'X' : ' '} ) sim   ( ${formData.indicacaoPosicaoDeitada === false ? 'X' : ' '} ) não` }]);

    // Linha 29
    drawRow(6.5, [{ widthRatio: 1, label: 'Justifique: ', value: formData.justificativaPosicaoDeitada || '_________________________________________________________________________________________________' }]);

    // Linha 30
    drawRow(6.5, [{ widthRatio: 1, label: 'Ambulância para remoção:     ', value: `( ${formData.ambulanciaTipo === 'simples' ? 'X' : ' '} ) Ambulância simples     ( ${formData.ambulanciaTipo === 'simples_oxigenio' ? 'X' : ' '} ) Ambulância simples com oxigênio     ( ${formData.ambulanciaTipo === 'uti_completa' ? 'X' : ' '} ) UTI completa` }]);

    // ==========================================
    // PÁGINA 2 (VERSO)
    // ==========================================
    pdf.addPage('a4', 'portrait');

    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.4);
    pdf.rect(mx, my, cw, 276);

    let curY2 = my + 2;

    if (isServir) {
      const headerImgData = getServirHeaderCanvasDataUrl();
      if (headerImgData) {
        pdf.addImage(headerImgData, 'PNG', mx, curY2 - 1, cw, 12);
        curY2 += 11.5;
      } else {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7);
        pdf.setTextColor(0, 0, 0);
        pdf.text('Secretaria da administração', mx + 3, curY2 + 3.5);
        pdf.setFontSize(8.5);
        pdf.text('GOVERNO DO TOCANTINS', mx + 3, curY2 + 7.5);

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(12);
        pdf.setTextColor(0, 71, 133);
        pdf.text('Servir', pw - mx - 3, curY2 + 4.5, { align: 'right' });
        pdf.setFontSize(5.5);
        pdf.setTextColor(0, 0, 0);
        pdf.text('SAÚDE PARA QUEM CUIDA DO TOCANTINS', pw - mx - 3, curY2 + 7.5, { align: 'right' });

        curY2 += 10;
      }

      pdf.setLineWidth(0.4);
      pdf.line(mx, curY2, mx + cw, curY2);
    } else {
      // FORMULÁRIO 2: SEM NENHUM TIPO DE LOGO, APENAS O TÍTULO
      pdf.setFillColor(245, 245, 245);
      pdf.rect(mx, curY2, cw, 8, 'FD');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9.5);
      pdf.setTextColor(0, 0, 0);
      pdf.text('FORMULÁRIO DE SOLICITAÇÃO DE REMOÇÃO', mx + cw / 2, curY2 + 5.2, { align: 'center' });

      curY2 += 8;
      pdf.setLineWidth(0.4);
      pdf.line(mx, curY2, mx + cw, curY2);
    }

    // Título Quadro Clínico
    pdf.setFillColor(245, 245, 245);
    pdf.rect(mx, curY2, cw, 8, 'FD');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(0, 0, 0);
    pdf.text('QUADRO CLÍNICO DO PACIENTE - JUSTIFICATIVA PARA A SOLICITAÇÃO DA REMOÇÃO', mx + cw / 2, curY2 + 5, { align: 'center' });

    curY2 += 8;

    const footerH = 34;
    const textBoxH = (my + 276) - curY2 - footerH;

    pdf.rect(mx, curY2, cw, textBoxH);

    // Texto Clínico
    if (formData.quadroClinicoJustificativa) {
      pdf.setFont('courier', 'normal');
      pdf.setFontSize(7.5);
      pdf.setTextColor(0, 0, 0);
      const splitText = pdf.splitTextToSize(formData.quadroClinicoJustificativa, cw - 6);
      pdf.text(splitText, mx + 3, curY2 + 5);
    } else {
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(7.5);
      pdf.setTextColor(130, 130, 130);
      pdf.text('(Espaço reservado para descrição detalhada da evolução clínica, diagnóstico, condições hemodinâmicas e', mx + 3, curY2 + 6);
      pdf.text('justificativa técnica da necessidade de transporte em ambulância)', mx + 3, curY2 + 10);
    }

    curY2 += textBoxH;

    // Rodapé de Assinaturas
    const drawFooterRow = (h: number, cols: Array<{ widthRatio: number; label: string; value: string }>) => {
      const rowY = curY2;
      let colX = mx;

      cols.forEach((col, idx) => {
        const colW = cw * col.widthRatio;
        if (idx > 0) {
          pdf.line(colX, rowY, colX, rowY + h);
        }

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7.5);
        pdf.setTextColor(0, 0, 0);
        const labelW = pdf.getTextWidth(col.label);
        pdf.text(col.label, colX + 2, rowY + 4.5);

        if (col.value) {
          pdf.setFont('helvetica', 'normal');
          pdf.text(col.value, colX + 2 + labelW + 1, rowY + 4.5);
        }

        colX += colW;
      });

      curY2 += h;
      pdf.line(mx, curY2, mx + cw, curY2);
    };

    drawFooterRow(7.5, [{ widthRatio: 1, label: 'Data: ', value: formData.dataAssinatura }]);

    drawFooterRow(8.5, [
      { widthRatio: 0.65, label: 'Assinatura do médico solicitante: ', value: formData.medicoAssinatura },
      { widthRatio: 0.35, label: 'CRM: ', value: formData.crmAssinatura },
    ]);

    drawFooterRow(8.5, [{ widthRatio: 1, label: 'ASSINATURA DO ACOMPANHANTE: ', value: formData.acompanhanteAssinatura }]);

    pdf.setFillColor(245, 245, 245);
    pdf.rect(mx, curY2, cw, 9.5, 'FD');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(0, 0, 0);
    pdf.text('ATENÇÃO: A REMOÇÃO SERÁ REALIZADA SOMENTE COM A PRESENÇA DO ACOMPANHANTE NO LOCAL', mx + cw / 2, curY2 + 6, { align: 'center' });

    const pacienteSanitizado = formData.beneficiarioNome
      ? formData.beneficiarioNome.trim().replace(/[^a-zA-Z0-9À-ÿ_-]/g, '_')
      : 'Paciente';
    const modelTag = formData.modelo === 'servir' ? 'SERVIR_TO' : 'Padrao_Hospitalar';
    const filename = `Ficha_Remocao_${modelTag}_${pacienteSanitizado}.pdf`;
    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);

    return { pdf, filename, blob, blobUrl };
  };

  // Download do arquivo PDF com 2 Páginas fiéis ao modelo
  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const { pdf, filename } = generateFichaFiles(form);
      pdf.save(filename);
    } catch (err) {
      console.error('Falha ao gerar arquivo PDF para download:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Impressão oficial: Dispara a pré-visualização nativa e impressão direta em janela dedicada perfeita
  const handlePrint = () => {
    setIsPrinting(true);
    setPrintFeedback('Abrindo tela de impressão e pré-visualização...');

    try {
      // 1. Gera o BlobURL vetorial do documento (sem disparar download de arquivo)
      const { blobUrl } = generateFichaFiles(form);
      setPreviewPdfBlobUrl(blobUrl);

      // 2. Tenta abrir a impressão direta do PDF gerado (que tem dimensões vetoriais exatas A4 milimétricas)
      let printedViaIframe = false;
      try {
        const oldIframe = document.getElementById('direct-pdf-print-frame');
        if (oldIframe) oldIframe.remove();

        const printFrame = document.createElement('iframe');
        printFrame.id = 'direct-pdf-print-frame';
        printFrame.style.position = 'fixed';
        printFrame.style.right = '0';
        printFrame.style.bottom = '0';
        printFrame.style.width = '0';
        printFrame.style.height = '0';
        printFrame.style.border = '0';
        printFrame.src = blobUrl;
        document.body.appendChild(printFrame);

        printFrame.onload = () => {
          setTimeout(() => {
            try {
              printFrame.contentWindow?.focus();
              printFrame.contentWindow?.print();
              printedViaIframe = true;
            } catch (errIframe) {
              console.warn('Iframe print bloqueado pelo navegador:', errIframe);
            }
          }, 300);
        };
      } catch (err) {
        console.warn('Falha no iframe de impressão:', err);
      }

      // 3. Abre também a modal de conferência visual completa para o usuário
      setShowPrintModal(true);
      setActiveTab('visualizacao');

      // 4. Se o navegador não disparar o iframe em 500ms, aciona a janela padrão
      setTimeout(() => {
        if (!printedViaIframe) {
          try {
            window.print();
          } catch (e) {
            console.warn('window.print() indisponível:', e);
          }
        }
      }, 550);

    } catch (err) {
      console.error('Falha ao gerar pré-visualização de impressão:', err);
      setPrintFeedback('Erro ao preparar pré-visualização. Tente novamente.');
    } finally {
      setTimeout(() => {
        setIsPrinting(false);
      }, 600);
      setTimeout(() => {
        setPrintFeedback(null);
      }, 3500);
    }
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
      <div className={`bg-white ${embedded ? 'p-4 sm:p-5 rounded-2xl' : 'p-5 sm:p-6 rounded-2xl'} border border-slate-200 shadow-xs space-y-5 print:hidden`}>
        
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
              title="Abrir tela de pré-visualização e imprimir"
            >
              <Printer className={`w-3.5 h-3.5 ${isPrinting ? 'animate-spin text-[#1D787A]' : ''}`} />
              <span>{isPrinting ? 'Abrindo...' : 'Imprimir'}</span>
            </button>
          </div>
        </div>

        {/* Feedback visual de geração de arquivo e impressão */}
        {printFeedback && (
          <div className="flex items-center gap-2 px-3.5 py-2 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-xl shadow-2xs animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{printFeedback}</span>
          </div>
        )}

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
            onClick={() => setForm(prev => ({ 
              ...prev, 
              modelo: 'padrao',
              plano: prev.plano === 'SERVIR' ? '' : prev.plano
            }))}
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
        <div className="space-y-5 print:hidden">
          
          {/* Banner de Identificação Visual do Cabeçalho Oficial (Apenas no modelo SERVIR) */}
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
                title="Abrir tela de pré-visualização e imprimir"
              >
                <Printer className={`w-4 h-4 ${isPrinting ? 'animate-spin text-[#1D787A]' : ''}`} />
                <span>{isPrinting ? 'Abrindo...' : 'Imprimir'}</span>
              </button>
            </div>
          </div>

          {/* DOCUMENT CONTAINER (PÁGINAS 1 E 2) */}
          <div 
            id="ficha-remocao-document-root" 
            className="p-2 sm:p-4 text-black font-sans text-xs max-w-4xl mx-auto space-y-0 print:p-0 print:m-0"
          >
            
            {/* PÁGINA 1 (FRENTE) */}
            <div 
              id="ficha-remocao-pagina-1" 
              className="ficha-page-1 bg-white border border-black p-3 sm:p-4 print:p-2 space-y-2 print:space-y-1 mb-6 print:mb-0 shadow-sm print:shadow-none mx-auto"
              style={{
                pageBreakAfter: 'always',
                breakAfter: 'page',
                boxSizing: 'border-box',
                width: '100%',
                maxWidth: '210mm',
              }}
            >
              
              {/* CABEÇALHO DO DOCUMENTO */}
              {form.modelo === 'servir' ? (
                <div className="border-b-2 border-black pb-2 mb-2">
                  <CabecalhoOficialServir compact={false} />
                </div>
              ) : (
                <div className="border border-black py-2.5 mb-2 text-center bg-slate-50">
                  <h1 className="text-sm sm:text-base font-black uppercase tracking-wider text-black">
                    FORMULÁRIO DE SOLICITAÇÃO DE REMOÇÃO
                  </h1>
                </div>
              )}

              {/* TABELA DE CAMPOS - PÁGINA 1 */}
              <div className="border border-black divide-y divide-black text-[11px] print:text-[8.5px] print:leading-[1.18]">
                
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

            {/* DIVISOR VISUAL DE PÁGINAS A4 (APENAS NA TELA - OCULTO EM IMPRESSÃO/PDF) */}
            <div className="print:hidden my-6 flex items-center justify-center gap-3">
              <div className="h-px bg-slate-300 flex-1 max-w-[140px]" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200">
                Fim da Página 1 (Frente) • Início da Página 2 (Verso)
              </span>
              <div className="h-px bg-slate-300 flex-1 max-w-[140px]" />
            </div>

            {/* PÁGINA 2: QUADRO CLÍNICO & ASSINATURAS */}
            <div 
              id="ficha-remocao-pagina-2" 
              className="ficha-page-2 bg-white border border-black p-3 sm:p-4 print:p-2 space-y-3 print:space-y-1.5 shadow-sm print:shadow-none mx-auto flex flex-col justify-between"
              style={{
                pageBreakBefore: 'always',
                breakBefore: 'page',
                boxSizing: 'border-box',
                width: '100%',
                maxWidth: '210mm',
              }}
            >
              
              <div className="space-y-3 flex-1 flex flex-col">
                {/* CABEÇALHO PÁGINA 2 */}
                {form.modelo === 'servir' ? (
                  <div className="border-b-2 border-black pb-2 mb-2">
                    <CabecalhoOficialServir compact={true} />
                  </div>
                ) : (
                  <div className="border border-black py-1.5 mb-2 text-center bg-slate-50">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black">
                      FORMULÁRIO DE SOLICITAÇÃO DE REMOÇÃO
                    </span>
                  </div>
                )}

                {/* TÍTULO QUADRO CLÍNICO */}
                <div className="border border-black font-bold text-center py-1.5 bg-slate-50 text-[11px] uppercase tracking-wide">
                  QUADRO CLÍNICO DO PACIENTE - JUSTIFICATIVA PARA A SOLICITAÇÃO DA REMOÇÃO
                </div>

                {/* ÁREA DE TEXTO / JUSTIFICATIVA CLÍNICA */}
                <div className="border border-black p-4 min-h-[460px] sm:min-h-[500px] flex-1 font-mono text-[11px] leading-relaxed whitespace-pre-wrap bg-white">
                  {form.quadroClinicoJustificativa || (
                    <div className="text-slate-400 italic">
                      (Espaço reservado para descrição detalhada da evolução clínica, diagnóstico, condições hemodinâmicas e justificativa técnica da necessidade de transporte em ambulância)
                    </div>
                  )}
                </div>
              </div>

              {/* RODAPÉ E ASSINATURAS */}
              <div className="border border-black divide-y divide-black text-[11px] mt-3">
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

      {/* MODAL DE PRÉ-VISUALIZAÇÃO DE IMPRESSÃO */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:hidden animate-fadeIn">
          <div className="bg-white w-full max-w-4xl h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            {/* Cabeçalho da Modal */}
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#1D787A] flex items-center justify-center text-white">
                  <Printer className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Pré-visualização de Impressão Oficial
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {form.modelo === 'servir' ? 'Modelo SERVIR • Governo do Tocantins' : 'Modelo Formulário de Solicitação de Remoção'} (2 Páginas A4)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const printFrame = document.getElementById('modal-pdf-iframe') as HTMLIFrameElement;
                    if (printFrame && printFrame.contentWindow) {
                      try {
                        printFrame.contentWindow.focus();
                        printFrame.contentWindow.print();
                        return;
                      } catch (e) {
                        console.warn('Iframe print error, falling back to window.print():', e);
                      }
                    }
                    window.print();
                  }}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#1D787A] hover:bg-[#165B5D] text-white shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Abrir tela de impressão"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir Agora</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowPrintModal(false);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Fechar pré-visualização"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Conteúdo da Modal: Documento em Iframe ou Embed PDF */}
            <div className="flex-1 bg-slate-100 p-2 sm:p-4 overflow-hidden flex flex-col">
              {previewPdfBlobUrl ? (
                <iframe
                  id="modal-pdf-iframe"
                  src={`${previewPdfBlobUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                  className="w-full h-full rounded-xl border border-slate-300 shadow-inner bg-white"
                  title="Pré-visualização do Documento para Impressão"
                />
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-[#1D787A]" />
                </div>
              )}
            </div>

            {/* Rodapé da Modal com ações */}
            <div className="px-5 py-3 bg-white border-t border-slate-200 flex items-center justify-between gap-3 text-xs text-slate-600">
              <span className="text-slate-500">
                Páginas 1 e 2 formatadas no padrão A4 oficial para conferência prévia.
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPrintModal(false)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 font-semibold hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const printFrame = document.getElementById('modal-pdf-iframe') as HTMLIFrameElement;
                    if (printFrame && printFrame.contentWindow) {
                      try {
                        printFrame.contentWindow.focus();
                        printFrame.contentWindow.print();
                        return;
                      } catch (e) {
                        console.warn('Iframe print error, falling back to window.print():', e);
                      }
                    }
                    window.print();
                  }}
                  className="px-4 py-1.5 rounded-xl bg-[#1D787A] hover:bg-[#165B5D] text-white font-bold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
