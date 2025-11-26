'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, Calendar, Target, ArrowRight } from 'lucide-react';
import Navigation from '@/components/custom/navigation';
import { useAppStore } from '@/lib/store';

export default function ProgressoPage() {
  const router = useRouter();
  const progresso = useAppStore((state) => state.progresso);
  const setProgresso = useAppStore((state) => state.setProgresso);
  const [dorDoDia, setDorDoDia] = useState(progresso.dorDoDia);

  const handleSalvarDor = () => {
    setProgresso({ dorDoDia });
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7] pb-24">
      <Navigation />
      
      {/* Header */}
      <header className="bg-gradient-to-br from-[#2F66F2] to-[#70CFFF] text-white pt-12 pb-8 px-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2">Seu Progresso</h1>
          <p className="text-white/80">Cada treino conta. Continue assim!</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-4">
        {/* Dor do Dia */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-[#1C1C1C] mb-4">Como está sua dor hoje?</h2>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Sem dor</span>
              <span className="text-3xl font-bold text-[#2F66F2]">{dorDoDia}</span>
              <span>Dor máxima</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={dorDoDia}
              onChange={(e) => setDorDoDia(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2F66F2]"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <span key={num}>{num}</span>
              ))}
            </div>
          </div>

          <button
            onClick={handleSalvarDor}
            className="w-full bg-[#2F66F2] hover:bg-[#2557d6] text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Salvar registro
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#2F66F2]/10 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#2F66F2]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1C1C1C]">{progresso.diasTreinados}</div>
                <div className="text-xs text-gray-600">Dias treinados</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#70CFFF]/20 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-[#2F66F2]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1C1C1C]">{progresso.semana}</div>
                <div className="text-xs text-gray-600">Semana atual</div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de Evolução */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-[#1C1C1C] mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#2F66F2]" />
            Evolução da Dor
          </h3>
          
          <div className="h-48 flex items-end justify-between gap-2 mb-4">
            {[7, 6, 6, 5, 4, 4, 3].map((valor, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-[#2F66F2]/20 rounded-t-lg relative" style={{ height: `${(valor / 10) * 100}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2F66F2] to-[#70CFFF] rounded-t-lg" />
                </div>
                <span className="text-xs text-gray-500">D{index + 1}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#70CFFF]/10 rounded-xl p-4">
            <p className="text-sm text-gray-700">
              <strong className="text-[#2F66F2]">Ótimo progresso!</strong> Sua dor reduziu 57% desde o início.
            </p>
          </div>
        </div>

        {/* Trilha Atual */}
        <div className="bg-gradient-to-br from-[#2F66F2] to-[#70CFFF] rounded-2xl shadow-lg p-6 text-white mb-6">
          <h3 className="text-lg font-bold mb-2">Trilha Atual</h3>
          <p className="text-xl font-semibold mb-4">{progresso.trilhaAtual}</p>
          
          <div className="bg-white/20 rounded-full h-2 mb-2">
            <div className="bg-white rounded-full h-2" style={{ width: '43%' }} />
          </div>
          <p className="text-sm text-white/80">43% concluído • 17 dias restantes</p>
          
          <button
            onClick={() => router.push('/trilhas')}
            className="mt-4 w-full bg-white text-[#2F66F2] font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
          >
            Continuar trilha
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Conquistas */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-[#1C1C1C] mb-4">Conquistas</h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { emoji: '🎯', nome: 'Primeiro treino', ativo: true },
              { emoji: '🔥', nome: '3 dias seguidos', ativo: true },
              { emoji: '💪', nome: '7 dias', ativo: false },
              { emoji: '⭐', nome: '30 dias', ativo: false },
            ].map((conquista, index) => (
              <div key={index} className="text-center">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-2 ${
                  conquista.ativo ? 'bg-[#2F66F2]/10' : 'bg-gray-100'
                }`}>
                  {conquista.emoji}
                </div>
                <p className={`text-xs ${conquista.ativo ? 'text-gray-700' : 'text-gray-400'}`}>
                  {conquista.nome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
