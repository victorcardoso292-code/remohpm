import { EmpresaAmbulancia, RamalInterno } from '../types/remocao';

export const empresasAmbulanciaData: EmpresaAmbulancia[] = [
  {
    id: 'caremed',
    nome: 'CARE MED SOLUTIONS 🚑🚨 (Maior Parceria HPM)',
    tipo: 'Operadora Principal de Remoções & Suporte Avançado / UTI Móvel',
    cidadesAtendidas: 'Palmas, Porto Nacional, Paraíso, Gurupi, Araguaína e todo o Tocantins',
    telefones: [
      '(63) 3322-1423 (WhatsApp / Atendimento)'
    ],
    whatsapp: '556333221423',
    emails: ['remocaocaremed@gmail.com'],
    tiposAmbulancia: ['Básica (Tipo B)', 'UTI Adulto (Tipo D)', 'UTI Neonatal/Pediátrica', 'UTI Aérea'],
    tempoMedioResposta: '15 a 20 minutos (Prioritário HPM)',
    procedimentoAcionamento: 'Solicitar autorização enviando os documentos obrigatórios para remocaocaremed@gmail.com ou acionar via WhatsApp (63) 3322-1423. Colocar SEMPRE em cópia: janaina.gomes@redemedical.com.br e hpm.recepcao@redemedical.com.br. A CARE MED solicitará a autorização ao convênio.',
    conveniosAtendidosDireto: ['SERVIR', 'GEAP', 'CASSI', 'BEST SÊNIOR', 'ASSEFAZ']
  },
  {
    id: 'lisscare',
    nome: 'LISS CARE REMOÇÕES MÉDICAS & HOME CARE',
    tipo: 'Empresa Privada de UTI Móvel e Suporte Básico',
    cidadesAtendidas: 'Palmas, Porto Nacional, Paraíso, Gurupi, Araguaína e todo o Tocantins',
    telefones: [
      'Telefone 24h: (63) 99104-9287',
      'Telefone comercial: (63) 98447-9504'
    ],
    whatsapp: '5563991049287',
    emails: ['lisscareremocao@gmail.com', 'contato@lisscare.com.br'],
    tiposAmbulancia: ['Básica (Tipo B)', 'UTI Adulto (Tipo D)', 'UTI Neonatal/Pediátrica'],
    tempoMedioResposta: '15 a 25 minutos em Palmas / Base central',
    procedimentoAcionamento: 'Solicitar autorização no site do convênio (SERVIR, GEAP, etc.), preencher o formulário de remoção e enviar para lisscareremocao@gmail.com ou acionar diretamente via WhatsApp nos plantões 24h e comercial.',
    conveniosAtendidosDireto: ['SERVIR', 'CASSI', 'BRADESCO', 'GEAP', 'BEST SENIOR', 'POSTAL SAÚDE', 'TRE-TO']
  },
  {
    id: 'impactomedica',
    nome: 'IMPACTO MÉDICA / REMOÇÃO SERVIR',
    tipo: 'Operadora de Transporte e Remoção SERVIR / Kora Saúde',
    cidadesAtendidas: 'Palmas, Araguaína, Gurupi e polos regionais do Tocantins',
    telefones: ['0800 911 4040', '63 3218-1200', '63 98400-3322 (Plantão SERVIR)'],
    whatsapp: '63984003322',
    emails: ['remocaoservir@impactomedica.com.br', 'atendimentoservir@impactomedica.com.br'],
    tiposAmbulancia: ['Básica (Tipo B)', 'UTI Adulto (Tipo D)', 'UTI Neonatal/Pediátrica'],
    tempoMedioResposta: '20 a 30 minutos',
    procedimentoAcionamento: 'Obrigatório o envio do formulário padrão do SERVIR para remocaoservir@impactomedica.com.br e acompanhamento no grupo WhatsApp.',
    conveniosAtendidosDireto: ['SERVIR', 'IMPACTO SAÚDE', 'ESTADO DO TOCANTINS']
  },
  {
    id: 'medlife',
    nome: 'MED LIFE EMERGENCIAS MÉDICAS',
    tipo: 'Rede de Ambulâncias Credenciada Bradesco / SulAmérica / Omint',
    cidadesAtendidas: 'Palmas, Brasília/DF, Goiânia e rotas interestaduais',
    telefones: ['61 3386-3480', '0800 701 2700'],
    whatsapp: '6133863480',
    emails: ['regulacao@medlifeemergencias.com.br', 'remocao@medlife.com.br'],
    tiposAmbulancia: ['Básica (Tipo B)', 'UTI Adulto (Tipo D)', 'UTI Neonatal/Pediátrica', 'UTI Aérea'],
    tempoMedioResposta: '30 a 45 minutos para interestadual',
    procedimentoAcionamento: 'Acionamento centralizado pela Central Bradesco Saúde (4004-4580) ou SulAmérica.',
    conveniosAtendidosDireto: ['BRADESCO SAÚDE', 'SUL AMÉRICA', 'OMINT', 'GOLDEN CROSS']
  },
  {
    id: 'vidaemergencia',
    nome: 'VIDA EMERGÊNCIA MÉDICA',
    tipo: 'Ambulâncias e Resgate Aeromédico Interestadual',
    cidadesAtendidas: 'Nacional / Regiões Centro-Oeste e Norte',
    telefones: ['61 3248-0008', '61 3248-3030 (Plantão Médico 24h)'],
    whatsapp: '6132480008',
    emails: ['central@vidaemergencia.com.br', 'plantao@vidaemergencia.com.br'],
    tiposAmbulancia: ['UTI Adulto (Tipo D)', 'UTI Neonatal/Pediátrica', 'UTI Aérea'],
    tempoMedioResposta: 'Sob agendamento / Urgência regulada',
    procedimentoAcionamento: 'Via central da operadora Bradesco/Omint ou contratação direta com laudo de liberação aeromédica.',
    conveniosAtendidosDireto: ['BRADESCO', 'OMINT', 'CASSI AÉREO', 'PARTICULAR']
  },
  {
    id: 'samu192',
    nome: 'SAMU 192 — CENTRAL DE REGULAÇÃO DE URGÊNCIA',
    tipo: 'Serviço Público de Atendimento Móvel de Urgência',
    cidadesAtendidas: 'Palmas e microrregião de urgência',
    telefones: ['192 (Central de Regulação)', '63 3218-5300 (Apoio Samu Palmas)'],
    emails: ['samu.palmas@saude.to.gov.br'],
    tiposAmbulancia: ['Básica (Tipo B)', 'UTI Adulto (Tipo D)', 'UTI Neonatal/Pediátrica'],
    tempoMedioResposta: 'Regulação por ordem de gravidade e despacho imediato',
    procedimentoAcionamento: 'Ligação direta para o 192. Contato médico com médico regulador para triagem e despacho da USA/USB.',
    conveniosAtendidosDireto: ['SUS', 'SEMUS', 'TODOS EM RISCO IMINENTE DE MORTE (VAGA ZERO)']
  }
];

export const ramaisInternosData: RamalInterno[] = [
  { setor: 'CENTRAL DE REMOÇÃO / REGULAÇÃO', ramal: '1888 / 1889', unidade: 'Palmas Medical', prioridade: 'urgencia', descricao: 'Regulação interna e contato com ambulâncias' },
  { setor: 'RECEPÇÃO PRONTO-SOCORRO', ramal: '1878', unidade: 'Palmas Medical', prioridade: 'urgencia', descricao: 'Acolhimento e abertura de guias TISS' },
  { setor: 'PS ADULTO (MÉDICOS)', ramal: '1860', unidade: 'Palmas Medical', prioridade: 'urgencia', descricao: 'Posto médico do Pronto Socorro Adulto' },
  { setor: 'PS INFANTIL / PEDIATRIA', ramal: '1849', unidade: 'Palmas Medical', prioridade: 'urgencia', descricao: 'Atendimento pediátrico' },
  { setor: 'UTI ADULTO GERAL (UTI A)', ramal: '1894', unidade: 'Palmas Medical', prioridade: 'urgencia', descricao: 'Posto de enfermagem UTI A' },
  { setor: 'UTI ADULTO GERAL (UTI B)', ramal: '1893', unidade: 'Palmas Medical', prioridade: 'urgencia', descricao: 'Posto de enfermagem UTI B' },
  { setor: 'UTI ADULTO CORONARIANA (UTI C)', ramal: '1885', unidade: 'Palmas Medical', prioridade: 'urgencia', descricao: 'Posto de enfermagem UTI C' },
  { setor: 'UTI NEONATAL / MATERNIDADE', ramal: '1887', unidade: 'Palmas Medical', prioridade: 'urgencia', descricao: 'Isolamento e leitos neonatais' },
  { setor: 'CENTRO CIRÚRGICO (CC)', ramal: '1822', unidade: 'Palmas Medical', prioridade: 'urgencia', descricao: 'Apoio cirúrgico' },
  { setor: 'HEMODINÂMICA / CATETERISMO', ramal: '1868', unidade: 'Palmas Medical', prioridade: 'urgencia', descricao: 'Salas de procedimentos invasivos' },
  { setor: 'RX / RADIOLOGIA / TOMOGRAFIA', ramal: '1874', unidade: 'Palmas Medical', prioridade: 'suporte', descricao: 'Agendamento de exames e laudos' },
  { setor: 'ULTRASSONOGRAFIA (USG)', ramal: '1820', unidade: 'Palmas Medical', prioridade: 'suporte', descricao: 'Salas de ecografia e doppler' },
  { setor: 'LABORATÓRIO DE ANÁLISES', ramal: '1817 / 1853', unidade: 'Palmas Medical', prioridade: 'suporte', descricao: 'Resultados e gasometria' },
  { setor: 'FARMÁCIA CENTRAL (CC)', ramal: '1824', unidade: 'Palmas Medical', prioridade: 'suporte', descricao: 'Kits de transporte e medicações' },
  { setor: 'FARMÁCIA MEZANINO', ramal: '1896', unidade: 'Palmas Medical', prioridade: 'suporte', descricao: 'Dispensação geral' },
  { setor: '2º ANDAR / INTERNAÇÃO', ramal: '1886', unidade: 'Palmas Medical', prioridade: 'suporte', descricao: 'Posto de enfermagem do 2º andar' },
  { setor: 'RECEPÇÃO 2º ANDAR', ramal: '1801', unidade: 'Palmas Medical', prioridade: 'administrativo', descricao: 'Check-in de internações eletivas' },
  { setor: 'CME (ESTERILIZAÇÃO)', ramal: '1834', unidade: 'Palmas Medical', prioridade: 'suporte', descricao: 'Materiais esterilizados' },
  { setor: 'GERÊNCIA DE ENFERMAGEM', ramal: '1826', unidade: 'Palmas Medical', prioridade: 'administrativo', descricao: 'Supervisão assistencial' },
  { setor: 'ORÇAMENTO & FATURAMENTO', ramal: '1824', unidade: 'Palmas Medical', prioridade: 'administrativo', descricao: 'Contas hospitalares e TISS' },
  { setor: 'TI / SUPORTE SISTEMAS', ramal: '1805', unidade: 'Palmas Medical', prioridade: 'administrativo', descricao: 'Suporte a sistemas e portais' },
  { setor: 'MANUTENÇÃO PREDIAL', ramal: '1830', unidade: 'Palmas Medical', prioridade: 'suporte', descricao: 'Gases medicinais e oxigênio' },
  { setor: 'ALMOXARIFADO', ramal: '1833', unidade: 'Palmas Medical', prioridade: 'administrativo', descricao: 'Suprimentos e insumos' }
];
