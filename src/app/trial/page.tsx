'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, Sparkles, Calendar, Dumbbell, Video, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { useAppStore } from '@/lib/store';

export default function TrialPage() {
  const router = useRouter();
  const { ativarTrial, trilhaRecomendada } = useAppStore();

  const beneficios = [
    {
      icon: <Dumbbell className="w-6 h-6" />,
      titulo: 'Treinos Personalizados',
      descricao: 'Exercícios adaptados ao seu nível e condição do joelho',
    },
    {
      icon: <Video className="w-6 h-6" />,
      titulo: 'Aulas Rápidas',
      descricao: 'Vídeos curtos e práticos para fazer em qualquer lugar',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      titulo: 'Acompanhamento Diário',
      descricao: 'Monitore seu progresso e veja sua evolução',
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      titulo: 'Trilha Completa',
      descricao: 'Acesso total à trilha recomendada para você',
    },
  ];

  const handleAtivarTrial = () => {
    ativarTrial();
    router.push('/assinatura');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A66C2]/5 to-white pb-6">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0A66C2] to-[#186FEC] text-white pt-12 pb-16 px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Comece agora seu período gratuito de 7 dias</h1>
          <p className="text-white/90 text-base leading-relaxed">
            Experimente todos os recursos sem compromisso
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-8">
        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/2fd8a863-c8a1-4df9-b664-fde628c8aef4.png"
              alt="Orthoxis"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          {/* Descrição */}
          <div className="text-center mb-8">
            <p className="text-gray-700 text-base leading-relaxed">
              Você terá acesso a <strong>treinos personalizados</strong>, <strong>aulas rápidas</strong>, 
              <strong> acompanhamento</strong> e toda a <strong>trilha recomendada</strong>.
            </p>
            <p className="text-gray-600 text-sm mt-4">
              Ao final do período gratuito, sua assinatura será ativada automaticamente — mas você pode cancelar quando quiser.
            </p>
          </div>

          {/* Benefícios */}
          <div className="space-y-4 mb-8">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="flex gap-4 p-4 bg-gradient-to-r from-[#0A66C2]/5 to-[#186FEC]/5 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0A66C2] to-[#186FEC] rounded-lg flex items-center justify-center text-white">
                    {beneficio.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#2B2F36] mb-1">{beneficio.titulo}</h3>
                  <p className="text-sm text-gray-600">{beneficio.descricao}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Destaque do Trial */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-green-900 mb-2">7 dias completamente grátis</h3>
                <p className="text-sm text-green-800 leading-relaxed">
                  Teste todos os recursos sem custo. Cancele a qualquer momento durante o período gratuito e não será cobrado nada.
                </p>
              </div>
            </div>
          </div>

          {/* Lista de Garantias */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-[#0A66C2] flex-shrink-0" />
              <span>Acesso imediato a todos os treinos</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-[#0A66C2] flex-shrink-0" />
              <span>Sem compromisso, cancele quando quiser</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-[#0A66C2] flex-shrink-0" />
              <span>Suporte dedicado durante todo o período</span>
            </div>
          </div>
        </div>

        {/* CTA Principal */}
        <button
          onClick={handleAtivarTrial}
          className="w-full bg-gradient-to-r from-[#0A66C2] to-[#186FEC] hover:opacity-90 text-white font-bold py-5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg mb-4"
        >
          Ativar período gratuito
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Informações Adicionais */}
        <div className="text-center">
          <p className="text-xs text-gray-500 px-4 leading-relaxed">
            Após os 7 dias gratuitos, a assinatura será renovada automaticamente por R$ 29,90/mês. 
            Você pode cancelar a qualquer momento nas configurações da sua conta.
          </p>
        </div>
      </main>
    </div>
  );
}
