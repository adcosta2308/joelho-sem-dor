'use client';

import { Check, Crown, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/custom/navigation';
import { useAppStore } from '@/lib/store';

export default function PremiumPage() {
  const router = useRouter();
  const setPremium = useAppStore((state) => state.setPremium);

  const beneficios = [
    'Trilhas completas de 30 dias',
    'Aulas exclusivas sobre saúde do joelho',
    'Progresso guiado e personalizado',
    'Ajuste automático de intensidade',
    'Planos para diferentes objetivos',
    'Suporte prioritário',
    'Novos conteúdos toda semana',
    'Sem anúncios',
  ];

  const handleAssinar = () => {
    setPremium(true);
    router.push('/trilhas');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pb-24">
      <Navigation />
      
      {/* Header */}
      <header className="bg-gradient-to-br from-amber-500 to-orange-500 text-white pt-12 pb-16 px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <Crown className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Joelho Sem Dor Premium</h1>
          <p className="text-white/90 text-lg">Desbloqueie seu novo joelho</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-8">
        {/* Plano Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6">
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white p-8 text-center">
            <Sparkles className="w-8 h-8 mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-2">Plano Premium</h2>
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-5xl font-bold">R$ 29</span>
              <span className="text-xl text-white/80">/mês</span>
            </div>
            <p className="text-sm text-white/80">Cancele quando quiser</p>
          </div>

          <div className="p-8">
            <h3 className="font-bold text-[#1C1C1C] mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-[#2F66F2]" />
              O que você ganha:
            </h3>
            
            <ul className="space-y-3 mb-8">
              {beneficios.map((beneficio, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#2F66F2]/10 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#2F66F2]" />
                  </div>
                  <span className="text-gray-700">{beneficio}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleAssinar}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <Crown className="w-5 h-5" />
              Assinar Premium
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Pagamento seguro • Cancele quando quiser
            </p>
          </div>
        </div>

        {/* Comparação */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="font-bold text-[#1C1C1C] mb-4">Gratuito vs Premium</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-700">Avaliação inteligente</span>
              <div className="flex gap-8">
                <Check className="w-5 h-5 text-[#2F66F2]" />
                <Check className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-700">Plano de 7 dias</span>
              <div className="flex gap-8">
                <Check className="w-5 h-5 text-[#2F66F2]" />
                <Check className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-700">Trilhas completas</span>
              <div className="flex gap-8">
                <span className="w-5 h-5 text-gray-300">—</span>
                <Check className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-700">Aulas exclusivas</span>
              <div className="flex gap-8">
                <span className="w-5 h-5 text-gray-300">—</span>
                <Check className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-700">Ajuste de intensidade</span>
              <div className="flex gap-8">
                <span className="w-5 h-5 text-gray-300">—</span>
                <Check className="w-5 h-5 text-amber-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Depoimentos */}
        <div className="bg-gradient-to-br from-[#2F66F2]/5 to-[#70CFFF]/5 rounded-2xl p-6">
          <h3 className="font-bold text-[#1C1C1C] mb-4">O que dizem nossos usuários</h3>
          
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-500">
                  {'⭐'.repeat(5)}
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                "Em 2 semanas minha dor reduziu 70%. Finalmente consigo subir escada sem medo!"
              </p>
              <p className="text-xs text-gray-500">— Maria, 42 anos</p>
            </div>
            
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-500">
                  {'⭐'.repeat(5)}
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                "Voltei a correr depois de 1 ano parado. O programa é incrível!"
              </p>
              <p className="text-xs text-gray-500">— João, 35 anos</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
