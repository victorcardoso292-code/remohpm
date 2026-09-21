import { CodigoTussGeral } from '../types/remocao';

export const codigosTussGerais: CodigoTussGeral[] = [
  {
    codigo: '60501002',
    termo: 'REMOÇÃO EM AMBULÂNCIA COM MÉDICO (UTI MÓVEL) DENTRO DO MUNICÍPIO',
    categoria: 'Urbana UTI',
    suporte: 'Suporte Avançado / UTI (D)',
    descricaoDetalhada: 'Transporte inter-hospitalar de pacientes de alto risco, instáveis ou sob suporte de vida (ventilação mecânica, drogas vasoativas, monitorização contínua ou pós-operatório imediato). Tripulada por médico, enfermeiro e motorista socorrista.',
    indicacoes: 'Pacientes em UTI, intubados, com TCE moderado/grave, choque séptico/cardiogênico, coronariopatia instável ou politraumatizados.',
    regrasAutorizacao: 'Exige relatório médico com indicação explícita da necessidade de médico a bordo, escala de Glasgow e suporte hemodinâmico.'
  },
  {
    codigo: '60501001',
    termo: 'REMOÇÃO EM AMBULÂNCIA SEM MÉDICO (BÁSICA / TIPO B) DENTRO DO MUNICÍPIO',
    categoria: 'Urbana Básica',
    suporte: 'Suporte Básico (B)',
    descricaoDetalhada: 'Transporte de pacientes estáveis que não apresentam risco de vida iminente nem necessitam de intervenção médica ativa no trajeto, mas necessitam de maca ou transporte especial.',
    indicacoes: 'Pacientes acamados estáveis, transferências de enfermaria para enfermaria, desospitalização/alta e transporte para exames de imagem externos simples.',
    regrasAutorizacao: 'Geralmente autorizada de forma rápida ou automática para associados com cobertura de transporte.'
  },
  {
    codigo: '60501010',
    termo: 'REMOÇÃO INTERMUNICIPAL COM MÉDICO — VALOR POR QUILÔMETRO RODADO',
    categoria: 'Intermunicipal',
    suporte: 'Suporte Avançado / UTI (D)',
    descricaoDetalhada: 'Cobrança do deslocamento intermunicipal ou interestadual de UTI Móvel calculada pela quilometragem total percorrida (ida e volta da base).',
    indicacoes: 'Transferência de pacientes de cidades do interior (Gurupi, Araguaína, Porto Nacional, Paraíso) para a capital Palmas ou vice-versa.',
    regrasAutorizacao: 'Necessita envio prévio da rota (Google Maps / Odômetro) e autorização expressa da gerência de regulação da operadora.'
  },
  {
    codigo: '60501011',
    termo: 'REMOÇÃO INTERMUNICIPAL SEM MÉDICO (BÁSICA) — POR KM RODADO',
    categoria: 'Intermunicipal',
    suporte: 'Suporte Básico (B)',
    descricaoDetalhada: 'Transporte de pacientes estáveis entre diferentes municípios com cobrança por quilômetro rodado.',
    indicacoes: 'Retorno para domicílio de origem ou transferência eletiva de baixa complexidade.',
    regrasAutorizacao: 'Autorização concedida após comprovação de que o município de destino possui estrutura de retaguarda.'
  },
  {
    codigo: '60501029',
    termo: 'REMOÇÃO AEROMÉDICA EM UTI AÉREA / JATO EXECUTIVO',
    categoria: 'Aérea',
    suporte: 'Aéreo',
    descricaoDetalhada: 'Transporte aéreo em aeronave pressurizada com configuração de UTI completa (ventilador pulmonar de transporte, desfibrilador, oxigênio de alta autonomia e equipe especializada aeroespacial).',
    indicacoes: 'Distâncias superiores a 300-400 km com paciente instável onde o tempo de transporte terrestre seria prejudicial à vida do paciente (ex.: transferência Palmas -> Brasília, Goiânia, São Paulo).',
    regrasAutorizacao: 'Regulação médica nacional da operadora, laudo médico bilíngue (se internacional), aeroporto homologado e equipe de solo em ambas as extremidades.'
  },
  {
    codigo: '60501037',
    termo: 'TAXA DE ESPERA DE AMBULÂNCIA / EQUIPE MÉDICA (POR HORA)',
    categoria: 'Equipe/Taxas',
    suporte: 'Adicional / Km',
    descricaoDetalhada: 'Taxa remuneratória quando a viatura e a equipe precisam permanecer no hospital ou centro de diagnóstico aguardando a realização de exames ou estabilização para retorno.',
    indicacoes: 'Exames de Ressonância Magnética com sedação fora da unidade de internação ou atraso justificado no leito de destino.',
    regrasAutorizacao: 'Geralmente a 1ª hora está inclusa no pacote; cobrança a partir da 2ª hora com registro de ponto na ficha de atendimento.'
  },
  {
    codigo: '60033681',
    termo: 'TAXA DE SALA DE OBSERVAÇÃO / ESTABILIZAÇÃO PRÉ-TRANSPORTE (ATÉ 6H)',
    categoria: 'Equipe/Taxas',
    suporte: 'Adicional / Km',
    descricaoDetalhada: 'Permanência do paciente no box de emergência enquanto aguarda liberação de leito ou chegada da ambulância de suporte avançado.',
    indicacoes: 'Pacientes em trânsito no Pronto-Socorro antes do embarque na ambulância.',
    regrasAutorizacao: 'Não solicitar simultaneamente com diária de internação integral no mesmo horário.'
  },
  {
    codigo: '10104020',
    termo: 'ATENDIMENTO MÉDICO DO INTENSIVISTA NO TRANSPORTE (PLANTÃO / TRANSPORTE)',
    categoria: 'Equipe/Taxas',
    suporte: 'Suporte Avançado / UTI (D)',
    descricaoDetalhada: 'Honorários do médico assistente intensivista dedicado ao transporte do paciente grave.',
    indicacoes: 'Acompanhamento exclusivo de paciente em ventilação mecânica ou monitorização hemodinâmica invasiva.',
    regrasAutorizacao: 'Cobrado conforme tabela de honorários médicos da operadora.'
  },
  {
    codigo: '0301060088',
    termo: 'SUS: TRANSFERÊNCIA INTER-HOSPITALAR COM SUPORTE AVANÇADO (USA)',
    categoria: 'Pacote Próprio',
    suporte: 'Suporte Avançado / UTI (D)',
    descricaoDetalhada: 'Código da Tabela SIGTAP do SUS para transferência inter-hospitalar de paciente crítico em viatura USA do SAMU 192 ou contratualizada pela SES-TO.',
    indicacoes: 'Regulação estadual via SISREG / NIR para leitos de alta complexidade (HGP, HDT, Maternidade Dona Regina).',
    regrasAutorizacao: 'Autorização exclusiva pelo Médico Regulador do SAMU / SES-TO.'
  },
  {
    codigo: '0301060070',
    termo: 'SUS: TRANSFERÊNCIA INTER-HOSPITALAR COM SUPORTE BÁSICO (USB)',
    categoria: 'Pacote Próprio',
    suporte: 'Suporte Básico (B)',
    descricaoDetalhada: 'Código SIGTAP do SUS para transferência em viatura USB com técnico de enfermagem e socorrista.',
    indicacoes: 'Transferência de pacientes estáveis entre UPAs e Hospitais de Retaguarda.',
    regrasAutorizacao: 'Inserção obrigatória na fila da Central de Regulação de Leitos.'
  }
];
