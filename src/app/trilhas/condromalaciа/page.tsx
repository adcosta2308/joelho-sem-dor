"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, CheckCircle2, Circle, Play } from "lucide-react";
import { dadosCondromalaciаFase1e2 } from "./dados";
import { dadosCondromalaciаFase3e4 } from "./dados-fase3-4";

const todosDias = [...dadosCondromalaciаFase1e2, ...dadosCondromalaciаFase3e4];

export default function TrilhaCondromalaciаPage() {
  const [diasConcluidos, setDiasConcluidos] = useState<number[]>([]);

  const isDiaBloqueado = (dia: number) => {
    if (dia === 1) return false;
    return !diasConcluidos.includes(dia - 1);
  };

  const isDiaConcluido = (dia: number) => {
    return diasConcluidos.includes(dia);
  };

  const fases = [
    { numero: 1, titulo: "Fase 1 — Reduzir dor e ativar musculatura", dias: [1, 2, 3, 4, 5, 6, 7] },
    { numero: 2, titulo: "Fase 2 — Fortalecer quadríceps e glúteos", dias: [8, 9, 10, 11, 12, 13, 14] },
    { numero: 3, titulo: "Fase 3 — Corrigir mecânica de movimento", dias: [15, 16, 17, 18, 19, 20, 21] },
    { numero: 4, titulo: "Fase 4 — Retorno à função completa", dias: [22, 23, 24, 25, 26, 27, 28, 29, 30] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/trilhas"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Trilha Condromalácia
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                30 dias para fortalecer e proteger sua patela
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progresso */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progresso da Trilha
            </span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
              {diasConcluidos.length}/30 dias
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(diasConcluidos.length / 30) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Fases e Dias */}
      <div className="max-w-4xl mx-auto px-4 pb-8 space-y-8">
        {fases.map((fase) => (
          <div key={fase.numero}>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {fase.titulo}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Dias {fase.dias[0]} a {fase.dias[fase.dias.length - 1]}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fase.dias.map((dia) => {
                const bloqueado = isDiaBloqueado(dia);
                const concluido = isDiaConcluido(dia);
                const dadosDia = todosDias.find((d) => d.dia === dia);

                return (
                  <Link
                    key={dia}
                    href={bloqueado ? "#" : `/trilhas/condromalaciа/dia/${dia}`}
                    className={`
                      block bg-white dark:bg-gray-800 rounded-xl p-5 border-2 transition-all
                      ${bloqueado
                        ? "border-gray-200 dark:border-gray-700 opacity-60 cursor-not-allowed"
                        : concluido
                        ? "border-green-500 dark:border-green-600 shadow-sm"
                        : "border-blue-500 dark:border-blue-600 shadow-md hover:shadow-lg hover:scale-[1.02]"
                      }
                    `}
                    onClick={(e) => bloqueado && e.preventDefault()}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100">
                          Dia {dia}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {dadosDia?.exercicios.length || 3} exercícios + 1 aula
                        </p>
                      </div>
                      <div>
                        {bloqueado ? (
                          <Lock className="w-5 h-5 text-gray-400" />
                        ) : concluido ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : (
                          <Play className="w-6 h-6 text-blue-500" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {dadosDia?.exercicios.slice(0, 3).map((ex, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <Circle className="w-3 h-3 fill-current" />
                          <span className="truncate">{ex.titulo}</span>
                        </div>
                      ))}
                    </div>

                    {!bloqueado && !concluido && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          Começar dia →
                        </span>
                      </div>
                    )}

                    {concluido && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          ✓ Concluído
                        </span>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Botão Plano de Crise */}
      <div className="fixed bottom-6 right-6">
        <Link
          href="/plano-crise"
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg font-medium transition-all hover:scale-105"
        >
          🚨 Plano de Crise
        </Link>
      </div>
    </div>
  );
}
