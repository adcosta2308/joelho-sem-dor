// Tipos do app Joelho Sem Dor

export interface AvaliacaoData {
  ondeDoi: string;
  quandoDoi: string[];
  intensidade: number;
  testeGuiado: string;
}

export interface UserProfile {
  nome: string;
  email: string;
  dorAtual: number;
  lembretes: boolean;
  notificacoes: boolean;
}

export interface Exercicio {
  id: string;
  nome: string;
  descricao: string;
  duracao: string;
  videoUrl?: string;
  instrucoes: string[];
}

export interface Trilha {
  id: string;
  nome: string;
  descricao: string;
  duracao: string;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  premium: boolean;
}

export interface Aula {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  premium: boolean;
}

export interface ProgressoSemanal {
  diasTreinados: number;
  dorDoDia: number;
  trilhaAtual: string;
  semana: number;
}
