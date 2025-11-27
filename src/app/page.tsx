'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Heart, Activity, BookOpen, LineChart, Play, Calendar, TrendingUp, User, Dumbbell, Brain, Target } from 'lucide-react';
import Navigation from '@/components/custom/navigation';
import { useAppStore } from '@/lib/store';
import { getCurrentUser, getProfile, signInWithGoogle } from '@/lib/auth-helpers';
import type { Profile } from '@/lib/supabase';

export default function Home() {
  const router = useRouter();
  const { progresso, profile, setProfile } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [mostrarRetorno, setMostrarRetorno] = useState(false);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    loadUserData();
    
    // Verificar se usuário está inativo (última visita > 3 dias)
    const ultimaVisita = localStorage.getItem('ultima-visita');
    if (ultimaVisita) {
      const diasInativos = Math.floor((Date.now() - parseInt(ultimaVisita)) / (1000 * 60 * 60 * 24));
      if (diasInativos >= 3 && progresso.diasTreinados > 0) {
        setMostrarRetorno(true);
      }
    }
    localStorage.setItem('ultima-visita', Date.now().toString());
  }, []);

  const loadUserData = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        const profileData = await getProfile(user.id);
        if (profileData) {
          setUserProfile(profileData);
          // Sincronizar com store local
          setProfile({
            nome: profileData.nome,
            email: profileData.email,
            dorAtual: profile.dorAtual,
            objetivo: profile.objetivo,
          });
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const temProgresso = mounted && progresso.diasTreinados > 0;
  const proximoDia = progresso.diasTreinados + 1;

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

  const getSlugTrilha = (nome: string) => {
    const slugs: Record<string, string> = {
      'Condromalácia': 'condromalacia',
      'Dor ao Agachar': 'agachar',
      'Dor ao Subir e Descer Escadas': 'escadas',
      'Sobrepeso + Joelho': 'sobrepeso-joelho',
      'Volta aos Treinos': 'volta-treinos',
      'Corrida Iniciante': 'corrida-iniciante',
    };
    return slugs[nome] || 'condromalacia';
  };

  const continuarTreino = () => {
    const slug = getSlugTrilha(progresso.trilhaAtual);
    router.push(`/trilhas/${slug}/dia/${proximoDia}`);
  };

  const retornarTreino = () => {
    setMostrarRetorno(false);
    continuarTreino();
  };

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#36C2FF]/10 to-white pb-24">
      <Navigation />
      
      {/* Header - Refinado com logo maior e melhor posicionamento */}
      <header className="bg-gradient-to-br from-[#0A66C2] to-[#186FEC] text-white pt-10 pb-14 px-6">
        <div className="max-w-md mx-auto flex flex-col items-center justify-center">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/2fd8a863-c8a1-4df9-b664-fde628c8aef4.png" 
              alt="Orthoxis Logo" 
              className="h-20 w-auto sm:h-24"
            />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-2">Orthoxis</h1>
          <p className="text-white text-lg sm:text-xl font-medium text-center">
            {userProfile ? `Olá, ${userProfile.nome}!` : temProgresso ? `Olá${profile.nome ? `, ${profile.nome}` : ''}!` : 'Seu joelho livre começa aqui'}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 -mt-6">
        {/* Modal de Retorno */}
        {mostrarRetorno && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full">
              <h3 className="text-xl font-bold text-[#2B2F36] mb-3">
                Que bom ter você de volta!
              </h3>
              <p className="text-gray-600 mb-6">
                Você parou no Dia {progresso.diasTreinados}. Deseja retomar de onde parou?
              </p>
              <div className="space-y-3">
                <button
                  onClick={retornarTreino}
                  className="w-full bg-[#0A66C2] hover:bg-[#186FEC] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Retomar treino
                </button>
                <button
                  onClick={() => setMostrarRetorno(false)}
                  className="w-full text-gray-600 hover:text-gray-800 font-medium"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Card Principal - Refinado com menos peso visual */}
        {temProgresso ? (
          <div className="bg-white rounded-[20px] shadow-md p-6 mb-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Sua trilha atual</p>
                <h2 className="text-xl font-bold text-[#2B2F36]">
                  {getNomeTrilha(progresso.trilhaAtual)}
                </h2>
              </div>
              <div className="bg-[#36C2FF]/20 rounded-full p-3">
                <Activity className="w-6 h-6 text-[#0A66C2]" strokeWidth={2} />
              </div>
            </div>

            <div className="bg-[#36C2FF]/10 rounded-xl p-4 mb-5">
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

            <button
              onClick={continuarTreino}
              className="w-full bg-[#0A66C2] hover:bg-[#186FEC] text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-md mb-3"
            >
              <Play className="w-5 h-5" />
              Continuar Dia {proximoDia}
            </button>

            <Link 
              href="/trilhas"
              className="block text-center text-[#0A66C2] font-medium text-sm hover:underline"
            >
              Trocar de trilha
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-[20px] shadow-md p-5 sm:p-6 mb-5">
            <h2 className="text-lg sm:text-xl font-medium text-[#2B2F36] mb-4 leading-relaxed">
              Avalie sua dor e receba um plano personalizado em 2 minutos.
            </h2>
            
            <Link 
              href="/onboarding"
              className="w-full bg-[#0A66C2] hover:bg-[#186FEC] text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-md mb-3 inline-flex"
            >
              Começar agora
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link 
              href="/trilhas"
              className="block text-center text-[#0A66C2] font-medium text-sm hover:underline"
            >
              Ver exercícios
            </Link>
          </div>
        )}

        {/* Stats Rápidas - Se tem progresso */}
        {temProgresso && (
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <Calendar className="w-5 h-5 text-[#0A66C2] mx-auto mb-2" strokeWidth={2} />
              <p className="text-2xl font-bold text-[#2B2F36]">{progresso.diasTreinados}</p>
              <p className="text-xs text-gray-600">Dias</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <TrendingUp className="w-5 h-5 text-[#0A66C2] mx-auto mb-2" strokeWidth={2} />
              <p className="text-2xl font-bold text-[#2B2F36]">{Math.ceil(progresso.diasTreinados / 7)}</p>
              <p className="text-xs text-gray-600">Semanas</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <Heart className="w-5 h-5 text-[#0A66C2] mx-auto mb-2" strokeWidth={2} />
              <p className="text-2xl font-bold text-[#2B2F36]">{profile.dorAtual}</p>
              <p className="text-xs text-gray-600">Dor</p>
            </div>
          </div>
        )}

        {/* Features - Ícones padronizados com estilo minimalista */}
        <div className="space-y-3 mb-5">
          <FeatureCard
            icon={<User className="w-6 h-6 text-[#0A66C2]" strokeWidth={2} />}
            title="Avaliação Inteligente"
            description="Identifique seu tipo de dor em poucos minutos."
          />
          <FeatureCard
            icon={<Dumbbell className="w-6 h-6 text-[#0A66C2]" strokeWidth={2} />}
            title="Treinos Personalizados"
            description="Exercícios certos para o seu nível de dor e força."
          />
          <FeatureCard
            icon={<Brain className="w-6 h-6 text-[#0A66C2]" strokeWidth={2} />}
            title="Aulas Rápidas"
            description="Aprenda o que acelera e o que atrapalha sua recuperação."
          />
          <FeatureCard
            icon={<Target className="w-6 h-6 text-[#0A66C2]" strokeWidth={2} />}
            title="Acompanhamento"
            description="Monitore sua evolução com segurança, semana a semana."
          />
        </div>

        {/* CTA Secundário - Plano de Crise - Reposicionado mais próximo */}
        <div className="mb-6">
          <Link 
            href="/plano-crise"
            className="block w-full text-center bg-white border-2 border-red-500 text-red-600 font-semibold py-3.5 px-6 rounded-xl hover:bg-red-50 transition-all duration-300"
          >
            ⚠️ Minha dor piorou hoje
          </Link>
        </div>

        {/* Social Login - Apenas se não estiver logado */}
        {!loading && !userProfile && (
          <div className="bg-[#F2F4F7] rounded-2xl p-6">
            <p className="text-center text-[#2B2F36] text-sm font-medium mb-4">
              Entre para salvar seu progresso e acompanhar sua evolução.
            </p>
            <div className="space-y-3">
              <button 
                onClick={handleGoogleLogin}
                className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuar com Google
              </button>
              <Link
                href="/login"
                className="block w-full text-center bg-[#0A66C2] text-white font-medium py-3 px-4 rounded-xl hover:bg-[#186FEC] transition-colors"
              >
                Entrar com e-mail
              </Link>
              <p className="text-center text-xs text-gray-600">
                Não tem conta?{' '}
                <Link href="/cadastro" className="text-[#0A66C2] font-semibold hover:underline">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 bg-[#36C2FF]/10 rounded-full p-3">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-[#2B2F36] mb-1.5 text-base">{title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
