'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * Componente auxiliar para criar usuários de teste
 * Use este componente uma vez para criar os usuários teste_free e teste_premium
 */
export default function CriarUsuariosTeste() {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const criarUsuarios = async () => {
    setLoading(true);
    setStatus('Criando usuários de teste...');

    try {
      // Usuário FREE
      const { data: freeUser, error: freeError } = await supabase.auth.signUp({
        email: 'teste_free@orthoxis.com',
        password: '12345678',
        options: {
          data: {
            nome: 'Usuário Free',
          },
        },
      });

      if (freeError) throw new Error(`Erro ao criar usuário FREE: ${freeError.message}`);

      if (freeUser.user) {
        // Criar perfil FREE
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: freeUser.user.id,
            nome: 'Usuário Free',
            email: 'teste_free@orthoxis.com',
            plano: 'free',
            dataCriacao: new Date().toISOString(),
          });

        if (profileError) throw new Error(`Erro ao criar perfil FREE: ${profileError.message}`);
      }

      setStatus('Usuário FREE criado! Criando usuário PREMIUM...');

      // Fazer logout antes de criar o próximo usuário
      await supabase.auth.signOut();

      // Usuário PREMIUM
      const { data: premiumUser, error: premiumError } = await supabase.auth.signUp({
        email: 'teste_premium@orthoxis.com',
        password: '12345678',
        options: {
          data: {
            nome: 'Usuário Premium',
          },
        },
      });

      if (premiumError) throw new Error(`Erro ao criar usuário PREMIUM: ${premiumError.message}`);

      if (premiumUser.user) {
        // Criar perfil PREMIUM
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: premiumUser.user.id,
            nome: 'Usuário Premium',
            email: 'teste_premium@orthoxis.com',
            plano: 'premium',
            dataCriacao: new Date().toISOString(),
          });

        if (profileError) throw new Error(`Erro ao criar perfil PREMIUM: ${profileError.message}`);
      }

      // Fazer logout final
      await supabase.auth.signOut();

      setStatus('✅ Usuários de teste criados com sucesso!\n\nFREE: teste_free@orthoxis.com / 12345678\nPREMIUM: teste_premium@orthoxis.com / 12345678');
    } catch (error: any) {
      setStatus(`❌ Erro: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A66C2] to-[#36C2FF] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-[#2B2F36] mb-4">
          Criar Usuários de Teste
        </h1>
        
        <p className="text-gray-600 mb-6">
          Este componente cria automaticamente os dois usuários de teste do Orthoxis:
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm">
          <p className="font-semibold mb-2">Usuários que serão criados:</p>
          <p className="mb-1">
            <strong>FREE:</strong> teste_free@orthoxis.com / 12345678
          </p>
          <p>
            <strong>PREMIUM:</strong> teste_premium@orthoxis.com / 12345678
          </p>
        </div>

        <button
          onClick={criarUsuarios}
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#0A66C2] to-[#186FEC] text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {loading ? 'Criando...' : 'Criar Usuários de Teste'}
        </button>

        {status && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm whitespace-pre-line">
            {status}
          </div>
        )}

        <p className="text-xs text-gray-500 mt-4 text-center">
          Execute este componente apenas uma vez. Depois, você pode deletar este arquivo.
        </p>
      </div>
    </div>
  );
}
