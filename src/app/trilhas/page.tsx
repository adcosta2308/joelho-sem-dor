'use client';

import { useRouter } from 'next/navigation';
import { Lock, Clock, TrendingUp, Target } from 'lucide-react';
import Navigation from '@/components/custom/navigation';
import { useAppStore } from '@/lib/store';

export default function TrilhasPage() {
  const router = useRouter();
  const isPremium = useAppStore((state) => state.isPremium);

  const trilhas = [
    {
      id: 'condromalacia',
      nome: 'Condromalácia',
      descricao: 'Programa completo para fortalecer e aliviar dor na patela',
      duracao: '30 dias',
      nivel: 'Iniciante',
      premium: false,
      icon: '🎯',
      cor: 'from-[#2F66F2] to-[#70CFFF]',
    },
    {
      id: 'agachar',
      nome: 'Dor ao Agachar',
      descricao: 'Recupere a capacidade de agachar sem dor',
      duracao: '21 dias',
      nivel: 'Iniciante',
      premium: true,
      icon: '💪',
      cor: 'from-purple-500 to-pink-500',
    },
    {
      id: 'escada',
      nome: 'Dor na Escada',
      descricao: 'Suba e desça escadas com confiança',
      duracao: '21 dias',
      nivel: 'Iniciante',
      premium: true,
      icon: '🪜',
      cor: 'from-orange-500 to-red-500',
    },
    {
      id: 'sobrepeso',
      nome: 'Sobrepeso + Joelho',
      descricao: 'Exercícios adaptados para proteger suas articulações',
      duracao: '30 dias',
      nivel: 'Iniciante',
      premium: true,
      icon: '⚖️',
      cor: 'from-green-500 to-teal-500',
    },
    {
      id: 'volta-treinos',
      nome: 'Volta aos Treinos',
      descricao: 'Retorne à academia com segurança',
      duracao: '28 dias',
      nivel: 'Intermediário',
      premium: true,
      icon: '🏋️',
      cor: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'corrida',
      nome: 'Corrida Iniciante',
      descricao: 'Prepare seu joelho para correr sem dor',
      duracao: '30 dias',
      nivel: 'Intermediário',
      premium: true,
      icon: '🏃',
      cor: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2F4F7] pb-24">
      <Navigation />
      
      {/* Header */}
      <header className="bg-gradient-to-br from-[#2F66F2] to-[#70CFFF] text-white pt-12 pb-8 px-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2">Trilhas de 30 Dias</h1>
          <p className="text-white/80">Programas completos para diferentes objetivos</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-4">
        <div className="space-y-4">
          {trilhas.map((trilha) => {
            const bloqueado = trilha.premium && !isPremium;
            
            return (
              <div
                key={trilha.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  bloqueado ? 'opacity-75' : 'hover:shadow-xl'
                } transition-all`}
              >
                <div className={`h-2 bg-gradient-to-r ${trilha.cor}`} />
                
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 bg-gradient-to-br ${trilha.cor} rounded-xl flex items-center justify-center text-2xl`}>
                        {trilha.icon}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-[#1C1C1C]">{trilha.nome}</h3>
                        {bloqueado && (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">{trilha.descricao}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{trilha.duracao}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{trilha.nivel}</span>
                        </div>
                      </div>
                      
                      {bloqueado ? (
                        <button
                          onClick={() => router.push('/premium')}
                          className="mt-4 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                          <Lock className="w-4 h-4" />
                          Desbloquear com Premium
                        </button>
                      ) : (
                        <button
                          onClick={() => router.push('/plano')}
                          className={`mt-4 w-full bg-gradient-to-r ${trilha.cor} hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl transition-all`}
                        >
                          Iniciar trilha
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Premium */}
        {!isPremium && (
          <div className="mt-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Desbloqueie todas as trilhas</h3>
            <p className="text-white/90 mb-4">
              Acesse programas exclusivos e acelere seus resultados
            </p>
            <button
              onClick={() => router.push('/premium')}
              className="w-full bg-white text-orange-600 font-semibold py-3 px-6 rounded-xl hover:bg-white/90 transition-colors"
            >
              Ver planos Premium
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
