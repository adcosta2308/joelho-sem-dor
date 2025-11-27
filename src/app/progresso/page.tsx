'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Trophy, Calendar, TrendingUp, CheckCircle2, Target, Award } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import Navigation from '@/components/custom/navigation';

export default function ProgressoPage() {
  const router = useRouter();
  const { progresso, profile, diasConcluidosCondromalacia, diasConcluidosSobrepesoJoelho, diasConcluidosVoltaTreinos, diasConcluidosCorridaIniciante } = useAppStore();

  const getTotalDiasConcluidos = () => {
    return (
      diasConcluidosCondromalacia.length +
      diasConcluidosSobrepesoJoelho.length +
      diasConcluidosVoltaTreinos.length +
      diasConcluidosCorridaIniciante.length
    );
  };

  const totalDias = getTotalDiasConcluidos();
  const semanasConcluidas = Math.floor(totalDias / 7);
  const nivelDor = profile.dorAtual;

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

  const trilhasConcluidas = [
    { nome: 'Condromalácia', dias: diasConcluidosCondromalacia.length, total: 30 },
    { nome: 'Sobrepeso + Joelho', dias: diasConcluidosSobrepesoJoelho.length, total: 21 },
    { nome: 'Volta aos Treinos', dias: diasConcluidosVoltaTreinos.length, total: 28 },
    { nome: 'Corrida Iniciante', dias: diasConcluidosCorridaIniciante.length, total: 30 },
  ].filter(t => t.dias > 0);

  const getRecomendacao = () => {
    if (totalDias < 7) {
      return 'Continue firme! Os primeiros dias são os mais importantes para criar o hábito.';
    } else if (totalDias < 21) {
      return 'Você está no caminho certo! Mantenha a consistência para ver resultados duradouros.';
    } else if (totalDias < 30) {
      return 'Excelente progresso! Você está construindo uma base sólida para um joelho saudável.';
    } else {
      return 'Parabéns! Você completou uma trilha inteira. Continue cuidando do seu joelho!';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#36C2FF]/10 to-white pb-24">
      <Navigation />
      
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0A66C2] to-[#186FEC] text-white pt-12 pb-16 px-6">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => router.push('/')}
            className="mb-4 flex items-center gap-2 text-white/90 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Seu Progresso</h1>
          </div>
          <p className="text-[#36C2FF]">
            Acompanhe sua evolução
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-8">
        {/* Stats Principais */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white rounded-xl p-5 text-center shadow-lg">
            <Calendar className="w-6 h-6 text-[#0A66C2] mx-auto mb-2" />
            <p className="text-3xl font-bold text-[#2B2F36]">{totalDias}</p>
            <p className="text-xs text-gray-600 mt-1">Dias concluídos</p>
          </div>
          <div className="bg-white rounded-xl p-5 text-center shadow-lg">
            <TrendingUp className="w-6 h-6 text-[#0A66C2] mx-auto mb-2" />
            <p className="text-3xl font-bold text-[#2B2F36]">{semanasConcluidas}</p>
            <p className="text-xs text-gray-600 mt-1">Semanas</p>
          </div>
          <div className="bg-white rounded-xl p-5 text-center shadow-lg">
            <Target className="w-6 h-6 text-[#0A66C2] mx-auto mb-2" />
            <p className="text-3xl font-bold text-[#2B2F36]">{nivelDor}</p>
            <p className="text-xs text-gray-600 mt-1">Nível de dor</p>
          </div>
        </div>

        {/* Trilha Atual */}
        {progresso.trilhaAtual && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-[#0A66C2]" />
              <h2 className="text-xl font-bold text-[#2B2F36]">Trilha Atual</h2>
            </div>
            <div className="bg-[#36C2FF]/10 rounded-xl p-4">
              <h3 className="font-bold text-[#2B2F36] mb-2">
                {getNomeTrilha(progresso.trilhaAtual)}
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progresso</span>
                <span className="text-sm font-semibold text-[#0A66C2]">
                  Dia {progresso.diasTreinados}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#0A66C2] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(progresso.diasTreinados / 30) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Trilhas Concluídas */}
        {trilhasConcluidas.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-[#2B2F36]">Trilhas em Andamento</h2>
            </div>
            <div className="space-y-4">
              {trilhasConcluidas.map((trilha, index) => (
                <div key={index} className="border-l-4 border-[#0A66C2] pl-4">
                  <h3 className="font-semibold text-[#2B2F36] mb-2">{trilha.nome}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      {trilha.dias} de {trilha.total} dias
                    </span>
                    <span className="text-sm font-semibold text-[#0A66C2]">
                      {Math.round((trilha.dias / trilha.total) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#0A66C2] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(trilha.dias / trilha.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recomendações */}
        <div className="bg-gradient-to-br from-[#0A66C2] to-[#186FEC] rounded-2xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-6 h-6" />
            <h2 className="text-xl font-bold">Recomendação</h2>
          </div>
          <p className="text-white/90 leading-relaxed mb-4">
            {getRecomendacao()}
          </p>
          {totalDias >= 7 && (
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-sm text-white/80">
                💡 <strong>Dica:</strong> Mantenha a regularidade. Treinar 3-4 vezes por semana é mais eficaz que treinar todos os dias e depois parar.
              </p>
            </div>
          )}
        </div>

        {/* Conquistas */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-[#2B2F36]">Conquistas</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ConquistaCard
              titulo="Primeira Semana"
              descricao="Complete 7 dias"
              conquistada={totalDias >= 7}
            />
            <ConquistaCard
              titulo="Consistente"
              descricao="Complete 14 dias"
              conquistada={totalDias >= 14}
            />
            <ConquistaCard
              titulo="Determinado"
              descricao="Complete 21 dias"
              conquistada={totalDias >= 21}
            />
            <ConquistaCard
              titulo="Campeão"
              descricao="Complete 30 dias"
              conquistada={totalDias >= 30}
            />
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push('/')}
          className="w-full bg-[#0A66C2] hover:bg-[#186FEC] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300"
        >
          Voltar ao início
        </button>
      </main>
    </div>
  );
}

function ConquistaCard({ titulo, descricao, conquistada }: { titulo: string; descricao: string; conquistada: boolean }) {
  return (
    <div className={`rounded-xl p-4 border-2 transition-all duration-300 ${
      conquistada 
        ? 'bg-yellow-50 border-yellow-400' 
        : 'bg-gray-50 border-gray-200 opacity-50'
    }`}>
      <div className="text-center">
        <div className={`text-3xl mb-2 ${conquistada ? '' : 'grayscale'}`}>
          {conquistada ? '🏆' : '🔒'}
        </div>
        <h3 className={`font-bold text-sm mb-1 ${conquistada ? 'text-yellow-900' : 'text-gray-600'}`}>
          {titulo}
        </h3>
        <p className={`text-xs ${conquistada ? 'text-yellow-700' : 'text-gray-500'}`}>
          {descricao}
        </p>
      </div>
    </div>
  );
}
