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
  
  isPremium: boolean;
  setPremium: (value: boolean) => void;
  
  exerciciosConcluidos: string[];
  concluirExercicio: (id: string) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
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
        trilhaAtual: 'Condromalácia',
        semana: 1,
      },
      setProgresso: (data) => set((state) => ({ 
        progresso: { ...state.progresso, ...data } 
      })),
      
      isPremium: false,
      setPremium: (value) => set({ isPremium: value }),
      
      exerciciosConcluidos: [],
      concluirExercicio: (id) => set((state) => ({
        exerciciosConcluidos: [...state.exerciciosConcluidos, id],
      })),
    }),
    {
      name: 'joelho-sem-dor-storage',
    }
  )
);
