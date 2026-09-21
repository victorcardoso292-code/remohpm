import React from 'react';
import { 
  Ambulance, 
  Lock, 
  Unlock, 
  Clock, 
  Search,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  LogOut
} from 'lucide-react';
import { useMaster } from '../context/MasterContext';

interface HeaderProps {
  onOpenMaster: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  activeTab: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenMaster, 
  searchTerm, 
  onSearchChange,
  onLogout
}) => {
  const { isMaster } = useMaster();
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Medical / KoraSaúde */}
        <div className="flex items-center gap-3.5 min-w-max">
          {/* Logo Icon similar to Medical Cross */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#1D787A] flex items-center justify-center text-white shadow-xs">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
              </svg>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-[#9E1B4F]">
                  Medical
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EBF5F5] text-[#1D787A] border border-[#C8E4E3]">
                  HPM
                </span>
              </div>
              <div className="flex items-center gap-1 -mt-0.5">
                <span className="text-[11px] font-semibold text-slate-500 tracking-wide">
                  Kora<span className="text-slate-400 font-normal">Saúde</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[11px] font-semibold text-[#1D787A]">
                  Central de Remoções
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar in Header - Styled exactly like the Medical header search */}
        <div className="flex-1 max-w-lg mx-2 hidden sm:block">
          <div className="flex items-center rounded-full border border-slate-300 focus-within:border-[#9E1B4F] focus-within:ring-2 focus-within:ring-[#9E1B4F]/20 overflow-hidden bg-white shadow-2xs transition-all">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Pesquise aqui convênio, TUSS (ex: 60501002), regra..."
              className="w-full text-slate-800 placeholder-slate-400 text-xs sm:text-sm pl-4 pr-2 py-2.5 bg-transparent border-none focus:outline-none"
            />
            {searchTerm ? (
              <button 
                onClick={() => onSearchChange('')}
                className="text-[11px] font-semibold text-slate-400 hover:text-slate-700 px-2 py-1 mr-1 rounded"
              >
                Limpar
              </button>
            ) : null}
            <div className="bg-[#9E1B4F] text-white p-2.5 px-4 flex items-center justify-center cursor-pointer hover:bg-[#82133F] transition-colors">
              <Search className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Actions & Status */}
        <div className="flex items-center gap-3 min-w-max">
          {/* Badge pílula de autoria no Header */}
          <div className="hidden xl:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#EBF5F5] border border-[#A9D2D1] text-[11px] text-[#1D787A]">
            <span>Criação:</span>
            <strong className="font-extrabold text-[#0D6264]">João Victor Cardoso Costa</strong>
          </div>

          {/* Status badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EBF5F5] border border-[#C8E4E3] text-xs font-bold text-[#1D787A]">
            <span className="w-2 h-2 rounded-full bg-[#1D787A] animate-pulse" />
            <span>Regulação 24h</span>
          </div>

          {/* Clock */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{time.toLocaleTimeString('pt-BR')}</span>
          </div>

          {/* Master Access Button - Styled with the Medical Kora Pill Button aesthetics */}
          <button
            onClick={onOpenMaster}
            className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all shadow-xs ${
              isMaster
                ? 'bg-[#1D787A] hover:bg-[#165B5D] text-white'
                : 'bg-[#9E1B4F] hover:bg-[#82133F] text-white'
            }`}
          >
            {isMaster ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-emerald-200" />
                <span>Master Ativo</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-rose-200" />
                <span>Acesso Master</span>
              </>
            )}
          </button>

          {/* Sair / Logout button */}
          {onLogout && (
            <button
              onClick={onLogout}
              title="Encerrar sessão no sistema"
              className="p-2 sm:px-3 sm:py-2 rounded-full text-xs font-bold text-slate-500 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          )}
        </div>

      </div>

      {/* Mobile search bar */}
      <div className="sm:hidden px-4 pb-3 pt-1 bg-white border-t border-slate-100">
        <div className="flex items-center rounded-full border border-slate-300 overflow-hidden bg-slate-50 focus-within:bg-white focus-within:border-[#9E1B4F]">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Pesquise convênio ou código TUSS..."
            className="w-full text-slate-900 placeholder-slate-400 text-xs pl-3.5 pr-2 py-2 bg-transparent focus:outline-none"
          />
          <div className="bg-[#9E1B4F] text-white p-2 px-3">
            <Search className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </header>
  );
};

