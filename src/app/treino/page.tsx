'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Pause, CheckCircle2, SkipForward } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/custom/navigation';
import { useAppStore } from '@/lib/store';

export default function TreinoPage() {
  const router = useRouter();
  const [exercicioAtual, setExercicioAtual] = useState(0);
  const [concluido, setConcluido] = useState(false);
  const concluirExercicio = useAppStore((state) => state.concluirExercicio);
  const setProgresso = useAppStore((state) => state.setProgresso);
  const progresso = useAppStore((state) => state.progresso);

  const exercicios = [
    {
      id: 'mob-joelho',
      nome: 'Mobilidade do Joelho',
      duracao: '3 min',
      instrucoes: [
        'Sente-se em uma cadeira confortável',
        'Estenda uma perna à frente',
        'Flexione e estenda o joelho lentamente',
        'Faça 15 repetições em cada perna',
        'Mantenha o movimento controlado e suave',
      ],
      dica: 'Não force o movimento. Vá até onde for confortável.',
    },
    {
      id: 'fort-quadriceps',
      nome: 'Fortalecimento do Quadríceps',
      duracao: '5 min',
      instrucoes: [
        'Sente-se com as costas apoiadas',
        'Estenda uma perna mantendo-a reta',
        'Contraia o músculo da coxa por 5 segundos',
        'Relaxe e repita 10 vezes',
        'Troque de perna',
      ],
      dica: 'Você deve sentir o músculo da frente da coxa trabalhando.',
    },
    {
      id: 'along-posterior',
      nome: 'Alongamento Posterior',
      duracao: '4 min',
      instrucoes: [
        'Deite-se de costas',
        'Leve uma perna em direção ao peito',
        'Segure por trás da coxa',
        'Mantenha por 30 segundos',
        'Repita 3 vezes em cada perna',
      ],
      dica: 'Respire profundamente durante o alongamento.',
    },
  ];

  const exercicio = exercicios[exercicioAtual];

  const handleProximo = () => {
    concluirExercicio(exercicio.id);
    
    if (exercicioAtual < exercicios.length - 1) {
      setExercicioAtual(exercicioAtual + 1);
    } else {
      setConcluido(true);
      setProgresso({
        diasTreinados: progresso.diasTreinados + 1,
      });
    }
  };

  if (concluido) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2F66F2]/5 to-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#2F66F2] rounded-full mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-[#1C1C1C] mb-3">
            Treino Concluído! 🎉
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Parabéns! Você completou seu treino de hoje. Seu joelho agradece.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[#2F66F2]">{exercicios.length}</div>
                <div className="text-xs text-gray-600">Exercícios</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#2F66F2]">12</div>
                <div className="text-xs text-gray-600">Minutos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#2F66F2]">+1</div>
                <div className="text-xs text-gray-600">Dia</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/progresso')}
              className="w-full bg-[#2F66F2] hover:bg-[#2557d6] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Ver meu progresso
            </button>
            <button
              onClick={() => router.push('/plano')}
              className="w-full bg-white border-2 border-gray-200 hover:border-[#2F66F2] text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all"
            >
              Voltar ao plano
            </button>
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
          <Link href="/plano" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">{exercicio.nome}</h1>
              <p className="text-[#70CFFF] text-sm">Exercício {exercicioAtual + 1} de {exercicios.length}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{exercicio.duracao}</div>
              <div className="text-xs text-white/70">Duração</div>
            </div>
          </div>
          
          {/* Progress */}
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${((exercicioAtual + 1) / exercicios.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-4">
        {/* Video/Image Placeholder */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="aspect-video bg-gradient-to-br from-[#2F66F2] to-[#70CFFF] flex items-center justify-center">
            <Play className="w-16 h-16 text-white/80" />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#1C1C1C] mb-4">Como fazer:</h2>
            <ol className="space-y-3">
              {exercicio.instrucoes.map((instrucao, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#2F66F2] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 pt-0.5">{instrucao}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Dica */}
        <div className="bg-[#70CFFF]/10 border border-[#70CFFF]/30 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-700">
            <strong className="text-[#2F66F2]">💡 Dica:</strong> {exercicio.dica}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleProximo}
            className="w-full bg-[#2F66F2] hover:bg-[#2557d6] text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-md"
          >
            <CheckCircle2 className="w-5 h-5" />
            {exercicioAtual < exercicios.length - 1 ? 'Concluir e próximo' : 'Finalizar treino'}
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
        <p className="text-xs text-gray-500 text-center mt-6">
          Faça no seu ritmo. Seu joelho agradece.
        </p>
      </main>
    </div>
  );
}
