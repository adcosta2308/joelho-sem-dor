'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Play, CheckCircle2, SkipForward, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/custom/navigation';
import { getDadosDia } from '../../dados';

export default function DiaPage() {
  const router = useRouter();
  const params = useParams();
  const diaNumero = parseInt(params.dia as string);
  
  const [exercicioAtual, setExercicioAtual] = useState(0);
  const [concluido, setConcluido] = useState(false);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);

  // Buscar dados do dia
  const dadosDia = getDadosDia(diaNumero);

  if (!dadosDia) {
    return (
      <div className="min-h-screen bg-[#F2F4F7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Dia não encontrado</h1>
          <Link href="/trilhas/dor-ao-agachar" className="text-[#2F66F2] hover:underline">
            Voltar para a trilha
          </Link>
        </div>
      </div>
    );
  }

  const exercicios = [...dadosDia.exercicios, { ...dadosDia.aula, conteudoEducativo: true, id: 'aula', duracao: '3 min' }];
  const exercicio = exercicios[exercicioAtual];

  const handleProximo = () => {
    setMostrarFeedback(true);
    
    setTimeout(() => {
      setMostrarFeedback(false);
      
      if (exercicioAtual < exercicios.length - 1) {
        setExercicioAtual(exercicioAtual + 1);
      } else {
        setConcluido(true);
      }
    }, 2000);
  };

  if (mostrarFeedback) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2F66F2]/5 to-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#2F66F2] rounded-full mb-6 animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-[#1C1C1C] mb-3">
            Ótimo!
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Seu joelho agradece. Continue assim! 💙
          </p>
        </div>
      </div>
    );
  }

  if (concluido) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2F66F2]/5 to-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#2F66F2] rounded-full mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-[#1C1C1C] mb-3">
            Dia {diaNumero} Concluído! 🎉
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Parabéns! Você completou mais um dia da trilha. Seu joelho está cada vez mais forte!
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[#2F66F2]">{dadosDia.exercicios.length}</div>
                <div className="text-xs text-gray-600">Exercícios</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#2F66F2]">
                  {dadosDia.exercicios.reduce((acc, ex) => acc + parseInt(ex.duracao), 0)}
                </div>
                <div className="text-xs text-gray-600">Minutos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#2F66F2]">{diaNumero}/21</div>
                <div className="text-xs text-gray-600">Dias</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/trilhas/dor-ao-agachar')}
              className="w-full bg-[#2F66F2] hover:bg-[#2557d6] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Voltar para a trilha
            </button>
            {diaNumero < 21 && (
              <button
                onClick={() => router.push(`/trilhas/dor-ao-agachar/dia/${diaNumero + 1}`)}
                className="w-full bg-white border-2 border-[#2F66F2] text-[#2F66F2] font-semibold py-4 px-6 rounded-xl transition-all hover:bg-[#2F66F2]/5"
              >
                Próximo dia →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F4F7] pb-6">
      <Navigation />
      
      {/* Header */}
      <header className="bg-[#2F66F2] text-white pt-12 pb-8 px-6">
        <div className="max-w-md mx-auto">
          <Link href="/trilhas/dor-ao-agachar" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold mb-1">Dia {diaNumero} — {exercicio.nome}</h1>
              <p className="text-[#70CFFF] text-sm font-medium">{exercicio.objetivo}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{exercicio.duracao}</div>
              <div className="text-xs text-white/70">Duração</div>
            </div>
          </div>
          
          {/* Progress */}
          <div className="mt-4">
            <p className="text-xs text-white/70 mb-2">Exercício {exercicioAtual + 1} de {exercicios.length}</p>
            <div className="bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${((exercicioAtual + 1) / exercicios.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-4">
        {/* Video/Image Placeholder */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="aspect-video bg-gradient-to-br from-[#2F66F2] to-[#70CFFF] flex items-center justify-center">
            <Play className="w-16 h-16 text-white/80" />
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <p className="text-sm text-gray-600 text-center">
              ⏱️ Tempo: {exercicio.duracao}
            </p>
          </div>
        </div>

        {/* Conteúdo Educativo */}
        {exercicio.conteudoEducativo ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
            <h2 className="text-xl font-bold text-[#1C1C1C] mb-4">{exercicio.titulo}</h2>
            
            <div className="space-y-3">
              {exercicio.conteudo.map((paragrafo: string, index: number) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {paragrafo}
                </p>
              ))}
            </div>
            
            <div className="bg-[#2F66F2]/10 rounded-xl p-4 mt-6">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-[#2F66F2]">💙 Lembre-se:</strong> Você está no caminho certo. Continue praticando!
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Instruções */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
              <h2 className="text-lg font-bold text-[#1C1C1C] mb-4">Como fazer:</h2>
              <ol className="space-y-3 mb-6">
                {exercicio.instrucoes.map((instrucao: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#2F66F2] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 pt-0.5 leading-relaxed">{instrucao}</span>
                  </li>
                ))}
              </ol>

              {/* Pernas */}
              {exercicio.pernas && (
                <div className="bg-[#70CFFF]/10 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-700 font-medium">
                    🔄 Perna direita / Perna esquerda
                  </p>
                </div>
              )}

              {/* Sensação correta */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-3">
                <p className="text-sm text-gray-700">
                  <strong className="text-green-700">✓ Sensação correta:</strong> {exercicio.sensacao}
                </p>
              </div>

              {/* Evitar */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-3">
                <p className="text-sm text-gray-700">
                  <strong className="text-red-700">⚠️ Evitar:</strong> {exercicio.evitar}
                </p>
              </div>

              {/* Objetivo */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-gray-700">
                  <strong className="text-[#2F66F2]">🎯 Objetivo:</strong> {exercicio.objetivo}
                </p>
              </div>
            </div>

            {/* Dica */}
            <div className="bg-[#70CFFF]/10 border border-[#70CFFF]/30 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-[#2F66F2]">💡 Dica:</strong> {exercicio.dica}
              </p>
            </div>
          </>
        )}

        {/* Botão Plano de Crise */}
        <Link 
          href="/crise"
          className="block w-full text-center bg-orange-50 border border-orange-200 text-orange-700 font-medium py-3 px-4 rounded-xl mb-6 hover:bg-orange-100 transition-all"
        >
          <AlertCircle className="w-4 h-4 inline mr-2" />
          Dor aumentou? Abrir Plano de Crise
        </Link>

        {/* Actions */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleProximo}
            className="w-full bg-[#2F66F2] hover:bg-[#2557d6] text-white font-semibold py-5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg text-lg"
          >
            <CheckCircle2 className="w-5 h-5" />
            {exercicioAtual < exercicios.length - 1 ? 'Concluir e próximo' : 'Finalizar dia'}
          </button>
          
          {exercicioAtual < exercicios.length - 1 && (
            <button
              onClick={handleProximo}
              className="w-full bg-white border-2 border-gray-200 hover:border-[#2F66F2] text-gray-700 font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <SkipForward className="w-4 h-4" />
              Pular exercício
            </button>
          )}
        </div>

        {/* Info */}
        <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed">
          Faça no seu ritmo. Cada movimento conta para sua recuperação. 💙
        </p>
      </main>
    </div>
  );
}
