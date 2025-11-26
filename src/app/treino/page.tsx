'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Play, CheckCircle2, SkipForward, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/custom/navigation';
import { useAppStore } from '@/lib/store';

// Dados completos dos 7 dias
const programaCompleto = {
  dia1: {
    exercicios: [
      {
        id: 'mob-joelho',
        nome: 'Mobilidade do Joelho',
        objetivo: 'Reduz rigidez e melhora mobilidade',
        duracao: '3 min',
        instrucoes: [
          'Sente-se em uma cadeira firme, com a coluna ereta.',
          'Estenda uma perna à frente lentamente.',
          'Flexione e estenda o joelho de forma suave e controlada.',
          'Vá somente até onde for confortável, sem forçar.',
          'Realize 15 repetições por perna.',
        ],
        sensacao: 'movimento leve dentro do joelho, sem dor aguda.',
        evitar: 'beliscão, travamento ou dor pontual forte.',
        objetivoFinal: 'lubrificar a articulação e reduzir rigidez.',
        pernas: true,
      },
      {
        id: 'fort-quadriceps',
        nome: 'Fortalecimento do Quadríceps',
        objetivo: 'Ativa o quadríceps para estabilizar a patela',
        duracao: '5 min',
        instrucoes: [
          'Sente-se com as costas apoiadas.',
          'Estenda uma das pernas mantendo-a reta.',
          'Contraia o músculo da frente da coxa como se fosse "empurrar o joelho para baixo".',
          'Mantenha a contração por 5 segundos.',
          'Relaxe por 2 segundos.',
          'Repita 10 vezes por perna.',
        ],
        sensacao: 'leve queimação na frente da coxa.',
        evitar: 'dor aguda no joelho ou sensação de travamento.',
        objetivoFinal: 'ativar o quadríceps para estabilizar a patela.',
        pernas: true,
      },
      {
        id: 'along-posterior',
        nome: 'Alongamento Posterior',
        objetivo: 'Alivia tensão na parte posterior da coxa',
        duracao: '4 min',
        instrucoes: [
          'Deite-se de costas em um colchonete.',
          'Eleve uma perna mantendo-a estendida.',
          'Segure atrás da coxa ou panturrilha.',
          'Eleve até sentir alongar atrás da perna, sem dobrar o joelho.',
          'Mantenha por 30 segundos.',
          'Repita 3 vezes por perna.',
        ],
        sensacao: 'alongamento suave atrás da coxa.',
        evitar: 'puxão no joelho, dor aguda ou formigamento.',
        objetivoFinal: 'reduzir tensão posterior e diminuir pressão na patela.',
        pernas: true,
      },
    ],
    aula: {
      titulo: 'Por que seu joelho dói?',
      conteudo: [
        'A dor na frente do joelho geralmente acontece quando a patela desliza com mais pressão do que deveria.',
        'Isso ocorre por três motivos principais:',
        '1. Fraqueza do quadríceps e glúteos',
        '2. Rigidez da posterior e do quadril',
        '3. Movimentos repetitivos mal alinhados',
        'A boa notícia: com exercícios certos, você melhora rapidamente. Estamos fazendo isso juntos.',
      ],
    },
  },
  dia2: {
    exercicios: [
      {
        id: 'elevacao-quadril',
        nome: 'Elevação de Quadril (Ponte)',
        objetivo: 'Ativar glúteos para reduzir pressão na patela',
        duracao: '4 min',
        instrucoes: [
          'Deite-se de costas com os joelhos flexionados.',
          'Eleve o quadril até alinhar joelho–quadril–ombros.',
          'Segure 3 segundos no topo.',
          'Desça devagar.',
          'Repita 12 vezes.',
        ],
        sensacao: 'leve ativação nos glúteos e posterior.',
        evitar: 'dor lombar ou nos joelhos.',
        objetivoFinal: 'ativar glúteos para proteger o joelho.',
        pernas: false,
      },
      {
        id: 'extensao-joelho-sentado',
        nome: 'Extensão de Joelho Sentado',
        objetivo: 'Ativar quadríceps sem impacto',
        duracao: '3 min',
        instrucoes: [
          'Sente-se com a coluna reta.',
          'Estenda uma perna lentamente.',
          'Segure por 2 segundos no topo.',
          'Retorne devagar.',
          '12 repetições por perna.',
        ],
        sensacao: 'ativação na frente da coxa.',
        evitar: 'dor aguda no joelho.',
        objetivoFinal: 'fortalecer quadríceps de forma segura.',
        pernas: true,
      },
      {
        id: 'along-quadriceps',
        nome: 'Alongamento de Quadríceps',
        objetivo: 'Reduzir tensão anterior',
        duracao: '3 min',
        instrucoes: [
          'Em pé, segure o pé atrás do corpo.',
          'Traga o calcanhar em direção ao glúteo.',
          'Mantenha joelhos alinhados.',
          'Segure 30 segundos por perna.',
        ],
        sensacao: 'alongamento na frente da coxa.',
        evitar: 'dor no joelho ou perda de equilíbrio.',
        objetivoFinal: 'reduzir tensão do quadríceps.',
        pernas: true,
      },
    ],
    aula: {
      titulo: 'Por que fortalecer glúteos reduz sua dor no joelho?',
      conteudo: [
        'Os glúteos são fundamentais para o alinhamento do joelho durante movimentos.',
        'Quando os glúteos estão fracos, o joelho tende a "cair para dentro", aumentando a pressão na patela.',
        'Fortalecer os glúteos ajuda a:',
        '• Melhorar o alinhamento do joelho',
        '• Reduzir sobrecarga na patela',
        '• Prevenir dores futuras',
        'Continue praticando os exercícios de ponte para fortalecer essa região essencial!',
      ],
    },
  },
  dia3: {
    exercicios: [
      {
        id: 'mini-agachamento',
        nome: 'Mini Agachamento na Parede',
        objetivo: 'Ativar quadríceps sem sobrecarregar patela',
        duracao: '4 min',
        instrucoes: [
          'Encoste as costas na parede.',
          'Desça apenas 20–30 graus.',
          'Segure 3 segundos.',
          'Suba devagar.',
          '10 repetições.',
        ],
        sensacao: 'ativação leve no quadríceps.',
        evitar: 'descer muito ou sentir dor no joelho.',
        objetivoFinal: 'fortalecer quadríceps de forma controlada.',
        pernas: false,
      },
      {
        id: 'mob-tornozelo',
        nome: 'Mobilidade de Tornozelo',
        objetivo: 'Melhorar alinhamento e reduzir carga no joelho',
        duracao: '3 min',
        instrucoes: [
          'Em pé, coloque um pé à frente.',
          'Leve o joelho para frente sem o calcanhar sair do chão.',
          '15 repetições por perna.',
        ],
        sensacao: 'alongamento leve na panturrilha.',
        evitar: 'tirar o calcanhar do chão.',
        objetivoFinal: 'melhorar mobilidade do tornozelo.',
        pernas: true,
      },
      {
        id: 'along-gluteo',
        nome: 'Alongamento de Glúteo',
        objetivo: 'Reduzir tensão no quadril',
        duracao: '3 min',
        instrucoes: [
          'Deite-se.',
          'Cruze uma perna sobre a outra.',
          'Puxe a perna de baixo em direção ao peito.',
          'Segure 30 segundos.',
        ],
        sensacao: 'alongamento no glúteo.',
        evitar: 'forçar demais ou sentir dor lombar.',
        objetivoFinal: 'relaxar musculatura do quadril.',
        pernas: true,
      },
    ],
    aula: {
      titulo: 'Entendendo o alinhamento do joelho: o que é seguro e o que evitar?',
      conteudo: [
        'O alinhamento correto do joelho é essencial para evitar dores.',
        'Durante movimentos como agachamento ou subir escadas:',
        '✅ O joelho deve seguir a linha do pé',
        '✅ Não deve "cair para dentro"',
        '✅ Não deve ultrapassar muito a ponta do pé',
        '❌ Evite movimentos bruscos',
        '❌ Evite rotações excessivas',
        'Pratique os exercícios com atenção ao alinhamento e você verá resultados rápidos!',
      ],
    },
  },
  dia4: {
    exercicios: [
      {
        id: 'iso-gluteo-medio',
        nome: 'Isometria de Glúteo Médio',
        objetivo: 'Fortalecer estabilizadores do quadril',
        duracao: '4 min',
        instrucoes: [
          'Deite-se de lado.',
          'Eleve a perna de cima 20–30 graus.',
          'Segure 5 segundos.',
          'Repita 10 vezes por perna.',
        ],
        sensacao: 'ativação na lateral do quadril.',
        evitar: 'elevar demais ou sentir dor lombar.',
        objetivoFinal: 'fortalecer glúteo médio para estabilizar joelho.',
        pernas: true,
      },
      {
        id: 'ext-joelho-toalha',
        nome: 'Extensão de Joelho com Toalha',
        objetivo: 'Ativar quadríceps de forma isométrica',
        duracao: '3 min',
        instrucoes: [
          'Sente-se no chão, perna estendida.',
          'Coloque uma toalha atrás do joelho.',
          'Pressione o joelho contra a toalha.',
          'Segure 5 segundos.',
          '12 repetições.',
        ],
        sensacao: 'contração forte no quadríceps.',
        evitar: 'dor aguda no joelho.',
        objetivoFinal: 'fortalecer quadríceps sem movimento.',
        pernas: true,
      },
      {
        id: 'along-quadril',
        nome: 'Alongamento de Quadril',
        objetivo: 'Reduzir tensão na frente do quadril',
        duracao: '3 min',
        instrucoes: [
          'Em pé, coloque uma perna à frente.',
          'Incline o quadril levemente.',
          'Deverá alongar a frente do quadril.',
          'Segure 30 segundos por perna.',
        ],
        sensacao: 'alongamento na frente do quadril.',
        evitar: 'arquear demais a lombar.',
        objetivoFinal: 'relaxar flexores do quadril.',
        pernas: true,
      },
    ],
    aula: {
      titulo: 'Como o quadril influencia diretamente sua dor no joelho?',
      conteudo: [
        'O quadril e o joelho trabalham juntos em todos os movimentos.',
        'Quando o quadril está fraco ou rígido:',
        '• O joelho compensa e sofre mais pressão',
        '• O alinhamento fica comprometido',
        '• A dor aumenta',
        'Fortalecer e alongar o quadril é essencial para:',
        '✅ Reduzir sobrecarga no joelho',
        '✅ Melhorar postura e movimento',
        '✅ Prevenir lesões futuras',
        'Continue com os exercícios de quadril - eles fazem toda a diferença!',
      ],
    },
  },
  dia5: {
    exercicios: [
      {
        id: 'step-up',
        nome: 'Step-up Baixo',
        objetivo: 'Fortalecer pernas com movimento funcional',
        duracao: '4 min',
        instrucoes: [
          'Suba em um degrau baixo com controle.',
          'Suba e desça devagar.',
          '10 repetições por perna.',
        ],
        sensacao: 'ativação em toda a perna.',
        evitar: 'subir rápido ou perder o equilíbrio.',
        objetivoFinal: 'fortalecer pernas de forma funcional.',
        pernas: true,
      },
      {
        id: 'ponte-unilateral',
        nome: 'Ponte Unilateral (leve)',
        objetivo: 'Fortalecer glúteos de forma avançada',
        duracao: '3 min',
        instrucoes: [
          'Deite-se.',
          'Estenda uma perna.',
          'Eleve o quadril usando a perna que está no chão.',
          '8 repetições por perna.',
        ],
        sensacao: 'ativação forte no glúteo.',
        evitar: 'dor lombar ou perder o alinhamento.',
        objetivoFinal: 'fortalecer glúteos unilateralmente.',
        pernas: true,
      },
      {
        id: 'along-posterior-dia5',
        nome: 'Alongamento Posterior',
        objetivo: 'Alivia tensão na parte posterior da coxa',
        duracao: '3 min',
        instrucoes: [
          'Deite-se de costas em um colchonete.',
          'Eleve uma perna mantendo-a estendida.',
          'Segure atrás da coxa ou panturrilha.',
          'Eleve até sentir alongar atrás da perna, sem dobrar o joelho.',
          'Mantenha por 30 segundos.',
          'Repita 3 vezes por perna.',
        ],
        sensacao: 'alongamento suave atrás da coxa.',
        evitar: 'puxão no joelho, dor aguda ou formigamento.',
        objetivoFinal: 'reduzir tensão posterior e diminuir pressão na patela.',
        pernas: true,
      },
    ],
    aula: {
      titulo: 'A diferença entre dor boa e dor perigosa',
      conteudo: [
        'Nem toda dor durante exercícios é ruim. Aprenda a diferença:',
        '✅ Dor boa (normal):',
        '• Queimação muscular leve',
        '• Cansaço muscular',
        '• Alongamento confortável',
        '❌ Dor perigosa (pare imediatamente):',
        '• Dor aguda ou pontual',
        '• Dor que piora durante o exercício',
        '• Sensação de travamento',
        '• Formigamento ou dormência',
        'Se sentir dor perigosa, pare e consulte o Plano de Crise. Seu corpo sabe os limites!',
      ],
    },
  },
  dia6: {
    exercicios: [
      {
        id: 'agachamento-cadeira',
        nome: 'Agachamento com Cadeira',
        objetivo: 'Fortalecer pernas com segurança',
        duracao: '4 min',
        instrucoes: [
          'Sente-se e levante da cadeira.',
          'Use controle, não velocidade.',
          '10 repetições.',
        ],
        sensacao: 'ativação em toda a perna.',
        evitar: 'levantar rápido ou jogar o corpo.',
        objetivoFinal: 'fortalecer pernas de forma segura.',
        pernas: false,
      },
      {
        id: 'abducao-quadril',
        nome: 'Abdução de Quadril em Pé',
        objetivo: 'Fortalecer glúteo médio',
        duracao: '3 min',
        instrucoes: [
          'Em pé, eleve a perna lateralmente.',
          'Sem inclinar o tronco.',
          '12 repetições.',
        ],
        sensacao: 'ativação na lateral do quadril.',
        evitar: 'inclinar o corpo ou elevar demais.',
        objetivoFinal: 'fortalecer estabilizadores do quadril.',
        pernas: true,
      },
      {
        id: 'along-panturrilha',
        nome: 'Alongamento de Panturrilha',
        objetivo: 'Reduzir tensão na panturrilha',
        duracao: '3 min',
        instrucoes: [
          'Mantenha o calcanhar no chão.',
          'Incline-se para frente.',
          'Segure 30 segundos por perna.',
        ],
        sensacao: 'alongamento na panturrilha.',
        evitar: 'tirar o calcanhar do chão.',
        objetivoFinal: 'relaxar panturrilha e melhorar mobilidade.',
        pernas: true,
      },
    ],
    aula: {
      titulo: 'Como evitar dor ao caminhar ou ficar muito tempo em pé',
      conteudo: [
        'Dor ao caminhar ou ficar em pé é comum em quem tem dor no joelho.',
        'Dicas práticas para o dia a dia:',
        '✅ Use calçados confortáveis com bom amortecimento',
        '✅ Evite ficar parado na mesma posição por muito tempo',
        '✅ Faça pausas para alongar',
        '✅ Fortaleça glúteos e quadríceps (você já está fazendo!)',
        '✅ Mantenha peso saudável',
        '❌ Evite saltos altos por longos períodos',
        '❌ Evite superfícies muito duras',
        'Pequenas mudanças fazem grande diferença!',
      ],
    },
  },
  dia7: {
    exercicios: [
      {
        id: 'mob-global',
        nome: 'Sequência de Mobilidade Global',
        objetivo: 'Mobilizar todo o corpo',
        duracao: '4 min',
        instrucoes: [
          'Rotação de tornozelo (10 vezes cada lado).',
          'Mobilidade de quadril (círculos com o joelho).',
          'Mobilidade de joelho (flexão e extensão suave).',
          'Mobilidade de coluna (rotações suaves).',
        ],
        sensacao: 'sensação de corpo mais solto.',
        evitar: 'movimentos bruscos ou forçados.',
        objetivoFinal: 'preparar o corpo para movimentos do dia.',
        pernas: false,
      },
      {
        id: 'agach-isometrico',
        nome: 'Agachamento Isométrico Leve',
        objetivo: 'Fortalecer pernas de forma estática',
        duracao: '3 min',
        instrucoes: [
          'Encoste na parede.',
          'Desça 20 graus.',
          'Segure 10 segundos.',
          '6 repetições.',
        ],
        sensacao: 'queimação leve nas pernas.',
        evitar: 'descer muito ou sentir dor no joelho.',
        objetivoFinal: 'fortalecer pernas sem movimento.',
        pernas: false,
      },
      {
        id: 'along-corpo-inteiro',
        nome: 'Alongamento de Corpo Inteiro',
        objetivo: 'Relaxar todo o corpo',
        duracao: '3 min',
        instrucoes: [
          'Alongamento posterior (30 segundos cada perna).',
          'Alongamento de quadril (30 segundos cada lado).',
          'Alongamento lateral (30 segundos cada lado).',
        ],
        sensacao: 'relaxamento geral.',
        evitar: 'forçar demais os alongamentos.',
        objetivoFinal: 'relaxar e finalizar a semana com leveza.',
        pernas: false,
      },
    ],
    aula: {
      titulo: 'Como manter seu joelho saudável a longo prazo',
      conteudo: [
        'Parabéns por completar os 7 dias! Agora vamos manter os resultados:',
        '✅ Continue praticando os exercícios 3-4x por semana',
        '✅ Mantenha-se ativo: caminhe, nade, pedale',
        '✅ Fortaleça glúteos e quadríceps regularmente',
        '✅ Alongue-se diariamente',
        '✅ Ouça seu corpo: descanse quando necessário',
        '❌ Evite sobrecarga repentina',
        '❌ Não ignore sinais de dor',
        'Lembre-se: consistência é mais importante que intensidade. Você está no caminho certo!',
      ],
    },
  },
};

export default function TreinoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const diaParam = searchParams.get('dia') || 'dia1';
  
  const [exercicioAtual, setExercicioAtual] = useState(0);
  const [concluido, setConcluido] = useState(false);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const concluirExercicio = useAppStore((state) => state.concluirExercicio);
  const setProgresso = useAppStore((state) => state.setProgresso);
  const progresso = useAppStore((state) => state.progresso);

  const diaAtual = programaCompleto[diaParam as keyof typeof programaCompleto] || programaCompleto.dia1;
  const exercicios = [...diaAtual.exercicios, { ...diaAtual.aula, conteudoEducativo: true, id: 'aula', duracao: '3 min' }];
  const exercicio = exercicios[exercicioAtual];

  const handleProximo = () => {
    setMostrarFeedback(true);
    
    setTimeout(() => {
      setMostrarFeedback(false);
      concluirExercicio(exercicio.id);
      
      if (exercicioAtual < exercicios.length - 1) {
        setExercicioAtual(exercicioAtual + 1);
      } else {
        setConcluido(true);
        setProgresso({
          diasTreinados: progresso.diasTreinados + 1,
        });
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
            Treino Concluído! 🎉
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Parabéns! Você completou seu treino de hoje. Seu joelho agradece cada movimento que você fez.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[#2F66F2]">{exercicios.length}</div>
                <div className="text-xs text-gray-600">Exercícios</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#2F66F2]">
                  {diaAtual.exercicios.reduce((acc, ex) => acc + parseInt(ex.duracao), 0)}
                </div>
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
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold mb-1">{exercicio.nome}</h1>
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
                  <strong className="text-[#2F66F2]">🎯 Objetivo:</strong> {exercicio.objetivoFinal}
                </p>
              </div>
            </div>

            {/* Dica */}
            <div className="bg-[#70CFFF]/10 border border-[#70CFFF]/30 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-[#2F66F2]">💡 Dica:</strong> Vá no seu ritmo. Se sentir dor aguda, pare e ajuste o movimento.
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
        <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed">
          Faça no seu ritmo. Cada movimento conta para sua recuperação. 💙
        </p>
      </main>
    </div>
  );
}
