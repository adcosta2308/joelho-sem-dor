'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, Play, CheckCircle2 } from 'lucide-react';
import { dadosTrilhaCorridaIniciante } from './dados';
import { useAppStore } from '@/lib/store';

export default function TrilhaCorridaIniciantePage() {
  const router = useRouter();
  const diasConcluidos = useAppStore((state) => state.diasConcluidosCorridaIniciante);
  const isPremium = useAppStore((state) => state.isPremium);

  const calcularProgresso = () => {
    return Math.round((diasConcluidos.length / dadosTrilhaCorridaIniciante.totalDias) * 100);
  };

  const isDiaBloqueado = (dia: number) => {
    if (dia === 1) return false;
    return !diasConcluidos.includes(dia - 1);
  };

  if (!isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            <Lock className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">Trilha Premium</h1>
          <p className="text-gray-700 mb-8">
            Esta trilha é exclusiva para membros Premium. Desbloqueie acesso completo a todas as trilhas e recursos.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/premium')}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all"
            >
              Assinar Premium
            </button>

            <button
              onClick={() => router.push('/trilhas')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Voltar para trilhas
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white pt-12 pb-10 px-6">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => router.push('/trilhas')}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar para trilhas</span>
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl">
              🏃
            </div>
            <div>
              <h1 className="text-3xl font-bold">{dadosTrilhaCorridaIniciante.nome}</h1>
              <p className="text-white/90">{dadosTrilhaCorridaIniciante.totalDias} dias</p>
            </div>
          </div>

          <p className="text-white/90 mb-6">{dadosTrilhaCorridaIniciante.descricao}</p>

          {/* Barra de progresso */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Seu progresso</span>
              <span className="text-sm font-bold">{calcularProgresso()}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all"
                style={{ width: `${calcularProgresso()}%` }}
              />
            </div>
            <p className="text-xs text-white/80 mt-2">
              {diasConcluidos.length} de {dadosTrilhaCorridaIniciante.totalDias} dias concluídos
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-4">
        {/* Fases */}
        <div className="space-y-6">
          {dadosTrilhaCorridaIniciante.fases.map((fase) => (
            <div key={fase.numero} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4">
                <h2 className="text-xl font-bold mb-1">Fase {fase.numero}: {fase.nome}</h2>
                <p className="text-white/90 text-sm">{fase.descricao}</p>
              </div>

              <div className="p-4 space-y-2">
                {fase.dias.map((dia) => {
                  const concluido = diasConcluidos.includes(dia);
                  const bloqueado = isDiaBloqueado(dia);

                  return (
                    <button
                      key={dia}
                      onClick={() => {
                        if (!bloqueado) {
                          router.push(`/trilhas/corrida-iniciante/dia/${dia}`);
                        }
                      }}
                      disabled={bloqueado}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                        concluido
                          ? 'bg-green-50 border-2 border-green-200'
                          : bloqueado
                          ? 'bg-gray-50 border-2 border-gray-200 opacity-50 cursor-not-allowed'
                          : 'bg-indigo-50 border-2 border-indigo-200 hover:bg-indigo-100'
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                          concluido
                            ? 'bg-green-500 text-white'
                            : bloqueado
                            ? 'bg-gray-300 text-gray-500'
                            : 'bg-indigo-500 text-white'
                        }`}
                      >
                        {concluido ? <CheckCircle2 className="w-6 h-6" /> : bloqueado ? <Lock className="w-6 h-6" /> : dia}
                      </div>

                      <div className="flex-1 text-left">
                        <h3 className="font-bold text-gray-900">Dia {dia}</h3>
                        <p className="text-sm text-gray-600">
                          {concluido ? 'Concluído' : bloqueado ? 'Bloqueado' : 'Disponível'}
                        </p>
                      </div>

                      {!bloqueado && !concluido && <Play className="w-5 h-5 text-indigo-500" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Botão Plano de Crise */}
        <div className="mt-8 bg-red-50 border-2 border-red-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-red-900 mb-2">Sentindo dor?</h3>
          <p className="text-red-800 text-sm mb-4">
            Se a dor aumentou durante os exercícios, acesse o Plano de Crise para orientações imediatas.
          </p>
          <button
            onClick={() => router.push('/plano')}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Abrir Plano de Crise
          </button>
        </div>
      </main>
    </div>
  );
}
