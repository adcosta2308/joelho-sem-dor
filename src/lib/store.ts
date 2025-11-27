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
        trilhaAtual: '',
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
    }),
    {
      name: 'joelho-sem-dor-storage',
    }
  )
);
