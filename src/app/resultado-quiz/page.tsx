'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Clock, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { updateProfile } from '@/lib/auth-helpers';

interface Diagnostico {
  trilhaId: string;
  trilhaNome: string;
  diagnostico: string;
  explicacao: string;
  descricao: string;
  duracao: string;
  nivel: string;
  beneficios: string[];
  rota: string;
  cor: string;
}

export default function ResultadoQuizPage() {
  const router = useRouter();
  const {
    isPremium,
    verificarAcessoTrilha,
    setTrilhaRecomendada,
    verificarTrial,
    trilhaRecomendada,
    userId,
    trilhasCompradas,
  } = useAppStore();

  const [diagnostico, setDiagnostico] = useState<Diagnostico | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar respostas do localStorage
    const respostasStr = localStorage.getItem('quiz-respostas');
    if (!respostasStr) {
      router.push('/quiz');
      return;
    }

    const respostas: Record<number, string> = JSON.parse(respostasStr);
    const resultado = calcularDiagnostico(respostas);
    setDiagnostico(resultado);
    setTrilhaRecomendada(resultado.trilhaId);
    
    // Salvar trilha recomendada no Supabase
    if (userId) {
      updateProfile(userId, {
        trilhaRecomendada: resultado.trilhaId,
      });
    }
    
    setLoading(false);
  }, [router, setTrilhaRecomendada, userId]);

  const calcularDiagnostico = (respostas: Record<number, string>): Diagnostico => {
    // Análise das respostas
    const localDor = respostas[0] || '';
    const movimento = respostas[3] || '';
    const estalos = respostas[4] || '';
    const limitacao = respostas[6] || '';
    const agachar = respostas[7] || '';
    const escadas = respostas[8] || '';
    const pisada = respostas[9] || '';
    const rigidez = respostas[13] || '';

    // Pontuação para cada trilha
    let scores = {
      condromalacia: 0,
      agachar: 0,
      escadas: 0,
      sobrepesoJoelho: 0,
      voltaTreinos: 0,
      corridaIniciante: 0,
    };

    // Condromalácia
    if (localDor.includes('frente') || localDor.includes('patela')) scores.condromalacia += 3;
    if (movimento.includes('Descer escadas')) scores.condromalacia += 2;
    if (estalos.includes('com dor')) scores.condromalacia += 2;
    if (pisada.includes('pronada')) scores.condromalacia += 2;

    // Dor ao Agachar
    if (movimento.includes('Agachar')) scores.agachar += 3;
    if (agachar.includes('Não') || agachar.includes('desconforto')) scores.agachar += 2;
    if (rigidez.includes('Sim') || rigidez.includes('pouco')) scores.agachar += 2;

    // Dor ao Subir e Descer Escadas
    if (movimento.includes('Subir escadas') || movimento.includes('Descer escadas'))
      scores.escadas += 3;
    if (escadas.includes('Sim') || escadas.includes('Às vezes')) scores.escadas += 2;

    // Sobrepeso + Joelho
    if (localDor.includes('inteiro')) scores.sobrepesoJoelho += 2;
    if (movimento.includes('caminhar') || movimento.includes('Carregar peso'))
      scores.sobrepesoJoelho += 2;
    if (limitacao.includes('Muito') || limitacao.includes('Impede')) scores.sobrepesoJoelho += 2;

    // Volta aos Treinos
    if (limitacao.includes('Pouco') || limitacao.includes('Moderadamente'))
      scores.voltaTreinos += 2;
    if (agachar.includes('Sim')) scores.voltaTreinos += 1;

    // Corrida Iniciante
    if (limitacao.includes('Nada') || limitacao.includes('Pouco')) scores.corridaIniciante += 2;
    if (movimento.includes('Correr')) scores.corridaIniciante += 2;

    // Determinar trilha com maior pontuação
    const maxScore = Math.max(...Object.values(scores));
    let trilhaEscolhida = 'condromalacia';

    if (scores.agachar === maxScore) trilhaEscolhida = 'agachar';
    else if (scores.escadas === maxScore) trilhaEscolhida = 'escadas';
    else if (scores.sobrepesoJoelho === maxScore) trilhaEscolhida = 'sobrepeso-joelho';
    else if (scores.voltaTreinos === maxScore) trilhaEscolhida = 'volta-treinos';
    else if (scores.corridaIniciante === maxScore) trilhaEscolhida = 'corrida-iniciante';

    // Retornar diagnóstico baseado na trilha
    const diagnosticos: Record<string, Diagnostico> = {
      condromalacia: {
        trilhaId: 'condromalacia',
        trilhaNome: 'Condromalácia',
        diagnostico: 'Condromalácia Patelar',
        explicacao:
          'Suas respostas indicam um padrão típico de condromalácia patelar, caracterizado por dor na região anterior do joelho (patela), especialmente ao descer escadas e durante movimentos de flexão. Esta condição está relacionada ao amolecimento da cartilagem sob a patela e pode ser significativamente melhorada com fortalecimento muscular direcionado.',
        descricao:
          'Fortaleça os músculos que protegem sua patela e reduza a pressão no joelho em até 30 dias.',
        duracao: '30 dias',
        nivel: 'Iniciante',
        beneficios: [
          'Redução da dor ao subir e descer escadas',
          'Melhora do alinhamento patelar',
          'Fortalecimento do quadríceps e glúteos',
          'Maior estabilidade do joelho',
        ],
        rota: '/trilhas/condromalacia/dia/1',
        cor: 'from-[#0A66C2] to-[#186FEC]',
      },
      agachar: {
        trilhaId: 'agachar',
        trilhaNome: 'Dor ao Agachar',
        diagnostico: 'Disfunção no Movimento de Agachamento',
        explicacao:
          'Suas respostas sugerem dificuldade e dor ao realizar o movimento de agachamento, frequentemente associado à rigidez posterior da coxa e fraqueza muscular. Este padrão pode ser corrigido com exercícios específicos de mobilidade e fortalecimento progressivo.',
        descricao:
          'Recupere sua capacidade de agachar sem dor com correção de movimento e fortalecimento direcionado.',
        duracao: '21 dias',
        nivel: 'Iniciante',
        beneficios: [
          'Agachamento sem dor em 2-3 semanas',
          'Melhora da mobilidade do quadril',
          'Correção de padrões de movimento',
          'Fortalecimento funcional',
        ],
        rota: '/trilhas/dor-ao-agachar/dia/1',
        cor: 'from-purple-500 to-pink-500',
      },
      escadas: {
        trilhaId: 'escadas',
        trilhaNome: 'Dor ao Subir e Descer Escadas',
        diagnostico: 'Instabilidade e Fraqueza no Joelho',
        explicacao:
          'Suas respostas indicam dificuldade e insegurança ao subir e descer escadas, um sinal de fraqueza do quadríceps e instabilidade articular. Este programa focará em fortalecer os músculos estabilizadores e melhorar o controle neuromuscular.',
        descricao:
          'Melhore estabilidade e força para subir e descer escadas sem incômodo.',
        duracao: '21 dias',
        nivel: 'Iniciante',
        beneficios: [
          'Menos dor ao subir escadas em 2-3 semanas',
          'Maior segurança e confiança',
          'Fortalecimento do quadríceps',
          'Melhora do equilíbrio',
        ],
        rota: '/trilhas/dor-ao-subir-e-descer-escadas/dia/1',
        cor: 'from-orange-500 to-red-500',
      },
      'sobrepeso-joelho': {
        trilhaId: 'sobrepeso-joelho',
        trilhaNome: 'Sobrepeso + Joelho',
        diagnostico: 'Sobrecarga Articular',
        explicacao:
          'Suas respostas sugerem uma dor mais difusa no joelho, possivelmente relacionada à sobrecarga articular. Este programa utiliza exercícios sem impacto para fortalecer e proteger suas articulações, reduzindo a pressão sobre o joelho.',
        descricao:
          'Exercícios sem impacto para fortalecer e proteger suas articulações.',
        duracao: '21 dias',
        nivel: 'Iniciante',
        beneficios: [
          'Fortalecimento articular sem impacto',
          'Redução de sobrecarga',
          'Melhora da mobilidade geral',
          'Exercícios adaptados e seguros',
        ],
        rota: '/trilhas/sobrepeso-joelho/dia/1',
        cor: 'from-green-500 to-teal-500',
      },
      'volta-treinos': {
        trilhaId: 'volta-treinos',
        trilhaNome: 'Volta aos Treinos',
        diagnostico: 'Preparação para Retorno aos Treinos',
        explicacao:
          'Suas respostas indicam que você tem dor controlável e deseja retornar aos treinos com segurança. Este programa preparará seu joelho para musculação, funcional ou treinos esportivos, com progressão gradual e segura.',
        descricao:
          'Retorne à musculação, funcional ou treinos esportivos com segurança e sem dor no joelho.',
        duracao: '28 dias',
        nivel: 'Intermediário',
        beneficios: [
          'Retorno seguro aos treinos em 3-4 semanas',
          'Preparação muscular completa',
          'Prevenção de lesões',
          'Progressão estruturada',
        ],
        rota: '/trilhas/volta-treinos/dia/1',
        cor: 'from-orange-500 to-red-500',
      },
      'corrida-iniciante': {
        trilhaId: 'corrida-iniciante',
        trilhaNome: 'Corrida Iniciante',
        diagnostico: 'Preparação para Corrida',
        explicacao:
          'Suas respostas mostram boa mobilidade e dor leve a moderada, indicando que você está pronto para preparar seu joelho para a corrida. Este programa focará em técnica, mobilidade e força específica para corredores.',
        descricao: 'Prepare seu joelho para correr com técnica, mobilidade e força.',
        duracao: '30 dias',
        nivel: 'Intermediário',
        beneficios: [
          'Joelho preparado para corrida em 4 semanas',
          'Técnica de corrida aprimorada',
          'Fortalecimento específico',
          'Prevenção de lesões',
        ],
        rota: '/trilhas/corrida-iniciante/dia/1',
        cor: 'from-indigo-500 to-purple-500',
      },
    };

    return diagnosticos[trilhaEscolhida];
  };

  const handleComecar = () => {
    if (!diagnostico) return;

    const temAcesso = verificarAcessoTrilha(diagnostico.trilhaId);
    const trialAtivo = verificarTrial();
    const trilhaComprada = trilhasCompradas.includes(diagnostico.trilhaId);

    // Premium - vai direto para Dia 1
    if (isPremium) {
      router.push(diagnostico.rota);
      return;
    }

    // Trilha comprada individualmente - vai direto para Dia 1
    if (trilhaComprada) {
      router.push(diagnostico.rota);
      return;
    }

    // Trial ativo - vai direto para Dia 1
    if (trialAtivo) {
      router.push(diagnostico.rota);
      return;
    }

    // Sem acesso - vai para página de assinatura (trial)
    router.push('/assinatura');
  };

  const getTextoBotao = () => {
    if (!diagnostico) return 'Carregando...';

    const temAcesso = verificarAcessoTrilha(diagnostico.trilhaId);
    const trialAtivo = verificarTrial();
    const trilhaComprada = trilhasCompradas.includes(diagnostico.trilhaId);

    // Premium ou trilha comprada
    if (isPremium || trilhaComprada) {
      return 'Ir para minha trilha recomendada';
    }

    // Trial ativo
    if (trialAtivo) {
      return 'Ir para minha trilha recomendada';
    }

    // Sem acesso - oferece trial
    return 'Começar 7 dias gratuitos desta trilha';
  };

  if (loading || !diagnostico) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A66C2] to-[#186FEC] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4" />
          <p className="text-lg font-medium">Analisando suas respostas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F4F7]">
      {/* Header com gradiente */}
      <header className="bg-gradient-to-br from-[#0A66C2] to-[#186FEC] text-white pt-12 pb-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Resultado da sua avaliação</h1>
          <p className="text-white/90 text-lg">
            Identificamos o melhor programa para o seu joelho
          </p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 -mt-24 pb-12">
        {/* Card de Diagnóstico */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6">
          <div className={`h-2 bg-gradient-to-r ${diagnostico.cor}`} />

          <div className="p-8">
            {/* Diagnóstico */}
            <div className="mb-6">
              <div className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                Diagnóstico Funcional
              </div>
              <h2 className="text-2xl font-bold text-[#2B2F36] mb-3">
                {diagnostico.diagnostico}
              </h2>
              <p className="text-gray-700 leading-relaxed">{diagnostico.explicacao}</p>
            </div>

            {/* Divisor */}
            <div className="border-t border-gray-200 my-6" />

            {/* Trilha Recomendada */}
            <div>
              <h3 className="text-xl font-bold text-[#2B2F36] mb-4">
                Trilha Recomendada para Você
              </h3>

              <div className={`bg-gradient-to-r ${diagnostico.cor} rounded-xl p-6 text-white mb-6`}>
                <h4 className="text-2xl font-bold mb-2">{diagnostico.trilhaNome}</h4>
                <p className="text-white/90 mb-4">{diagnostico.descricao}</p>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{diagnostico.duracao}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>{diagnostico.nivel}</span>
                  </div>
                </div>
              </div>

              {/* Benefícios */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Benefícios Principais
                </h4>
                <ul className="space-y-2">
                  {diagnostico.beneficios.map((beneficio, index) => (
                    <li key={index} className="flex items-start gap-2 text-green-800">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span>{beneficio}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botão Principal */}
              <button
                onClick={handleComecar}
                className={`w-full bg-gradient-to-r ${diagnostico.cor} hover:opacity-90 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-lg`}
              >
                {getTextoBotao()}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Card Informativo */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <p className="text-blue-900 text-sm leading-relaxed">
            💡 <strong>Dica:</strong> Siga o programa completo para obter os melhores resultados.
            A consistência é fundamental para a recuperação do seu joelho.
          </p>
        </div>
      </main>
    </div>
  );
}
