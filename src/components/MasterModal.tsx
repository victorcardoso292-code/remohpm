import React, { useState } from 'react';
import { useMaster } from '../context/MasterContext';
import { 
  Lock, 
  Unlock, 
  X, 
  KeyRound, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  ShieldCheck 
} from 'lucide-react';

interface MasterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MasterModal: React.FC<MasterModalProps> = ({ isOpen, onClose }) => {
  const { isMaster, loginMaster, logoutMaster, changeMasterPassword, resetPlanosToDefault, hasCustomEdits } = useMaster();
  
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isChangingPass, setIsChangingPass] = useState<boolean>(false);
  
  const [currentPass, setCurrentPass] = useState<string>('');
  const [newPass, setNewPass] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  const [changeSuccess, setChangeSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMaster(password)) {
      setErrorMsg('');
      setPassword('');
      onClose();
    } else {
      setErrorMsg('Senha Master incorreta. Verifique e tente novamente.');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      setErrorMsg('A confirmação da nova senha não confere.');
      return;
    }
    if (changeMasterPassword(currentPass, newPass)) {
      setChangeSuccess(true);
      setErrorMsg('');
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      setTimeout(() => {
        setChangeSuccess(false);
        setIsChangingPass(false);
      }, 2000);
    } else {
      setErrorMsg('Senha atual incorreta ou nova senha com menos de 5 caracteres.');
    }
  };

  const handleResetAll = () => {
    if (window.confirm('Tem certeza que deseja restaurar TODOS os dados e convênios para o padrão original de fábrica?')) {
      resetPlanosToDefault();
      alert('Todos os dados foram restaurados para o padrão com sucesso.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              {isMaster ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm font-extrabold">
                {isMaster ? 'Painel de Controle Master' : 'Acesso Master de Supervisão'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isMaster ? 'Sessão Master ativa no navegador' : 'Liberação para edição de senhas e dados'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs font-semibold text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {changeSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Senha Master alterada com sucesso!</span>
            </div>
          )}

          {!isMaster ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Senha Master
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha de administrador (Padrão: HPM@2026)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
                  autoFocus
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Dica de fábrica: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">HPM@2026</code>
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-md transition-colors"
                >
                  Conectar Master
                </button>
              </div>
            </form>
          ) : isChangingPass ? (
            /* Change Password Form */
            <form onSubmit={handleChangePassword} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Senha Atual</label>
                <input
                  type="password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nova Senha Master</label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-mono"
                  minLength={5}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Confirmar Nova Senha</label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-mono"
                  minLength={5}
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsChangingPass(false)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Salvar Nova Senha
                </button>
              </div>
            </form>
          ) : (
            /* Connected Master Panel */
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-900 space-y-1">
                <div className="font-extrabold flex items-center gap-1.5 text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Acesso Master Autenticado</span>
                </div>
                <p className="text-[11px] text-emerald-700 leading-relaxed">
                  Você possui permissão de supervisor. Ao abrir o POP de qualquer plano de saúde, clique na aba <strong>✏️ Editor Master</strong> para editar credenciais, senhas, telefones e regras em tempo real.
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setIsChangingPass(true)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-teal-600" />
                    Alterar Senha do Master
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">Modificar</span>
                </button>

                {hasCustomEdits && (
                  <button
                    onClick={handleResetAll}
                    className="w-full py-2.5 px-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-bold text-rose-700 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-rose-600" />
                      Restaurar Todos os Planos para Original
                    </span>
                    <span className="text-[10px] uppercase bg-rose-200 px-1.5 py-0.5 rounded font-extrabold">Reset</span>
                  </button>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={logoutMaster}
                  className="py-2 px-4 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-transparent"
                >
                  Desconectar Master
                </button>

                <button
                  onClick={onClose}
                  className="py-2 px-5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white"
                >
                  Concluir
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
