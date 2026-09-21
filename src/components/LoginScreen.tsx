import React, { useState } from 'react';
import { Lock, User, KeyRound, ShieldAlert, ArrowRight, Hospital, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Validação estrita: Usuário 'HPM' (case-insensitive ou aceitando HPM) e senha 'HPM@2026'
    const cleanUser = usuario.trim();
    const cleanPass = senha.trim();

    if (cleanUser.toUpperCase() === 'HPM' && cleanPass === 'HPM@2026') {
      try {
        localStorage.setItem('hpm_auth_token', 'logged_in_' + Date.now());
      } catch (err) {
        console.error('LocalStorage unavailable:', err);
      }
      onLoginSuccess();
    } else {
      setIsSubmitting(false);
      setError('Credenciais incorretas! Verifique o usuário e a senha informados.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Decor Elements com a paleta Medical KoraSaúde */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9E1B4F]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1D787A]/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
      <div className="absolute inset-0 bg-[radial-gradient(#1D787A_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      {/* Top Header bar */}
      <header className="relative z-10 w-full px-6 py-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1D787A] flex items-center justify-center text-white shadow-xs">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
            </svg>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-[#E85B88]">
                Medical
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                Kora<span className="font-light text-slate-500">Saúde</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Hospital Palmas Medical</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-300">Regulação 24h</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          
          {/* Card Top Banner com paleta Medical */}
          <div className="bg-gradient-to-r from-[#1D787A] to-[#165B5D] px-6 sm:px-8 pt-8 pb-7 text-white relative">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[11px] font-bold text-white backdrop-blur-xs border border-white/20">
                <Hospital className="w-3.5 h-3.5 text-[#C8E4E3]" />
                Acesso Restrito
              </span>
              <div className="w-8 h-8 rounded-full bg-[#9E1B4F] flex items-center justify-center text-white shadow-xs">
                <Lock className="w-4 h-4" />
              </div>
            </div>
            
            <h1 className="text-2xl font-black tracking-tight mt-4 text-white">
              Central de Remoções
            </h1>
            <p className="text-xs text-[#C8E4E3] mt-1 font-medium leading-relaxed">
              Autentique-se com as credenciais operacionais para acessar o sistema de protocolos e regulação.
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5 animate-shake">
                <ShieldAlert className="w-4 h-4 text-[#9E1B4F] flex-shrink-0 mt-0.5" />
                <div className="font-semibold leading-relaxed">
                  {error}
                </div>
              </div>
            )}

            {/* Input Usuário */}
            <div className="space-y-1.5">
              <label 
                htmlFor="hpm-login-user" 
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Usuário
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="hpm-login-user"
                  type="text"
                  required
                  autoFocus
                  autoComplete="username"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="Digite o login (ex: HPM)"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9E1B4F] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Input Senha */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="hpm-login-pass" 
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  Senha
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  id="hpm-login-pass"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite a senha de acesso"
                  className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9E1B4F] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
                  aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Botão de Entrar */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#9E1B4F] hover:bg-[#82133F] active:scale-98 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Entrar no Sistema</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Dica de Segurança */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between text-slate-500 text-[11px]">
            <span className="font-medium">Sistema Interno Hospital Palmas Medical</span>
            <span className="font-bold text-[#1D787A]">v2.6 Seguro</span>
          </div>

        </div>
      </main>

      {/* Footer minimalista */}
      <footer className="relative z-10 w-full py-4 px-6 text-center text-xs text-slate-500 border-t border-slate-800/80 bg-slate-950/40">
        <p>
          © 2026 <strong>Medical • Kora Saúde</strong> • Hospital Palmas Medical. Acesso restrito a colaboradores autorizados.
        </p>
      </footer>
    </div>
  );
};
