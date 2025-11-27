/**
 * Helpers para o sistema de monetização do Orthoxis
 * 
 * Sistema de 3 níveis:
 * 1. FREE/TRIAL (7 dias) - Acesso limitado à trilha recomendada (dias 1-7)
 * 2. COMPRA INDIVIDUAL - Acesso completo a uma trilha específica
 * 3. PREMIUM - Acesso total a tudo
 */

interface MonetizationState {
  isPremium: boolean;
  trilhasCompradas: string[];
  trilhaRecomendada: string;
  verificarTrial: () => boolean;
}

/**
 * Verifica se o usuário tem acesso a uma trilha completa
 */
export function verificarAcessoTrilha(
  trilhaId: string,
  state: MonetizationState
): boolean {
  // Premium tem acesso a tudo
  if (state.isPremium) return true;
  
  // Trilha comprada individualmente
  if (state.trilhasCompradas.includes(trilhaId)) return true;
  
  // Trial ativo + trilha recomendada
  if (state.verificarTrial() && state.trilhaRecomendada === trilhaId) return true;
  
  return false;
}

/**
 * Verifica se o usuário tem acesso a um dia específico de uma trilha
 */
export function verificarAcessoDia(
  trilhaId: string,
  dia: number,
  state: MonetizationState
): boolean {
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
}

/**
 * Retorna o status de acesso do usuário
 */
export function getStatusAcesso(
  trilhaId: string,
  state: MonetizationState
): 'premium' | 'comprada' | 'trial' | 'bloqueada' {
  if (state.isPremium) return 'premium';
  
  if (state.trilhasCompradas.includes(trilhaId)) return 'comprada';
  
  if (state.verificarTrial() && state.trilhaRecomendada === trilhaId) return 'trial';
  
  return 'bloqueada';
}

/**
 * Retorna mensagem de bloqueio apropriada
 */
export function getMensagemBloqueio(
  trilhaId: string,
  dia: number,
  state: MonetizationState
): string {
  const status = getStatusAcesso(trilhaId, state);
  
  if (status === 'trial' && dia > 7) {
    return 'Desbloqueie os dias 8-30 desta trilha ou torne-se Premium';
  }
  
  if (status === 'bloqueada') {
    return 'Desbloqueie todas as trilhas com o Premium';
  }
  
  return '';
}
