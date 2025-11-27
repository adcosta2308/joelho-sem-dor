import { supabase, Profile } from './supabase';

/**
 * Registra um novo usuário no Supabase (padrão Supabase Auth)
 */
export async function signUp(email: string, password: string, nome: string) {
  try {
    // 1. Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome, // Metadados do usuário
        },
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Erro ao criar usuário');

    // 2. O perfil será criado automaticamente via trigger do Supabase
    // (configurado no supabase-setup.sql)

    return { success: true, user: authData.user };
  } catch (error: any) {
    console.error('Erro no cadastro:', error);
    
    // Mensagens de erro amigáveis
    let errorMessage = error.message;
    if (error.message.includes('already registered')) {
      errorMessage = 'Este e-mail já está cadastrado';
    } else if (error.message.includes('Invalid email')) {
      errorMessage = 'E-mail inválido';
    } else if (error.message.includes('Password should be')) {
      errorMessage = 'A senha deve ter pelo menos 6 caracteres';
    }
    
    return { success: false, error: errorMessage };
  }
}

/**
 * Faz login do usuário (padrão Supabase Auth)
 */
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { success: true, user: data.user, session: data.session };
  } catch (error: any) {
    console.error('Erro no login:', error);
    
    // Mensagens de erro amigáveis
    let errorMessage = error.message;
    if (error.message.includes('Invalid login credentials')) {
      errorMessage = 'E-mail ou senha incorretos';
    } else if (error.message.includes('Email not confirmed')) {
      errorMessage = 'Por favor, confirme seu e-mail antes de fazer login';
    }
    
    return { success: false, error: errorMessage };
  }
}

/**
 * Faz logout do usuário (padrão Supabase Auth)
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Erro no logout:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Obtém o perfil do usuário logado (padrão Supabase)
 */
export async function getProfile(userId: string): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return null;
  }
}

/**
 * Atualiza o perfil do usuário (padrão Supabase)
 */
export async function updateProfile(userId: string, updates: Partial<Profile>) {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Erro ao atualizar perfil:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Verifica se há uma sessão ativa (padrão Supabase Auth)
 */
export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error('Erro ao verificar sessão:', error);
    return null;
  }
}

/**
 * Obtém o usuário atual (padrão Supabase Auth)
 */
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    return null;
  }
}

/**
 * Login com Google OAuth (padrão Supabase Auth)
 * 
 * ⚠️ IMPORTANTE: Para funcionar, você precisa configurar o Google OAuth no Supabase:
 * 1. Acesse: https://supabase.com/dashboard
 * 2. Vá em Authentication → Providers → Google
 * 3. Habilite o provider e adicione suas credenciais do Google Cloud
 * 
 * Veja o arquivo GOOGLE_AUTH_SETUP.md na raiz do projeto para instruções detalhadas.
 */
export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      // Tratamento específico para erro de provider não habilitado
      if (error.message.includes('provider is not enabled') || error.message.includes('Unsupported provider')) {
        throw new Error(
          '❌ Google OAuth não está configurado. ' +
          'Acesse o dashboard do Supabase em Authentication → Providers → Google e habilite o provider. ' +
          'Veja o arquivo GOOGLE_AUTH_SETUP.md para instruções completas.'
        );
      }
      throw error;
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('Erro no login com Google:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Escuta mudanças no estado de autenticação (padrão Supabase Auth)
 */
export function onAuthStateChange(callback: (user: any) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user ?? null);
  });
}
