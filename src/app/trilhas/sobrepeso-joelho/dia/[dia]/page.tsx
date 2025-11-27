'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { dadosTrilhaSobrepesoJoelho } from '../../dados';
import { useAppStore } from '@/lib/store';

export default function DiaSobrepesoJoelhoPage() {
  const router = useRouter();
  const params = useParams();
  const dia = parseInt(params.dia as string);
  
  const [etapaAtual, setEtapaAtual] = useState(0);
  const marcarDiaConcluido = useAppStore((state) => state.marcarDiaConcluidoSobrepesoJoelho);

  const dadosDia = dadosTrilhaSobrepesoJoelho.dias[dia];

  useEffect(() => {
    if (!dadosDia) {
      router.push('/trilhas/sobrepeso-joelho');
    }
  }, [dadosDia, router]);

  if (!dadosDia) {
    return null;
  }

  const totalEtapas = 1 + dadosDia.exercicios.length + 1 + 1; // Início + Exercícios + Aula + Parabéns

  const proximaEtapa = () => {
    if (etapaAtual < totalEtapas - 1) {
      setEtapaAtual(etapaAtual + 1);
    } else {
      marcarDiaConcluido(dia);
      router.push('/trilhas/sobrepeso-joelho');
    }
  };

  const pularExercicio = () => {
    proximaEtapa();
  };

  // Tela inicial
  if (etapaAtual === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <button
            onClick={() => router.push('/trilhas/sobrepeso-joelho')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar para trilha</span>
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
              ⚖️
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{dadosDia.titulo}</h1>
            
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6">
              <p className="text-teal-800 text-sm leading-relaxed">
                <strong>Fase {dadosDia.fase}:</strong> {dadosTrilhaSobrepesoJoelho.fases[dadosDia.fase - 1].nome}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>{dadosDia.exercicios.length} exercícios sem impacto</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>1 aula educativa</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Progressão segura e acessível</span>
              </div>
            </div>

            <button
              onClick={proximaEtapa}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg"
            >
              Começar dia {dia}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Exercícios
  if (etapaAtual >= 1 && etapaAtual <= dadosDia.exercicios.length) {
    const exercicio = dadosDia.exercicios[etapaAtual - 1];
    const numeroExercicio = etapaAtual;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 pb-24">
        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => router.push('/trilhas/sobrepeso-joelho')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar para trilha</span>
            </button>

            <div className="bg-teal-100 text-teal-800 text-sm font-semibold px-4 py-2 rounded-lg inline-block mb-4">
              Exercício {numeroExercicio} de {dadosDia.exercicios.length}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{exercicio.titulo}</h1>
            <p className="text-teal-600 font-medium mb-4">{exercicio.subtitulo}</p>
            <p className="text-gray-600 text-sm">⏱️ Duração: {exercicio.duracao}</p>
          </div>

          {/* Vídeo Placeholder */}
          <div className="bg-gray-900 rounded-2xl aspect-video mb-6 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
              </div>
              <p className="text-sm text-white/80">Vídeo do exercício</p>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="space-y-6">
            {/* Como fazer */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Como fazer
              </h3>
              <ol className="space-y-3">
                {exercicio.comoFazer.map((passo, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed">{passo}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Sensação correta */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Sensação correta
              </h3>
              <p className="text-green-800 leading-relaxed">{exercicio.sensacaoCorreta}</p>
            </div>

            {/* Evitar */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Evitar
              </h3>
              <p className="text-red-800 leading-relaxed">{exercicio.evitar}</p>
            </div>

            {/* Dica */}
            <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Dica terapêutica
              </h3>
              <p className="leading-relaxed">{exercicio.dica}</p>
            </div>
          </div>

          {/* Botões */}
          <div className="mt-8 space-y-3">
            <button
              onClick={proximaEtapa}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg"
            >
              Concluir e próximo
            </button>
            
            <button
              onClick={pularExercicio}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Pular exercício
            </button>

            <button
              onClick={() => router.push('/plano')}
              className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 px-6 rounded-xl transition-colors border-2 border-red-200"
            >
              🚨 Dor aumentou? Abrir Plano de Crise
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Aula
  if (etapaAtual === dadosDia.exercicios.length + 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <button
            onClick={() => router.push('/trilhas/sobrepeso-joelho')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar para trilha</span>
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
              📚
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {dadosDia.aula.titulo}
            </h2>

            <div className="prose prose-lg max-w-none">
              {dadosDia.aula.conteudo.split('\n\n').map((paragrafo, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragrafo}
                </p>
              ))}
            </div>

            <button
              onClick={proximaEtapa}
              className="w-full mt-8 bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tela de parabéns
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
            🎉
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Parabéns!
          </h2>

          <p className="text-xl text-gray-700 mb-8">
            Você concluiu o <strong>Dia {dia}</strong>
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <p className="text-green-800 leading-relaxed">
              Você está fortalecendo seu joelho de forma segura e progressiva. Continue assim e os resultados virão!
            </p>
          </div>

          <button
            onClick={() => {
              marcarDiaConcluido(dia);
              router.push('/trilhas/sobrepeso-joelho');
            }}
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg"
          >
            Voltar para a trilha
          </button>
        </div>
      </div>
    </div>
  );
}
