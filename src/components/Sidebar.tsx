import React from 'react';
import { 
  Building2, 
  Sparkles, 
  FileText, 
  Truck, 
  PhoneForwarded, 
  ShieldAlert, 
  Layers,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenMaster: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  planCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  selectedCategory,
  onSelectCategory,
  planCount
}) => {
  const navItems = [
    {
      id: 'planos',
      label: 'Remoções / Convênio',
      sublabel: `${planCount} planos cadastrados`,
      icon: Building2,
      badge: planCount.toString()
    },
    {
      id: 'ficha',
      label: 'Ficha de Transporte',
      sublabel: 'Gerar e imprimir guia',
      icon: FileText
    },
    {
      id: 'empresas',
      label: 'Ambulâncias & Bases',
      sublabel: 'LISS CARE, Impacto, SAMU',
      icon: Truck
    },
    {
      id: 'ramais',
      label: 'Ramais do Hospital',
      sublabel: 'Contatos internos HPM',
      icon: PhoneForwarded
    },
    {
      id: 'simulador',
      label: 'Assistente de Remoção',
      sublabel: 'Roteirizador inteligente',
      icon: Sparkles,
      highlight: true
    }
  ];

  const categories = [
    { id: 'todos', label: 'Todos os Planos' },
    { id: 'privado', label: 'Seguradoras Privadas' },
    { id: 'autogestao', label: 'Autogestões' },
    { id: 'militar_publico', label: 'Militares / Públicos' },
    { id: 'estadual_municipal', label: 'Estaduais / SERVIR' }
  ];

  return (
    <aside className="w-full lg:w-68 bg-white border-r border-slate-200 p-4 lg:min-h-[calc(100vh-64px)] flex flex-col justify-between print:hidden">
      <div className="space-y-5">
        
        {/* Main Navigation */}
        <div>
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2 px-2">
            Navegação Principal
          </div>

          <nav className="space-y-1" aria-label="Navegação Principal">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all group ${
                    isActive
                      ? 'bg-[#FDF2F5] text-[#9E1B4F] font-semibold border border-[#F8D0DC]'
                      : 'hover:bg-slate-50 text-slate-700 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                      isActive 
                        ? 'bg-[#9E1B4F] text-white shadow-2xs' 
                        : 'bg-slate-100 text-slate-600 group-hover:bg-[#EBF5F5] group-hover:text-[#1D787A]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs truncate flex items-center gap-1.5">
                        <span className={isActive ? 'text-[#9E1B4F] font-bold' : 'text-slate-800'}>
                          {item.label}
                        </span>
                        {item.highlight && (
                          <span className="inline-flex px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#EBF5F5] text-[#1D787A] border border-[#C8E4E3]">
                            Smart
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {item.sublabel}
                      </div>
                    </div>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-[#9E1B4F] text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Categories (When viewing POPs) */}
        {activeTab === 'planos' && (
          <div className="pt-3 border-t border-slate-100">
            <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2 px-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Filtrar Categoria</span>
            </div>
            <div className="space-y-0.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`w-full text-xs px-2.5 py-1.5 rounded-lg text-left transition-colors flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-[#1D787A] text-white font-semibold shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate">{cat.label}</span>
                  {selectedCategory === cat.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8E4E3]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Protocol Notice */}
        <div className="bg-[#F8FCFC] border border-[#C8E4E3] rounded-xl p-3 text-xs text-slate-700 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-[#1D787A]">
            <ShieldAlert className="w-3.5 h-3.5 text-[#9E1B4F] flex-shrink-0" />
            <span>Regra de Ouro</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-600">
            Remoção de <strong>UTI (60501002)</strong> exige laudo médico com justificativa de suporte e vaga confirmada no destino.
          </p>
        </div>

      </div>

      {/* Footer info */}
      <div className="pt-3 border-t border-slate-100 mt-4 text-[11px] text-slate-400 text-center space-y-2">
        <p>Central HPM • Regulação Hospitalar</p>
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-50 border border-[#A9D2D1] shadow-2xs text-[#1D787A] text-[11px]">
          <span>Criação:</span>
          <strong className="font-extrabold text-[#0D6264]">João Victor Cardoso Costa</strong>
        </div>
      </div>
    </aside>
  );
};

