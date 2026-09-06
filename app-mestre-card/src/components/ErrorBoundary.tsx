import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[MestreCard ErrorBoundary]', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 my-4 bg-slate-900/90 border-2 border-red-500/50 rounded-2xl text-center space-y-4 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
          <div className="text-4xl">⚠️</div>
          <h3 className="text-lg font-black text-red-400 font-mono tracking-wider uppercase">
            {this.props.fallbackTitle || 'Interrupção Tática // Falha de Renderização'}
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Ocorreu uma inconsistência transitória no DOM da interface. O sistema isolou a falha para proteger os seus dados e o progresso da sessão.
          </p>
          {this.state.error && (
            <div className="text-[11px] font-mono text-red-300 bg-red-950/40 p-3 rounded-lg border border-red-900/60 max-w-lg mx-auto overflow-x-auto text-left">
              {this.state.error.message || String(this.state.error)}
            </div>
          )}
          <div>
            <button
              onClick={this.handleReset}
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white px-5 py-2.5 rounded-xl font-bold font-mono text-xs tracking-wider uppercase transition-all shadow-lg shadow-red-600/30"
            >
              Recalibrar Módulo ➔
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
