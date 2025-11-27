'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/lib/store';
import { getProfile } from '@/lib/auth-helpers';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { setUserId, setAuthenticated, syncWithSupabase } = useAppStore();

  useEffect(() => {
    // Verificar sessão inicial
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUserId(session.user.id);
        setAuthenticated(true);
        
        // Carregar perfil do usuário
        const profile = await getProfile(session.user.id);
        if (profile) {
          syncWithSupabase(profile);
        }
      }
    };

    checkSession();

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUserId(session.user.id);
          setAuthenticated(true);
          
          // Carregar perfil
          const profile = await getProfile(session.user.id);
          if (profile) {
            syncWithSupabase(profile);
            
            // Redirecionar baseado no estado
            if (!profile.trilhaRecomendada) {
              router.push('/quiz');
            } else {
              router.push('/');
            }
          }
        } else if (event === 'SIGNED_OUT') {
          setUserId(null);
          setAuthenticated(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [router, setUserId, setAuthenticated, syncWithSupabase]);

  return <>{children}</>;
}
