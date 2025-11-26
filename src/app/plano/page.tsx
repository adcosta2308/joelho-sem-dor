'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
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
      descricao: 'Libere a articulação e reduza a rigidez em poucos minutos.',
      icon: '🔄',
    },
    {
      id: '2',
      nome: 'Fortalecimento do Quadríceps',
      tipo: 'Força',
      duracao: '5 min',
      descricao: 'Ative o músculo que mais protege seu joelho.',
      icon: '💪',
    },
    {
      id: '3',
      nome: 'Alongamento Posterior',
      tipo: 'Alongamento',
      duracao: '4 min',
      descricao: 'Relaxamento da cadeia posterior para aliviar pressão no joelho.',
      icon: '🧘',
    },
    {
      id: '4',
      nome: 'Aula educativa',
      tipo: 'Educativo',
      duracao: '2 min',
      descricao: 'Entenda por que seu joelho dói e o que melhora.',
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
          <p className="text-[#70CFFF]">Vamos começar com uma rotina leve e eficaz para reduzir sua dor já no primeiro dia.</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-4">
        {/* Progresso - Box Motivador */}
        <div className="bg-gradient-to-br from-[#2F66F2] to-[#1e4fd9] rounded-2xl shadow-lg p-6 mb-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-2xl font-bold">Dia 1 de 7 — Excelente!</h2>
              <p className="text-[#70CFFF] text-sm mt-1">Esse é o seu primeiro passo para o alívio.</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">0%</div>
              <p className="text-xs text-white/70">Concluído</p>
            </div>
          </div>
          
          <div className="bg-white/20 rounded-full h-2.5 mt-4">
            <div className="bg-white rounded-full h-2.5 w-0 transition-all duration-300" />
          </div>
        </div>

        {/* Exercícios do Dia */}
        <div className="mb-4">
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

        {/* Tempo Total */}
        <div className="bg-[#70CFFF]/10 rounded-xl p-4 mb-6 flex items-center justify-center gap-2">
          <Clock className="w-5 h-5 text-[#2F66F2]" />
          <p className="text-sm font-medium text-[#1C1C1C]">
            Tempo total estimado do treino: <span className="font-bold text-[#2F66F2]">12 minutos</span>
          </p>
        </div>

        {/* CTA Principal - Maior e com mais contraste */}
        <button
          onClick={() => router.push('/treino')}
          className="w-full bg-[#2F66F2] hover:bg-[#1e4fd9] text-white font-bold text-lg py-5 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl mb-4"
        >
          <Play className="w-6 h-6" />
          Iniciar treino do dia
        </button>

        {/* Botão de Acesso Rápido - Plano de Crise */}
        <button
          onClick={() => router.push('/crise')}
          className="w-full bg-white hover:bg-gray-50 text-[#2F66F2] font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md border border-[#2F66F2]/20 mb-8"
        >
          <AlertCircle className="w-5 h-5" />
          Dor aumentou? Abrir Plano de Crise
        </button>

        {/* Calendário Semanal - Melhorado */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="font-bold text-[#1C1C1C] mb-4">Sua Semana</h3>
          <div className="grid grid-cols-7 gap-2 mb-3">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((dia, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-2 font-medium">{dia}</div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  index === 0 
                    ? 'bg-[#2F66F2] text-white ring-4 ring-[#2F66F2]/20 scale-110' 
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}>
                  {index === 0 ? (
                    <span className="font-bold">1</span>
                  ) : (
                    index + 1
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 mt-4 italic">
            Avance no seu ritmo. Cada dia conta!
          </p>
        </div>

        {/* Dicas do Dia */}
        <div className="bg-gradient-to-br from-[#70CFFF]/20 to-[#2F66F2]/20 rounded-2xl p-6">
          <h3 className="font-bold text-[#1C1C1C] mb-3 flex items-center gap-2">
            💡 Dica do Dia
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Faça os exercícios no seu ritmo. Se sentir dor aguda, pare e descanse. O objetivo é fortalecer sem agredir o joelho.
          </p>
        </div>
      </main>
    </div>
  );
}
