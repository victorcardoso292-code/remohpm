import React, { useState } from 'react';
import { Lock, User, ShieldAlert, ArrowRight, Eye, EyeOff, Check, ShieldCheck, Hospital } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Validação estrita: Usuário 'HPM' e senha 'HPM@2026'
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
    <div className="min-h-screen bg-[#E2EFF0] flex flex-col justify-between relative overflow-hidden font-sans text-slate-800">
      {/* Background suave em tom verde-água/menta hospitalar */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C8E4E3]/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B2D8D7]/40 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Top Header bar discreto com identidade Medical KoraSaúde */}
      <header className="relative z-10 w-full px-6 py-4 flex items-center justify-between border-b border-[#C8E4E3]/60 bg-white/40 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1D787A] flex items-center justify-center text-white shadow-xs">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
            </svg>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-[#9E1B4F]">
                Medical
              </span>
              <span className="text-[10px] font-semibold text-[#1D787A]">
                Kora<span className="font-light text-slate-600">Saúde</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-600 font-medium">Hospital Palmas Medical</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#A9D2D1] text-xs font-semibold text-[#1D787A]">
          <span className="w-2 h-2 rounded-full bg-[#1D787A] animate-pulse" />
          <span>Regulação 24h</span>
        </div>
      </header>

      {/* Main Login Card - Paleta e layout idênticos ao print fornecido */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="w-full max-w-[460px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(29,120,122,0.15)] border border-white/80 overflow-hidden">
          
          {/* Card Top Banner com 'Acesso Restrito', cadeado e título conforme o print */}
          <div className="bg-[#1D787A] px-7 pt-7 pb-6 text-white relative">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[11px] font-medium text-white backdrop-blur-xs border border-white/20">
                <Hospital className="w-3.5 h-3.5 text-[#C8E4E3]" />
                Acesso Restrito
              </span>
              <div className="w-9 h-9 rounded-full bg-[#9E1B4F] flex items-center justify-center text-white shadow-xs">
                <Lock className="w-4 h-4" />
              </div>
            </div>
            
            <h1 className="text-2xl font-black tracking-tight mt-4 text-white">
              Central de Remoções
            </h1>
            <p className="text-xs text-[#C8E4E3] mt-1.5 font-normal leading-relaxed">
              Autentique-se com as credenciais operacionais para acessar o sistema de protocolos e regulação.
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-7 sm:p-8 space-y-5">
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
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
                className="block text-xs font-black text-[#1F414D] uppercase tracking-wider"
              >
                USUÁRIO / LOGIN
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
                  placeholder="DIGITE O LOGIN (EX: HPM)"
                  className="w-full pl-10 pr-4 py-3 bg-[#F8FBFC] border border-[#D5E5E6] rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D787A] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Input Senha */}
            <div className="space-y-1.5">
              <label 
                htmlFor="hpm-login-pass" 
                className="block text-xs font-black text-[#1F414D] uppercase tracking-wider"
              >
                SENHA
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="hpm-login-pass"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite a senha institucional"
                  className="w-full pl-10 pr-11 py-3 bg-[#F8FBFC] border border-[#D5E5E6] rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D787A] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Lembrar neste navegador */}
            <div className="flex items-center pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-[#1D787A]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-4 h-4 rounded-md border border-[#1D787A] bg-white peer-checked:bg-[#1D787A] peer-checked:border-[#1D787A] flex items-center justify-center transition-all">
                  {rememberMe && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
                <span>Lembrar neste navegador</span>
              </label>
            </div>

            {/* Botão de Entrar (Vinho / Magenta Institucional exato do print: #9E1B4F / #A61D52) */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-[#A61D52] hover:bg-[#8F1645] active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Entrar no Sistema</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Ambiente institucional restrito */}
            <div className="pt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#1D787A]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ambiente institucional restrito • Acesso monitorado</span>
            </div>

          </form>

        </div>
      </main>

      {/* Footer idêntico ao modelo com indicação de autoria */}
      <footer className="relative z-10 w-full py-6 px-6 text-center text-xs text-slate-600 space-y-2">
        <p>
          © 2026 Hospital Palmas Medical • Kora Saúde. Todos os direitos reservados.
        </p>
        <div>
          <div className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-white/95 border border-[#A9D2D1] shadow-2xs text-[#1D787A] text-[12px] font-medium">
            <span>Criação:</span>
            <strong className="font-extrabold text-[#0D6264]">João Victor Cardoso Costa</strong>
          </div>
        </div>
      </footer>
    </div>
  );
};

