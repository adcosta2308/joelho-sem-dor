'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { getSession } from '@/lib/auth-helpers';

export default function OnboardingPage() {
  const router = useRouter();
  const { setOnboardingCompleto, isAuthenticated } = useAppStore();
  const [etapa, setEtapa] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se usuário está logado
    const checkAuth = async () => {
      const session = await getSession();
      setLoading(false);
    };
    checkAuth();
  }, []);

  const avancar = () => {
    if (etapa < 3) {
      setEtapa(etapa + 1);
    } else {
      // Finalizar onboarding
      handleComecarAvaliacao();
    }
  };

  const handleComecarAvaliacao = async () => {
    setOnboardingCompleto(true);
    
    // Verificar se usuário está logado
    const session = await getSession();
    
    if (session) {
      // Logado - vai direto para o quiz
      router.push('/quiz');
    } else {
      // Não logado - vai para login
      router.push('/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#36C2FF]/10 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0A66C2] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#36C2FF]/10 to-white">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0A66C2] to-[#186FEC] text-white pt-12 pb-8 px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/f090dccd-192c-4ce3-8da1-1e81b091548c.png" 
              alt="Orthoxis Logo" 
              className="h-10 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold">Orthoxis</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-12">
        {/* Indicadores de progresso */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`h-2 rounded-full transition-all duration-300 ${
                num === etapa ? 'w-8 bg-[#0A66C2]' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Conteúdo das etapas */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {etapa === 1 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-[#36C2FF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🦵</span>
              </div>
              <h2 className="text-2xl font-bold text-[#2B2F36] mb-4">
                Você sente dor no joelho?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Vamos ajudar você a identificar a causa e criar um plano personalizado de recuperação.
              </p>
            </div>
          )}

          {etapa === 2 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-[#36C2FF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-[#2B2F36] mb-4">
                Descubra a causa
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Receba um plano de exercícios feito especialmente para o seu tipo de dor e nível de atividade.
              </p>
            </div>
          )}

          {etapa === 3 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-[#36C2FF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">⚡</span>
              </div>
              <h2 className="text-2xl font-bold text-[#2B2F36] mb-4">
                Comece sua avaliação gratuita
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Em menos de 2 minutos você terá seu diagnóstico funcional e trilha personalizada.
              </p>
            </div>
          )}

          <button
            onClick={avancar}
            className="w-full bg-[#0A66C2] hover:bg-[#186FEC] text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
          >
            {etapa === 3 ? 'Começar avaliação' : 'Continuar'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Link para pular */}
        <button
          onClick={handleComecarAvaliacao}
          className="w-full text-center text-gray-600 hover:text-gray-800 font-medium"
        >
          Pular introdução
        </button>
      </main>
    </div>
  );
}
