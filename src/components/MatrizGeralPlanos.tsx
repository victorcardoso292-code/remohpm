import React, { useState } from 'react';
import { PlanoRemocao, CategoriaPlano } from '../types/remocao';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Phone, 
  KeyRound, 
  Truck, 
  Plane, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight,
  Eye,
  FileSpreadsheet
} from 'lucide-react';

interface MatrizGeralPlanosProps {
  planos: PlanoRemocao[];
  onSelectPlano: (plano: PlanoRemocao) => void;
}

export const MatrizGeralPlanos: React.FC<MatrizGeralPlanosProps> = ({
  planos,
  onSelectPlano
}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedCategoria, setSelectedCategoria] = useState<string>('todos');
  const [filterToken, setFilterToken] = useState<boolean>(false);
  const [filterAereo, setFilterAereo] = useState<boolean>(false);

  const filteredPlanos = planos.filter(p => {
    const matchesSearch = 
      p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.numero.includes(search) ||
      p.statusTexto.toLowerCase().includes(search.toLowerCase()) ||
      p.empresaCredenciadaPrincipal.toLowerCase().includes(search.toLowerCase()) ||
      p.codigosRemocao.some(c => c.codigo.includes(search));

    const matchesCategory = selectedCategoria === 'todos' || p.categoria === selectedCategoria;
    const matchesToken = !filterToken || p.exigeToken;
    const matchesAereo = !filterAereo || p.tipoAmbulanciaSuportada.includes('aerea');

    return matchesSearch && matchesCategory && matchesToken && matchesAereo;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-blue-600" />
              Matriz Comparativa Geral de Remoções
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Relação consolidada de regras, canais de autorização e suportes dos 30+ convênios atendidos.
            </p>
          </div>

          <div className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-center">
            {filteredPlanos.length} de {planos.length} convênios exibidos
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filtrar por nome, código TUSS, prestador..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs font-semibold text-slate-900"
            >
              <option value="todos">Todas as Categorias</option>
              <option value="privado">Seguradoras Privadas</option>
              <option value="autogestao">Autogestões</option>
              <option value="militar_publico">Militares / Públicos</option>
              <option value="estadual_municipal">Estaduais / Municipais (SERVIR / SEMUS)</option>
            </select>
          </div>

          <div className="sm:col-span-3 flex items-center gap-2">
            <button
              onClick={() => setFilterToken(!filterToken)}
              className={`flex-1 p-2 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1 ${
                filterToken ? 'bg-purple-600 text-white border-purple-700' : 'bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              <KeyRound className="w-3 h-3" />
              <span>Token</span>
            </button>

            <button
              onClick={() => setFilterAereo(!filterAereo)}
              className={`flex-1 p-2 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1 ${
                filterAereo ? 'bg-blue-600 text-white border-blue-700' : 'bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              <Plane className="w-3 h-3" />
              <span>Aéreo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white border-b border-slate-800">
                <th className="py-3.5 px-4 font-extrabold uppercase text-[11px] tracking-wide">Plano</th>
                <th className="py-3.5 px-4 font-extrabold uppercase text-[11px] tracking-wide">Tipo de Cobertura</th>
                <th className="py-3.5 px-4 font-extrabold uppercase text-[11px] tracking-wide text-center">UTI Móvel</th>
                <th className="py-3.5 px-4 font-extrabold uppercase text-[11px] tracking-wide text-center">Neo/Ped</th>
                <th className="py-3.5 px-4 font-extrabold uppercase text-[11px] tracking-wide text-center">Aéreo</th>
                <th className="py-3.5 px-4 font-extrabold uppercase text-[11px] tracking-wide text-center">Token?</th>
                <th className="py-3.5 px-4 font-extrabold uppercase text-[11px] tracking-wide">Ambulância Principal</th>
                <th className="py-3.5 px-4 font-extrabold uppercase text-[11px] tracking-wide">Prazo Resposta</th>
                <th className="py-3.5 px-4 font-extrabold uppercase text-[11px] tracking-wide text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredPlanos.map((p, idx) => (
                <tr 
                  key={p.id}
                  onClick={() => onSelectPlano(p)}
                  className="hover:bg-teal-50/60 transition-colors cursor-pointer group"
                >
                  {/* Plano Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-slate-900 text-white text-[11px] font-extrabold flex items-center justify-center flex-shrink-0 group-hover:bg-teal-700 transition-colors">
                        {p.badge}
                      </span>
                      <div>
                        <div className="font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors">
                          {p.nome}
                        </div>
                        <div className="text-[10px] text-slate-400 capitalize">{p.categoria.replace('_', ' ')}</div>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <span className="line-clamp-1 text-slate-700 text-[11px]" title={p.statusTexto}>
                      {p.statusTexto}
                    </span>
                  </td>

                  {/* UTI Adulto */}
                  <td className="py-3.5 px-4 text-center">
                    {p.tipoAmbulanciaSuportada.includes('uti_adulto') ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold">✓</span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>

                  {/* Neo/Ped */}
                  <td className="py-3.5 px-4 text-center">
                    {p.tipoAmbulanciaSuportada.includes('uti_neo_ped') ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold">✓</span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>

                  {/* Aereo */}
                  <td className="py-3.5 px-4 text-center">
                    {p.tipoAmbulanciaSuportada.includes('aerea') ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold">✓</span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>

                  {/* Token */}
                  <td className="py-3.5 px-4 text-center">
                    {p.exigeToken ? (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-700">SIM</span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Não</span>
                    )}
                  </td>

                  {/* Empresa */}
                  <td className="py-3.5 px-4 text-slate-700 font-semibold truncate max-w-[160px]">
                    {p.empresaCredenciadaPrincipal}
                  </td>

                  {/* Prazo */}
                  <td className="py-3.5 px-4 text-slate-500 text-[11px] truncate max-w-[130px]">
                    {p.prazoResposta}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPlano(p);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900 bg-slate-100 hover:bg-teal-100 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      <span>Ver POP</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
