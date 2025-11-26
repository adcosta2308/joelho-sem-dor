'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/custom/navigation';

// Dados dos 30 dias da trilha
const diasTrilha = [
  // FASE 1 - Dias 1 a 7
  { dia: 1, fase: 1, titulo: 'Mobilidade e Ativação Inicial', tempoTotal: 12, exercicios: 3 },
  { dia: 2, fase: 1, titulo: 'Glúteos e Proteção da Patela', tempoTotal: 10, exercicios: 3 },
  { dia: 3, fase: 1, titulo: 'Alinhamento e Controle', tempoTotal: 10, exercicios: 3 },
  { dia: 4, fase: 1, titulo: 'Estabilidade do Quadril', tempoTotal: 10, exercicios: 3 },
  { dia: 5, fase: 1, titulo: 'Progressão Funcional', tempoTotal: 10, exercicios: 3 },
  { dia: 6, fase: 1, titulo: 'Força e Resistência', tempoTotal: 10, exercicios: 3 },
  { dia: 7, fase: 1, titulo: 'Integração da Semana 1', tempoTotal: 10, exercicios: 3 },
  
  // FASE 2 - Dias 8 a 14
  { dia: 8, fase: 2, titulo: 'Fortalecimento Progressivo', tempoTotal: 12, exercicios: 3 },
  { dia: 9, fase: 2, titulo: 'Mobilidade e Força', tempoTotal: 12, exercicios: 3 },
  { dia: 10, fase: 2, titulo: 'Controle de Carga', tempoTotal: 12, exercicios: 3 },
  { dia: 11, fase: 2, titulo: 'Força Lateral', tempoTotal: 12, exercicios: 3 },
  { dia: 12, fase: 2, titulo: 'Agachamento Seguro', tempoTotal: 12, exercicios: 3 },
  { dia: 13, fase: 2, titulo: 'Equilíbrio e Propriocepção', tempoTotal: 12, exercicios: 3 },
  { dia: 14, fase: 2, titulo: 'Consolidação da Fase 2', tempoTotal: 12, exercicios: 3 },
  
  // FASE 3 - Dias 15 a 21
  { dia: 15, fase: 3, titulo: 'Mecânica de Movimento', tempoTotal: 14, exercicios: 3 },
  { dia: 16, fase: 3, titulo: 'Glúteo Médio Avançado', tempoTotal: 14, exercicios: 3 },
  { dia: 17, fase: 3, titulo: 'Posições Seguras', tempoTotal: 14, exercicios: 3 },
  { dia: 18, fase: 3, titulo: 'Movimentos que Aliviam', tempoTotal: 14, exercicios: 3 },
  { dia: 19, fase: 3, titulo: 'Panturrilha e Estabilidade', tempoTotal: 14, exercicios: 3 },
  { dia: 20, fase: 3, titulo: 'Evolução Controlada', tempoTotal: 14, exercicios: 3 },
  { dia: 21, fase: 3, titulo: 'Revisão da Semana 3', tempoTotal: 14, exercicios: 3 },
  
  // FASE 4 - Dias 22 a 30
  { dia: 22, fase: 4, titulo: 'Joelho Forte no Dia a Dia', tempoTotal: 15, exercicios: 3 },
  { dia: 23, fase: 4, titulo: 'Força para Movimento', tempoTotal: 15, exercicios: 3 },
  { dia: 24, fase: 4, titulo: 'Movimento Seguro', tempoTotal: 15, exercicios: 3 },
  { dia: 25, fase: 4, titulo: 'Escadas sem Dor', tempoTotal: 15, exercicios: 3 },
  { dia: 26, fase: 4, titulo: 'Construindo Estabilidade', tempoTotal: 15, exercicios: 3 },
  { dia: 27, fase: 4, titulo: 'Base do Movimento', tempoTotal: 15, exercicios: 3 },
  { dia: 28, fase: 4, titulo: 'Controle e Equilíbrio', tempoTotal: 15, exercicios: 3 },
  { dia: 29, fase: 4, titulo: 'Consolidando Resultados', tempoTotal: 15, exercicios: 3 },
  { dia: 30, fase: 4, titulo: 'Joelho Saudável para Sempre', tempoTotal: 15, exercicios: 3 },
];

const fases = [
  { numero: 1, nome: 'Redução de Dor', cor: 'from-blue-500 to-cyan-500', dias: '1-7' },
  { numero: 2, nome: 'Fortalecimento', cor: 'from-green-500 to-teal-500', dias: '8-14' },
  { numero: 3, nome: 'Correção de Movimento', cor: 'from-orange-500 to-amber-500', dias: '15-21' },
  { numero: 4, nome: 'Retorno à Função', cor: 'from-purple-500 to-pink-500', dias: '22-30' },
];

export default function CondromalaciaPage() {
  const router = useRouter();
  const [diasConcluidos, setDiasConcluidos] = useState<number[]>([]);

  const handleIniciarDia = (dia: number) => {
    const bloqueado = dia > 1 && !diasConcluidos.includes(dia - 1);
    if (!bloqueado) {
      router.push(`/trilhas/condromalaciа/dia/${dia}`);
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
          <h1 className="text-3xl font-bold mb-3">Trilha Condromalácia</h1>
          <p className="text-white/90 text-base leading-relaxed mb-4">
            30 dias de exercícios terapêuticos para fortalecer os músculos que protegem sua patela e reduzir a dor.
          </p>
          
          {/* Progresso */}
          <div className="bg-white/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Seu progresso</span>
              <span className="text-lg font-bold">{diasConcluidos.length}/30 dias</span>
            </div>
            <div className="bg-white/20 rounded-full h-2.5">
              <div 
                className="bg-white rounded-full h-2.5 transition-all duration-300" 
                style={{ width: `${(diasConcluidos.length / 30) * 100}%` }}
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
            Cada dia desta trilha foi cuidadosamente planejado para fortalecer seu joelho de forma progressiva e segura. 
            Continue praticando e você verá resultados reais em poucas semanas.
          </p>
        </div>
      </main>
    </div>
  );
}
