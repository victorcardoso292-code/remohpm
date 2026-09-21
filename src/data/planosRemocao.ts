import { PlanoRemocao } from '../types/remocao';

export const planosRemocaoData: PlanoRemocao[] = [
  {
    id: 'amil',
    numero: '01',
    nome: 'AMIL',
    categoria: 'privado',
    badge: 'AM',
    statusCobertura: 'sim',
    statusTexto: 'Autorização obrigatória no Portal + Token',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped', 'aerea'],
    exigeToken: true,
    exigeAssinatura: true,
    prazoResposta: 'Imediato no portal ou até 2h para UTI intermunicipal',
    empresaCredenciadaPrincipal: 'LISS CARE / Central AMIL',
    portalUrl: 'https://credenciado.amil.com.br/login',
    logins: [
      { label: 'Código do Prestador', valor: '40830624' },
      { label: 'Usuário Principal', valor: '40830624' },
      { label: 'Senha Principal', valor: '6n91a5izud', mask: true },
      { label: '2ª Opção — CPF', valor: '043.182.841-58' },
      { label: '2ª Opção — Usuário', valor: '40830624w8' },
      { label: '2ª Opção — Senha', valor: '40830624w8', mask: true },
      { label: 'E-mail para Redefinição', valor: 'hpm.recepção@redemedical.com.br' }
    ],
    telefones: [
      '3003-2702 (Central de Autorização)',
      '0800 727 2288 (Gratuito)',
      '3004-1028 (Apoio Médico / Urgência 24h)',
      '0800 721 1028 (Regulação de Leitos)',
      '3004-1050 (Atendimento Corporativo das 07h às 19h)'
    ],
    emails: [
      'hospitaisnacionaisrj@amil.com.br',
      'ana.marques@amil.com.br',
      'remocao.amil@redemedical.com.br'
    ],
    codigosRemocao: [
      { codigo: '60501002', descricao: 'Remoção em Ambulância com Médico / UTI Móvel dentro do município', tipo: 'uti', valorEstimado: 'Conforme pacote credenciado' },
      { codigo: '60501001', descricao: 'Remoção em Ambulância Simples / Sem Médico dentro do município', tipo: 'basica', valorEstimado: 'Tabela própria AMIL' },
      { codigo: '60501010', descricao: 'Remoção Intermunicipal em UTI Móvel — por quilômetro rodado', tipo: 'km', observacao: 'Exige justificativa clínica circunstanciada' },
      { codigo: '60501029', descricao: 'Remoção Aeromédica / UTI Aérea Interestadual', tipo: 'aerea', observacao: 'Exclusivo para casos de alta complexidade com regulação nacional' }
    ],
    regrasAutorizacao: [
      'Antes de solicitar a remoção, realize a consulta de elegibilidade do paciente no portal.',
      'OBRIGATÓRIO solicitar o TOKEN no momento do atendimento para validação da guia autorizada.',
      'A remoção inter-hospitalar em UTI Móvel requer relatório médico detalhado indicando necessidade de suporte hemodinâmico ou ventilatório.',
      'Para transferências eletivas ou de retorno à residência, verificar se o contrato do beneficiário possui aditivo de transporte.',
      'O paciente ou responsável deve assinar obrigatoriamente a Guia TISS impressa gerada no portal.'
    ],
    checklistDocumentos: [
      'Relatório Médico de Transferência assinado e carimbado com CRM',
      'Guia SP/SADT de Remoção preenchida',
      'Confirmação de vaga e leito no hospital de destino (Vaga Zero ou Contato do Médico Receptor)',
      'Termo de Consentimento Informado para Transporte',
      'Cópias dos exames recentes (laboratório, gasometria, TC/RX) para a equipe da ambulância'
    ],
    observacoesCriticas: [
      'NUNCA liberar a ambulância sem a emissão do número de autorização (senha TISS) e validação do TOKEN.',
      'Em caso de instabilidade grave com risco iminente de morte no PS, acionar a Linha Direta Médica 3004-1028.'
    ],
    fluxoPassoAPasso: [
      '1. Acessar o Portal Credenciado AMIL e selecionar "Consulta de Elegibilidade".',
      '2. Selecionar Tipo de Atendimento: SP/SADT e Caráter: Urgência / Emergência.',
      '3. Informar o médico solicitante e selecionar o código 60501002 (com médico) ou 60501001 (sem médico).',
      '4. Anexar o relatório médico escaneado e justificativa de remoção.',
      '5. Concluir solicitação e aguardar liberação da senha.',
      '6. Imprimir guia autorizada, colher assinatura do responsável e coletar o TOKEN.',
      '7. Acionar a empresa de ambulância (LISS CARE / Prestador Credenciado) com a guia autorizada.'
    ]
  },
  {
    id: 'assefaz',
    numero: '02',
    nome: 'ASSEFAZ',
    categoria: 'autogestao',
    badge: 'AF',
    statusCobertura: 'sim',
    statusTexto: 'A remoção dentro do município deve ser solicitada preferencialmente à empresa CARE MED SOLUTIONS (Maior Parceria HPM) ou à LISS CARE.',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Acionamento imediato por e-mail ou WhatsApp à CARE MED',
    empresaCredenciadaPrincipal: 'CARE MED SOLUTIONS (remocaocaremed@gmail.com) / LISS CARE',
    portalUrl: 'https://novowebplanassefaz.facilinformatica.com.br/GuiasTISS/Logon',
    logins: [
      { label: 'Login MEDICAL', valor: '12955953000192' },
      { label: 'Senha MEDICAL', valor: '12955953000192', mask: true },
      { label: 'Login SANTA THEREZA', valor: '25016319000136' },
      { label: 'Senha SANTA THEREZA', valor: 'ASSEFAZ2025', mask: true }
    ],
    telefones: [
      '(63) 3322-1423 (CareMed Solutions - WhatsApp)',
      '(63) 99104-9287 (LissCare Plantão 24h)',
      '(63) 98447-9504 (LissCare Comercial)',
      '0800 703 4000 (Central ASSEFAZ 24h)',
      '63 3215-2000 (Regional TO)'
    ],
    emails: [
      'remocaocaremed@gmail.com',
      'lisscareremocao@gmail.com',
      'autorizacao.to@assefaz.org.br'
    ],
    codigosRemocao: [
      { codigo: '60501002', descricao: 'Remoção com Médico / Suporte Avançado', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Simples / Suporte Básico', tipo: 'basica' },
      { codigo: '10101039', descricao: 'Consulta em Pronto Socorro (procedimento base da guia)', tipo: 'outro' }
    ],
    regrasAutorizacao: [
      'Enviar a documentação do paciente para a CARE MED SOLUTIONS ou LISS CARE.',
      'A empresa de ambulância solicitará a autorização ao plano ASSEFAZ.',
      'Manter cópia dos e-mails institucionais do HPM.'
    ],
    checklistDocumentos: [
      '1. Pedido Médico',
      '2. Cópia da carteira do plano ASSEFAZ',
      '3. Cópia do documento com foto'
    ],
    observacoesCriticas: [
      'Sempre colocar em cópia: janaina.gomes@redemedical.com.br e hpm.recepcao@redemedical.com.br'
    ],
    fluxoPassoAPasso: [
      '1. Reunir os documentos obrigatórios: 1) Pedido Médico; 2) Cópia da carteira do plano ASSEFAZ; 3) Cópia do documento com foto.',
      '2. Enviar e-mail para remocaocaremed@gmail.com (ou WhatsApp 63 3322-1423) com cópia para janaina.gomes@redemedical.com.br e hpm.recepcao@redemedical.com.br.',
      '3. A CARE MED SOLUTIONS solicitará a autorização ao plano ASSEFAZ para a remoção do paciente.'
    ]
  },
  {
    id: 'bradesco',
    numero: '03',
    nome: 'BRADESCO',
    categoria: 'privado',
    badge: 'BR',
    statusCobertura: 'sim',
    statusTexto: 'A remoção dentro do município deve ser solicitada à empresa LISS CARE.',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped', 'aerea'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Acionamento imediato por e-mail à LISS CARE',
    empresaCredenciadaPrincipal: 'LISS CARE (lisscareremocao@gmail.com)',
    portalUrl: 'https://www.bradescoseguros.com.br/clientes/produtos/plano-saude',
    logins: [
      { label: 'Código Referenciado', valor: '417815' },
      { label: 'Login MEDICAL', valor: 'CPF + 12955953000192' },
      { label: 'Senha MEDICAL', valor: 'PESSOAL', mask: true },
      { label: 'Login SANTA THEREZA', valor: 'CPF + 25016319000136' },
      { label: 'Senha SANTA THEREZA', valor: 'PESSOAL', mask: true },
      { label: 'Portal Orizon', valor: 'https://www.polimed.com.br/autenticadorOrizon/loginAutenticador', link: true }
    ],
    telefones: [
      '(63) 99104-9287 (LissCare Plantão 24h)',
      '(63) 98447-9504 (LissCare Comercial)',
      '4004-4580 (Central de Autorização e Remoção Bradesco 24h)',
      '0800 701 2700 (Demais Regiões)'
    ],
    emails: [
      'lisscareremocao@gmail.com',
      'bk.remocao@bradesco.com.br',
      'autorizacoes.urgencia@bradesco.com.br'
    ],
    codigosRemocao: [
      { codigo: '84000406', descricao: 'Pacote Pronto Socorro Adulto (inclui remoção regulada pelo plano)', tipo: 'uti' },
      { codigo: '84000147', descricao: 'Pacote Pronto Socorro Pediatria', tipo: 'uti' },
      { codigo: '60501002', descricao: 'Remoção Terrestre UTI Móvel (TUSS)', tipo: 'uti' },
      { codigo: '60501029', descricao: 'Remoção Aérea / Medevac', tipo: 'aerea' }
    ],
    regrasAutorizacao: [
      'A remoção inter-hospitalar deve ser solicitada à empresa LISS CARE.',
      'A LISS CARE solicitará à Bradesco Saúde a autorização para a remoção do paciente.'
    ],
    checklistDocumentos: [
      '1. Pedido Médico',
      '2. Cópia da carteira do plano BRADESCO',
      '3. Cópia do documento com foto'
    ],
    observacoesCriticas: [
      'Sempre colocar em cópia: janaina.gomes@redemedical.com.br e hpm.recepcao@redemedical.com.br'
    ],
    fluxoPassoAPasso: [
      '1. Reunir os documentos obrigatórios: 1) Pedido Médico; 2) Cópia da carteira do plano BRADESCO; 3) Cópia do documento com foto.',
      '2. Enviar e-mail para a EMPRESA LISS CARE no endereço: lisscareremocao@gmail.com solicitando a remoção dentro do município com os documentos em anexo (colocar sempre em cópia: janaina.gomes@redemedical.com.br e hpm.recepcao@redemedical.com.br).',
      '3. A LISS CARE solicitará à BRADESCO SAÚDE a autorização para a remoção do paciente.'
    ]
  },
  {
    id: 'caixa',
    numero: '04',
    nome: 'CAIXA',
    categoria: 'autogestao',
    badge: 'CX',
    statusCobertura: 'sim',
    statusTexto: 'Autorizador Caixa + Termo de Ciência se pendente',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Análise de urgência (pode exigir termo de responsabilidade)',
    empresaCredenciadaPrincipal: 'LISS CARE / Impacto Médica',
    portalUrl: 'https://credenciadosaude.caixa.gov.br/login.aspx',
    logins: [
      { label: 'Portal MEDICAL', valor: 'https://credenciadosaude.caixa.gov.br/login.aspx', link: true },
      { label: 'Login MEDICAL', valor: 'a12955953000192' },
      { label: 'Senha MEDICAL', valor: 'Medical@1234', mask: true },
      { label: 'Portal SANTA THEREZA', valor: 'https://saude.caixa.gov.br/autorizadorprd/login.aspx', link: true },
      { label: 'Login SANTA THEREZA', valor: 'a25016319000136' },
      { label: 'Senha SANTA THEREZA', valor: 'Saude@1234', mask: true }
    ],
    telefones: [
      '0800 095 6094 (Central Saúde Caixa 24h)',
      '61 99186-5878 (Plantão Regulador / WhatsApp)',
      '0800 721 0101 (Suporte Caixa)'
    ],
    emails: [
      'centralsaudecaixa.com.br',
      'autorizacao.caixa@redemedical.com.br'
    ],
    codigosRemocao: [
      { codigo: '98800124', descricao: 'Consulta em PS Saúde Caixa + Procedimentos integrados', tipo: 'outro' },
      { codigo: '60501002', descricao: 'Remoção Terrestre com Médico / UTI', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Simples / Básico', tipo: 'basica' }
    ],
    regrasAutorizacao: [
      'Solicitar no portal do Saúde Caixa anexando print da tela de autorização no prontuário.',
      'Caso a autorização demore no sistema, o POP orienta anexar Termo de Ciência de Débito e Consentimento para continuidade da assistência sem prejuízo à vida do paciente.',
      'Beneficiários com status RESTRITO possuem cobertura apenas para urgências comprovadas.'
    ],
    checklistDocumentos: [
      'Relatório médico circunstanciado com CID-10 e justificativa',
      'Termo de consentimento e ciência assinado pelo acompanhante',
      'Print da tela de envio da solicitação no portal Saúde Caixa',
      'Comprovante de vaga no destino'
    ],
    observacoesCriticas: [
      'Sempre notificar a auditoria in loco da Saúde Caixa sobre internações e remoções de UTI.'
    ],
    fluxoPassoAPasso: [
      '1. Entrar no portal com usuário do prestador (a12955953000192).',
      '2. Abrir solicitação de Remoção / SP-SADT em caráter de Urgência.',
      '3. Inserir código 60501002 e anexar pedido médico.',
      '4. Salvar protocolo e anexar print ao prontuário.',
      '5. Se houver demora na senha, acionar o plantão regulador 61 99186-5878.'
    ]
  },
  {
    id: 'capesesp',
    numero: '05',
    nome: 'CAPESESP',
    categoria: 'autogestao',
    badge: 'CP',
    statusCobertura: 'sim',
    statusTexto: 'Solicitar autorização em todos os pedidos',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Até 2h em dias úteis; plantão 24h',
    empresaCredenciadaPrincipal: 'LISS CARE',
    telefones: [
      '0800 979 6191 (Central Capesaúde 24h)',
      '0800 722 6191 (Ouvidoria)'
    ],
    emails: [
      'autorizacoes@capesesp.com.br',
      'regulacao.norte@capesesp.com.br'
    ],
    logins: [
      { label: 'Portal', valor: 'portal.capesesp.com.br', link: true },
      { label: 'Código Prestador', valor: '12955953000192' },
      { label: 'Central 24h', valor: '0800 979 6191' }
    ],
    codigosRemocao: [
      { codigo: '10101039', descricao: 'Consulta Pronto Socorro', tipo: 'outro' },
      { codigo: '60501002', descricao: 'Remoção Terrestre com Médico / UTI', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Básica sem Médico', tipo: 'basica' }
    ],
    regrasAutorizacao: [
      'Solicitar autorização prévia por e-mail ou portal em todas as solicitações de remoção.',
      'O transporte para realização de exames fora da unidade hospitalar deve ser acordado previamente.',
      'Assinatura obrigatória do responsável.'
    ],
    checklistDocumentos: [
      'Laudo médico com CRM e telefone do médico assistente',
      'Cópia da carteira Capesesp e documento oficial',
      'Ficha de solicitação de transporte preenchida'
    ],
    observacoesCriticas: [
      'Aguardar validação da central Capesaúde antes do acionamento final da viatura.'
    ],
    fluxoPassoAPasso: [
      '1. Entrar em contato com o 0800 979 6191 e enviar documentação para autorizacoes@capesesp.com.br.',
      '2. Informar se a remoção é para transferência definitiva ou para exame.',
      '3. Aguardar envio do número da autorização e confirmar saída com a LISS CARE.'
    ]
  },
  {
    id: 'cassi',
    numero: '06',
    nome: 'CASSI',
    categoria: 'autogestao',
    badge: 'CS',
    statusCobertura: 'sim',
    statusTexto: 'A remoção dentro do município deve ser solicitada preferencialmente à empresa CARE MED SOLUTIONS (Maior Parceria HPM) ou à LISS CARE.',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped', 'aerea'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Acionamento imediato por e-mail ou WhatsApp à CARE MED',
    empresaCredenciadaPrincipal: 'CARE MED SOLUTIONS (remocaocaremed@gmail.com) / LISS CARE',
    portalUrl: 'https://www.polimed.com.br/autenticadorOrizon/loginAutenticador',
    logins: [
      { label: 'Login MEDICAL', valor: '12955953000192' },
      { label: 'Senha MEDICAL', valor: 'Hpm2025hpm@', mask: true },
      { label: 'Código Prestador CASSI', valor: '2120820' }
    ],
    telefones: [
      '(63) 3322-1423 (CareMed Solutions - WhatsApp)',
      '(63) 99104-9287 (LissCare Plantão 24h)',
      '(63) 98447-9504 (LissCare Comercial)',
      '0800 729 0090 (Central CASSI 24h)',
      '4004-4550 (Capitais e Regiões Metropolitanas)'
    ],
    emails: [
      'remocaocaremed@gmail.com',
      'lisscareremocao@gmail.com',
      'go.negociacao@cassi.com.br',
      'central.opme@cassi.com.br'
    ],
    codigosRemocao: [
      { codigo: '60501002', descricao: 'Remoção Terrestre em UTI Móvel (Com Médico)', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Terrestre em Ambulância Básica (Sem Médico)', tipo: 'basica' },
      { codigo: '60501029', descricao: 'Remoção Aérea com UTI Aeromédica', tipo: 'aerea' }
    ],
    regrasAutorizacao: [
      'Enviar os documentos obrigatórios para a CARE MED SOLUTIONS ou LISS CARE.',
      'A empresa de ambulância solicitará a autorização ao plano CASSI para a remoção do paciente.',
      'Manter os e-mails da recepção e supervisão do HPM em cópia.'
    ],
    checklistDocumentos: [
      '1. Pedido Médico',
      '2. Cópia da carteira do plano CASSI',
      '3. Cópia do documento com foto'
    ],
    observacoesCriticas: [
      'Sempre colocar em cópia: janaina.gomes@redemedical.com.br e hpm.recepcao@redemedical.com.br'
    ],
    fluxoPassoAPasso: [
      '1. Reunir os documentos obrigatórios: 1) Pedido Médico; 2) Cópia da carteira do plano CASSI; 3) Cópia do documento com foto.',
      '2. Enviar e-mail para a EMPRESA CARE MED SOLUTIONS no endereço: remocaocaremed@gmail.com (ou WhatsApp 63 3322-1423) com cópia para janaina.gomes@redemedical.com.br e hpm.recepcao@redemedical.com.br.',
      '3. A CARE MED SOLUTIONS solicitará a autorização ao plano CASSI para a remoção do paciente.'
    ]
  },
  {
    id: 'conab',
    numero: '07',
    nome: 'CONAB',
    categoria: 'autogestao',
    badge: 'CN',
    statusCobertura: 'apenas_urgencia',
    statusTexto: 'Urgência direta sem autorização prévia / Eletivo por e-mail',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Imediato no PS; Notificar auditores no dia seguinte se fora do horário',
    empresaCredenciadaPrincipal: 'LISS CARE',
    portalUrl: 'https://www.gov.br/conab/pt-br',
    logins: [
      { label: 'Login / CNPJ', valor: '12955953000192' },
      { label: 'Senha', valor: 'Medical2026', mask: true }
    ],
    telefones: [
      '63 3228-8412 (Regional CONAB Palmas)',
      '63 3228-8433 (Superintendência TO)',
      '61 3312-6000 (Central DF)'
    ],
    emails: [
      'to.seade@conab.gov.br',
      'conab.saude@conab.gov.br'
    ],
    codigosRemocao: [
      { codigo: '10101039', descricao: 'Consulta em Pronto Socorro', tipo: 'outro' },
      { codigo: '60501002', descricao: 'Remoção Terrestre UTI Móvel', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Básica Sem Médico', tipo: 'basica' }
    ],
    regrasAutorizacao: [
      'Não exige cartão magnético físico; beneficiário apresenta documento com foto e CPF para validação no sistema.',
      'Em urgências no Pronto-Socorro, pode realizar o atendimento e remoção de imediato com pedido médico.',
      'Em horário comercial: comunicar obrigatoriamente os auditores via e-mail to.seade@conab.gov.br.',
      'Fora de horário comercial ou finais de semana: notificar no primeiro dia útil subsequente.'
    ],
    checklistDocumentos: [
      'Documento de identidade com foto do beneficiário',
      'Pedido médico de remoção com CID e carimbo',
      'E-mail de notificação enviado para to.seade@conab.gov.br',
      'Ficha de atendimento assinada'
    ],
    observacoesCriticas: [
      'Sempre salvar cópia do e-mail de aviso de internação/remoção enviado para a CONAB.'
    ],
    fluxoPassoAPasso: [
      '1. Validar cadastro do paciente pelo CPF no portal CONAB.',
      '2. Preencher guia com código 60501002 e encaminhar com pedido médico.',
      '3. Enviar e-mail de notificação para to.seade@conab.gov.br com laudo em anexo.',
      '4. Executar o transporte com a empresa credenciada.'
    ]
  },
  {
    id: 'e-vida',
    numero: '08',
    nome: 'E-VIDA',
    categoria: 'autogestao',
    badge: 'EV',
    statusCobertura: 'sim',
    statusTexto: 'Autorização obrigatória no Portal WebPlan',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Até 1h no portal',
    empresaCredenciadaPrincipal: 'LISS CARE',
    portalUrl: 'https://novowebplanevida.facilinformatica.com.br/GuiasTISS/Logon',
    logins: [
      { label: 'Login', valor: '12955953000192' },
      { label: 'Senha', valor: '12955953000192', mask: true }
    ],
    telefones: [
      '0800 607 8432 (Central E-Vida 24h)',
      '0800 607 8433 (Ouvidoria)'
    ],
    emails: [
      'autorizacao@evida.org.br',
      'regulacao@evida.org.br'
    ],
    codigosRemocao: [
      { codigo: '60501002', descricao: 'Remoção Terrestre com Médico / UTI', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Simples sem Médico', tipo: 'basica' }
    ],
    regrasAutorizacao: [
      'O POP orienta: "É melhor pecar por excesso do que por falta nas solicitações de autorizações".',
      'Solicitar autorização no portal WebPlan antes da execução do transporte.',
      'Inserir justificativa clara sobre instabilidade clínica quando solicitar UTI Móvel.'
    ],
    checklistDocumentos: [
      'Guia SP/SADT WebPlan com senha liberada',
      'Pedido do médico assistente',
      'Confirmação de leito de destino'
    ],
    observacoesCriticas: [
      'Garantir que a senha de autorização foi gerada antes da saída da ambulância.'
    ],
    fluxoPassoAPasso: [
      '1. Entrar no portal WebPlan E-Vida.',
      '2. Preencher dados do beneficiário e selecionar procedimento 60501002.',
      '3. Anexar prescrição/pedido de remoção e submeter.',
      '4. Imprimir guia com a senha autorizada.'
    ]
  },
  {
    id: 'fusex',
    numero: '09',
    nome: 'FUSEX',
    categoria: 'militar_publico',
    badge: 'FX',
    statusCobertura: 'apenas_urgencia',
    statusTexto: 'Urgência atende direto / Eletivo com guia / Auditoria in loco',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped', 'aerea'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Urgência imediata; Auditoria notificada em até 24h',
    empresaCredenciadaPrincipal: 'LISS CARE / Ambulância do Exército (22º BI)',
    telefones: [
      '63 98136-6947 (Betânia - Auditoria FUSEX Palmas)',
      '61 98440-2960 (Dr. Bryan - Auditoria Militar)',
      '62 99952-5247 (Laís Gontijo - Regulação Regional)',
      '63 3218-4200 (22º Batalhão de Infantaria)'
    ],
    emails: [
      'fusexpalmasinternacao@gmail.com',
      'auditoriafusexpalmas@gmail.com.br',
      'prorrogacaointernação@redemedical.com.br'
    ],
    logins: [
      { label: 'Auditoria Palmas', valor: '63 98136-6947 (Betânia)' },
      { label: 'Auditoria Regional', valor: '61 98440-2960 (Dr. Bryan)' },
      { label: 'Guia Urgência', valor: 'Atendimento Direto / Notificar 24h' }
    ],
    codigosRemocao: [
      { codigo: '60501002', descricao: 'Remoção Terrestre UTI Móvel Militar/Civil', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Ambulância Tipo B', tipo: 'basica' },
      { codigo: '60501029', descricao: 'Evacuação Aeromédica (EVAM)', tipo: 'aerea' }
    ],
    regrasAutorizacao: [
      'Urgência e emergência: não necessita de autorização prévia para o atendimento inicial e transporte emergencial.',
      'Beneficiário tem até 48 horas para apresentar a guia autorizada formalizada pelo Posto Médico / FUSEX.',
      'Internações e remoções em UTI: AVISAR O MÉDICO AUDITOR IMEDIATAMENTE, independente do horário (Betânia: 63 98136-6947 / Dr. Bryan: 61 98440-2960).',
      'Colher assinatura em todas as vias da Guia SADT.',
      'Para remoções aéreas de militares (EVAM), acionar o comando de saúde do Exército.'
    ],
    checklistDocumentos: [
      'Identidade Militar (FUSEX / Comprovante de dependente)',
      'Relatório de urgência assinado pelo médico plantonista',
      'Comprovante de aviso enviado para fusexpalmasinternacao@gmail.com',
      'Guia SADT física com assinatura do militar/responsável'
    ],
    observacoesCriticas: [
      'O não aviso imediato aos auditores militares pode acarretar glosa integral do transporte.'
    ],
    fluxoPassoAPasso: [
      '1. Prestar o socorro/transporte em caráter de urgência imediata.',
      '2. Colher assinatura na Guia SADT.',
      '3. Enviar e-mail imediato para fusexpalmasinternacao@gmail.com e auditoriafusexpalmas@gmail.com.br.',
      '4. Ligar ou enviar WhatsApp para Betânia (63 98136-6947) informando paciente e hospital destino.',
      '5. Orientar família a buscar o carimbo/guia no posto FUSEX em até 48h.'
    ]
  },
  {
    id: 'gama',
    numero: '10',
    nome: 'GAMA SAÚDE',
    categoria: 'privado',
    badge: 'GM',
    statusCobertura: 'sim',
    statusTexto: 'E-mail oficial para remoção: remocao.gama@gamasaude.com.br / Tel: (35) 3629-8000',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Acionamento por e-mail específico de remoção',
    empresaCredenciadaPrincipal: 'Central de Remoção GAMA (remocao.gama@gamasaude.com.br)',
    portalUrl: 'https://gama.topsaudehub.com.br/PortalCredenciado',
    logins: [
      { label: 'Login', valor: '40090197_AUT' },
      { label: 'Senha', valor: 'Medical25@', mask: true }
    ],
    telefones: [
      '(35) 3629-8000 (Telefone Geral / Central Gama Saúde)',
      '0800 055 3300 (Suporte Credenciado)'
    ],
    emails: [
      'remocao.gama@gamasaude.com.br',
      'autorizacao@gamasaude.com.br'
    ],
    codigosRemocao: [
      {
        codigo: 'E-MAIL OFICIAL',
        descricao: 'Solicitação via remocao.gama@gamasaude.com.br (POP não detalha código TUSS)',
        tipo: 'outro'
      },
      {
        codigo: '60501002',
        descricao: 'Remoção Terrestre UTI Móvel (Código padrão TUSS de suporte avançado)',
        tipo: 'uti'
      },
      {
        codigo: '60501001',
        descricao: 'Remoção Básica Sem Médico (Código padrão TUSS de suporte básico)',
        tipo: 'basica'
      }
    ],
    regrasAutorizacao: [
      'CANAL ESPECÍFICO DE REMOÇÃO: E-mail: remocao.gama@gamasaude.com.br.',
      'TELEFONE GERAL IDENTIFICADO NO POP: (35) 3629-8000.',
      'DADOS NO DOCUMENTO: No material do POP, NÃO constam na seção de remoção: código específico de ambulância, tipo de ambulância, documentação obrigatória, formulário de remoção, orientação sobre remoção com ou sem médico, valor ou quilometragem.',
      'A informação específica e oficial disponível no POP é o canal de contato e direcionamento de remoção: remocao.gama@gamasaude.com.br.'
    ],
    checklistDocumentos: [
      '1. Pedido Médico detalhado com a indicação da transferência/remoção',
      '2. Cópia da carteirinha do plano Gama Saúde e documento com foto',
      '3. E-mail de acionamento formal enviado para remocao.gama@gamasaude.com.br'
    ],
    observacoesCriticas: [
      'E-mail específico de remoção do POP: remocao.gama@gamasaude.com.br.',
      'Telefone geral constante no POP: (35) 3629-8000.',
      'O POP não estipula códigos de ambulância, valores ou tipo de viatura na seção de remoção.'
    ],
    fluxoPassoAPasso: [
      '1. Obter o laudo médico com a justificativa clínica da necessidade de transporte.',
      '2. Enviar a solicitação diretamente para o e-mail oficial de remoção: remocao.gama@gamasaude.com.br.',
      '3. Para acompanhamento ou suporte emergencial, contatar o telefone geral constante no POP: (35) 3629-8000.',
      '4. Aguardar o retorno com as orientações e autorização do transporte pela Gama Saúde.'
    ]
  },
  {
    id: 'geap',
    numero: '11',
    nome: 'GEAP',
    categoria: 'autogestao',
    badge: 'GE',
    statusCobertura: 'sim',
    statusTexto: 'A remoção dentro do município deve ser solicitada à empresa CARE MED SOLUTIONS (Maior Parceria) ou LISS CARE.',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped', 'aerea'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Acionamento imediato por e-mail ou WhatsApp à CARE MED',
    empresaCredenciadaPrincipal: 'CARE MED SOLUTIONS (remocaocaremed@gmail.com) / LISS CARE',
    portalUrl: 'https://www.geap.com.br',
    logins: [
      { label: 'Login MEDICAL', valor: '28112539' },
      { label: 'Senha MEDICAL', valor: '28112539', mask: true },
      { label: 'Login SANTA THEREZA', valor: '28114590' },
      { label: 'Senha SANTA THEREZA', valor: 'Santa2025', mask: true }
    ],
    telefones: [
      '(63) 3322-1423 (CareMed Solutions - WhatsApp)',
      '(63) 99104-9287 (LissCare Plantão 24h)',
      '(63) 98447-9504 (LissCare Comercial)',
      '2111-4309 (Central GEAP TO)',
      '2111-4312 (Regulação GEAP)',
      '2111-4307 (Apoio ao Prestador)',
      '0800 728 8300 (Central Nacional 24h)'
    ],
    emails: [
      'remocaocaremed@gmail.com',
      'lisscareremocao@gmail.com',
      'Assistencial.to@geap.com.br'
    ],
    codigosRemocao: [
      { codigo: '60501002', descricao: 'Remoção Terrestre UTI Móvel (Adulto / Pediátrica)', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Básica sem Médico', tipo: 'basica' },
      { codigo: '989100094', descricao: 'Pacote PS Adulto GEAP', tipo: 'outro' },
      { codigo: '98910043', descricao: 'Pacote PS Pediatria GEAP', tipo: 'outro' }
    ],
    regrasAutorizacao: [
      'A remoção dentro do município deve ser solicitada preferencialmente à empresa CARE MED SOLUTIONS (Maior Parceria HPM) ou à LISS CARE.',
      'A CARE MED SOLUTIONS ou LISS CARE é quem solicitará a autorização à GEAP para a remoção do paciente.',
      'Obs.: Caso haja remoção do Hospital Palmas Medical para o Hospital Santa Thereza, justificar a insuficiência de leitos.'
    ],
    checklistDocumentos: [
      '1. Pedido Médico',
      '2. Cópia da carteira do plano GEAP',
      '3. Cópia do documento com foto',
      'Justificativa de insuficiência de leitos (se transferência do HPM para Santa Thereza)'
    ],
    observacoesCriticas: [
      'A CARE MED SOLUTIONS (ou LISS CARE) que solicitará a autorização à GEAP para remoção do paciente após o recebimento do e-mail/WhatsApp.',
      'Caso haja remoção do Hospital Palmas Medical para o Hospital Santa Thereza, justificar obrigatoriamente a insuficiência de leitos.',
      'Sempre colocar em cópia: janaina.gomes@redemedical.com.br e hpm.recepcao@redemedical.com.br'
    ],
    fluxoPassoAPasso: [
      '1. Reunir os documentos obrigatórios:\n1) Pedido Médico;\n2) Cópia da carteira do plano GEAP;\n3) Cópia do documento com foto.',
      '2. Caso a remoção seja do Hospital Palmas Medical para o Hospital Santa Thereza, anexar justificativa de insuficiência de leitos.',
      '3. Enviar e-mail para a EMPRESA CARE MED SOLUTIONS no endereço: remocaocaremed@gmail.com (ou acionar WhatsApp 63 3322-1423) solicitando a remoção dentro do município com os documentos em anexo (colocar sempre em cópia: janaina.gomes@redemedical.com.br e hpm.recepcao@redemedical.com.br).',
      '4. A CARE MED SOLUTIONS solicitará a autorização ao plano GEAP para a remoção do paciente.'
    ]
  },
  {
    id: 'golden',
    numero: '12',
    nome: 'GOLDEN CROSS',
    categoria: 'privado',
    badge: 'GC',
    statusCobertura: 'email',
    statusTexto: 'Autorização por E-mail específico de remoção',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped', 'aerea'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Até 2h em horário comercial / plantão 24h',
    empresaCredenciadaPrincipal: 'LISS CARE / Central Golden',
    portalUrl: 'https://portal.goldentiss.com.br/portaltiss/tiss/info/home.golden',
    logins: [
      { label: 'Login', valor: '12.955.953/0001-92' },
      { label: 'Senha', valor: 'Kora2022', mask: true }
    ],
    telefones: [
      '4002-2001 (Central Golden Cross 24h)',
      '0800 728 2001 (Demais Regiões)',
      '0800 723 2001 (SAC)'
    ],
    emails: [
      'procedimento@goldencross.com.br',
      'internado.opme@goldencross.com.br',
      'poscirurgico.opme@goldencross.com.br',
      'prorrogacao.df@goldencross.com.br'
    ],
    codigosRemocao: [
      { codigo: '60501002', descricao: 'Remoção Terrestre com Médico / UTI', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Básica Sem Médico', tipo: 'basica' },
      { codigo: '60501029', descricao: 'Remoção Aérea / UTI Aérea', tipo: 'aerea' }
    ],
    regrasAutorizacao: [
      'Verificar elegibilidade do associado no portal TISS da Golden Cross.',
      'Não precisa de TOKEN.',
      'Todos os procedimentos e remoções exigem autorização via e-mail formal: procedimento@goldencross.com.br.',
      'Abrangência regional no POP: DF, TO, GO, MT, MS, AC, AM, RR, RO.'
    ],
    checklistDocumentos: [
      'Pedido médico escaneado com diagnóstico e justificativa detalhada',
      'Cópia da carteira Golden Cross e documento com foto',
      'Confirmação formal de recebimento do e-mail pela operadora'
    ],
    observacoesCriticas: [
      'Informar no e-mail o caráter de Urgência/Emergência em letras maiúsculas no campo de assunto.'
    ],
    fluxoPassoAPasso: [
      '1. Consultar elegibilidade no portal Golden TISS.',
      '2. Enviar e-mail para procedimento@goldencross.com.br com assunto: URGÊNCIA - REMOÇÃO PACIENTE [NOME].',
      '3. Ligar para 4002-2001 confirmando o recebimento do e-mail.',
      '4. Obter a senha e imprimir guia autorizada.'
    ]
  },
  {
    id: 'life',
    numero: '16',
    nome: 'LIFE EMPRESARIAL',
    categoria: 'privado',
    badge: 'LF',
    statusCobertura: 'sim',
    statusTexto: 'Nova Solicitação SP/SADT no Portal Life',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Análise automática de 2 a 3 minutos no portal',
    empresaCredenciadaPrincipal: 'LISS CARE',
    logins: [
      { label: 'Portal', valor: 'Life Empresarial – Saúde' },
      { label: 'Login', valor: '12955953000192' },
      { label: 'Senha', valor: 'Kora2026#', mask: true }
    ],
    telefones: [
      '0800 707 5433 (Central Life 24h)',
      '0800 707 5434 (Atendimento Credenciado)'
    ],
    emails: [
      'autorizacao@lifeempresarial.com.br',
      'atendimento@lifeempresarial.com.br'
    ],
    codigosRemocao: [
      { codigo: '10101039', descricao: 'Consulta em Pronto Socorro', tipo: 'outro' },
      { codigo: '60501002', descricao: 'Remoção com Médico / UTI Móvel', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção sem Médico / Básica', tipo: 'basica' }
    ],
    regrasAutorizacao: [
      'Acessar Portal > Nova Solicitação > SP/SADT.',
      'Procedimento: 10101039 / 60501002, Quantidade: 01, sem anexo para consulta ou com laudo para transporte.',
      'Caráter: Urgência/Emergência; Tipo de Atendimento: Pronto-Socorro.',
      'A guia permanece cerca de 2 a 3 minutos em análise.',
      'Status das cores: Amarelo = Análise; Azul = Autorizada; Cinza = Negada.',
      'Quando AZUL (Autorizada): imprimir e solicitar assinatura imediata do paciente/responsável.'
    ],
    checklistDocumentos: [
      'Guia SP/SADT autorizada (Status Azul no Portal)',
      'Assinatura do paciente ou responsável legal',
      'Relatório de transferência do médico'
    ],
    observacoesCriticas: [
      'Se o status mudar para cinza (negado), verificar motivo e ligar na Central Life.'
    ],
    fluxoPassoAPasso: [
      '1. Acessar o Portal Life Empresarial.',
      '2. Criar Nova Solicitação SP/SADT, Caráter Urgência.',
      '3. Aguardar 3 minutos até o ícone ficar azul (Autorizada).',
      '4. Imprimir guia, colher assinatura e acionar a ambulância.'
    ]
  },
  {
    id: 'marinha',
    numero: '17',
    nome: 'MARINHA',
    categoria: 'militar_publico',
    badge: 'MB',
    statusCobertura: 'email',
    statusTexto: 'Tabela Própria de Ambulâncias (Pág. 4 do POP) - Tipos A, B, C, D e KM rodado',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped', 'aerea'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Conforme classificação de ambulância do documento',
    empresaCredenciadaPrincipal: 'Solicitação de Ambulância Marinha / Capitania Fluvial / LISS CARE',
    telefones: [
      '(63) 99956-1106 (Plantão Marinha Palmas)',
      '(63) 3216-1715 (Capitania Fluvial Araguaia-Tocantins)',
      '(61) 3429-1000 (Comando 7º Distrito Naval)'
    ],
    emails: [
      'andreina.amaral@marinha.mil.br',
      'goncalves.santos@marinha.mil.br',
      'costa.amaral@marinha.mil.br',
      'lucas.scherr@marinha.mil.br',
      'julio.cezar1@marinha.mil.br',
      'priscila.marques@redemedical.com.br'
    ],
    logins: [
      { label: 'Plantão Marinha', valor: '(63) 99956-1106' },
      { label: 'Autorização', valor: 'Tabela Pág. 4 do POP' },
      { label: 'CNPJ HPM', valor: '12.955.953/0001-92' }
    ],
    codigosRemocao: [
      {
        codigo: 'Tipo A',
        descricao: 'Ambulância de Transporte: Transporte em decúbito horizontal de pacientes sem risco de vida, para remoções simples de caráter eletivo',
        tipo: 'basica',
        valorEstimado: 'R$ 100,00'
      },
      {
        codigo: 'Tipo B',
        descricao: 'Ambulância de Suporte Básico: Transporte inter-hospitalar de pacientes com risco de morte conhecido e atendimento pré-hospitalar de pacientes com risco desconhecido, sem previsão de necessidade de intervenção médica durante o transporte',
        tipo: 'basica',
        valorEstimado: 'R$ 300,00'
      },
      {
        codigo: 'Tipo C',
        descricao: 'Ambulância de Resgate: Atendimento de urgências pré-hospitalares de vítimas de acidentes ou pacientes em local de difícil acesso, com equipamentos de salvamento terrestre, aquático ou em altura',
        tipo: 'uti',
        valorEstimado: 'R$ 450,00'
      },
      {
        codigo: 'Tipo D',
        descricao: 'Ambulância de Suporte Avançado: Atendimento/transporte de pacientes de alto risco, inclusive transporte inter-hospitalar que exija cuidados médicos intensivos, materiais, medicamentos e equipamentos',
        tipo: 'uti',
        valorEstimado: 'R$ 700,00'
      },
      {
        codigo: 'KM rodado',
        descricao: 'Quilometragem da ambulância (valor fixo por km)',
        tipo: 'km',
        valorEstimado: 'R$ 4,20/km'
      }
    ],
    regrasAutorizacao: [
      'SEÇÃO ESPECÍFICA (PÁG. 4 DO POP): Solicitação de Ambulância com classificação e valores contratuais:',
      '• Tipo A (Ambulância de Transporte - decúbito horizontal sem risco de vida / eletivo): R$ 100,00',
      '• Tipo B (Ambulância de Suporte Básico - transporte inter-hospitalar sem previsão de intervenção médica): R$ 300,00',
      '• Tipo C (Ambulância de Resgate - pré-hospitalar, acidentes, local de difícil acesso com salvamento): R$ 450,00',
      '• Tipo D (Ambulância de Suporte Avançado - pacientes de alto risco, transporte inter-hospitalar com cuidados intensivos): R$ 700,00',
      '• KM rodado: R$ 4,20/km para quilometragem da ambulância.',
      'DADOS NO DOCUMENTO: A página de remoção do POP não apresenta código TUSS, e-mail específico de remoção ou passo a passo de autorização.',
      'O enquadramento deve ser estritamente baseado nos tipos (A, B, C, D) e valor de km rodado descritos no documento.'
    ],
    checklistDocumentos: [
      '1. Relatório médico com enquadramento do tipo de ambulância (Tipo A, B, C ou D)',
      '2. Estimativa de quilometragem percorrida (R$ 4,20/km)',
      '3. Cópia da carteira da Marinha e RG militar do paciente',
      '4. Formulário de solicitação de ambulância timbrado'
    ],
    observacoesCriticas: [
      'A Marinha possui tabela de valores fixos por tipo de viatura (Tipo A: R$ 100,00 | Tipo B: R$ 300,00 | Tipo C: R$ 450,00 | Tipo D: R$ 700,00 | KM rodado: R$ 4,20/km).',
      'O POP não apresenta código TUSS ou e-mail exclusivo de remoção na seção correspondente.',
      'Contato de plantão e apoio local: (63) 99956-1106 e Capitania Fluvial (63) 3216-1715.'
    ],
    fluxoPassoAPasso: [
      '1. O médico plantonista avalia o paciente e enquadra na categoria da viatura: Tipo A (R$ 100), Tipo B (R$ 300), Tipo C (R$ 450) ou Tipo D (R$ 700).',
      '2. Calcular a quilometragem excedente caso aplicável à razão de R$ 4,20 por km rodado.',
      '3. Anexar o laudo com o enquadramento do tipo de suporte e documentos militares do paciente.',
      '4. Fazer o alinhamento com a Capitania Fluvial e contatos do Distrito Naval para liberação do transporte.'
    ]
  },
  {
    id: 'notredame',
    numero: '18',
    nome: 'NOTREDAME',
    categoria: 'privado',
    badge: 'ND',
    statusCobertura: 'sim',
    statusTexto: 'Central de Transferência / Regulação UTI: (11) 3155-2355',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Regulação direta via Central de Transferência',
    empresaCredenciadaPrincipal: 'Central de Transferência NDI / Hapvida',
    portalUrl: 'https://saviatendimento.com.br/saviatendimento/pages/home.faces',
    logins: [
      { label: 'Portal Savi', valor: 'https://saviatendimento.com.br/saviatendimento/pages/home.faces', link: true },
      { label: 'Login', valor: '73511439353' },
      { label: 'Senha Principal Registrada', valor: 'Remedical123', mask: true },
      { label: 'Senha Alternativa', valor: 'Redemedical123', mask: true }
    ],
    telefones: [
      '(11) 3155-2355 (Central para Transferência / Regulação UTI)',
      '4090-1740 (Central Notredame Intermédica)',
      '0800 015 3855 (Atendimento 24h)',
      '0800 168 900 (SAC)'
    ],
    emails: [
      'prorrogacoes@hapvida.com.br',
      'prorrogacaondi@hapvida.com.br'
    ],
    codigosRemocao: [
      {
        codigo: 'TRANSFERÊNCIA',
        descricao: 'Central para Transferência: (11) 3155-2355 (POP não detalha ambulância própria/terceirizada ou códigos)',
        tipo: 'outro'
      },
      {
        codigo: '10101039',
        descricao: 'Consulta em PS (adulto e pediatria conforme comunicado oficial)',
        tipo: 'outro'
      },
      {
        codigo: '60501002',
        descricao: 'Remoção Terrestre UTI Móvel Adulto/Neo',
        tipo: 'uti'
      }
    ],
    regrasAutorizacao: [
      'CENTRAL EXPRESSA PARA TRANSFERÊNCIA: O POP identifica expressamente o telefone (11) 3155-2355 para TRANSFERÊNCIA.',
      'O mesmo telefone (11) 3155-2355 também aparece no POP relacionado à regulação / leitos de UTI.',
      'DADOS NO DOCUMENTO: O arquivo não possui uma seção completa intitulada “Remoção” e não detalha se a transferência contempla ambulância própria, terceirizada, tipos de suporte, códigos, documentos ou valores.',
      'Com base exclusivamente no arquivo, a informação de transporte/transferência deve ser acionada via Central de Transferência: (11) 3155-2355.'
    ],
    checklistDocumentos: [
      '1. Relatório médico com indicação de transferência / leito de UTI',
      '2. Dados do paciente e carteirinha NotreDame Intermédica',
      '3. Contato e alinhamento com a Central de Transferência: (11) 3155-2355'
    ],
    observacoesCriticas: [
      'Central para transferência identificada no POP: (11) 3155-2355.',
      'O número (11) 3155-2355 também é utilizado para regulação/UTI.',
      'O arquivo não detalha códigos TUSS específicos, ambulância própria/terceirizada ou valores.'
    ],
    fluxoPassoAPasso: [
      '1. Ter em mãos o laudo médico completo com a solicitação de transferência hospitalar ou regulação de UTI.',
      '2. Ligar para a Central de Transferência NotreDame no número: (11) 3155-2355.',
      '3. Passar o quadro clínico do paciente e seguir as orientações da operadora quanto à regulação e ambulância.',
      '4. Registrar a autorização e manter o hospital de destino informado.'
    ]
  },
  {
    id: 'omint',
    numero: '19',
    nome: 'OMINT',
    categoria: 'privado',
    badge: 'OM',
    statusCobertura: 'sim',
    statusTexto: 'Central de Concierge Omint 24h / Autorização Imediata',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped', 'aerea'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Imediato (Atendimento Premium 24h)',
    empresaCredenciadaPrincipal: 'Omint Concierge / Med Life / LISS CARE',
    telefones: [
      '0800 726 4000 (Central Omint 24h)',
      '11 2132-4000 (Atendimento Direto SP)',
      '0800 726 4001 (Omint Resgate Aeromédico)'
    ],
    emails: [
      'autorizacoes@omint.com.br',
      'resgate@omint.com.br'
    ],
    logins: [
      { label: 'Portal Omint', valor: 'www.omint.com.br/prestador', link: true },
      { label: 'Concierge 24h', valor: '0800 726 4000' },
      { label: 'Aeromédico', valor: '0800 726 4001' }
    ],
    codigosRemocao: [
      { codigo: '60501002', descricao: 'Remoção Terrestre UTI Móvel Premium', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Terrestre Básica', tipo: 'basica' },
      { codigo: '60501029', descricao: 'Resgate Aeromédico Nacional/Internacional Omint', tipo: 'aerea' }
    ],
    regrasAutorizacao: [
      'A Omint possui serviço próprio de regulação médica e remoção aeromédica de alto padrão.',
      'Ligar imediatamente para a Central de Concierge 0800 726 4000 informando o leito e o quadro clínico.',
      'A própria central da Omint pode coordenar o transporte em jato aeromédico se necessário.'
    ],
    checklistDocumentos: [
      'Relatório médico em inglês/português detalhado',
      'Dados do seguro/cartão Omint',
      'Assinatura do termo de consentimento'
    ],
    observacoesCriticas: [
      'Prioridade absoluta no atendimento telefônico pelo 0800 726 4000.'
    ],
    fluxoPassoAPasso: [
      '1. Contactar a Central Omint 0800 726 4000.',
      '2. Fornecer dados do beneficiário e contato do médico plantonista.',
      '3. A Omint emitirá a autorização e definirá a equipe de transporte.',
      '4. Colher assinatura na guia TISS.'
    ]
  },
  {
    id: 'petrobras',
    numero: '20',
    nome: 'PETROBRAS',
    categoria: 'autogestao',
    badge: 'PB',
    statusCobertura: 'sim',
    statusTexto: 'Portal TISS Saúde Petrobras',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped', 'aerea'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Até 1h no portal / Central 24h',
    empresaCredenciadaPrincipal: 'LISS CARE / Impacto Médica',
    portalUrl: 'https://portaltiss.saudepetrobras.com.br/saudeweb/seguranca/login',
    logins: [
      { label: 'Login', valor: '12955953000192' },
      { label: 'Senha', valor: 'Medical@2025', mask: true }
    ],
    telefones: [
      '0800 287 2267 (Central Saúde Petrobras 24h)',
      '0800 728 9001 (Suporte Geral Petrobras)'
    ],
    emails: [
      'autorizacao.petrobras@saudepetrobras.com.br',
      'regulacaomedica@saudepetrobras.com.br'
    ],
    codigosRemocao: [
      { codigo: '10101039', descricao: 'Consulta em Pronto Socorro', tipo: 'outro' },
      { codigo: '60501002', descricao: 'Remoção Terrestre com Médico / UTI', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Simples / Básico', tipo: 'basica' }
    ],
    regrasAutorizacao: [
      'Gerar a solicitação no Portal TISS Saúde Petrobras.',
      'Transportes intermunicipais ou de alta complexidade exigem laudo com assinatura digital ou carimbo legível.',
      'Assinatura do paciente obrigatória em todas as vias.'
    ],
    checklistDocumentos: [
      'Guia SP/SADT emitida no portal Petrobras',
      'Pedido do médico com CID e justificativa',
      'Comprovante de leito no hospital receptor'
    ],
    observacoesCriticas: [
      'Garantir envio da cópia digitalizada do laudo para a equipe da Petrobras.'
    ],
    fluxoPassoAPasso: [
      '1. Fazer login no portal TISS Petrobras.',
      '2. Abrir solicitação de transporte de urgência.',
      '3. Anexar laudo médico e aguardar emissão de senha.',
      '4. Imprimir guia autorizada e acionar a viatura da LISS CARE.'
    ]
  },
  {
    id: 'planassiste',
    numero: '21',
    nome: 'PLAN ASSISTE',
    categoria: 'autogestao',
    badge: 'PA',
    statusCobertura: 'sim',
    statusTexto: 'Portal Autorizador Web + Anexos',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Até 1h no autorizador',
    empresaCredenciadaPrincipal: 'LISS CARE',
    portalUrl: 'https://sistema.planassiste.mpu.mp.br/autorizadorweb/login.aspx',
    logins: [
      { label: 'Portal Autorizador', valor: 'https://sistema.planassiste.mpu.mp.br/autorizadorweb/login.aspx', link: true },
      { label: 'Portal Exames Eletivos', valor: 'https://sistema.planassiste.mpu.mp.br/WSTISS/Default.aspx', link: true },
      { label: 'Login', valor: '12955953000192' },
      { label: 'Senha', valor: 'OFIRVB28', mask: true },
      { label: 'Responsável / Master', valor: 'isaias.silva@redemedical.com.br' }
    ],
    telefones: [
      '0800 648 1000 (Central Plan Assiste 24h)',
      '61 3105-5100 (Sede Nacional MPU)',
      '63 3219-7100 (Procuradoria da República no Tocantins)'
    ],
    emails: [
      'planassiste-autorizacao@mpu.mp.br',
      'prto-planassiste@mpf.mp.br'
    ],
    codigosRemocao: [
      { codigo: '10101039', descricao: 'Consulta em Pronto Socorro', tipo: 'outro' },
      { codigo: '60501002', descricao: 'Remoção Terrestre com Médico / UTI', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Básica Sem Médico', tipo: 'basica' }
    ],
    regrasAutorizacao: [
      'Solicitar autorização no portal Autorizador Web.',
      'Sempre anexar relatório médico completo contendo justificativa da remoção.',
      'Assinatura do beneficiário ou responsável legal na guia gerada.'
    ],
    checklistDocumentos: [
      'Guia gerada no sistema Plan Assiste',
      'Cópia da carteira funcional/dependente MPU',
      'Relatório médico de transferência'
    ],
    observacoesCriticas: [
      'Em caso de instabilidade no portal, acionar prto-planassiste@mpf.mp.br com cópia do laudo.'
    ],
    fluxoPassoAPasso: [
      '1. Acessar o sistema com login 12955953000192.',
      '2. Abrir solicitação SP/SADT de remoção de urgência.',
      '3. Inserir código 60501002 e anexar pedido médico.',
      '4. Imprimir guia com a senha aprovada e colher assinatura.'
    ]
  },
  {
    id: 'postalsaude',
    numero: '22',
    nome: 'POSTAL SAÚDE',
    categoria: 'autogestao',
    badge: 'PS',
    statusCobertura: 'sim',
    statusTexto: 'E-mail de remoção: centralderemocao@postalsaude.com.br (Remoção excluída do pacote de PS)',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Acionamento via centralderemocao@postalsaude.com.br',
    empresaCredenciadaPrincipal: 'Central de Remoção Postal Saúde / LISS CARE',
    portalUrl: 'https://autorizador.postalsaudeservicos.com.br/autorizadorpro/custom/CustomLogin.aspx',
    logins: [
      { label: 'Login', valor: '12955953000192' },
      { label: 'Senha', valor: 'Kora2026@', mask: true }
    ],
    telefones: [
      '0800 888 8116 (Prestador - Assuntos Gerais 24h / 7 dias)',
      '0800 888 9404 (Faturamento Eletrônico - Seg a Sex 8h às 18h)',
      '(63) 3213-4000 (Contato Postal Saúde Tocantins)',
      '(63) 99104-9287 (LissCare Plantão 24h)',
      '(63) 98447-9504 (LissCare Comercial)'
    ],
    emails: [
      'centralderemocao@postalsaude.com.br',
      'suporteconectividade@postalsaude.com.br',
      'lisscareremocao@gmail.com'
    ],
    codigosRemocao: [
      {
        codigo: 'PACOTE PS',
        descricao: 'Pacote de Pronto-Socorro: Despesas com acompanhantes e REMOÇÃO são ITENS EXCLUÍDOS do pacote',
        tipo: 'outro'
      },
      {
        codigo: 'CENTRAL DE REMOÇÃO',
        descricao: 'Solicitação via e-mail oficial: centralderemocao@postalsaude.com.br',
        tipo: 'outro'
      },
      {
        codigo: '60501002',
        descricao: 'Remoção Terrestre com Médico / UTI Móvel',
        tipo: 'uti'
      },
      {
        codigo: '60501001',
        descricao: 'Remoção Básica Sem Médico',
        tipo: 'basica'
      }
    ],
    regrasAutorizacao: [
      'EXCLUSÃO DO PACOTE DE PRONTO-SOCORRO: No pacote de pronto-socorro da Postal Saúde, as despesas com acompanhantes e REMOÇÃO aparecem entre os ITENS EXCLUÍDOS (a remoção não está inclusa no pacote de PS).',
      'NOVO E-MAIL ESPECÍFICO PARA REMOÇÃO: Conforme comunicação oficial constante no POP, o novo canal para solicitação de remoção é: centralderemocao@postalsaude.com.br.',
      'CANAIS OFICIAIS DO POP: Prestador - Assuntos gerais: 0800 888 8116 (24h/dia, 7 dias/semana) | Faturamento eletrônico: 0800 888 9404 (Seg a Sex, 8h às 18h) | E-mail Conecta: suporteconectividade@postalsaude.com.br | Contato TO: (63) 3213-4000.',
      'DADOS NO DOCUMENTO: O arquivo do POP não informa código específico de ambulância, tipo de ambulância ou documentação obrigatória para a remoção; o direcionamento é integralmente feito pelo e-mail oficial de remoção.',
      'Fluxo de acionamento: Enviar a solicitação para centralderemocao@postalsaude.com.br com cópia para a empresa de ambulância parceira (LISS CARE).'
    ],
    checklistDocumentos: [
      '1. Pedido Médico com indicação clínica e justificativa da remoção',
      '2. Cópia da carteira do plano POSTAL SAÚDE',
      '3. Cópia do documento oficial com foto',
      '4. E-mail formal de solicitação encaminhado para centralderemocao@postalsaude.com.br'
    ],
    observacoesCriticas: [
      'Atenção: Remoção NÃO está incluída no pacote de Pronto-Socorro (item expressamente excluído).',
      'Novo e-mail oficial para remoção: centralderemocao@postalsaude.com.br.',
      'Central 24h Assuntos Gerais: 0800 888 8116 | Faturamento: 0800 888 9404 (8h às 18h).',
      'Sempre colocar em cópia: janaina.gomes@redemedical.com.br e hpm.recepcao@redemedical.com.br.'
    ],
    fluxoPassoAPasso: [
      '1. Reunir o laudo médico da solicitação, carteirinha Postal Saúde e documento de identidade do paciente.',
      '2. Enviar e-mail de solicitação de remoção para o canal oficial indicado no POP: centralderemocao@postalsaude.com.br.',
      '3. Caso o transporte seja realizado pela parceira LISS CARE (lisscareremocao@gmail.com), colocá-la em cópia com janaina.gomes@redemedical.com.br e hpm.recepcao@redemedical.com.br.',
      '4. Havendo dúvidas operacionais, acionar a central 24h da Postal Saúde no 0800 888 8116 ou o polo Tocantins no (63) 3213-4000.'
    ]
  },
  {
    id: 'protocantins',
    numero: '23',
    nome: 'PRO TOCANTINS',
    categoria: 'estadual_municipal',
    badge: 'PT',
    statusCobertura: 'sim',
    statusTexto: 'Portal FAsaúde FSETO + Central de Regulação Estadual',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Até 45 minutos no portal novo',
    empresaCredenciadaPrincipal: 'LISS CARE / Ambulâncias Militares PM/BM',
    portalUrl: 'https://servicos.fasaudefpto.com.br/prestador/index.php',
    logins: [
      { label: 'Portal Novo', valor: 'https://servicos.fasaudefpto.com.br/prestador/index.php', link: true },
      { label: 'Login Novo MEDICAL', valor: 'MEDICAL' },
      { label: 'Senha Novo MEDICAL', valor: '123456', mask: true },
      { label: 'Login SANTA THEREZA', valor: 'SANTA THEREZA' },
      { label: 'Senha SANTA THEREZA', valor: '123456', mask: true },
      { label: 'Portal Antigo', valor: 'https://novowebplanfamsaude.facilinformatica.com.br/GuiasTISS/Logon', link: true },
      { label: 'Login Antigo', valor: '12955953000192' },
      { label: 'Senha Antiga', valor: '12955953000192A', mask: true }
    ],
    telefones: [
      '63 3218-4700 (Central FAM Saúde / Pro-Tocantins)',
      '63 3218-4723 (Regulação Médica)',
      '63 98418-0000 (Plantão Militar/PMTO)'
    ],
    emails: [
      'autorizacao@fasaudefpto.com.br',
      'atendimento@fasaudefpto.com.br'
    ],
    codigosRemocao: [
      { codigo: '10101039', descricao: 'Consulta em Pronto Socorro Militar', tipo: 'outro' },
      { codigo: '60501002', descricao: 'Remoção Terrestre com Médico / UTI', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Básica Sem Médico', tipo: 'basica' }
    ],
    regrasAutorizacao: [
      'Utilizar preferencialmente o novo portal de serviços FAsaúde FPTO.',
      'Remoção de policiais e bombeiros militares do Tocantins e seus dependentes.',
      'Sempre colher assinatura do militar titular ou dependente na guia TISS.'
    ],
    checklistDocumentos: [
      'Guia autorizada no portal FAsaúde',
      'Identidade funcional militar ou cartão Pro-Tocantins',
      'Relatório médico da urgência'
    ],
    observacoesCriticas: [
      'Em caso de policiais feridos em serviço, prioridade máxima no atendimento e regulação.'
    ],
    fluxoPassoAPasso: [
      '1. Entrar no portal com usuário MEDICAL e senha 123456.',
      '2. Solicitar autorização de urgência de remoção.',
      '3. Obter senha e acionar viatura da LISS CARE ou resgate da corporação.'
    ]
  },
  {
    id: 'prosocial',
    numero: '24',
    nome: 'PRO SOCIAL',
    categoria: 'autogestao',
    badge: 'PR',
    statusCobertura: 'sim',
    statusTexto: 'Remoções terrestres conforme Portaria/PRESI/SECBE 187 de 23/05/14 (Autorização exclusiva pelo Portal)',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Portal Pro Social TRF1 (Análise prévia pelo sistema)',
    empresaCredenciadaPrincipal: 'Portal Autorizador Pro-Social TRF1 / Regulação',
    portalUrl: 'https://prosocial.trf1.jus.br/prosocial/login.aspx',
    logins: [
      { label: 'Login MEDICAL', valor: '12955953000192' },
      { label: 'Senha MEDICAL', valor: 'hCP2015', mask: true },
      { label: 'Login SANTA THEREZA', valor: '25016319000136' },
      { label: 'Senha SANTA THEREZA', valor: 'thereza2018', mask: true }
    ],
    telefones: [
      '(61) 3314-5000 (Central TRF1 Pro-Social)',
      '(63) 3218-3800 (Subseção Judiciária de Palmas)',
      '0800 704 0001 (Suporte Pro Social)'
    ],
    emails: [
      'prosocial@trf1.jus.br (Atenção: Pedidos de autorização por e-mail NÃO são aceitos)',
      'sesau.to@trf1.jus.br'
    ],
    codigosRemocao: [
      {
        codigo: '6.99.07.012',
        descricao: 'Atendimento médico com remoção',
        tipo: 'uti',
        observacao: 'Portaria/PRESI/SECBE nº 187 de 23/05/2014'
      },
      {
        codigo: '6.99.07.036',
        descricao: 'Traslado com médico',
        tipo: 'uti',
        observacao: 'Portaria/PRESI/SECBE nº 187 de 23/05/2014'
      },
      {
        codigo: '6.99.07.048',
        descricao: 'Traslado com respirador e/ou incubadora',
        tipo: 'uti',
        observacao: 'Portaria/PRESI/SECBE nº 187 de 23/05/2014'
      },
      {
        codigo: '6.99.07.024',
        descricao: 'Traslado sem médico',
        tipo: 'basica',
        observacao: 'Portaria/PRESI/SECBE nº 187 de 23/05/2014'
      }
    ],
    regrasAutorizacao: [
      'REGULAMENTAÇÃO: Remoções terrestres regidas expressamente pela Portaria/PRESI/SECBE nº 187, de 23/05/2014.',
      'CÓDIGOS DA PORTARIA: 6.99.07.012 (Atendimento médico com remoção), 6.99.07.036 (Traslado com médico), 6.99.07.048 (Traslado com respirador e/ou incubadora) e 6.99.07.024 (Traslado sem médico).',
      'REGRA GERAL DE AUTORIZAÇÃO: Desde 01/07/2023, as autorizações devem ser solicitadas pelo Portal Autorizador do Pro-Social (ressalvados atendimentos de urgência/emergência, domiciliares e odontológicos).',
      'PROIBIÇÃO FORMAL: Pedidos de autorização enviados por e-mail NÃO serão autorizados!',
      'ANÁLISE PRÉVIA: Para pedidos que precisem de análise prévia, inserir documentação comprobatória (laudos, pareceres e exames complementares) e acompanhar o status pelo próprio portal.',
      'O POP apresenta essa como regra geral de autorização logo após a seção de remoção, não detalhando código por código qual remoção é automática ou exige análise.'
    ],
    checklistDocumentos: [
      '1. Pedido Médico especificando o tipo de transporte (com médico, sem médico ou com respirador/incubadora)',
      '2. Laudos médicos, pareceres e exames complementares para inserção no Portal',
      '3. Solicitação gerada no Portal Autorizador Pro-Social TRF1 com código da Portaria 187/2014',
      '4. Cópia da carteirinha Pro-Social e documento com foto'
    ],
    observacoesCriticas: [
      'NUNCA solicitar autorização por e-mail: o Pro-Social recusa formalmente pedidos por e-mail desde 01/07/2023.',
      'Cadastrar a guia no Portal Autorizador com o código exato da Portaria 187/2014 (6.99.07.012, 6.99.07.036, 6.99.07.048 ou 6.99.07.024).',
      'Anexar laudos, pareceres e exames complementares diretamente no portal para análise prévia.'
    ],
    fluxoPassoAPasso: [
      '1. Identificar o enquadramento exato conforme a Portaria 187/2014: Sem Médico (6.99.07.024), Com Médico (6.99.07.036), Com Respirador/Incubadora (6.99.07.048) ou Atendimento com Remoção (6.99.07.012).',
      '2. Obter o laudo médico detalhado, pareceres e exames complementares.',
      '3. Acessar o Portal Autorizador Pro-Social TRF1 (https://prosocial.trf1.jus.br/prosocial/login.aspx).',
      '4. Inserir a solicitação com o código correspondente anexando a documentação comprobatória (NÃO enviar por e-mail).',
      '5. Acompanhar a evolução do status de autorização diretamente no portal.'
    ]
  },
  {
    id: 'servir',
    numero: '25',
    nome: 'SERVIR',
    categoria: 'estadual_municipal',
    badge: 'SR',
    statusCobertura: 'sim',
    statusTexto: 'Formulário do SERVIR obrigatório / Autorização no site / Acompanhamento via WhatsApp da Central',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped', 'aerea'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Acionamento com formulário e acompanhamento via grupo da Central',
    empresaCredenciadaPrincipal: 'LISS CARE / CARE MED SOLUTIONS',
    portalUrl: 'https://novowebplanplansaude.facilinformatica.com.br/GuiasTISS/Logon#',
    logins: [
      { label: 'Usuário MEDICAL', valor: '12955953000192' },
      { label: 'Senha MEDICAL', valor: '129559530001921292', mask: true },
      { label: 'Cód. Contratado MEDICAL', valor: '00352-2' },
      { label: 'Usuário SANTA THEREZA', valor: '25016319000136' },
      { label: 'Senha SANTA THEREZA', valor: '25016319000136', mask: true },
      { label: 'Cód. Contratado SANTA THEREZA', valor: '00209-2' }
    ],
    telefones: [
      '0800 911 4040 (Central SERVIR 24h)',
      '(63) 3218-1200 (Regulação SERVIR TO)',
      '(63) 99104-9287 (LissCare Plantão 24h)',
      '(63) 3322-1423 (CareMed Solutions WhatsApp)'
    ],
    emails: [
      'remocaoservir@impactomedica.com.br',
      'lisscareremocao@gmail.com',
      'remocaocaremed@gmail.com',
      'atendimentoservir@impactomedica.com.br'
    ],
    codigosRemocao: [
      {
        codigo: '60501002',
        descricao: 'Remoção ambulância interna dentro do município de Palmas, Araguaína ou Gurupi com médico',
        tipo: 'uti',
        valorEstimado: 'Tabela Própria SERVIR'
      },
      {
        codigo: '60501001',
        descricao: 'Remoção ambulância interna dentro do município de Palmas, Araguaína ou Gurupi sem médico',
        tipo: 'basica',
        valorEstimado: 'Tabela Própria SERVIR'
      },
      {
        codigo: '10101037',
        descricao: 'Pacote Pronto Socorro Adulto SERVIR',
        tipo: 'outro'
      },
      {
        codigo: '10101038',
        descricao: 'Pacote Pronto Socorro Pediatria SERVIR',
        tipo: 'outro'
      }
    ],
    regrasAutorizacao: [
      'E-MAIL DE REMOÇÃO: remocaoservir@impactomedica.com.br.',
      'DOCUMENTO: Deve ser enviado obrigatoriamente o FORMULÁRIO DO SERVIR.',
      'EMPRESA CITADA NO POP: LISS CARE (e CARE MED SOLUTIONS como parceira credenciada).',
      'AUTORIZAÇÃO: Quando a solicitação for feita à LISS CARE, deve-se solicitar autorização no site oficial do SERVIR.',
      'ACOMPANHAMENTO: Colocar a solicitação no grupo de WhatsApp da Central para acompanhar caso fique em análise.',
      'CÓDIGOS: 60501002 (com médico) ou 60501001 (sem médico) dentro do município de Palmas, Araguaína ou Gurupi.'
    ],
    checklistDocumentos: [
      '1. Formulário oficial do SERVIR devidamente preenchido',
      '2. Pedido Médico com indicação clínica e necessidade de médico',
      '3. Cópia da carteira do plano SERVIR',
      '4. Cópia do documento de identificação oficial com foto'
    ],
    observacoesCriticas: [
      'E-mail específico de remoção: remocaoservir@impactomedica.com.br.',
      'Obrigatório preencher e anexar o Formulário do SERVIR.',
      'Quando envolver a LISS CARE: solicitar autorização no site e colocar no grupo de WhatsApp da Central para acompanhar.',
      'Sempre colocar em cópia: janaina.gomes@redemedical.com.br e hpm.recepcao@redemedical.com.br.'
    ],
    fluxoPassoAPasso: [
      '1. Preencher e obter a documentação necessária: Pedido Médico, carteira do SERVIR e documento com foto.',
      '2. Preencher o Formulário oficial do SERVIR com os dados da remoção.',
      '3. Enviar o formulário para remocaoservir@impactomedica.com.br e para a empresa executora (LISS CARE / CARE MED).',
      '4. Quando a solicitação for feita à LISS CARE, solicitar autorização no site oficial do SERVIR.',
      '5. Colocar a solicitação no grupo de WhatsApp da Central para acompanhar caso fique em análise.',
      '6. Utilizar o código conforme necessidade médica: 60501002 (Com Médico) ou 60501001 (Sem Médico).'
    ]
  },
  {
    id: 'sepaco',
    numero: '26',
    nome: 'SEPACO',
    categoria: 'autogestao',
    badge: 'SP',
    statusCobertura: 'sim',
    statusTexto: 'Portal AG2 Sepaco + Contato Central',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Até 1h no portal',
    empresaCredenciadaPrincipal: 'LISS CARE',
    portalUrl: 'https://portalag2.sepaco.org.br/login',
    logins: [
      { label: 'Login', valor: '0003458' },
      { label: 'Senha', valor: 'Medical2025', mask: true }
    ],
    telefones: [
      '0800 770 0055 (Central Sepaco 24h)',
      '11 2165-7600 (Central SP)'
    ],
    emails: [
      'autorizacoes@sepaco.org.br',
      'regulacao@sepaco.org.br'
    ],
    codigosRemocao: [
      { codigo: '10101039', descricao: 'Consulta em Pronto Socorro', tipo: 'outro' },
      { codigo: '60501002', descricao: 'Remoção Terrestre com Médico / UTI', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Básica Sem Médico', tipo: 'basica' }
    ],
    regrasAutorizacao: [
      'Solicitar autorização no portal Sepaco AG2.',
      'Assinatura obrigatória na guia autorizada.',
      'Confirmar se a remoção possui autorização expressa de transporte inter-hospitalar.'
    ],
    checklistDocumentos: [
      'Guia emitida no portal AG2',
      'Laudo médico com carimbo e CRM',
      'Comprovante de leito reservado'
    ],
    observacoesCriticas: [
      'Aguardar retorno de senha antes de acionar a ambulância.'
    ],
    fluxoPassoAPasso: [
      '1. Fazer logon no portal com login 0003458.',
      '2. Abrir solicitação SP/SADT.',
      '3. Obter senha e colher assinatura da família.',
      '4. Despachar a equipe da ambulância.'
    ]
  },
  {
    id: 'sulamerica',
    numero: '27',
    nome: 'SUL AMÉRICA',
    categoria: 'privado',
    badge: 'SA',
    statusCobertura: 'sim',
    statusTexto: 'Portal SulAmérica Saúde + Central 24h',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped', 'aerea'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Imediato no portal ou por telefone na urgência',
    empresaCredenciadaPrincipal: 'Med Life / Vida Emergência / LISS CARE',
    portalUrl: 'https://saude.sulamericaseguros.com.br/prestador/',
    logins: [
      { label: 'Login', valor: '100000015181 / MASTER' },
      { label: 'Senha', valor: '@medic18', mask: true }
    ],
    telefones: [
      '4004-5900 (Capitais e Regiões Metropolitanas)',
      '0800 970 0500 (Demais Regiões)',
      '0800 702 2242 (Central de Regulação e Remoção 24h)'
    ],
    emails: [
      'remocao.sulamerica@sulamerica.com.br',
      'autorizacao.urgencia@sulamerica.com.br'
    ],
    codigosRemocao: [
      { codigo: '64620107', descricao: 'Pacote Pronto Socorro Sul América', tipo: 'outro' },
      { codigo: '60501002', descricao: 'Remoção Terrestre em UTI Móvel', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Terrestre Básica', tipo: 'basica' },
      { codigo: '60501029', descricao: 'Remoção Aeromédica Sul América', tipo: 'aerea' }
    ],
    regrasAutorizacao: [
      'Pacote PS 64620107 inclui os primeiros atendimentos.',
      'Remoções inter-hospitalares e transferências de UTI exigem autorização expressa no portal ou contato pelo 0800 702 2242.',
      'A SulAmérica pode disponibilizar resgate aeromédico para pacientes críticos dependendo da apólice.',
      'Obrigatória assinatura do paciente ou responsável.'
    ],
    checklistDocumentos: [
      'Senha de autorização emitida no portal SulAmérica',
      'Relatório médico em modelo padronizado',
      'Aceite formal do hospital de destino'
    ],
    observacoesCriticas: [
      'Confirmar se a apólice do paciente tem cobertura de resgate aeromédico antes de acionar UTI aérea.'
    ],
    fluxoPassoAPasso: [
      '1. Entrar no portal do prestador SulAmérica.',
      '2. Cadastrar solicitação de remoção com código 60501002.',
      '3. Caso seja urgente, ligar para 0800 702 2242.',
      '4. Obter senha e acionar o parceiro de transporte.'
    ]
  },
  {
    id: 'sus',
    numero: '28',
    nome: 'SUS',
    categoria: 'militar_publico',
    badge: 'SU',
    statusCobertura: 'sim',
    statusTexto: 'Regulação NIR / Central de Regulação Estadual de Leitos (SISREG)',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped', 'aerea'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Regulado por fila de gravidade (Vaga Zero / SISREG)',
    empresaCredenciadaPrincipal: 'SAMU 192 / SIATE / Ambulâncias Estaduais SES-TO / CIOPAER',
    telefones: [
      '192 (SAMU Central de Regulação de Urgência)',
      '63 3218-1700 (Central Estadual de Regulação de Leitos - SES/TO)',
      '63 3218-7800 (NIR Hospital Geral de Palmas - HGP)',
      '63 3218-7700 (Hospital Dona Regina - Infantil/Maternidade)',
      '190 / CIOPAER (Grupamento Aéreo em Resgate de Extrema Urgência)'
    ],
    emails: [
      'regulacao.sesto@saude.to.gov.br',
      'nir.hgp@saude.to.gov.br',
      'samu.palmas@saude.to.gov.br'
    ],
    logins: [
      { label: 'Sistema', valor: 'SISREG / Regulação Estadual SES-TO', link: false },
      { label: 'Central SAMU', valor: '192' },
      { label: 'NIR HGP', valor: '63 3218-7800' }
    ],
    codigosRemocao: [
      { codigo: '0301060088', descricao: 'Transferência Inter-Hospitalar com Suporte Avançado (UTI Móvel)', tipo: 'uti' },
      { codigo: '0301060070', descricao: 'Transferência Inter-Hospitalar com Suporte Básico (USB)', tipo: 'basica' },
      { codigo: '0301060010', descricao: 'Atendimento de Urgência no SUS / Acolhimento com Classificação de Risco', tipo: 'outro' },
      { codigo: '0301060096', descricao: 'Transporte Sanitário Eletivo para Tratamento Fora do Domicílio (TFD)', tipo: 'km' }
    ],
    regrasAutorizacao: [
      'Todo transporte inter-hospitalar pelo SUS deve ser OBRIGATORIAMENTE inserido e regulado pelo SISREG / NIR Estadual.',
      'Critério Vaga Zero acionado apenas pelo médico regulador do SAMU 192 em situações de iminente risco de morte.',
      'Para UTI Neonatal: acionar a regulação específica para o Hospital e Maternidade Dona Regina.',
      'O médico assistente deve preencher o Laudo de Solicitação de Vaga e Transporte (AIH / Laudo SISREG).'
    ],
    checklistDocumentos: [
      'Laudo Médico do SISREG preenchido com carimbo e CRM',
      'Cartão Nacional do SUS (CNS) e documento com foto do paciente',
      'Número da autorização da Vaga / Protocolo de Regulação Estadual',
      'Exames complementares e prescrição para a equipe do SAMU/Transporte Sanitário'
    ],
    observacoesCriticas: [
      'NUNCA movimentar paciente SUS sem o aceite formal do médico regulador e a confirmação de leito no hospital de destino.'
    ],
    fluxoPassoAPasso: [
      '1. Médico assistente preenche a ficha de regulação e laudo de transferência.',
      '2. Núcleo Interno de Regulação (NIR) insere o pedido no sistema SISREG da SES-TO.',
      '3. Contatar a Central de Regulação Estadual (63 3218-1700) ou SAMU 192.',
      '4. Ao liberar a vaga, aguardar a chegada da viatura do SAMU / Transporte Sanitário oficial com prontuário completo.'
    ]
  },
  {
    id: 'tre',
    numero: '29',
    nome: 'TRE',
    categoria: 'autogestao',
    badge: 'TR',
    statusCobertura: 'sim',
    statusTexto: 'A remoção dentro do município deve ser solicitada à empresa LISS CARE.',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Acionamento imediato por e-mail à LISS CARE',
    empresaCredenciadaPrincipal: 'LISS CARE (lisscareremocao@gmail.com)',
    telefones: [
      '(63) 99104-9287 (LissCare Plantão 24h)',
      '(63) 98447-9504 (LissCare Comercial)',
      '63 3229-9500 (TRE-TO Geral)',
      '63 3229-9600 (Seção de Assistência à Saúde - SAS)'
    ],
    emails: [
      'lisscareremocao@gmail.com',
      'saude@tre-to.jus.br',
      'autorizacoes.tre@tre-to.jus.br'
    ],
    logins: [
      { label: 'Canal TRE-TO', valor: 'SAS - Seção de Assistência à Saúde' },
      { label: 'Telefone SAS', valor: '63 3229-9600' }
    ],
    codigosRemocao: [
      { codigo: '10101039', descricao: 'Consulta em Pronto Socorro', tipo: 'outro' },
      { codigo: '60501002', descricao: 'Remoção Terrestre com Médico / UTI', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Básica Sem Médico', tipo: 'basica' }
    ],
    regrasAutorizacao: [
      'A remoção deve ser solicitada à empresa LISS CARE.',
      'A LISS CARE solicitará a autorização ao TRE-TO.'
    ],
    checklistDocumentos: [
      '1. Pedido Médico',
      '2. Cópia da carteira do plano / funcional TRE',
      '3. Cópia do documento com foto'
    ],
    observacoesCriticas: [
      'Sempre colocar em cópia: janaina.gomes@redemedical.com.br e hpm.recepcao@redemedical.com.br'
    ],
    fluxoPassoAPasso: [
      '1. Reunir os documentos obrigatórios: 1) Pedido Médico; 2) Cópia da carteira do plano / funcional TRE; 3) Cópia do documento com foto.',
      '2. Enviar e-mail para a EMPRESA LISS CARE no endereço: lisscareremocao@gmail.com solicitando a remoção dentro do município com os documentos em anexo (colocar sempre em cópia: janaina.gomes@redemedical.com.br e hpm.recepcao@redemedical.com.br).',
      '3. A LISS CARE solicitará ao TRE-TO a autorização para a remoção do paciente.'
    ]
  },
  {
    id: 'vigimed',
    numero: '30',
    nome: 'VIGIMED',
    categoria: 'privado',
    badge: 'VG',
    statusCobertura: 'apenas_urgencia',
    statusTexto: 'Atendimento direto com Cartão VIGIMED PRIME / Sem autorização prévia para clínico',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Imediato na urgência',
    empresaCredenciadaPrincipal: 'LISS CARE',
    telefones: [
      '63 3215-1000 (Central Vigimed TO)',
      '63 98400-1122 (Plantão)'
    ],
    emails: [
      'vigimed.atendimento@vigimed.com.br',
      'contato@vigimed.com.br'
    ],
    logins: [
      { label: 'Exigência', valor: 'Apresentação do Cartão VIGIMED PRIME' },
      { label: 'Central', valor: '63 3215-1000' }
    ],
    codigosRemocao: [
      { codigo: '10101039', descricao: 'Atendimento Clínico sem Autorização Prévia', tipo: 'outro' },
      { codigo: '60501002', descricao: 'Remoção Terrestre UTI Móvel', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Básica sem Médico', tipo: 'basica' }
    ],
    regrasAutorizacao: [
      'OBRIGATÓRIO apresentar o CARTÃO VIGIMED PRIME físico ou digital.',
      'Se o paciente NÃO apresentar o cartão VIGIMED PRIME, o POP orienta NÃO atender.',
      'Atendimento clínico, radiologia e USG de urgência não precisam de autorização prévia.',
      'Remoções inter-hospitalares necessitam de comunicação à central Vigimed.'
    ],
    checklistDocumentos: [
      'Cartão VIGIMED PRIME original com documento com foto',
      'Relatório médico de urgência',
      'Assinatura do paciente no formulário de atendimento'
    ],
    observacoesCriticas: [
      'Conferir a vigência do cartão VIGIMED PRIME antes da prestação do serviço.'
    ],
    fluxoPassoAPasso: [
      '1. Exigir e verificar o cartão VIGIMED PRIME.',
      '2. Realizar atendimento clínico emergencial.',
      '3. Acionar a remoção pela LISS CARE com a ficha assinada.'
    ]
  },
  {
    id: 'semus',
    numero: '32',
    nome: 'SEMUS',
    categoria: 'estadual_municipal',
    badge: 'SM',
    statusCobertura: 'sim',
    statusTexto: 'Regulação Municipal UPA / SAMU Palmas (192)',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Regulado pela Central SAMU Palmas 192',
    empresaCredenciadaPrincipal: 'SAMU 192 Regional Palmas / Frota SEMUS',
    telefones: [
      '192 (SAMU Regional Palmas)',
      '63 3212-7800 (SEMUS Palmas - Sede)',
      '63 3218-5300 (UPA Norte Palmas)',
      '63 3218-5400 (UPA Sul Palmas)'
    ],
    emails: [
      'samu.palmas@saude.to.gov.br',
      'regulacao.semus@palmas.to.gov.br'
    ],
    logins: [
      { label: 'Regulação SAMU', valor: '192' },
      { label: 'Sede SEMUS', valor: '63 3212-7800' }
    ],
    codigosRemocao: [
      { codigo: '0301060088', descricao: 'Remoção de Suporte Avançado SAMU (USA - UTI)', tipo: 'uti' },
      { codigo: '0301060070', descricao: 'Remoção de Suporte Básico SAMU (USB)', tipo: 'basica' },
      { codigo: '0301060096', descricao: 'Transporte Sanitário Municipal', tipo: 'km' }
    ],
    regrasAutorizacao: [
      'Transferências originárias ou destinadas às UPAs (UPA Norte / UPA Sul) são coordenadas pela Regulação Municipal.',
      'Contato direto pelo 192 com o médico regulador do SAMU.',
      'Apresentar relatório de transferência municipal padronizado.'
    ],
    checklistDocumentos: [
      'Ficha de atendimento UPA / Laudo de transferência',
      'Cartão SUS e documento do paciente',
      'Protocolo de autorização do médico regulador do SAMU'
    ],
    observacoesCriticas: [
      'Pacientes intubados exigem presença de médico assistente caso o SAMU envie viatura básica.'
    ],
    fluxoPassoAPasso: [
      '1. Médico assistente liga para 192 e passa o caso clínico ao médico regulador.',
      '2. Médico regulador define se enviará USA (com médico) ou USB (básica).',
      '3. Preparar o paciente com monitorização completa.',
      '4. Passar o caso à equipe do SAMU no momento da chegada.'
    ]
  },
  {
    id: 'valepasa',
    numero: '33',
    nome: 'VALE PASA',
    categoria: 'autogestao',
    badge: 'VP',
    statusCobertura: 'sim',
    statusTexto: 'Portal Conecta Saúde + Pacote Urgência',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Até 48h para pendências; Urgência imediata no pacote',
    empresaCredenciadaPrincipal: 'LISS CARE',
    portalUrl: 'https://portalconectasaude.com.br/',
    logins: [
      { label: 'Login', valor: 'prorrogacaointernacao@redemedical.com.br' },
      { label: 'Senha', valor: 'Medical2025.', mask: true }
    ],
    telefones: [
      '4004-0183 (Central PASA Vale 24h)',
      '0800 701 0183 (Demais Localidades)'
    ],
    emails: [
      'autorizacao@planopasa.com.br',
      'regulacaomedica@planopasa.com.br'
    ],
    codigosRemocao: [
      { codigo: '98001620', descricao: 'Pacote Urgência/Emergência PASA', tipo: 'outro' },
      { codigo: '60501002', descricao: 'Remoção Terrestre com Médico / UTI', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Básica Sem Médico', tipo: 'basica' }
    ],
    regrasAutorizacao: [
      'Sempre verificar a elegibilidade no portal Conecta Saúde; deve constar status: HABILITADO.',
      'Não é necessário pegar autorização prévia no site para o pacote inicial do PS.',
      'Validade das guias de internação/remoção: 30 dias (ou 60 dias com OPME).',
      'Prazo de resposta de pendências: até 48 horas.',
      'Prorrogação de remoção: informar o número da guia principal.'
    ],
    checklistDocumentos: [
      'Comprovante de elegibilidade HABILITADO',
      'Guia gerada no portal Conecta Saúde',
      'Relatório médico de transferência'
    ],
    observacoesCriticas: [
      'Certificar-se de que a guia principal está vinculada caso seja prorrogação.'
    ],
    fluxoPassoAPasso: [
      '1. Verificar elegibilidade no portal conectasaude.com.br.',
      '2. Abrir solicitação de remoção com código 60501002.',
      '3. Imprimir guia com a senha e acionar a viatura.'
    ]
  },
  {
    id: 'unafisco',
    numero: '34',
    nome: 'UNAFISCO',
    categoria: 'autogestao',
    badge: 'UN',
    statusCobertura: 'sim',
    statusTexto: 'Portal Fácil WebPlan + Exige Carteirinha UNAFISCO PREMIUM',
    tipoAmbulanciaSuportada: ['basica', 'uti_adulto', 'uti_neo_ped', 'aerea'],
    exigeToken: false,
    exigeAssinatura: true,
    prazoResposta: 'Até 1h no portal / 24h pós-procedimento',
    empresaCredenciadaPrincipal: 'LISS CARE',
    portalUrl: 'https://novowebplanunafisco.facilinformatica.com.br/GuiasTISS/Home',
    logins: [
      { label: 'Usuário MEDICAL', valor: '12955953000192' },
      { label: 'Senha MEDICAL', valor: '12955953000192', mask: true },
      { label: 'Código Contratado MEDICAL', valor: '468.235/12-1' },
      { label: 'Senha SANTA THEREZA', valor: '25016319000136', mask: true }
    ],
    telefones: [
      '0800 028 2777 (Central UNAFISCO 24h)',
      '11 3105-0000 (Sede Nacional Unafisco)'
    ],
    emails: [
      'autorizacoes@unafiscosaude.org.br',
      'regulacao@unafiscosaude.org.br'
    ],
    codigosRemocao: [
      { codigo: '10101039', descricao: 'Consulta em Pronto Socorro', tipo: 'outro' },
      { codigo: '60501002', descricao: 'Remoção Terrestre com Médico / UTI Móvel', tipo: 'uti' },
      { codigo: '60501001', descricao: 'Remoção Básica Sem Médico', tipo: 'basica' },
      { codigo: '60501029', descricao: 'Remoção Aérea em UTI Aeromédica', tipo: 'aerea' }
    ],
    regrasAutorizacao: [
      'ATENÇÃO: Atender SOMENTE beneficiários com a carteirinha UNAFISCO PREMIUM (cor preta), conforme norma expressa do POP.',
      'Caso não consiga concluir ou validar a guia no portal, o POP orienta NÃO atender o beneficiário.',
      'Validade das guias autorizadas: 90 dias.',
      'Prazo limite de solicitação: até 24 horas após o procedimento cirúrgico ou emergencial.',
      'Remoções inter-hospitalares com médico: código 60501002.'
    ],
    checklistDocumentos: [
      'Cópia da carteira UNAFISCO PREMIUM (preta) e documento com foto',
      'Guia SP/SADT com senha gerada no WebPlan',
      'Relatório médico em papel timbrado assinado com CRM'
    ],
    observacoesCriticas: [
      'Verificar rigorosamente a cor da carteira (deve ser a versão PREMIUM preta).'
    ],
    fluxoPassoAPasso: [
      '1. Conferir a carteirinha UNAFISCO PREMIUM (preta).',
      '2. Fazer logon no portal WebPlan com código 468.235/12-1.',
      '3. Abrir SP/SADT com código 60501002.',
      '4. Concluir a guia, imprimir e colher assinatura do associado.',
      '5. Acionar a equipe da LISS CARE.'
    ]
  }
];
