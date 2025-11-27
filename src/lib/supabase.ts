import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Tipos para o banco de dados (padrão Supabase)
export interface Profile {
  id: string;
  nome: string;
  email: string;
  plano: 'free' | 'free_trial' | 'premium' | 'trilha_individual';
  trilha_recomendada?: string | null;
  trilhas_compradas?: string[];
  trial_ativo?: boolean;
  trial_ends_at?: string | null;
  data_inicio_trial?: string | null;
  quiz_completo?: boolean;
  quiz_respostas?: Record<number, string>;
  progresso?: any;
  data_criacao: string;
  updated_at?: string;
}

// Database types para TypeScript (gerado automaticamente pelo Supabase)
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'data_criacao' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'data_criacao'>>;
      };
    };
  };
}
