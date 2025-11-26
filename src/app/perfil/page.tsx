'use client';

import { useState } from 'react';
import { User, Mail, Bell, LogOut, Crown, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/custom/navigation';
import { useAppStore } from '@/lib/store';

export default function PerfilPage() {
  const router = useRouter();
  const profile = useAppStore((state) => state.profile);
  const setProfile = useAppStore((state) => state.setProfile);
  const isPremium = useAppStore((state) => state.isPremium);
  
  const [nome, setNome] = useState(profile.nome || 'Usuário');
  const [email, setEmail] = useState(profile.email || 'usuario@email.com');
  const [lembretes, setLembretes] = useState(profile.lembretes);
  const [notificacoes, setNotificacoes] = useState(profile.notificacoes);

  const handleSalvar = () => {
    setProfile({ nome, email, lembretes, notificacoes });
    alert('Perfil atualizado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7] pb-24">
      <Navigation />
      
      {/* Header */}
      <header className="bg-gradient-to-br from-[#2F66F2] to-[#70CFFF] text-white pt-12 pb-16 px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold mb-1">{nome}</h1>
          <p className="text-white/80 text-sm">{email}</p>
          {isPremium && (
            <div className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold mt-3">
              <Crown className="w-4 h-4" />
              Membro Premium
            </div>
          )}
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-8">
        {/* Informações Pessoais */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-[#1C1C1C] mb-4">Informações Pessoais</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F66F2] focus:border-transparent"
                  placeholder="Seu nome"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F66F2] focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
          </div>
          
          <button
            onClick={handleSalvar}
            className="w-full mt-6 bg-[#2F66F2] hover:bg-[#2557d6] text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Salvar alterações
          </button>
        </div>

        {/* Dor Atual */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-[#1C1C1C] mb-4">Dor Atual</h2>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">Nível de dor hoje</span>
            <span className="text-2xl font-bold text-[#2F66F2]">{profile.dorAtual}/10</span>
          </div>
          
          <button
            onClick={() => router.push('/progresso')}
            className="w-full bg-[#F2F4F7] hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-between"
          >
            Atualizar registro de dor
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Configurações */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-[#1C1C1C] mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notificações
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Lembretes de treino</p>
                <p className="text-sm text-gray-500">Receba lembretes diários</p>
              </div>
              <button
                onClick={() => setLembretes(!lembretes)}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  lembretes ? 'bg-[#2F66F2]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    lembretes ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="font-medium text-gray-700">Notificações push</p>
                <p className="text-sm text-gray-500">Atualizações e novidades</p>
              </div>
              <button
                onClick={() => setNotificacoes(!notificacoes)}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  notificacoes ? 'bg-[#2F66F2]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    notificacoes ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Premium CTA */}
        {!isPremium && (
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-lg p-6 text-white mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Crown className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-bold">Upgrade para Premium</h3>
                <p className="text-sm text-white/80">Desbloqueie todos os recursos</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/premium')}
              className="w-full bg-white text-orange-600 font-semibold py-3 px-6 rounded-xl hover:bg-white/90 transition-colors"
            >
              Ver planos
            </button>
          </div>
        )}

        {/* Ações */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <button
            onClick={() => router.push('/crise')}
            className="w-full text-left py-3 px-4 hover:bg-gray-50 rounded-xl transition-colors flex items-center justify-between"
          >
            <span className="text-gray-700">Plano de crise</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          
          <button
            onClick={() => router.push('/aulas')}
            className="w-full text-left py-3 px-4 hover:bg-gray-50 rounded-xl transition-colors flex items-center justify-between"
          >
            <span className="text-gray-700">Central de ajuda</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          
          <button
            className="w-full text-left py-3 px-4 hover:bg-gray-50 rounded-xl transition-colors flex items-center justify-between text-red-600"
          >
            <span className="flex items-center gap-2">
              <LogOut className="w-5 h-5" />
              Sair
            </span>
          </button>
        </div>

        {/* Versão */}
        <p className="text-center text-xs text-gray-400 mb-6">
          Joelho Sem Dor v1.0.0
        </p>
      </main>
    </div>
  );
}
