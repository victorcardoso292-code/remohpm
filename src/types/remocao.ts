export type CategoriaPlano = 'privado' | 'autogestao' | 'militar_publico' | 'estadual_municipal' | 'outro';

export type StatusCobertura = 'sim' | 'parcial' | 'apenas_urgencia' | 'email' | 'nao';

export type TipoAmbulancia = 'basica' | 'uti_adulto' | 'uti_neo_ped' | 'aerea';

export interface CodigoRemocao {
  codigo: string;
  descricao: string;
  tipo: 'basica' | 'uti' | 'km' | 'aerea' | 'espera' | 'outro';
  observacao?: string;
  valorEstimado?: string;
}

export interface CredencialAcesso {
  label: string;
  valor: string;
  link?: boolean;
  mask?: boolean;
}

export interface PlanoRemocao {
  id: string;
  numero: string; // Ex: "01", "02", "25"
  nome: string;
  categoria: CategoriaPlano;
  badge: string;
  statusCobertura: StatusCobertura;
  statusTexto: string;
  tipoAmbulanciaSuportada: TipoAmbulancia[];
  exigeToken: boolean;
  exigeAssinatura: boolean;
  prazoResposta: string;
  empresaCredenciadaPrincipal: string;
  portalUrl?: string;
  logins: CredencialAcesso[];
  telefones: string[];
  emails: string[];
  codigosRemocao: CodigoRemocao[];
  regrasAutorizacao: string[];
  checklistDocumentos: string[];
  observacoesCriticas: string[];
  fluxoPassoAPasso: string[];
}

export interface CodigoTussGeral {
  codigo: string;
  termo: string;
  categoria: 'Urbana Básica' | 'Urbana UTI' | 'Intermunicipal' | 'Aérea' | 'Equipe/Taxas' | 'Pacote Próprio';
  suporte: 'Suporte Básico (B)' | 'Suporte Avançado / UTI (D)' | 'Neonatal / Pediátrico' | 'Aéreo' | 'Adicional / Km';
  descricaoDetalhada: string;
  indicacoes: string;
  regrasAutorizacao: string;
}

export interface EmpresaAmbulancia {
  id: string;
  nome: string;
  tipo: string;
  cidadesAtendidas: string;
  telefones: string[];
  whatsapp?: string;
  emails: string[];
  tiposAmbulancia: ('Básica (Tipo B)' | 'UTI Adulto (Tipo D)' | 'UTI Neonatal/Pediátrica' | 'UTI Aérea')[];
  tempoMedioResposta: string;
  procedimentoAcionamento: string;
  conveniosAtendidosDireto: string[];
}

export interface RamalInterno {
  setor: string;
  ramal: string;
  unidade: string;
  descricao?: string;
  prioridade?: 'urgencia' | 'suporte' | 'administrativo';
}

export interface FichaRemocaoData {
  pacienteNome: string;
  idade: string;
  sexo: string;
  matriculaPlano: string;
  planoId: string;
  convenioNome?: string;
  empresaRemocao?: 'lisscare' | 'caremed' | 'outra';
  horario: string;
  data: string;
  comMedico: 'sem_medico' | 'com_medico';
  hospitalOrigem: string;
  setorOrigem: string;
  leitoOrigem: string;
  hospitalDestino: string;
  cidadeDestino: string;
  medicoSolicitante: string;
  crmSolicitante: string;
  diagnosticoPrincipal: string;
  cid10: string;
  temComorbidades: boolean;
  qualComorbidade?: string;
  frequenciaCardiaca: string;
  frequenciaRespiratoria: string;
  saturacaoO2: string;
  pressaoArterial: string;
  temperatura: string;
  viaAerea: 'ar_ambiente' | 'cateter_nasal' | 'mascara_o2' | 'vni' | 'hood' | 'tot' | 'tqt' | 'outros';
  viaAereaOutros?: string;
  drogasBombaInfusao: boolean;
  drogasBombaQual?: string;
  precaucaoContato: boolean;
  precaucaoContatoQual?: string;
  exameProcedimento: string;
  tipoTrajeto: 'ida' | 'ida_e_volta';
  tipoTransporte: 'basica' | 'uti_adulto' | 'uti_neo_ped' | 'aerea';
  nivelConsciencia: 'Alerta' | 'Sonolento' | 'Sedado (RASS -4/-5)' | 'Coma';
  suporteVentilatorio: 'Ar Ambiente' | 'Cateter O2 / Máscara' | 'Ventilação Mecânica (IOT)' | 'Traqueostomia';
  drogasVasoativas: string;
  precisaIsolamento: boolean;
  motivoIsolamento?: string;
  temVagaConfirmada: boolean;
  contatoDestino: string;
  observacoesClinicas: string;
  dataHora: string;
}
