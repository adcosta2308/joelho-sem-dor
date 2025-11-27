'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, CheckCircle2, Play } from 'lucide-react';
import { dadosTrilhaSobrepesoJoelho } from './dados';
import { useAppStore } from '@/lib/store';

export default function TrilhaSobrepesoJoelhoPage() {
  const router = useRouter();
  const progressoSobrepesoJoelho = useAppStore((state) => state.progressoSobrepesoJoelho);

  const isDiaDesbloqueado = (dia: number) => {
    if (dia === 1) return true;
    return progressoSobrepesoJoelho[dia - 1] === true;
  };

  const isDiaConcluido = (dia: number) => {
    return progressoSobrepesoJoelho[dia] === true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-green-500 to-teal-500 text-white pt-12 pb-8 px-6">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => router.push('/trilhas')}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar para trilhas</span>
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl">
              ⚖️
            </div>
            <div>
              <h1 className="text-3xl font-bold">{dadosTrilhaSobrepesoJoelho.nome}</h1>
              <p className="text-white/90 text-sm mt-1">{dadosTrilhaSobrepesoJoelho.totalDias} dias</p>
            </div>
          </div>

          <p className="text-white/95 text-base leading-relaxed">
            {dadosTrilhaSobrepesoJoelho.descricao}
          </p>

          {/* Progresso */}
          <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Seu progresso</span>
              <span className="text-sm font-bold">
                {Object.values(progressoSobrepesoJoelho).filter(Boolean).length}/{dadosTrilhaSobrepesoJoelho.totalDias}
              </span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{
                  width: `${(Object.values(progressoSobrepesoJoelho).filter(Boolean).length / dadosTrilhaSobrepesoJoelho.totalDias) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-md mx-auto px-6 -mt-4">
        {/* Botão Plano de Crise */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/plano')}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg"
          >
            🚨 Dor aumentou? Abrir Plano de Crise
          </button>
        </div>

        {/* Fases */}
        <div className="space-y-6">
          {dadosTrilhaSobrepesoJoelho.fases.map((fase) => (
            <div key={fase.numero} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4">
                <h2 className="text-xl font-bold">Fase {fase.numero}</h2>
                <p className="text-white/90 text-sm mt-1">{fase.nome}</p>
                <p className="text-white/80 text-xs mt-2">{fase.descricao}</p>
              </div>

              <div className="p-4 space-y-3">
                {fase.dias.map((dia) => {
                  const desbloqueado = isDiaDesbloqueado(dia);
                  const concluido = isDiaConcluido(dia);

                  return (
                    <button
                      key={dia}
                      onClick={() => {
                        if (desbloqueado) {
                          router.push(`/trilhas/sobrepeso-joelho/dia/${dia}`);
                        }
                      }}
                      disabled={!desbloqueado}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                        concluido
                          ? 'bg-green-50 border-2 border-green-200'
                          : desbloqueado
                          ? 'bg-teal-50 border-2 border-teal-200 hover:bg-teal-100'
                          : 'bg-gray-50 border-2 border-gray-200 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                          concluido
                            ? 'bg-green-500 text-white'
                            : desbloqueado
                            ? 'bg-gradient-to-br from-green-500 to-teal-500 text-white'
                            : 'bg-gray-300 text-gray-500'
                        }`}
                      >
                        {concluido ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : desbloqueado ? (
                          <Play className="w-6 h-6" />
                        ) : (
                          <Lock className="w-5 h-5" />
                        )}
                      </div>

                      <div className="flex-1 text-left">
                        <h3 className="font-bold text-gray-900">Dia {dia}</h3>
                        <p className="text-sm text-gray-600">
                          {concluido ? 'Concluído ✓' : desbloqueado ? '3 exercícios + aula' : 'Bloqueado'}
                        </p>
                      </div>

                      {!desbloqueado && <Lock className="w-5 h-5 text-gray-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Dicas */}
        <div className="mt-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-3">💡 Dicas para o sucesso</h3>
          <ul className="space-y-2 text-sm text-white/95">
            <li>• Faça os exercícios diariamente para melhores resultados</li>
            <li>• Todos os exercícios são sem impacto e seguros</li>
            <li>• Use apoio sempre que necessário — não há problema</li>
            <li>• Preste atenção ao alinhamento do joelho durante os movimentos</li>
            <li>• Use o Plano de Crise se a dor aumentar</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
