'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Play, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { dadosTrilhaCondromalacia } from '../../dados';
import { useAppStore } from '@/lib/store';

export default function DiaCondromalaciaPage() {
  const router = useRouter();
  const params = useParams();
  const dia = parseInt(params.dia as string);
  const [etapaAtual, setEtapaAtual] = useState<'inicio' | 'exercicio1' | 'exercicio2' | 'exercicio3' | 'aula' | 'parabens'>('inicio');
  const marcarDiaConcluido = useAppStore((state) => state.marcarDiaConcluidoCondromalacia);

  const dadosDia = dadosTrilhaCondromalacia.dias[dia as keyof typeof dadosTrilhaCondromalacia.dias];

  if (!dadosDia) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dia não encontrado</h1>
          <button
            onClick={() => router.push('/trilhas/condromalacia')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Voltar para a trilha
          </button>
        </div>
      </div>
    );
  }

  const proximaEtapa = () => {
    if (etapaAtual === 'inicio') setEtapaAtual('exercicio1');
    else if (etapaAtual === 'exercicio1') setEtapaAtual('exercicio2');
    else if (etapaAtual === 'exercicio2') setEtapaAtual('exercicio3');
    else if (etapaAtual === 'exercicio3') setEtapaAtual('aula');
    else if (etapaAtual === 'aula') {
      marcarDiaConcluido(dia);
      setEtapaAtual('parabens');
    }
  };

  const pularExercicio = () => {
    proximaEtapa();
  };

  // Tela Inicial
  if (etapaAtual === 'inicio') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-md mx-auto px-6 py-12">
          <button
            onClick={() => router.push('/trilhas/condromalacia')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar para trilha</span>
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              🦵
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">{dadosDia.titulo}</h1>

            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Fase {dadosDia.fase} • 3 exercícios + 1 aula
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold">
                  1
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-gray-900">{dadosDia.exercicios[0].titulo}</p>
                  <p className="text-sm text-gray-600">{dadosDia.exercicios[0].duracao}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold">
                  2
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-gray-900">{dadosDia.exercicios[1].titulo}</p>
                  <p className="text-sm text-gray-600">{dadosDia.exercicios[1].duracao}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold">
                  3
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-gray-900">{dadosDia.exercicios[2].titulo}</p>
                  <p className="text-sm text-gray-600">{dadosDia.exercicios[2].duracao}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl">
                <div className="w-10 h-10 bg-indigo-500 text-white rounded-lg flex items-center justify-center">
                  📚
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-gray-900">Aula do dia</p>
                  <p className="text-sm text-gray-600">{dadosDia.aula.titulo}</p>
                </div>
              </div>
            </div>

            <button
              onClick={proximaEtapa}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Começar dia {dia}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Telas de Exercícios
  if (etapaAtual === 'exercicio1' || etapaAtual === 'exercicio2' || etapaAtual === 'exercicio3') {
    const indiceExercicio = etapaAtual === 'exercicio1' ? 0 : etapaAtual === 'exercicio2' ? 1 : 2;
    const exercicio = dadosDia.exercicios[indiceExercicio];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-24">
        <div className="max-w-md mx-auto px-6 py-8">
          <button
            onClick={() => router.push('/trilhas/condromalacia')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>

          {/* Barra de progresso */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Exercício {indiceExercicio + 1} de 3</span>
              <span className="text-sm text-gray-500">{exercicio.duracao}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full h-2 transition-all"
                style={{ width: `${((indiceExercicio + 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Vídeo placeholder */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 aspect-video flex items-center justify-center">
              <Play className="w-16 h-16 text-white/80" />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{exercicio.titulo}</h2>
              <p className="text-blue-600 font-medium mb-6">{exercicio.subtitulo}</p>

              {/* Como fazer */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                    ✓
                  </span>
                  Como fazer
                </h3>
                <ol className="space-y-2">
                  {exercicio.comoFazer.map((passo, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 leading-relaxed">{passo}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Sensação correta */}
              <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
                <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Sensação correta
                </h3>
                <p className="text-green-800 text-sm leading-relaxed">{exercicio.sensacaoCorreta}</p>
              </div>

              {/* Evitar */}
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Evitar
                </h3>
                <p className="text-red-800 text-sm leading-relaxed">{exercicio.evitar}</p>
              </div>

              {/* Dica */}
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-bold text-blue-900 mb-2">💡 Dica terapêutica</h3>
                <p className="text-blue-800 text-sm leading-relaxed">{exercicio.dica}</p>
              </div>

              {/* Botões */}
              <div className="space-y-3">
                <button
                  onClick={proximaEtapa}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  Concluir e próximo
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={pularExercicio}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  Pular exercício
                </button>

                <button
                  onClick={() => router.push('/plano')}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <AlertCircle className="w-5 h-5" />
                  Dor aumentou? Abrir Plano de Crise
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de Aula
  if (etapaAtual === 'aula') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-24">
        <div className="max-w-md mx-auto px-6 py-8">
          <button
            onClick={() => router.push('/trilhas/condromalacia')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
              📚
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">{dadosDia.aula.titulo}</h2>

            <div className="prose prose-sm max-w-none mb-8">
              {dadosDia.aula.conteudo.split('\n\n').map((paragrafo, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragrafo}
                </p>
              ))}
            </div>

            <button
              onClick={proximaEtapa}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Concluir dia {dia}
              <CheckCircle2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tela de Parabéns
  if (etapaAtual === 'parabens') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 animate-bounce">
            🎉
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">Parabéns!</h1>
          <p className="text-xl text-gray-700 mb-8">Você concluiu o Dia {dia}</p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <p className="text-green-800 leading-relaxed">
              Mais um passo na sua jornada para um joelho saudável e sem dor. Continue assim!
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/trilhas/condromalacia')}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-4 px-6 rounded-xl transition-all"
            >
              Voltar para a trilha
            </button>

            {dia < dadosTrilhaCondromalacia.totalDias && (
              <button
                onClick={() => router.push(`/trilhas/condromalacia/dia/${dia + 1}`)}
                className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Ir para o Dia {dia + 1}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
