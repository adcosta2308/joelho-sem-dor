'use client';

import { AlertCircle, Play, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/custom/navigation';

export default function CrisePage() {
  const router = useRouter();

  const passos = [
    {
      id: 1,
      titulo: 'Mobilidade Leve',
      duracao: '3 min',
      descricao: 'Movimentos suaves para reduzir tensão',
      instrucoes: [
        'Deite-se de costas',
        'Flexione e estenda o joelho lentamente',
        'Faça círculos suaves com o tornozelo',
        'Respire profundamente',
      ],
      icon: '🔄',
    },
    {
      id: 2,
      titulo: 'Posição para Aliviar',
      duracao: '5-10 min',
      descricao: 'Postura que reduz pressão no joelho',
      instrucoes: [
        'Deite-se de costas',
        'Coloque uma almofada sob o joelho',
        'Mantenha a perna levemente elevada',
        'Relaxe completamente',
      ],
      icon: '🛏️',
    },
    {
      id: 3,
      titulo: 'O que Evitar Hoje',
      duracao: 'Até melhorar',
      descricao: 'Atividades que podem piorar',
      instrucoes: [
        'Evite escadas (use elevador)',
        'Não agache ou ajoelhe',
        'Evite ficar muito tempo em pé',
        'Não force movimentos que doem',
      ],
      icon: '⚠️',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2F4F7] pb-24">
      <Navigation />
      
      {/* Header */}
      <header className="bg-gradient-to-br from-red-500 to-orange-500 text-white pt-12 pb-8 px-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Plano de Crise</h1>
          </div>
          <p className="text-white/90">Dor aumentou? Respira. Vamos aliviar com segurança.</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-4">
        {/* Alerta */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-red-500">
          <h2 className="text-lg font-bold text-[#1C1C1C] mb-2">Isso faz parte do processo</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Crises de dor podem acontecer durante a recuperação. O importante é não entrar em pânico e seguir os passos abaixo para aliviar com segurança.
          </p>
        </div>

        {/* Passos */}
        <div className="space-y-4 mb-6">
          {passos.map((passo, index) => (
            <div key={passo.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{passo.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">Passo {passo.id}: {passo.titulo}</h3>
                    <p className="text-sm text-white/80">{passo.duracao}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{passo.descricao}</p>
                
                <div className="bg-[#F2F4F7] rounded-xl p-4">
                  <h4 className="font-semibold text-[#1C1C1C] mb-3 text-sm">Como fazer:</h4>
                  <ul className="space-y-2">
                    {passo.instrucoes.map((instrucao, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#2F66F2] flex-shrink-0 mt-0.5" />
                        <span>{instrucao}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quando procurar ajuda */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
          <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Quando procurar ajuda médica
          </h3>
          <ul className="space-y-2 text-sm text-red-800">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Dor intensa que não melhora com repouso</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Inchaço significativo ou vermelhidão</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Impossibilidade de apoiar o peso na perna</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Febre ou sinais de infecção</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <button
            onClick={() => router.push('/progresso')}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Aplicar plano agora
          </button>
          
          <button
            onClick={() => router.push('/aulas')}
            className="w-full bg-white border-2 border-gray-200 hover:border-[#2F66F2] text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all"
          >
            Ver aulas sobre dor
          </button>
        </div>

        {/* Mensagem de apoio */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 leading-relaxed">
            💙 Lembre-se: crises são temporárias. Com paciência e cuidado, você vai superar isso.
          </p>
        </div>
      </main>
    </div>
  );
}
