'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AvaliacaoData, UserProfile, ProgressoSemanal } from './types';

interface AppStore {
  avaliacao: AvaliacaoData | null;
  setAvaliacao: (data: AvaliacaoData) => void;
  
  profile: UserProfile;
  setProfile: (data: Partial<UserProfile>) => void;
  
  progresso: ProgressoSemanal;
  setProgresso: (data: Partial<ProgressoSemanal>) => void;
  
  // Autenticação Supabase
  userId: string | null;
  setUserId: (id: string | null) => void;
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  
  // Sistema de Monetização
  isPremium: boolean;
  setPremium: (value: boolean) => void;
  
  // Trial de 7 dias
  trialAtivo: boolean;
  dataInicioTrial: number | null;
  ativarTrial: () => void;
  verificarTrial: () => boolean;
  diasRestantesTrial: () => number;
  
  // Trilha recomendada pelo quiz
  trilhaRecomendada: string;
  setTrilhaRecomendada: (trilha: string) => void;
  
  // Compras individuais de trilhas (low ticket)
  trilhasCompradas: string[];
  comprarTrilha: (trilhaId: string) => void;
  verificarAcessoTrilha: (trilhaId: string) => boolean;
  
  // Verificação de acesso a dias específicos
  verificarAcessoDia: (trilhaId: string, dia: number) => boolean;
  
  exerciciosConcluidos: string[];
  concluirExercicio: (id: string) => void;
  
  // Onboarding
  onboardingCompleto: boolean;
  setOnboardingCompleto: (value: boolean) => void;
  
  // Progresso Condromalácia (caractere cirílico - manter compatibilidade)
  progressoCondromalaciа: Record<number, boolean>;
  marcarDiaConcluidoCondromalaciа: (dia: number) => void;
  
  // Progresso Condromalacia (nome correto em português)
  progressoCondromalacia: Record<number, boolean>;
  marcarDiaConcluidoCondromalacia: (dia: number) => void;
  diasConcluidosCondromalacia: number[];
  
  // Progresso Dor ao Agachar
  progressoAgachar: Record<number, boolean>;
  marcarDiaConcluidoAgachar: (dia: number) => void;
  
  // Progresso Dor ao Subir e Descer Escadas
  progressoEscadas: Record<number, boolean>;
  marcarDiaConcluidoEscadas: (dia: number) => void;
  
  // Progresso Sobrepeso + Joelho
  progressoSobrepesoJoelho: Record<number, boolean>;
  marcarDiaConcluidoSobrepesoJoelho: (dia: number) => void;
  diasConcluidosSobrepesoJoelho: number[];
  
  // Progresso Volta aos Treinos
  progressoVoltaTreinos: Record<number, boolean>;
  marcarDiaConcluidoVoltaTreinos: (dia: number) => void;
  diasConcluidosVoltaTreinos: number[];
  
  // Progresso Corrida Iniciante
  progressoCorridaIniciante: Record<number, boolean>;
  marcarDiaConcluidoCorridaIniciante: (dia: number) => void;
  diasConcluidosCorridaIniciante: number[];
  
  // Aulas Rápidas
  aulasConcluidasIds: string[];
  ultimaAulaVisualizada: string | null;
  concluirAula: (aulaId: string) => void;
  marcarAulaVisualizada: (aulaId: string) => void;
  
  // Sincronização com Supabase
  syncWithSupabase: (profileData: any) => void;
}

export const useAppStore = create<AppStore>()( persist(
    (set, get) => ({
      avaliacao: null,
      setAvaliacao: (data) => set({ avaliacao: data }),
      
      profile: {
        nome: '',
        email: '',
        dorAtual: 5,
        lembretes: true,
        notificacoes: true,
      },
      setProfile: (data) => set((state) => ({ 
        profile: { ...state.profile, ...data } 
      })),
      
      progresso: {
        diasTreinados: 0,
        dorDoDia: 5,
        trilhaAtual: '',
        semana: 1,
      },
      setProgresso: (data) => set((state) => ({ 
        progresso: { ...state.progresso, ...data } 
      })),
      
      // Autenticação
      userId: null,
      setUserId: (id) => set({ userId: id }),
      isAuthenticated: false,
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      
      // Sistema de Monetização
      isPremium: false,
      setPremium: (value) => set({ isPremium: value }),
      
      // Trial de 7 dias
      trialAtivo: false,
      dataInicioTrial: null,
      ativarTrial: () => set({ 
        trialAtivo: true, 
        dataInicioTrial: Date.now() 
      }),
      verificarTrial: () => {
        const state = get();
        if (!state.trialAtivo || !state.dataInicioTrial) return false;
        
        const diasPassados = Math.floor((Date.now() - state.dataInicioTrial) / (1000 * 60 * 60 * 24));
        
        if (diasPassados >= 7) {
          set({ trialAtivo: false });
          return false;
        }
        
        return true;
      },
      diasRestantesTrial: () => {
        const state = get();
        if (!state.trialAtivo || !state.dataInicioTrial) return 0;
        
        const diasPassados = Math.floor((Date.now() - state.dataInicioTrial) / (1000 * 60 * 60 * 24));
        const diasRestantes = 7 - diasPassados;
        
        return diasRestantes > 0 ? diasRestantes : 0;
      },
      
      // Trilha recomendada
      trilhaRecomendada: '',
      setTrilhaRecomendada: (trilha) => set({ trilhaRecomendada: trilha }),
      
      // Compras individuais
      trilhasCompradas: [],
      comprarTrilha: (trilhaId) => set((state) => ({
        trilhasCompradas: [...state.trilhasCompradas, trilhaId]
      })),
      
      // Verificar acesso a trilha completa
      verificarAcessoTrilha: (trilhaId) => {
        const state = get();
        
        // Premium tem acesso a tudo
        if (state.isPremium) return true;
        
        // Trilha comprada individualmente
        if (state.trilhasCompradas.includes(trilhaId)) return true;
        
        // Trial ativo + trilha recomendada
        if (state.verificarTrial() && state.trilhaRecomendada === trilhaId) return true;
        
        return false;
      },
      
      // Verificar acesso a dia específico
      verificarAcessoDia: (trilhaId, dia) => {
        const state = get();
        
        // Premium tem acesso a tudo
        if (state.isPremium) return true;
        
        // Trilha comprada individualmente (acesso completo)
        if (state.trilhasCompradas.includes(trilhaId)) return true;
        
        // Trial ativo na trilha recomendada
        if (state.verificarTrial() && state.trilhaRecomendada === trilhaId) {
          // Dias 1-7 liberados no trial
          return dia >= 1 && dia <= 7;
        }
        
        return false;
      },
      
      exerciciosConcluidos: [],
      concluirExercicio: (id) => set((state) => ({
        exerciciosConcluidos: [...state.exerciciosConcluidos, id],
      })),
      
      // Onboarding
      onboardingCompleto: false,
      setOnboardingCompleto: (value) => set({ onboardingCompleto: value }),
      
      // Progresso Condromalácia (caractere cirílico - manter compatibilidade)
      progressoCondromalaciа: {},
      marcarDiaConcluidoCondromalaciа: (dia) => set((state) => ({
        progressoCondromalaciа: { ...state.progressoCondromalaciа, [dia]: true },
      })),
      
      // Progresso Condromalacia (nome correto em português)
      progressoCondromalacia: {},
      marcarDiaConcluidoCondromalacia: (dia) => set((state) => {
        const novoProgresso = { ...state.progressoCondromalacia, [dia]: true };
        const diasConcluidos = Object.keys(novoProgresso)
          .filter(key => novoProgresso[parseInt(key)])
          .map(key => parseInt(key))
          .sort((a, b) => a - b);
        
        return {
          progressoCondromalacia: novoProgresso,
          diasConcluidosCondromalacia: diasConcluidos,
        };
      }),
      diasConcluidosCondromalacia: [],
      
      // Progresso Dor ao Agachar
      progressoAgachar: {},
      marcarDiaConcluidoAgachar: (dia) => set((state) => ({
        progressoAgachar: { ...state.progressoAgachar, [dia]: true },
      })),
      
      // Progresso Dor ao Subir e Descer Escadas
      progressoEscadas: {},
      marcarDiaConcluidoEscadas: (dia) => set((state) => ({
        progressoEscadas: { ...state.progressoEscadas, [dia]: true },
      })),
      
      // Progresso Sobrepeso + Joelho
      progressoSobrepesoJoelho: {},
      marcarDiaConcluidoSobrepesoJoelho: (dia) => set((state) => {
        const novoProgresso = { ...state.progressoSobrepesoJoelho, [dia]: true };
        const diasConcluidos = Object.keys(novoProgresso)
          .filter(key => novoProgresso[parseInt(key)])
          .map(key => parseInt(key))
          .sort((a, b) => a - b);
        
        return {
          progressoSobrepesoJoelho: novoProgresso,
          diasConcluidosSobrepesoJoelho: diasConcluidos,
        };
      }),
      diasConcluidosSobrepesoJoelho: [],
      
      // Progresso Volta aos Treinos
      progressoVoltaTreinos: {},
      marcarDiaConcluidoVoltaTreinos: (dia) => set((state) => {
        const novoProgresso = { ...state.progressoVoltaTreinos, [dia]: true };
        const diasConcluidos = Object.keys(novoProgresso)
          .filter(key => novoProgresso[parseInt(key)])
          .map(key => parseInt(key))
          .sort((a, b) => a - b);
        
        return {
          progressoVoltaTreinos: novoProgresso,
          diasConcluidosVoltaTreinos: diasConcluidos,
        };
      }),
      diasConcluidosVoltaTreinos: [],
      
      // Progresso Corrida Iniciante
      progressoCorridaIniciante: {},
      marcarDiaConcluidoCorridaIniciante: (dia) => set((state) => {
        const novoProgresso = { ...state.progressoCorridaIniciante, [dia]: true };
        const diasConcluidos = Object.keys(novoProgresso)
          .filter(key => novoProgresso[parseInt(key)])
          .map(key => parseInt(key))
          .sort((a, b) => a - b);
        
        return {
          progressoCorridaIniciante: novoProgresso,
          diasConcluidosCorridaIniciante: diasConcluidos,
        };
      }),
      diasConcluidosCorridaIniciante: [],
      
      // Aulas Rápidas
      aulasConcluidasIds: [],
      ultimaAulaVisualizada: null,
      concluirAula: (aulaId) => set((state) => ({
        aulasConcluidasIds: state.aulasConcluidasIds.includes(aulaId) 
          ? state.aulasConcluidasIds 
          : [...state.aulasConcluidasIds, aulaId],
        ultimaAulaVisualizada: aulaId,
      })),
      marcarAulaVisualizada: (aulaId) => set({ ultimaAulaVisualizada: aulaId }),
      
      // Sincronização com Supabase
      syncWithSupabase: (profileData) => {
        if (!profileData) return;
        
        set({
          userId: profileData.id,
          isAuthenticated: true,
          isPremium: profileData.plano === 'premium',
          trilhaRecomendada: profileData.trilhaRecomendada || '',
          trilhasCompradas: profileData.trilhasCompradas || [],
          trialAtivo: profileData.trialAtivo || false,
          dataInicioTrial: profileData.dataInicioTrial 
            ? new Date(profileData.dataInicioTrial).getTime() 
            : null,
          profile: {
            nome: profileData.nome,
            email: profileData.email,
            dorAtual: 5,
            lembretes: true,
            notificacoes: true,
          },
        });
      },
    }),
    {
      name: 'orthoxis-storage',
    }
  )
);
