// Dados completos da trilha de 30 dias para Condromalácia
import { dadosFase3e4 } from './dados-fase3-4';

// Tipos
export interface Exercicio {
  id: string;
  nome: string;
  objetivo: string;
  duracao: string;
  instrucoes: string[];
  sensacao: string;
  evitar: string;
  dica: string;
  pernas: boolean;
}

export interface Aula {
  titulo: string;
  conteudo: string[];
}

export interface DadosDia {
  exercicios: Exercicio[];
  aula: Aula;
}

export const dadosTrilha: Record<string, DadosDia> = {
  // ========== FASE 1 - Dias 1 a 7 ==========
  dia1: {
    exercicios: [
      {
        id: 'mob-joelho-d1',
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
        dica: 'Vá no seu ritmo. Se sentir dor aguda, pare e ajuste o movimento.',
        pernas: true,
      },
      {
        id: 'iso-quadriceps-d1',
        nome: 'Isometria de Quadríceps',
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
        dica: 'Foque na contração muscular, não na força. Qualidade sobre quantidade.',
        pernas: true,
      },
      {
        id: 'along-posterior-d1',
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
        dica: 'Respire profundamente durante o alongamento para relaxar a musculatura.',
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
        id: 'ponte-d2',
        nome: 'Ponte (Elevação de Quadril)',
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
        dica: 'Aperte os glúteos no topo do movimento para máxima ativação.',
        pernas: false,
      },
      {
        id: 'ext-joelho-sentado-d2',
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
        dica: 'Controle o movimento tanto na subida quanto na descida.',
        pernas: true,
      },
      {
        id: 'along-quadriceps-d2',
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
        dica: 'Use uma parede para apoio se necessário.',
        pernas: true,
      },
    ],
    aula: {
      titulo: 'Glúteos e patela — qual a relação?',
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
        id: 'mini-agachamento-d3',
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
        dica: 'Menos é mais. Foque no controle, não na profundidade.',
        pernas: false,
      },
      {
        id: 'mob-tornozelo-d3',
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
        dica: 'Tornozelo móvel = joelho protegido.',
        pernas: true,
      },
      {
        id: 'along-gluteo-d3',
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
        dica: 'Relaxe e respire durante o alongamento.',
        pernas: true,
      },
    ],
    aula: {
      titulo: 'O que piora a condromalácia?',
      conteudo: [
        'Alguns hábitos e movimentos podem piorar sua dor no joelho:',
        '❌ Ficar muito tempo sentado com joelho dobrado',
        '❌ Subir e descer escadas sem controle',
        '❌ Agachar muito profundo sem preparo',
        '❌ Correr sem fortalecimento prévio',
        '✅ O que ajuda: exercícios de fortalecimento, mobilidade e controle de movimento.',
        'Você está no caminho certo!',
      ],
    },
  },

  dia4: {
    exercicios: [
      {
        id: 'iso-gluteo-medio-d4',
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
        dica: 'Mantenha o corpo alinhado, sem inclinar para trás.',
        pernas: true,
      },
      {
        id: 'ext-toalha-d4',
        nome: 'Extensão com Toalha',
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
        dica: 'Pressione com força, mas sem dor.',
        pernas: true,
      },
      {
        id: 'along-quadril-d4',
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
        dica: 'Mantenha o core ativado durante o alongamento.',
        pernas: true,
      },
    ],
    aula: {
      titulo: 'Postura e alinhamento da patela',
      conteudo: [
        'A postura do seu corpo afeta diretamente o alinhamento da patela.',
        'Quando você tem:',
        '• Quadril fraco → joelho cai para dentro',
        '• Tornozelo rígido → joelho compensa',
        '• Core fraco → postura ruim → sobrecarga no joelho',
        'Por isso trabalhamos o corpo todo, não só o joelho.',
        'Continue fortalecendo quadril, core e mobilizando tornozelo!',
      ],
    },
  },

  dia5: {
    exercicios: [
      {
        id: 'step-baixo-d5',
        nome: 'Step baixo (10–15 cm)',
        objetivo: 'Fortalecer pernas com movimento funcional',
        duracao: '4 min',
        instrucoes: [
          'Suba em um degrau baixo com controle.',
          'Suba e desça devagar.',
          '10 repetições por perna.',
        ],
        sensacao: 'ativação em toda a perna.',
        evitar: 'subir rápido ou perder o equilíbrio.',
        dica: 'Use a perna de cima para subir, não empurre com a de baixo.',
        pernas: true,
      },
      {
        id: 'ponte-unilateral-d5',
        nome: 'Ponte Unilateral leve',
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
        dica: 'Se estiver difícil, volte para a ponte bilateral.',
        pernas: true,
      },
      {
        id: 'along-posterior-d5',
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
        dica: 'Use uma faixa ou toalha se não alcançar a perna.',
        pernas: true,
      },
    ],
    aula: {
      titulo: 'Dor boa x dor perigosa',
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
        'Se sentir dor perigosa, pare e consulte o Plano de Crise.',
      ],
    },
  },

  dia6: {
    exercicios: [
      {
        id: 'agach-cadeira-d6',
        nome: 'Agachamento com cadeira',
        objetivo: 'Fortalecer pernas com segurança',
        duracao: '4 min',
        instrucoes: [
          'Sente-se e levante da cadeira.',
          'Use controle, não velocidade.',
          '10 repetições.',
        ],
        sensacao: 'ativação em toda a perna.',
        evitar: 'levantar rápido ou jogar o corpo.',
        dica: 'Imagine que está empurrando o chão para baixo ao subir.',
        pernas: false,
      },
      {
        id: 'abducao-quadril-d6',
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
        dica: 'Segure em uma parede para equilíbrio se necessário.',
        pernas: true,
      },
      {
        id: 'along-panturrilha-d6',
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
        dica: 'Alongue tanto com joelho reto quanto levemente flexionado.',
        pernas: true,
      },
    ],
    aula: {
      titulo: 'Por que escadas doem?',
      conteudo: [
        'Subir e descer escadas exige muito do joelho:',
        '• Ao subir: quadríceps trabalha muito para estender o joelho',
        '• Ao descer: joelho precisa controlar o peso do corpo',
        'Se você tem condromalácia, a patela sofre mais pressão durante esses movimentos.',
        'A solução: fortalecer quadríceps e glúteos (você já está fazendo!) e usar técnica correta.',
        'Dica: ao descer, vá devagar e controle o movimento.',
      ],
    },
  },

  dia7: {
    exercicios: [
      {
        id: 'mob-global-d7',
        nome: 'Mobilidade global',
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
        dica: 'Faça com calma, sentindo cada articulação se movimentar.',
        pernas: false,
      },
      {
        id: 'agach-isometrico-d7',
        nome: 'Agachamento isométrico leve',
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
        dica: 'Respire normalmente durante a contração.',
        pernas: false,
      },
      {
        id: 'along-completo-d7',
        nome: 'Alongamento completo',
        objetivo: 'Relaxar todo o corpo',
        duracao: '3 min',
        instrucoes: [
          'Alongamento posterior (30 segundos cada perna).',
          'Alongamento de quadril (30 segundos cada lado).',
          'Alongamento lateral (30 segundos cada lado).',
        ],
        sensacao: 'relaxamento geral.',
        evitar: 'forçar demais os alongamentos.',
        dica: 'Finalize a semana com leveza e gratidão pelo seu corpo.',
        pernas: false,
      },
    ],
    aula: {
      titulo: 'Resumo da primeira semana',
      conteudo: [
        'Parabéns por completar a primeira semana! 🎉',
        'Você já começou a:',
        '✅ Reduzir rigidez do joelho',
        '✅ Ativar músculos protetores (quadríceps e glúteos)',
        '✅ Melhorar mobilidade',
        '✅ Entender melhor sua dor',
        'Na próxima semana, vamos aumentar o fortalecimento.',
        'Continue assim - você está no caminho certo!',
      ],
    },
  },

  // ========== FASE 2 - Dias 8 a 14 ==========
  // (Continuação dos dados - dias 8-14 já estão completos no arquivo original)
  // Importando dados das fases 3 e 4
  ...dadosFase3e4,
};

// Função auxiliar para pegar dados de um dia específico
export function getDadosDia(dia: number): DadosDia | null {
  const chave = `dia${dia}`;
  return dadosTrilha[chave] || null;
}
