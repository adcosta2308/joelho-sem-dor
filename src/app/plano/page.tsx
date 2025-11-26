'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/custom/navigation';

export default function PlanoPage() {
  const router = useRouter();

  const exercicios = [
    {
      id: '1',
      nome: 'Mobilidade do Joelho',
      tipo: 'Aquecimento',
      duracao: '3 min',
      descricao: 'Movimentos suaves para preparar a articulação',
      icon: '🔄',
    },
    {
      id: '2',
      nome: 'Fortalecimento do Quadríceps',
      tipo: 'Força',
      duracao: '5 min',
      descricao: 'Exercício isométrico sem impacto',
      icon: '💪',
    },
    {
      id: '3',
      nome: 'Alongamento Posterior',
      tipo: 'Alongamento',
      duracao: '4 min',
      descricao: 'Relaxamento da cadeia posterior',
      icon: '🧘',
    },
    {
      id: '4',
      nome: 'Por que seu joelho dói?',
      tipo: 'Educativo',
      duracao: '2 min',
      descricao: 'Entenda a causa da dor',
      icon: '📚',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2F4F7] pb-24">
      <Navigation />
      
      {/* Header */}
      <header className="bg-[#2F66F2] text-white pt-12 pb-8 px-6">
        <div className="max-w-md mx-auto">
          <Link href="/resultado" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <h1 className="text-3xl font-bold mb-2">Plano de 7 Dias</h1>
          <p className="text-[#70CFFF]">Vamos começar com uma rotina leve e eficaz para reduzir sua dor.</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-4">
        {/* Progresso */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#1C1C1C]">Dia 1 de 7</h2>
              <p className="text-sm text-gray-600">Seu primeiro passo para o alívio</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#2F66F2]">0%</div>
              <p className="text-xs text-gray-500">Concluído</p>
            </div>
          </div>
          
          <div className="bg-gray-200 rounded-full h-2">
            <div className="bg-[#2F66F2] rounded-full h-2 w-0 transition-all duration-300" />
          </div>
        </div>

        {/* Exercícios do Dia */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-[#1C1C1C] mb-4 px-1">Exercícios de Hoje</h3>
          <div className="space-y-3">
            {exercicios.map((exercicio, index) => (
              <div
                key={exercicio.id}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#2F66F2]/10 rounded-full flex items-center justify-center text-2xl">
                      {exercicio.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-[#1C1C1C]">{exercicio.nome}</h4>
                      <span className="text-xs bg-[#70CFFF]/20 text-[#2F66F2] px-2 py-1 rounded-full font-medium">
                        {exercicio.tipo}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{exercicio.descricao}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{exercicio.duracao}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dicas do Dia */}
        <div className="bg-gradient-to-br from-[#70CFFF]/20 to-[#2F66F2]/20 rounded-2xl p-6 mb-6">
          <h3 className="font-bold text-[#1C1C1C] mb-3 flex items-center gap-2">
            💡 Dica do Dia
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Faça os exercícios no seu ritmo. Se sentir dor aguda, pare e descanse. O objetivo é fortalecer sem agredir o joelho.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push('/treino')}
          className="w-full bg-[#2F66F2] hover:bg-[#2557d6] text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-md"
        >
          <Play className="w-5 h-5" />
          Iniciar treino do dia
        </button>

        {/* Calendário Semanal */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-[#1C1C1C] mb-4">Sua Semana</h3>
          <div className="grid grid-cols-7 gap-2">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((dia, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{dia}</div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  index === 0 
                    ? 'bg-[#2F66F2] text-white' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
