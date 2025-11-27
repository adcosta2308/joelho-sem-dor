"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertCircle, Play, ChevronRight } from "lucide-react";
import { dadosCondromalaciаFase1e2 } from "../../dados";
import { dadosCondromalaciаFase3e4 } from "../../dados-fase3-4";

const todosDias = [...dadosCondromalaciаFase1e2, ...dadosCondromalaciаFase3e4];

export default function DiaPage() {
  const params = useParams();
  const router = useRouter();
  const diaAtual = parseInt(params.dia as string);
  
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [exerciciosConcluidos, setExerciciosConcluidos] = useState<number[]>([]);

  const dadosDia = todosDias.find((d) => d.dia === diaAtual);

  if (!dadosDia) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Dia não encontrado</p>
      </div>
    );
  }

  const totalEtapas = dadosDia.exercicios.length + 2; // exercícios + aula + parabéns
  const progresso = (etapaAtual / totalEtapas) * 100;

  const proximaEtapa = () => {
    if (etapaAtual < totalEtapas - 1) {
      setEtapaAtual(etapaAtual + 1);
    } else {
      router.push("/trilhas/condromalaciа");
    }
  };

  const pularExercicio = () => {
    proximaEtapa();
  };

  const concluirExercicio = (idExercicio: number) => {
    if (!exerciciosConcluidos.includes(idExercicio)) {
      setExerciciosConcluidos([...exerciciosConcluidos, idExercicio]);
    }
    proximaEtapa();
  };

  // Tela inicial
  if (etapaAtual === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {dadosDia.titulo}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Fase {dadosDia.fase} • {dadosDia.exercicios.length} exercícios + 1 aula
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {dadosDia.exercicios.map((ex, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{idx + 1}</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{ex.titulo}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{ex.duracao}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={proximaEtapa}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
          >
            Começar Dia {diaAtual}
          </button>

          <Link
            href="/trilhas/condromalaciа"
            className="block mt-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            ← Voltar para trilha
          </Link>
        </div>
      </div>
    );
  }

  // Exercícios
  if (etapaAtual <= dadosDia.exercicios.length) {
    const exercicio = dadosDia.exercicios[etapaAtual - 1];
    const numeroExercicio = etapaAtual;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header com progresso */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <Link href="/trilhas/condromalaciа" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Exercício {numeroExercicio} de {dadosDia.exercicios.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>
        </div>

        {/* Conteúdo do exercício */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {exercicio.titulo}
            </h2>
            <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
              {exercicio.subtitulo}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ⏱️ Duração: {exercicio.duracao}
            </p>
          </div>

          {/* Placeholder de vídeo */}
          <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl aspect-video mb-6 flex items-center justify-center">
            <Play className="w-16 h-16 text-gray-400" />
          </div>

          {/* Como fazer */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <span className="text-blue-500">📋</span> Como fazer
            </h3>
            <ol className="space-y-2">
              {exercicio.comoFazer.map((passo, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="font-bold text-blue-500 flex-shrink-0">{idx + 1}.</span>
                  <span className="text-gray-700 dark:text-gray-300">{passo}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Sensação correta */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800 mb-4">
            <h3 className="font-bold text-green-800 dark:text-green-400 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Sensação correta
            </h3>
            <p className="text-green-700 dark:text-green-300">{exercicio.sensacaoCorreta}</p>
          </div>

          {/* Evitar */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800 mb-4">
            <h3 className="font-bold text-red-800 dark:text-red-400 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> Evitar
            </h3>
            <p className="text-red-700 dark:text-red-300">{exercicio.evitar}</p>
          </div>

          {/* Dica */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 mb-6">
            <h3 className="font-bold text-blue-800 dark:text-blue-400 mb-2 flex items-center gap-2">
              💡 Dica
            </h3>
            <p className="text-blue-700 dark:text-blue-300">{exercicio.dica}</p>
          </div>

          {/* Botões */}
          <div className="space-y-3">
            <button
              onClick={() => concluirExercicio(exercicio.id)}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 rounded-xl font-bold transition-all hover:scale-[1.02] shadow-lg"
            >
              Concluir e próximo
            </button>
            <button
              onClick={pularExercicio}
              className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-medium transition-colors"
            >
              Pular exercício
            </button>
            <Link
              href="/plano-crise"
              className="block text-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 py-2 font-medium"
            >
              🚨 Dor aumentou? Abrir Plano de Crise
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Aula
  if (etapaAtual === dadosDia.exercicios.length + 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📚</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Aula do Dia {diaAtual}
            </h2>
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              {dadosDia.aula.titulo}
            </h3>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-8">
            {dadosDia.aula.conteudo.split('\n\n').map((paragrafo, idx) => (
              <p key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {paragrafo}
              </p>
            ))}
          </div>

          <button
            onClick={proximaEtapa}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            Continuar <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Tela de parabéns
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl text-center">
        <div className="mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Parabéns! 🎉
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
            Você concluiu o Dia {diaAtual}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Continue assim! Seu joelho está ficando mais forte a cada dia.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800 mb-6">
          <p className="text-sm text-green-800 dark:text-green-300">
            ✓ {exerciciosConcluidos.length} de {dadosDia.exercicios.length} exercícios concluídos
          </p>
          <p className="text-sm text-green-800 dark:text-green-300 mt-1">
            ✓ Aula educativa concluída
          </p>
        </div>

        <button
          onClick={() => router.push("/trilhas/condromalaciа")}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg mb-3"
        >
          Voltar para trilha
        </button>

        {diaAtual < 30 && (
          <Link
            href={`/trilhas/condromalaciа/dia/${diaAtual + 1}`}
            className="block w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-medium transition-colors"
          >
            Próximo dia →
          </Link>
        )}
      </div>
    </div>
  );
}
