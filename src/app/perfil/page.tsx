'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/custom/navigation';
import { getCurrentUser, getProfile, signOut } from '@/lib/auth-helpers';
import type { Profile } from '@/lib/supabase';
import { User, Mail, Calendar, Award, LogOut, Loader2, Crown } from 'lucide-react';

export default function PerfilPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const profileData = await getProfile(user.id);
      if (profileData) {
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  const getPlanoBadge = (plano: string) => {
    const badges = {
      free: { label: 'Gratuito', color: 'bg-gray-100 text-gray-700' },
      free_trial: { label: 'Trial Gratuito', color: 'bg-blue-100 text-blue-700' },
      premium: { label: 'Premium', color: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' },
      trilha_individual: { label: 'Trilha Individual', color: 'bg-purple-100 text-purple-700' },
    };
    return badges[plano as keyof typeof badges] || badges.free;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#36C2FF]/10 to-white flex items-center justify-center pb-24">
        <Loader2 className="w-8 h-8 animate-spin text-[#0A66C2]" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#36C2FF]/10 to-white pb-24">
        <Navigation />
        <div className="max-w-md mx-auto px-6 pt-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#2B2F36] mb-2">Faça login para continuar</h2>
            <p className="text-gray-600 mb-6">Acesse sua conta para ver seu perfil e progresso</p>
            <Link
              href="/login"
              className="inline-block w-full bg-[#0A66C2] hover:bg-[#186FEC] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Fazer login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const planoBadge = getPlanoBadge(profile.plano);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#36C2FF]/10 to-white pb-24">
      <Navigation />
      
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0A66C2] to-[#186FEC] text-white pt-8 pb-12 px-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2">Meu Perfil</h1>
          <p className="text-white/90">Gerencie suas informações</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 -mt-6">
        {/* Card de Perfil */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-5">
          {/* Avatar e Nome */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#0A66C2] to-[#36C2FF] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {profile.nome.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#2B2F36] mb-1">{profile.nome}</h2>
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${planoBadge.color}`}>
                {profile.plano === 'premium' && <Crown className="w-3 h-3" />}
                {planoBadge.label}
              </div>
            </div>
          </div>

          {/* Informações */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Mail className="w-5 h-5 text-[#0A66C2]" />
              <div>
                <p className="text-xs text-gray-600">E-mail</p>
                <p className="text-sm font-medium text-[#2B2F36]">{profile.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Calendar className="w-5 h-5 text-[#0A66C2]" />
              <div>
                <p className="text-xs text-gray-600">Membro desde</p>
                <p className="text-sm font-medium text-[#2B2F36]">
                  {new Date(profile.data_criacao).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {profile.trilha_recomendada && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <Award className="w-5 h-5 text-[#0A66C2]" />
                <div>
                  <p className="text-xs text-gray-600">Trilha recomendada</p>
                  <p className="text-sm font-medium text-[#2B2F36]">{profile.trilha_recomendada}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trial Info - Se aplicável */}
        {profile.trial_ativo && profile.trial_ends_at && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-6 mb-5">
            <h3 className="text-lg font-bold mb-2">🎉 Trial Premium Ativo</h3>
            <p className="text-sm text-white/90 mb-3">
              Aproveite todos os recursos premium até{' '}
              {new Date(profile.trial_ends_at).toLocaleDateString('pt-BR')}
            </p>
            <Link
              href="/planos"
              className="inline-block bg-white text-purple-600 font-semibold py-2 px-4 rounded-lg text-sm hover:bg-gray-100 transition-colors"
            >
              Ver planos
            </Link>
          </div>
        )}

        {/* Ações */}
        <div className="space-y-3">
          <Link
            href="/perfil/editar"
            className="block w-full text-center bg-white border-2 border-[#0A66C2] text-[#0A66C2] font-semibold py-3 px-6 rounded-xl hover:bg-[#0A66C2] hover:text-white transition-all duration-300"
          >
            Editar perfil
          </Link>

          {profile.plano === 'free' && (
            <Link
              href="/planos"
              className="block w-full text-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Crown className="w-5 h-5" />
              Upgrade para Premium
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            Sair da conta
          </button>
        </div>
      </main>
    </div>
  );
}
