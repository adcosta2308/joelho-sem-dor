'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/custom/navigation';

// Dados dos 21 dias da trilha
const diasTrilha = [
  // FASE 1 - Dias 1 a 7
  { dia: 1, fase: 1, titulo: 'Mobilidade e Ativação', tempoTotal: 12, exercicios: 3 },
  { dia: 2, fase: 1, titulo: 'Glúteos e Proteção', tempoTotal: 10, exercicios: 3 },
  { dia: 3, fase: 1, titulo: 'Mini-agachamento Seguro', tempoTotal: 10, exercicios: 3 },
  { dia: 4, fase: 1, titulo: 'Estabilidade Lateral', tempoTotal: 10, exercicios: 3 },
  { dia: 5, fase: 1, titulo: 'Controle e Mobilidade', tempoTotal: 10, exercicios: 3 },
  { dia: 6, fase: 1, titulo: 'Alinhamento do Joelho', tempoTotal: 10, exercicios: 3 },
  { dia: 7, fase: 1, titulo: 'Consolidação da Semana 1', tempoTotal: 10, exercicios: 3 },
  
  // FASE 2 - Dias 8 a 14
  { dia: 8, fase: 2, titulo: 'Correção de Valgo', tempoTotal: 10, exercicios: 3 },
  { dia: 9, fase: 2, titulo: 'Profundidade Progressiva', tempoTotal: 10, exercicios: 3 },
  { dia: 10, fase: 2, titulo: 'Força Lateral', tempoTotal: 10, exercicios: 3 },
  { dia: 11, fase: 2, titulo: 'Agachamento 30-40°', tempoTotal: 10, exercicios: 3 },
  { dia: 12, fase: 2, titulo: 'Resistência Muscular', tempoTotal: 10, exercicios: 3 },
  { dia: 13, fase: 2, titulo: 'Biomecânica Correta', tempoTotal: 10, exercicios: 3 },
  { dia: 14, fase: 2, titulo: 'Consolidação da Semana 2', tempoTotal: 10, exercicios: 3 },
  
  // FASE 3 - Dias 15 a 21
  { dia: 15, fase: 3, titulo: 'Ativação de Glúteos', tempoTotal: 11, exercicios: 3 },
  { dia: 16, fase: 3, titulo: 'Profundidade Funcional', tempoTotal: 11, exercicios: 3 },
  { dia: 17, fase: 3, titulo: 'Força Excêntrica', tempoTotal: 11, exercicios: 3 },
  { dia: 18, fase: 3, titulo: 'Correção Final de Padrão', tempoTotal: 11, exercicios: 3 },
  { dia: 19, fase: 3, titulo: 'Confiança no Movimento', tempoTotal: 11, exercicios: 3 },
  { dia: 20, fase: 3, titulo: 'Preparação Completa', tempoTotal: 11, exercicios: 3 },
  { dia: 21, fase: 3, titulo: 'Agachamento Saudável', tempoTotal: 11, exercicios: 3 },
];

const fases = [
  { numero: 1, nome: 'Mobilidade e Ativação', cor: 'from-blue-500 to-cyan-500', dias: '1-7' },
  { numero: 2, nome: 'Correção de Movimento', cor: 'from-green-500 to-teal-500', dias: '8-14' },
  { numero: 3, nome: 'Retorno ao Agachamento', cor: 'from-orange-500 to-amber-500', dias: '15-21' },
];

export default function DorAoAgacharPage() {
  const router = useRouter();
  const [diasConcluidos, setDiasConcluidos] = useState<number[]>([]);

  const handleIniciarDia = (dia: number) => {
    const bloqueado = dia > 1 && !diasConcluidos.includes(dia - 1);
    if (!bloqueado) {
      router.push(`/trilhas/dor-ao-agachar/dia/${dia}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7] pb-24">
      <Navigation />
      
      {/* Header */}
      <header className="bg-gradient-to-br from-[#2F66F2] to-[#70CFFF] text-white pt-12 pb-10 px-6">
        <div className="max-w-md mx-auto">
          <Link href="/trilhas" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-5 h-5" />
            Voltar para trilhas
          </Link>
          <h1 className="text-3xl font-bold mb-3">Trilha Dor ao Agachar</h1>
          <p className="text-white/90 text-base leading-relaxed mb-4">
            21 dias para recuperar sua capacidade de agachar sem dor, com correção de movimento e fortalecimento direcionado.
          </p>
          
          {/* Progresso */}
          <div className="bg-white/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Seu progresso</span>
              <span className="text-lg font-bold">{diasConcluidos.length}/21 dias</span>
            </div>
            <div className="bg-white/20 rounded-full h-2.5">
              <div 
                className="bg-white rounded-full h-2.5 transition-all duration-300" 
                style={{ width: `${(diasConcluidos.length / 21) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-4">
        {/* Fases */}
        {fases.map((fase) => {
          const diasDaFase = diasTrilha.filter(d => d.fase === fase.numero);
          const diasConcluidosFase = diasDaFase.filter(d => diasConcluidos.includes(d.dia)).length;
          
          return (
            <div key={fase.numero} className="mb-8">
              {/* Header da Fase */}
              <div className={`bg-gradient-to-r ${fase.cor} rounded-2xl p-5 mb-4 text-white shadow-lg`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="text-xl font-bold">Fase {fase.numero}</h2>
                    <p className="text-white/90 text-sm">{fase.nome}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{diasConcluidosFase}/{diasDaFase.length}</div>
                    <div className="text-xs text-white/80">Dias</div>
                  </div>
                </div>
                <div className="bg-white/20 rounded-full h-1.5">
                  <div 
                    className="bg-white rounded-full h-1.5 transition-all duration-300" 
                    style={{ width: `${(diasConcluidosFase / diasDaFase.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Dias da Fase */}
              <div className="space-y-3">
                {diasDaFase.map((dia) => {
                  const concluido = diasConcluidos.includes(dia.dia);
                  const bloqueado = dia.dia > 1 && !diasConcluidos.includes(dia.dia - 1);
                  
                  return (
                    <button
                      key={dia.dia}
                      onClick={() => handleIniciarDia(dia.dia)}
                      disabled={bloqueado}
                      className={`w-full bg-white rounded-xl p-5 shadow-sm transition-all ${
                        bloqueado
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:shadow-md hover:scale-[1.02]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Ícone do Dia */}
                        <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${
                          concluido
                            ? 'bg-green-500'
                            : bloqueado
                            ? 'bg-gray-200'
                            : `bg-gradient-to-br ${fase.cor}`
                        }`}>
                          {bloqueado ? (
                            <Lock className="w-6 h-6 text-gray-400" />
                          ) : concluido ? (
                            <CheckCircle2 className="w-7 h-7 text-white" />
                          ) : (
                            <span className="text-white text-xl font-bold">{dia.dia}</span>
                          )}
                        </div>
                        
                        {/* Info do Dia */}
                        <div className="flex-1 text-left">
                          <h3 className="font-bold text-[#1C1C1C] mb-1">
                            Dia {dia.dia} — {dia.titulo}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              <span>{dia.exercicios} exercícios</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{dia.tempoTotal} min</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Status */}
                        {concluido && (
                          <div className="flex-shrink-0">
                            <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                              Concluído
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Motivação */}
        <div className="bg-gradient-to-br from-[#2F66F2]/10 to-[#70CFFF]/10 rounded-2xl p-6 mb-6">
          <h3 className="font-bold text-[#1C1C1C] mb-3 flex items-center gap-2">
            💙 Você está no caminho certo!
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Esta trilha foi desenvolvida para corrigir seu padrão de movimento e fortalecer os músculos que protegem seu joelho. 
            Em 21 dias, você vai agachar com confiança e sem dor!
          </p>
        </div>
      </main>
    </div>
  );
}
