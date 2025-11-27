'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { getSession, updateProfile } from '@/lib/auth-helpers';

interface Pergunta {
  id: number;
  texto: string;
  opcoes: string[];
}

const perguntas: Pergunta[] = [
  {
    id: 1,
    texto: 'Onde você sente dor com mais frequência?',
    opcoes: [
      'Na frente do joelho (patela)',
      'Na parte interna',
      'Na parte externa',
      'Atrás do joelho',
      'No joelho inteiro',
      'Depende do movimento',
    ],
  },
  {
    id: 2,
    texto: 'Quando sua dor começou?',
    opcoes: ['Há poucos dias', 'Há semanas', 'Há meses', 'Há mais de 1 ano'],
  },
  {
    id: 3,
    texto: 'Como sua dor se comporta?',
    opcoes: [
      'Dói ao usar, melhora com descanso',
      'Dói no início, melhora depois',
      'Piora conforme continuo o movimento',
      'Dói mesmo em repouso',
    ],
  },
  {
    id: 4,
    texto: 'Qual movimento mais causa dor?',
    opcoes: [
      'Subir escadas',
      'Descer escadas',
      'Agachar',
      'Correr',
      'Acordar e caminhar',
      'Ficar muito tempo sentado',
      'Carregar peso',
      'Nenhum movimento específico',
    ],
  },
  {
    id: 5,
    texto: 'Você sente estalos no joelho?',
    opcoes: ['Sim, com dor', 'Sim, sem dor', 'Não'],
  },
  {
    id: 6,
    texto: 'Seu joelho incha após esforço?',
    opcoes: ['Sim, sempre', 'Às vezes', 'Não'],
  },
  {
    id: 7,
    texto: 'O quanto a dor limita sua rotina?',
    opcoes: [
      'Nada',
      'Pouco',
      'Moderadamente',
      'Muito',
      'Impede atividades básicas',
    ],
  },
  {
    id: 8,
    texto: 'Consegue agachar até 90° sem dor intensa?',
    opcoes: ['Sim', 'Sim, com desconforto', 'Não'],
  },
  {
    id: 9,
    texto: 'Você se sente inseguro ao descer escadas?',
    opcoes: ['Sim', 'Às vezes', 'Não'],
  },
  {
    id: 10,
    texto: 'Como você descreveria sua pisada ao caminhar?',
    opcoes: [
      'Pisada pronada (entra para dentro)',
      'Pisada supinada (vai para fora)',
      'Pisada neutra',
      'Não sei',
    ],
  },
  {
    id: 11,
    texto: 'Onde seu tênis desgasta mais?',
    opcoes: [
      'Parte interna',
      'Parte externa',
      'Centro',
      'Frente',
      'Uniforme',
      'Não sei',
    ],
  },
  {
    id: 12,
    texto: 'Seus tornozelos caem para dentro ao caminhar?',
    opcoes: ['Sim', 'Às vezes', 'Não'],
  },
  {
    id: 13,
    texto: 'Consegue manter equilíbrio em uma perna por 15 segundos?',
    opcoes: ['Sim', 'Sim, com dificuldade', 'Não'],
  },
  {
    id: 14,
    texto: 'Você sente rigidez atrás da coxa (posterior)?',
    opcoes: ['Sim', 'Um pouco', 'Não'],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const { userId } = useAppStore();
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState<Record<number, string>>({});
  const [salvando, setSalvando] = useState(false);

  const progresso = ((perguntaAtual + 1) / perguntas.length) * 100;

  const handleResposta = (resposta: string) => {
    setRespostas({ ...respostas, [perguntaAtual]: resposta });
  };

  const handleProximo = () => {
    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
    } else {
      // Finalizar quiz e ir para resultado
      finalizarQuiz();
    }
  };

  const handleVoltar = () => {
    if (perguntaAtual > 0) {
      setPerguntaAtual(perguntaAtual - 1);
    }
  };

  const handleSair = () => {
    if (confirm('Deseja sair do quiz? Seu progresso será salvo.')) {
      router.push('/');
    }
  };

  const finalizarQuiz = async () => {
    setSalvando(true);
    
    // Salvar respostas no localStorage para usar na página de resultado
    localStorage.setItem('quiz-respostas', JSON.stringify(respostas));
    
    // Se usuário estiver logado, salvar também no Supabase
    if (userId) {
      const session = await getSession();
      if (session) {
        await updateProfile(userId, {
          quizRespostas: respostas,
          quizCompleto: true,
        });
      }
    }
    
    router.push('/resultado-quiz');
  };

  const respostaSelecionada = respostas[perguntaAtual];
  const podeAvancar = respostaSelecionada !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A66C2] to-[#186FEC] flex flex-col">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/f090dccd-192c-4ce3-8da1-1e81b091548c.png"
              alt="Orthoxis Logo"
              className="h-8 w-auto"
            />
            <span className="text-white font-bold text-lg">Quiz Diagnóstico</span>
          </div>
          <button
            onClick={handleSair}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Barra de Progresso */}
      <div className="bg-white/20 backdrop-blur-sm px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm font-medium">
              Pergunta {perguntaAtual + 1} de {perguntas.length}
            </span>
            <span className="text-white text-sm font-medium">
              {Math.round(progresso)}%
            </span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-300"
              style={{ width: `${progresso}%` }}
            />
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Pergunta */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-[#2B2F36] mb-6">
              {perguntas[perguntaAtual].texto}
            </h2>

            {/* Opções */}
            <div className="space-y-3">
              {perguntas[perguntaAtual].opcoes.map((opcao, index) => (
                <button
                  key={index}
                  onClick={() => handleResposta(opcao)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    respostaSelecionada === opcao
                      ? 'border-[#0A66C2] bg-blue-50 text-[#0A66C2] font-semibold'
                      : 'border-gray-200 bg-white hover:border-[#36C2FF] hover:bg-blue-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        respostaSelecionada === opcao
                          ? 'border-[#0A66C2] bg-[#0A66C2]'
                          : 'border-gray-300'
                      }`}
                    >
                      {respostaSelecionada === opcao && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-[#2B2F36]">{opcao}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleVoltar}
              disabled={perguntaAtual === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                perguntaAtual === 0
                  ? 'bg-white/20 text-white/50 cursor-not-allowed'
                  : 'bg-white text-[#0A66C2] hover:bg-white/90'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Voltar
            </button>

            <button
              onClick={handleProximo}
              disabled={!podeAvancar || salvando}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                podeAvancar && !salvando
                  ? 'bg-white text-[#0A66C2] hover:bg-white/90'
                  : 'bg-white/20 text-white/50 cursor-not-allowed'
              }`}
            >
              {salvando ? 'Salvando...' : perguntaAtual === perguntas.length - 1 ? 'Finalizar' : 'Próximo'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
