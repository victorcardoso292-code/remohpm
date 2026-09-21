import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Central de Remoções - Erro não tratado:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div id="error-boundary-screen" className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 text-center shadow-2xl backdrop-blur-sm">
            <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>
            
            <h1 className="text-xl font-bold text-white mb-2">
              Erro ao Carregar a Aplicação
            </h1>
            
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              Ocorreu um erro inesperado ao renderizar os dados da Central de Remoções.
            </p>

            {this.state.error && (
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 mb-6 text-left overflow-auto max-h-32 text-xs font-mono text-rose-300">
                {this.state.error.message || 'Erro desconhecido'}
              </div>
            )}

            <button
              id="btn-error-reload"
              onClick={this.handleReset}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all shadow-lg shadow-teal-900/30 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Recarregar Aplicação
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
