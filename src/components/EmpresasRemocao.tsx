import React from 'react';
import { empresasAmbulanciaData } from '../data/contatosEmpresas';
import { 
  Truck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare, 
  Building2,
  Copy,
  Check
} from 'lucide-react';

export const EmpresasRemocao: React.FC = () => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Truck className="w-5 h-5 text-[#9E1B4F]" />
          Empresas Credenciadas & Bases de Ambulâncias
        </h2>
        <p className="text-xs text-slate-500">
          Contatos diretos, canais de acionamento 24h e cobertura das frotas parceiras para atendimento em Palmas e região.
        </p>
      </div>

      {/* Grid of Companies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {empresasAmbulanciaData.map((empresa) => (
          <div 
            key={empresa.id}
            className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#9E1B4F]/40 p-6 shadow-xs transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3.5">
              
              {/* Title & Badge */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {empresa.nome}
                  </h3>
                  <span className="text-xs font-semibold text-[#1D787A] block mt-0.5">
                    {empresa.tipo}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-[#FDF2F5] border border-[#F8D0DC] text-[#9E1B4F] flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
              </div>

              {/* Coverage & Time */}
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Cobertura:</strong> {empresa.cidadesAtendidas}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span><strong>Tempo de Resposta:</strong> {empresa.tempoMedioResposta}</span>
                </div>
              </div>

              {/* Vehicle Types */}
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1.5">
                  Frota e Equipamentos Disponíveis
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {empresa.tiposAmbulancia.map((t, i) => (
                    <span key={i} className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Acionamento guideline */}
              <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-2xl text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900 block mb-1">Como Acionar:</strong>
                {empresa.procedimentoAcionamento}
              </div>

              {/* Convenios atendidos */}
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
                  Convênios com Acionamento Direto
                </span>
                <div className="flex flex-wrap gap-1 text-[10px] font-bold text-teal-800">
                  {empresa.conveniosAtendidosDireto.map((c, i) => (
                    <span key={i} className="bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Contacts & CTA Footer */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="space-y-1.5">
                {empresa.telefones.map((tel, i) => {
                  const cleanDigits = tel.replace(/\D/g, '');
                  const hasWa = empresa.whatsapp || tel.toLowerCase().includes('whatsapp') || cleanDigits.length >= 10;
                  const waNumber = empresa.whatsapp ? (empresa.whatsapp.startsWith('55') ? empresa.whatsapp : `55${empresa.whatsapp}`) : (cleanDigits.startsWith('55') ? cleanDigits : `55${cleanDigits}`);

                  return (
                    <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 gap-2">
                      <span className="font-bold text-slate-900 font-mono text-[11px] sm:text-xs truncate">{tel}</span>
                      
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {hasWa && (
                          <a
                            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Olá, contato referente a remoção pelo Hospital Palmas Medical - ${empresa.nome}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-2xs transition-colors"
                            title="Abrir no WhatsApp"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        )}

                        <button
                          onClick={() => handleCopy(tel.split('(')[0].trim(), `${empresa.id}-tel-${i}`)}
                          className="p-1 text-slate-400 hover:text-teal-700 hover:bg-slate-200 rounded transition-colors"
                          title="Copiar número"
                        >
                          {copiedId === `${empresa.id}-tel-${i}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {empresa.emails.length > 0 && (
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono">
                  <span className="text-teal-800 font-bold truncate">{empresa.emails[0]}</span>
                  <button
                    onClick={() => handleCopy(empresa.emails[0], `${empresa.id}-email`)}
                    className="p-1 text-slate-400 hover:text-teal-700 hover:bg-slate-200 rounded transition-colors"
                    title="Copiar e-mail"
                  >
                    {copiedId === `${empresa.id}-email` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
