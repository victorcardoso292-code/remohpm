import React, { useState } from 'react';
import { PlanoRemocao, TipoAmbulancia } from '../types/remocao';
import { 
  Sparkles, 
  Truck, 
  Send, 
  Copy, 
  Check, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  FileText, 
  Share2, 
  UserCheck, 
  Building2, 
  FileCode2, 
  PhoneCall, 
  ExternalLink,
  Printer
} from 'lucide-react';

interface SimuladorRemocaoProps {
  planos: PlanoRemocao[];
  initialPlanoId?: string;
  onOpenPlanDetail: (plano: PlanoRemocao) => void;
}

export const SimuladorRemocao: React.FC<SimuladorRemocaoProps> = ({
  planos,
  initialPlanoId,
  onOpenPlanDetail
}) => {
  const [selectedPlanoId, setSelectedPlanoId] = useState<string>(initialPlanoId || 'servir');
  const [pacienteNome, setPacienteNome] = useState<string>('');
  const [idade, setIdade] = useState<string>('');
  const [matricula, setMatricula] = useState<string>('');
  const [origemSetor, setOrigemSetor] = useState<string>('Pronto-Socorro Adulto');
  const [hospitalDestino, setHospitalDestino] = useState<string>('Hospital Geral de Palmas (HGP)');
  const [cidadeDestino, setCidadeDestino] = useState<string>('Palmas / TO');
  const [finalidade, setFinalidade] = useState<string>('Transferência Definitiva de Leito');
  const [tipoTransporte, setTipoTransporte] = useState<TipoAmbulancia>('uti_adulto');
  
  // Clinical flags
  const [isVentilado, setIsVentilado] = useState<boolean>(false);
  const [isDrogasVasoativas, setIsDrogasVasoativas] = useState<boolean>(false);
  const [isIsolamento, setIsIsolamento] = useState<boolean>(false);
  const [temVagaConfirmada, setTemVagaConfirmada] = useState<boolean>(true);
  const [diagnostico, setDiagnostico] = useState<string>('Síndrome Coronariana Aguda / Choque Cardiogênico');
  const [medicoSolicitante, setMedicoSolicitante] = useState<string>('Dr. Plantonista HPM');
  const [crm, setCrm] = useState<string>('CRM/TO 4512');

  const [copied, setCopied] = useState<boolean>(false);

  const selectedPlano = planos.find(p => p.id === selectedPlanoId) || planos[0];

  // Calculate recommended code
  const getRecommendedCode = () => {
    if (tipoTransporte === 'uti_adulto' || tipoTransporte === 'uti_neo_ped') {
      const codeUti = selectedPlano.codigosRemocao.find(c => c.tipo === 'uti');
      return codeUti ? codeUti.codigo : '60501002';
    } else if (tipoTransporte === 'aerea') {
      const codeAerea = selectedPlano.codigosRemocao.find(c => c.tipo === 'aerea');
      return codeAerea ? codeAerea.codigo : '60501029';
    } else {
      const codeBasica = selectedPlano.codigosRemocao.find(c => c.tipo === 'basica');
      return codeBasica ? codeBasica.codigo : '60501001';
    }
  };

  const recommendedCode = getRecommendedCode();

  // Generate formatted WhatsApp / Regulation text
  const generateFormattedMessage = () => {
    const dataHora = new Date().toLocaleString('pt-BR');
    return `🚨 *SOLICITAÇÃO DE REMOÇÃO HOSPITALAR — HPM* 🚨
📅 *Data e Hora:* ${dataHora}
🏥 *Origem:* Hospital Palmas Medical — Setor: ${origemSetor}
🎯 *Destino:* ${hospitalDestino} (${cidadeDestino})
📋 *Finalidade:* ${finalidade}

👤 *PACIENTE:* ${pacienteNome.toUpperCase() || '[NOME DO(A) PACIENTE]'}
🎂 *Idade:* ${idade || '--'} anos | *Matrícula:* ${matricula || '--'}
🏷️ *Convênio / Operadora:* ${selectedPlano.nome}
🩺 *Diagnóstico / CID-10:* ${diagnostico}

🚑 *TIPO DE AMBULÂNCIA:* ${
      tipoTransporte === 'uti_adulto' ? '🔴 UTI MÓVEL ADULTO (TIPO D — COM MÉDICO)' :
      tipoTransporte === 'uti_neo_ped' ? '🟡 UTI NEONATAL / PEDIÁTRICA' :
      tipoTransporte === 'aerea' ? '🔵 UTI AÉREA / TRANSPORTE AEROMÉDICO' : '🟢 SUPORTE BÁSICO (TIPO B — SEM MÉDICO)'
    }
🔢 *Código TUSS Solicitado:* ${recommendedCode}
👨‍⚕️ *Médico(a) Solicitante:* ${medicoSolicitante} (${crm})

⚠️ *QUADRO CLÍNICO E SUPORTE:*
• Ventilação Mecânica (IOT): ${isVentilado ? 'SIM (Ventilador de transporte a bordo)' : 'NÃO'}
• Drogas Vasoativas (DVA): ${isDrogasVasoativas ? 'SIM (Bomba de infusão contínua)' : 'NÃO'}
• Precaução / Isolamento: ${isIsolamento ? 'SIM (Contato / Gotículas / Aerossóis)' : 'NÃO'}
• Vaga na Unidade Receptora: ${temVagaConfirmada ? 'SIM (Aceite médico formalizado)' : 'AGUARDANDO REGULAÇÃO'}

🏢 *Empresa Credenciada / Acionamento:* ${selectedPlano.empresaCredenciadaPrincipal}
🔑 *Canal de Autorização:* ${selectedPlano.statusTexto}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateFormattedMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-700 mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Assistente de Regulação</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Simulador & Roteirizador de Remoção
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Configure a origem, destino e suporte clínico para gerar o parecer técnico, códigos TUSS e a mensagem formatada para WhatsApp e enfermagem.
        </p>
      </div>

      {/* Grid: Inputs (Left) and Intelligence Result (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Input Form (5 cols) */}
        <div className="lg:col-span-6 space-y-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          
          <h3 className="text-sm font-extrabold uppercase text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 className="w-4 h-4 text-teal-600" />
            1. Dados da Solicitação & Convênio
          </h3>

          {/* Plano Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Plano de Saúde / Convênio
            </label>
            <select
              value={selectedPlanoId}
              onChange={(e) => setSelectedPlanoId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              {planos.map(p => (
                <option key={p.id} value={p.id}>
                  #{p.numero} - {p.nome} ({p.categoria.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Patient Quick Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">Nome do Paciente</label>
              <input
                type="text"
                placeholder="Ex: João da Silva Santos"
                value={pacienteNome}
                onChange={(e) => setPacienteNome(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Idade</label>
              <input
                type="text"
                placeholder="Ex: 58"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
              />
            </div>
          </div>

          {/* Origem e Destino */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Setor Origem (HPM)</label>
              <select
                value={origemSetor}
                onChange={(e) => setOrigemSetor(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium text-slate-900"
              >
                <option value="Pronto-Socorro Adulto">Pronto-Socorro Adulto</option>
                <option value="Pronto-Socorro Infantil">Pronto-Socorro Infantil</option>
                <option value="UTI Adulto A (Geral)">UTI Adulto A (Geral)</option>
                <option value="UTI Adulto B (Geral)">UTI Adulto B (Geral)</option>
                <option value="UTI Coronariana (UTI C)">UTI Coronariana (UTI C)</option>
                <option value="UTI Neonatal / Maternidade">UTI Neonatal / Maternidade</option>
                <option value="2º Andar / Enfermaria">2º Andar / Enfermaria</option>
                <option value="Centro Cirúrgico (CC)">Centro Cirúrgico (CC)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Hospital de Destino</label>
              <input
                type="text"
                placeholder="Ex: Hospital Geral de Palmas (HGP)"
                value={hospitalDestino}
                onChange={(e) => setHospitalDestino(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
              />
            </div>
          </div>

          {/* Tipo de Ambulância */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              Tipo de Suporte e Ambulância Necessária
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'basica', label: 'Básica (Tipo B)', sub: 'Sem Médico' },
                { id: 'uti_adulto', label: 'UTI Adulto (Tipo D)', sub: 'Com Médico' },
                { id: 'uti_neo_ped', label: 'UTI Neo/Ped', sub: 'Incubadora' },
                { id: 'aerea', label: 'UTI Aérea', sub: 'Medevac' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTipoTransporte(item.id as TipoAmbulancia)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    tipoTransporte === item.id
                      ? 'bg-[#1D787A] text-white border-[#165B5D] shadow-xs font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 font-medium'
                  }`}
                >
                  <div className="text-xs">{item.label}</div>
                  <div className={`text-[10px] ${tipoTransporte === item.id ? 'text-[#C8E4E3]' : 'text-slate-500'}`}>
                    {item.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Condições Clínicas (Toggles) */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              Condições Críticas / Suporte Especial
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <label className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                isVentilado ? 'bg-rose-50 border-rose-300 text-rose-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <input
                  type="checkbox"
                  checked={isVentilado}
                  onChange={(e) => {
                    setIsVentilado(e.target.checked);
                    if (e.target.checked && tipoTransporte === 'basica') {
                      setTipoTransporte('uti_adulto');
                    }
                  }}
                  className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
                <span>Ventilação Mecânica (IOT)</span>
              </label>

              <label className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                isDrogasVasoativas ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <input
                  type="checkbox"
                  checked={isDrogasVasoativas}
                  onChange={(e) => setIsDrogasVasoativas(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <span>Drogas Vasoativas (DVA)</span>
              </label>

              <label className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                isIsolamento ? 'bg-purple-50 border-purple-300 text-purple-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <input
                  type="checkbox"
                  checked={isIsolamento}
                  onChange={(e) => setIsIsolamento(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                />
                <span>Isolamento (KPC / Gotículas)</span>
              </label>

              <label className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                temVagaConfirmada ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-rose-50 border-rose-300 text-rose-900 font-bold'
              }`}>
                <input
                  type="checkbox"
                  checked={temVagaConfirmada}
                  onChange={(e) => setTemVagaConfirmada(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Vaga Confirmada no Destino</span>
              </label>
            </div>
          </div>

          {/* Diagnóstico */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Diagnóstico / Justificativa</label>
            <input
              type="text"
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
            />
          </div>

        </div>

        {/* RIGHT COLUMN: Intelligent Output & Action Center (7 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Smart Decision Card */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-lg space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-teal-300">
                  Parecer Inteligente de Remoção
                </span>
              </div>
              <button
                onClick={() => onOpenPlanDetail(selectedPlano)}
                className="text-xs font-bold text-teal-300 hover:text-white flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg"
              >
                <span>Ver POP Completo</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* Code Output Highlight */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-teal-500/30 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wide">
                  Código TUSS a Requisitar no Convênio
                </div>
                <div className="text-xl font-mono font-black text-teal-400 mt-0.5">
                  {recommendedCode}
                </div>
                <div className="text-xs text-slate-300">
                  {tipoTransporte === 'uti_adulto' ? 'Remoção com Médico / UTI Móvel' :
                   tipoTransporte === 'uti_neo_ped' ? 'Remoção UTI Neonatal / Pediátrica' :
                   tipoTransporte === 'aerea' ? 'Remoção Aeromédica / UTI Aérea' : 'Remoção Básica Sem Médico'}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400">Prestador Indicado</div>
                <div className="text-xs font-extrabold text-amber-300 mt-0.5">
                  {selectedPlano.empresaCredenciadaPrincipal}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Prazo: {selectedPlano.prazoResposta}
                </div>
              </div>
            </div>

            {/* Critical Plan Warnings for this simulation */}
            {selectedPlano.exigeToken && (
              <div className="bg-purple-950/60 border border-purple-500/40 p-3 rounded-xl text-xs text-purple-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span><strong>ATENÇÃO TOKEN:</strong> O plano <strong>{selectedPlano.nome}</strong> exige envio do TOKEN emitido pelo paciente no momento da autorização!</span>
              </div>
            )}

            {!temVagaConfirmada && (
              <div className="bg-rose-950/60 border border-rose-500/40 p-3 rounded-xl text-xs text-rose-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span><strong>SEM VAGA CONFIRMADA:</strong> Não despachar a ambulância até a confirmação formal do leito receptor!</span>
              </div>
            )}

            {/* Checklist Box */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                Documentos Obrigatórios para este Despacho
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                {selectedPlano.checklistDocumentos.slice(0, 4).map((doc, idx) => (
                  <li key={idx} className="text-slate-300 leading-relaxed">
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Formatted Message Generator */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-extrabold uppercase text-slate-900 tracking-wide">
                  Mensagem Formatada para WhatsApp / E-mail da Central
                </h4>
                <p className="text-[11px] text-slate-500">Pronta para envio à equipe de enfermagem, regulação e ambulância.</p>
              </div>

              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl text-xs font-extrabold bg-[#9E1B4F] hover:bg-[#82133F] text-white flex items-center gap-1.5 shadow-xs transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>Copiado com Sucesso!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Mensagem</span>
                  </>
                )}
              </button>
            </div>

            {/* Text Preview Box */}
            <pre className="bg-slate-900 text-teal-200 p-4 rounded-2xl text-[11px] font-mono whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto border border-slate-800 selection:bg-teal-500 selection:text-white">
              {generateFormattedMessage()}
            </pre>

          </div>

        </div>

      </div>

    </div>
  );
};
