'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, Crown, Calendar, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useAppStore } from '@/lib/store';
import { updateProfile } from '@/lib/auth-helpers';

export default function AssinaturaPage() {
  const router = useRouter();
  const { isPremium, trilhaRecomendada, verificarTrial, diasRestantesTrial, userId, ativarTrial } = useAppStore();

  const trialAtivo = verificarTrial();
  const diasRestantes = diasRestantesTrial();
  const premiumPago = isPremium && !trialAtivo;

  const handleIniciarTrilha = () => {
    // Se tem trilha recomendada, vai direto para ela começando pelo Dia 1
    if (trilhaRecomendada) {
      router.push(`/trilhas/${trilhaRecomendada}/dia/1`);
    } else {
      // Senão, vai para a página de trilhas
      router.push('/trilhas');
    }
  };

  const handleExplorarTrilhas = () => {
    router.push('/trilhas');
  };

  const handleComecarTrial = async () => {
    // Ativa o trial no store
    ativarTrial();
    
    // Salva no Supabase se usuário estiver logado
    if (userId) {
      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 7);
      
      await updateProfile(userId, {
        plano: 'free_trial',
        trialAtivo: true,
        dataInicioTrial: new Date().toISOString(),
        trialEndsAt: trialEndsAt.toISOString(),
      });
    }
    
    // Redireciona para a trilha recomendada (Dia 1)
    if (trilhaRecomendada) {
      router.push(`/trilhas/${trilhaRecomendada}/dia/1`);
    } else {
      router.push('/trilhas');
    }
  };

  const beneficiosInclusos = [
    'Acesso a todas as trilhas de exercícios',
    'Aulas rápidas ilimitadas',
    'Acompanhamento diário do progresso',
    'Novos treinos adicionados mensalmente',
    'Suporte prioritário',
    'Sem anúncios',
  ];

  // ESTADO 1: TRIAL ATIVO (período de 7 dias iniciado)
  if (trialAtivo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-6">
        {/* Header */}
        <header className="bg-gradient-to-br from-[#0A66C2] to-[#186FEC] text-white pt-12 pb-16 px-6">
          <div className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Crown className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Você agora é Orthoxis Premium!</h1>
            <p className="text-white/90">Seu período gratuito de 7 dias está ativo.</p>
          </div>
        </header>

        <main className="max-w-md mx-auto px-6 -mt-8">
          {/* Card de Status do Trial */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">7 dias gratuitos ativos</h2>
                <p className="text-white/90 text-sm">
                  {diasRestantes} {diasRestantes === 1 ? 'dia restante' : 'dias restantes'}
                </p>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Período de teste até:</span>
              </div>
              <p className="text-2xl font-bold">
                {new Date(Date.now() + diasRestantes * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* CTA Principal */}
          <button
            onClick={handleIniciarTrilha}
            className="w-full bg-gradient-to-r from-[#0A66C2] to-[#186FEC] hover:opacity-90 text-white font-bold py-5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg mb-4"
          >
            Começar minha trilha recomendada
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 text-center px-4">
            Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
          </p>
        </main>
      </div>
    );
  }

  // ESTADO 2: PREMIUM PAGO (assinatura ativa)
  if (premiumPago) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-6">
        {/* Header */}
        <header className="bg-gradient-to-br from-[#0A66C2] to-[#186FEC] text-white pt-12 pb-16 px-6">
          <div className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Crown className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Sua assinatura Orthoxis Premium está ativa!</h1>
            <p className="text-white/90">Aproveite acesso total a todas as trilhas e aulas.</p>
          </div>
        </header>

        <main className="max-w-md mx-auto px-6 -mt-8">
          {/* CTA Principal */}
          <button
            onClick={handleExplorarTrilhas}
            className="w-full bg-gradient-to-r from-[#0A66C2] to-[#186FEC] hover:opacity-90 text-white font-bold py-5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg mb-4"
          >
            Explorar trilhas Premium
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 text-center px-4">
            Gerencie sua assinatura nas configurações da conta
          </p>
        </main>
      </div>
    );
  }

  // ESTADO 3: PAYWALL (antes de assinar)
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-6">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0A66C2] to-[#186FEC] text-white pt-12 pb-16 px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <Crown className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Orthoxis Premium</h1>
          <p className="text-white/90">Comece sua jornada agora</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-8">
        {/* Card Principal da Assinatura */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="h-2 bg-gradient-to-r from-[#0A66C2] to-[#186FEC]" />
          
          <div className="p-8">
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

            {/* Nome do Plano */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0A66C2] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Crown className="w-4 h-4" />
                Orthoxis Premium
              </div>
              <div className="mb-4">
                <span className="text-5xl font-bold text-[#2B2F36]">R$ 29,90</span>
                <span className="text-gray-600 text-lg">/mês</span>
              </div>
              <p className="text-sm text-gray-600">
                Acesso total imediato
              </p>
            </div>

            {/* O que está incluído */}
            <div className="mb-8">
              <h3 className="font-bold text-[#2B2F36] mb-4 text-lg">O que está incluído:</h3>
              <ul className="space-y-3">
                {beneficiosInclusos.map((beneficio, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm leading-relaxed">{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Informações Importantes */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2 text-sm">Informações importantes:</h4>
              <ul className="space-y-2 text-xs text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Acesso imediato a todos os recursos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Cancele a qualquer momento</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Renovação automática mensal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Gerencie sua assinatura nas configurações da conta</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Principal */}
        <button
          onClick={handleComecarTrial}
          className="w-full bg-gradient-to-r from-[#0A66C2] to-[#186FEC] hover:opacity-90 text-white font-bold py-5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg mb-4"
        >
          Começar 7 dias grátis
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 text-center px-4">
          Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
        </p>
      </main>
    </div>
  );
}
