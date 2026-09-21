import React, { useState, useMemo, useEffect } from 'react';
import { MasterProvider, useMaster } from './context/MasterContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PlanoCard } from './components/PlanoCard';
import { PlanoDetailModal } from './components/PlanoDetailModal';
import { PlanoDetalhePagina } from './components/PlanoDetalhePagina';
import { SimuladorRemocao } from './components/SimuladorRemocao';
import { GeradorFichaRemocao } from './components/GeradorFichaRemocao';
import { EmpresasRemocao } from './components/EmpresasRemocao';
import { RamaisContatos } from './components/RamaisContatos';
import { MasterModal } from './components/MasterModal';
import { LoginScreen } from './components/LoginScreen';
import { PlanoRemocao } from './types/remocao';
import { 
  Building2, 
  Sparkles, 
  Truck, 
  PhoneForwarded, 
  ShieldCheck, 
  Search, 
  SlidersHorizontal,
  Flame,
  Plane,
  HeartPulse,
  Clock,
  Layers,
  KeyRound,
  FileCheck2
} from 'lucide-react';

function MainApp() {
  const { planos } = useMaster();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem('hpm_auth_token'));
    } catch {
      return false;
    }
  });

  const [activeTab, setActiveTab] = useState<string>('planos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const [selectedPlano, setSelectedPlano] = useState<PlanoRemocao | null>(null);
  const [isMasterModalOpen, setIsMasterModalOpen] = useState<boolean>(false);
  const [simulationPlanoId, setSimulationPlanoId] = useState<string>('servir');
  const [fichaPlanoId, setFichaPlanoId] = useState<string>('servir');

  const handleLogout = () => {
    try {
      localStorage.removeItem('hpm_auth_token');
    } catch (e) {
      console.error(e);
    }
    setIsAuthenticated(false);
  };

  // Filtered plans list (Declarado antes de qualquer retorno condicional para cumprir as regras do React)
  const filteredPlanos = useMemo(() => {
    return planos.filter(p => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch = 
        !term ||
        p.nome.toLowerCase().includes(term) ||
        p.numero.includes(term) ||
        p.statusTexto.toLowerCase().includes(term) ||
        p.empresaCredenciadaPrincipal.toLowerCase().includes(term) ||
        p.codigosRemocao.some(c => c.codigo.toLowerCase().includes(term) || c.descricao.toLowerCase().includes(term)) ||
        p.regrasAutorizacao.some(r => r.toLowerCase().includes(term));

      const matchesCat = selectedCategory === 'todos' || p.categoria === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [planos, searchTerm, selectedCategory]);

  const handleSimularFromPlano = (planoId: string) => {
    setSimulationPlanoId(planoId);
    setSelectedPlano(null);
    setActiveTab('simulador');
  };

  // Se não estiver autenticado, exibe a tela de login obrigatória
  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-teal-600 selection:text-white">
      
      {/* Global Header */}
      <Header
        onOpenMaster={() => setIsMasterModalOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={(term) => {
          setSearchTerm(term);
          if (term && selectedPlano) {
            setSelectedPlano(null);
          }
        }}
        activeTab={selectedPlano ? 'planos' : activeTab}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
        
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={selectedPlano ? '' : activeTab}
          onSelectTab={(tab) => {
            setSelectedPlano(null);
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenMaster={() => setIsMasterModalOpen(true)}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedPlano(null);
            setSelectedCategory(cat);
          }}
          planCount={planos.length}
        />

        {/* Dynamic Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-w-0">
          
          {/* SE UM PLANO ESTIVER SELECIONADO: PÁGINA COMPLETA, ESPAÇOSA E ORGANIZADA */}
          {selectedPlano ? (
            <PlanoDetalhePagina
              plano={selectedPlano}
              onVoltar={() => setSelectedPlano(null)}
              onSimular={handleSimularFromPlano}
            />
          ) : (
            <>
              {/* TAB 1: POPs de Remoção por Plano */}
              {activeTab === 'planos' && (
                <div className="space-y-6">
                  
                  {/* Clean Header Bar */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-[#EBF5F5] text-[#1D787A] border border-[#A9D2D1] flex items-center justify-center flex-shrink-0 shadow-2xs">
                        <Truck className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                          <span>Remoções / Convênio</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
                          Consulte códigos TUSS, portais, regras de autorização e ambulâncias credenciadas.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab('simulador')}
                        className="px-5 py-2.5 rounded-full bg-[#9E1B4F] hover:bg-[#82133F] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs whitespace-nowrap cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 flex-shrink-0" />
                        <span>Assistente de Remoção</span>
                      </button>
                    </div>
                  </div>

                  {/* Category Filter Pills on Mobile/Tablet */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none lg:hidden">
                    {[
                      { id: 'todos', label: 'Todos os Planos' },
                      { id: 'privado', label: 'Privados' },
                      { id: 'autogestao', label: 'Autogestões' },
                      { id: 'militar_publico', label: 'Militares / Públicos' },
                      { id: 'estadual_municipal', label: 'Estaduais / SERVIR' }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                          selectedCategory === cat.id
                            ? 'bg-[#1D787A] text-white shadow-2xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Status counter */}
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
                    <span>
                      Exibindo <strong>{filteredPlanos.length}</strong> de {planos.length} planos de saúde
                    </span>
                    {searchTerm && (
                      <button 
                        onClick={() => setSearchTerm('')} 
                        className="text-[#9E1B4F] hover:underline font-bold"
                      >
                        Limpar pesquisa "{searchTerm}"
                      </button>
                    )}
                  </div>

                  {/* Plans Grid */}
                  {filteredPlanos.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                        <Search className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900">Nenhum convênio encontrado</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Não encontramos resultados para a pesquisa "{searchTerm}". Tente pesquisar por código TUSS, sigla ou nome da operadora.
                      </p>
                      <button
                        onClick={() => { setSearchTerm(''); setSelectedCategory('todos'); }}
                        className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#9E1B4F] text-white hover:bg-[#82133F]"
                      >
                        Ver Todos os Convênios
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {filteredPlanos.map(plano => (
                        <PlanoCard
                          key={plano.id}
                          plano={plano}
                          onSelect={(p) => {
                            setSelectedPlano(p);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        />
                      ))}
                    </div>
                  )}

                </div>
              )}

              {/* TAB 2: Assistente / Simulador Inteligente */}
              {activeTab === 'simulador' && (
                <SimuladorRemocao
                  planos={planos}
                  initialPlanoId={simulationPlanoId}
                  onOpenPlanDetail={(p) => {
                    setSelectedPlano(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              )}

              {/* TAB 3: Gerador de Ficha de Transporte / Impressão */}
              {activeTab === 'ficha' && (
                <GeradorFichaRemocao planos={planos} initialPlanoId={fichaPlanoId} />
              )}

              {/* TAB 4: Empresas de Ambulância */}
              {activeTab === 'empresas' && (
                <EmpresasRemocao />
              )}

              {/* TAB 5: Ramais do Hospital */}
              {activeTab === 'ramais' && (
                <RamaisContatos />
              )}
            </>
          )}

        </main>
      </div>

      {/* Master Modal */}
      <MasterModal
        isOpen={isMasterModalOpen}
        onClose={() => setIsMasterModalOpen(false)}
      />

      {/* Authentic Medical KoraSaúde Institutional Footer */}
      <footer className="bg-[#C8E4E3] border-t border-[#B5DAD9] text-slate-800 pt-12 pb-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            
            {/* Col 1: Brand, Contatos & Certificações */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#1D787A] flex items-center justify-center text-white shadow-xs">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#9E1B4F] leading-none">
                    Medical
                  </div>
                  <div className="text-xs font-semibold text-slate-600">
                    Kora<span className="font-normal text-slate-500">Saúde</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700">
                <p>
                  <strong className="text-[#1D787A] font-bold">Agendamento:</strong> (63) 3236-1819
                </p>
                <p>
                  <strong className="text-[#1D787A] font-bold">Ouvidoria:</strong> nurc@redemedical.com.br
                </p>
                <p>
                  <strong className="text-[#1D787A] font-bold">NURC/ouvidoria:</strong><br />
                  (63) 99989-4995
                </p>
              </div>

              {/* Badges de Certificações Hospitalares */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-[#1D787A] uppercase tracking-wider mb-2">
                  Certificações
                </div>
                <div className="flex items-center gap-2">
                  {/* Platinum Status */}
                  <div className="w-14 h-14 bg-white rounded-lg border border-[#A9D2D1] p-1 shadow-2xs flex flex-col items-center justify-center text-center">
                    <div className="w-3.5 h-3.5 bg-[#1D787A] rounded-full flex items-center justify-center text-white mb-0.5">
                      ✓
                    </div>
                    <span className="text-[8px] font-black text-slate-800 leading-tight">PLATINUM</span>
                    <span className="text-[7px] font-bold text-slate-500">STATUS</span>
                  </div>

                  {/* UTI Top Performer */}
                  <div className="w-14 h-14 bg-[#F2994A] rounded-lg border border-amber-500 p-1 shadow-2xs flex flex-col items-center justify-center text-center text-white">
                    <span className="text-[8px] font-black leading-tight">UTI</span>
                    <span className="text-[7px] font-extrabold leading-none">Top Performer</span>
                    <span className="text-[7px] font-bold opacity-90">2025</span>
                  </div>

                  {/* ONA Acreditado Pleno */}
                  <div className="w-14 h-14 bg-white rounded-lg border border-[#A9D2D1] p-1 shadow-2xs flex flex-col items-center justify-center text-center">
                    <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center text-[8px] font-bold text-slate-700 mb-0.5">
                      ONA
                    </div>
                    <span className="text-[7px] font-black text-slate-800 leading-none">ACREDITADO</span>
                    <span className="text-[7px] font-bold text-slate-500">PLENO</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 2: Sobre nós */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#1D787A]">
                Sobre nós
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                <li><span className="hover:text-[#9E1B4F] cursor-pointer transition-colors">Institucional Hospital Palmas Medical</span></li>
                <li><span className="hover:text-[#9E1B4F] cursor-pointer transition-colors">Qualidade e Segurança do Paciente</span></li>
                <li><span className="hover:text-[#9E1B4F] cursor-pointer transition-colors">Trabalhe Conosco</span></li>
                <li><span className="hover:text-[#9E1B4F] cursor-pointer transition-colors">Fale Conosco</span></li>
              </ul>
            </div>

            {/* Col 3: Para você / Regulação */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#1D787A]">
                Para você
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                <li><span className="hover:text-[#9E1B4F] cursor-pointer transition-colors">Agendamentos & Regulação 24h</span></li>
                <li><span className="hover:text-[#9E1B4F] cursor-pointer transition-colors">Especialidades & UTI</span></li>
                <li><span className="hover:text-[#9E1B4F] cursor-pointer transition-colors">Centro de Exames & Diagnóstico</span></li>
                <li><span className="hover:text-[#9E1B4F] cursor-pointer transition-colors">Resultados de Exames</span></li>
                <li><span className="hover:text-[#9E1B4F] cursor-pointer transition-colors">Nossas Unidades Palmas / TO</span></li>
                <li><span className="hover:text-[#9E1B4F] cursor-pointer transition-colors">Convênios & TUSS Remoção</span></li>
              </ul>
            </div>

            {/* Col 4: Redes Sociais & App Medical Cliente */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#1D787A]">
                Redes Sociais
              </h3>
              
              <div className="flex items-center gap-3 text-[#1D787A]">
                {/* Instagram */}
                <a href="#instagram" className="w-8 h-8 rounded-lg bg-white/70 hover:bg-white hover:text-[#9E1B4F] flex items-center justify-center transition-colors border border-[#A9D2D1]" aria-label="Instagram">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                {/* LinkedIn */}
                <a href="#linkedin" className="w-8 h-8 rounded-lg bg-white/70 hover:bg-white hover:text-[#9E1B4F] flex items-center justify-center transition-colors border border-[#A9D2D1]" aria-label="LinkedIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                {/* YouTube */}
                <a href="#youtube" className="w-8 h-8 rounded-lg bg-white/70 hover:bg-white hover:text-[#9E1B4F] flex items-center justify-center transition-colors border border-[#A9D2D1]" aria-label="YouTube">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </a>
              </div>

              {/* Card Acesse o App Medical Cliente (igual ao da foto) */}
              <div className="bg-white/80 border border-[#A9D2D1] rounded-xl p-3 shadow-2xs space-y-2">
                <p className="text-[11px] font-bold text-[#1D787A] leading-tight">
                  Acesse o app Medical Cliente no seu celular
                </p>
                <div className="flex items-center gap-2">
                  <div className="bg-black text-white px-2 py-1 rounded text-[9px] font-bold flex items-center gap-1">
                    <span>Google Play</span>
                  </div>
                  <div className="bg-black text-white px-2 py-1 rounded text-[9px] font-bold flex items-center gap-1">
                    <span>App Store</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div className="pt-6 border-t border-[#A9D2D1] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-3">
            <p>
              © 2026 <strong>Medical • Kora Saúde</strong> • Hospital Palmas Medical. Todos os direitos reservados.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-[11px] text-slate-500">
              {/* Badge pílula de autoria idêntico à imagem de referência */}
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 border border-[#A9D2D1] shadow-2xs text-[#1D787A] text-[12px] font-medium">
                <span>Criação:</span>
                <strong className="font-extrabold text-[#0D6264]">João Victor Cardoso Costa</strong>
              </div>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span>Central de Regulação Hospitalar & Protocolos TUSS</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <MasterProvider>
      <MainApp />
    </MasterProvider>
  );
}
