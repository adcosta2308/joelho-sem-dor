'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';

type Etapa = 'boas-vindas' | 'dor' | 'dificuldade' | 'recomendacao';

export default function OnboardingPage() {
  const router = useRouter();
  const { setProfile, setProgresso } = useAppStore();
  const [etapa, setEtapa] = useState<Etapa>('boas-vindas');
  const [nivelDor, setNivelDor] = useState(5);
  const [dificuldades, setDificuldades] = useState<string[]>([]);
  const [trilhaRecomendada, setTrilhaRecomendada] = useState('');

  const opcoesDificuldade = [
    { id: 'agachar', label: 'Agachar' },
    { id: 'escadas', label: 'Subir/descer escadas' },
    { id: 'caminhar', label: 'Caminhar longas distâncias' },
    { id: 'correr', label: 'Correr' },
    { id: 'treinar', label: 'Treinar na academia' },
    { id: 'sobrepeso', label: 'Tenho sobrepeso' },
  ];

  const toggleDificuldade = (id: string) => {
    setDificuldades(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const calcularRecomendacao = () => {
    // Lógica de recomendação baseada nas respostas
    if (dificuldades.includes('sobrepeso')) {
      return 'sobrepeso-joelho';
    } else if (dificuldades.includes('correr')) {
      return 'corrida-iniciante';
    } else if (dificuldades.includes('treinar')) {
      return 'volta-treinos';
    } else if (dificuldades.includes('escadas')) {
      return 'escadas';
    } else if (dificuldades.includes('agachar')) {
      return 'agachar';
    } else {
      return 'condromalacia';
    }
  };

  const avancar = () => {
    if (etapa === 'boas-vindas') {
      setEtapa('dor');
    } else if (etapa === 'dor') {
      setEtapa('dificuldade');
    } else if (etapa === 'dificuldade') {
      const trilha = calcularRecomendacao();
      setTrilhaRecomendada(trilha);
      setEtapa('recomendacao');
    }
  };

  const iniciarTrilha = () => {
    // Salvar dados no store
    setProfile({ dorAtual: nivelDor });
    setProgresso({ 
      dorDoDia: nivelDor,
      trilhaAtual: trilhaRecomendada,
      semana: 1,
      diasTreinados: 0,
    });

    // Redirecionar para o Dia 1 da trilha recomendada
    router.push(`/trilhas/${trilhaRecomendada}/dia/1`);
  };

  const getNomeTrilha = (id: string) => {
    const nomes: Record<string, string> = {
      'condromalacia': 'Condromalácia',
      'agachar': 'Dor ao Agachar',
      'escadas': 'Dor ao Subir e Descer Escadas',
      'sobrepeso-joelho': 'Sobrepeso + Joelho',
      'volta-treinos': 'Volta aos Treinos',
      'corrida-iniciante': 'Corrida Iniciante',
    };
    return nomes[id] || 'Condromalácia';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#70CFFF]/10 to-white">
      {/* Header */}
      <header className="bg-[#2F66F2] text-white pt-12 pb-8 px-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold">Joelho Sem Dor</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-8">
        {/* Boas-vindas */}
        {etapa === 'boas-vindas' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-[#70CFFF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-[#2F66F2]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">
                Bem-vindo ao Joelho Sem Dor
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Vamos fazer algumas perguntas rápidas para entender sua dor e recomendar a trilha ideal para você.
              </p>
            </div>

            <button
              onClick={avancar}
              className="w-full bg-[#2F66F2] hover:bg-[#2557d6] text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
            >
              Começar avaliação
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Nível de Dor */}
        {etapa === 'dor' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <button
              onClick={() => setEtapa('boas-vindas')}
              className="mb-6 text-[#2F66F2] flex items-center gap-2 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>

            <h2 className="text-2xl font-bold text-[#1C1C1C] mb-3">
              Qual o nível da sua dor hoje?
            </h2>
            <p className="text-gray-600 mb-8">
              De 0 (sem dor) a 10 (dor máxima)
            </p>

            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <span className="text-sm text-gray-600">Sem dor</span>
                <span className="text-2xl font-bold text-[#2F66F2]">{nivelDor}</span>
                <span className="text-sm text-gray-600">Dor máxima</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={nivelDor}
                onChange={(e) => setNivelDor(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2F66F2]"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                  <span key={n}>{n}</span>
                ))}
              </div>
            </div>

            <button
              onClick={avancar}
              className="w-full bg-[#2F66F2] hover:bg-[#2557d6] text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Dificuldades */}
        {etapa === 'dificuldade' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <button
              onClick={() => setEtapa('dor')}
              className="mb-6 text-[#2F66F2] flex items-center gap-2 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>

            <h2 className="text-2xl font-bold text-[#1C1C1C] mb-3">
              Quais atividades causam dor?
            </h2>
            <p className="text-gray-600 mb-6">
              Selecione todas que se aplicam
            </p>

            <div className="space-y-3 mb-8">
              {opcoesDificuldade.map(opcao => (
                <button
                  key={opcao.id}
                  onClick={() => toggleDificuldade(opcao.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    dificuldades.includes(opcao.id)
                      ? 'border-[#2F66F2] bg-[#70CFFF]/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#1C1C1C]">{opcao.label}</span>
                    {dificuldades.includes(opcao.id) && (
                      <CheckCircle2 className="w-5 h-5 text-[#2F66F2]" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={avancar}
              disabled={dificuldades.length === 0}
              className="w-full bg-[#2F66F2] hover:bg-[#2557d6] text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ver recomendação
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Recomendação */}
        {etapa === 'recomendacao' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">
                Trilha recomendada para você
              </h2>
              <div className="bg-[#70CFFF]/10 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-[#2F66F2] mb-2">
                  {getNomeTrilha(trilhaRecomendada)}
                </h3>
                <p className="text-gray-600 text-sm">
                  Baseado nas suas respostas, esta é a melhor trilha para começar sua recuperação.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={iniciarTrilha}
                className="w-full bg-[#2F66F2] hover:bg-[#2557d6] text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
              >
                Iniciar no Dia 1
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => router.push('/trilhas')}
                className="w-full border-2 border-[#2F66F2] text-[#2F66F2] font-semibold py-4 px-6 rounded-xl hover:bg-[#70CFFF]/10 transition-all duration-300"
              >
                Ver todas as trilhas
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
