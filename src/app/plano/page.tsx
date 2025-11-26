'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Clock, CheckCircle2, AlertCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/custom/navigation';

// Dados dos 7 dias
const diasPrograma = [
  {
    dia: 1,
    titulo: 'Dia 1 — Mobilidade e Ativação',
    exercicios: [
      { nome: 'Mobilidade do Joelho', duracao: '3 min', descricao: 'Libere a articulação e reduza a rigidez em poucos minutos.', icon: '🔄' },
      { nome: 'Fortalecimento do Quadríceps', duracao: '5 min', descricao: 'Ative o músculo que mais protege seu joelho.', icon: '💪' },
      { nome: 'Alongamento Posterior', duracao: '4 min', descricao: 'Relaxamento da cadeia posterior para aliviar pressão no joelho.', icon: '🧘' },
      { nome: 'Aula educativa', duracao: '3 min', descricao: 'Entenda por que seu joelho dói e o que melhora.', icon: '📚' },
    ],
    tempoTotal: 15,
  },
  {
    dia: 2,
    titulo: 'Dia 2 — Glúteos e Estabilidade',
    exercicios: [
      { nome: 'Elevação de Quadril (Ponte)', duracao: '4 min', descricao: 'Ativar glúteos para reduzir pressão na patela.', icon: '🌉' },
      { nome: 'Extensão de Joelho Sentado', duracao: '3 min', descricao: 'Ativar quadríceps sem impacto.', icon: '💪' },
      { nome: 'Alongamento de Quadríceps', duracao: '3 min', descricao: 'Reduzir tensão anterior.', icon: '🧘' },
      { nome: 'Aula educativa', duracao: '3 min', descricao: 'Por que fortalecer glúteos reduz sua dor no joelho?', icon: '📚' },
    ],
    tempoTotal: 13,
  },
  {
    dia: 3,
    titulo: 'Dia 3 — Alinhamento e Controle',
    exercicios: [
      { nome: 'Mini Agachamento na Parede', duracao: '4 min', descricao: 'Ativar quadríceps sem sobrecarregar patela.', icon: '🧱' },
      { nome: 'Mobilidade de Tornozelo', duracao: '3 min', descricao: 'Melhorar alinhamento e reduzir carga no joelho.', icon: '🦶' },
      { nome: 'Alongamento de Glúteo', duracao: '3 min', descricao: 'Reduzir tensão no quadril.', icon: '🧘' },
      { nome: 'Aula educativa', duracao: '3 min', descricao: 'Entendendo o alinhamento do joelho.', icon: '📚' },
    ],
    tempoTotal: 13,
  },
  {
    dia: 4,
    titulo: 'Dia 4 — Quadril e Isometria',
    exercicios: [
      { nome: 'Isometria de Glúteo Médio', duracao: '4 min', descricao: 'Fortalecer estabilizadores do quadril.', icon: '⚡' },
      { nome: 'Extensão de Joelho com Toalha', duracao: '3 min', descricao: 'Ativar quadríceps de forma isométrica.', icon: '💪' },
      { nome: 'Alongamento de Quadril', duracao: '3 min', descricao: 'Reduzir tensão na frente do quadril.', icon: '🧘' },
      { nome: 'Aula educativa', duracao: '3 min', descricao: 'Como o quadril influencia sua dor no joelho?', icon: '📚' },
    ],
    tempoTotal: 13,
  },
  {
    dia: 5,
    titulo: 'Dia 5 — Funcional e Progressão',
    exercicios: [
      { nome: 'Step-up Baixo', duracao: '4 min', descricao: 'Fortalecer pernas com movimento funcional.', icon: '🪜' },
      { nome: 'Ponte Unilateral (leve)', duracao: '3 min', descricao: 'Fortalecer glúteos de forma avançada.', icon: '🌉' },
      { nome: 'Alongamento Posterior', duracao: '3 min', descricao: 'Relaxamento da cadeia posterior.', icon: '🧘' },
      { nome: 'Aula educativa', duracao: '3 min', descricao: 'A diferença entre dor boa e dor perigosa.', icon: '📚' },
    ],
    tempoTotal: 13,
  },
  {
    dia: 6,
    titulo: 'Dia 6 — Força e Resistência',
    exercicios: [
      { nome: 'Agachamento com Cadeira', duracao: '4 min', descricao: 'Fortalecer pernas com segurança.', icon: '🪑' },
      { nome: 'Abdução de Quadril em Pé', duracao: '3 min', descricao: 'Fortalecer glúteo médio.', icon: '🦵' },
      { nome: 'Alongamento de Panturrilha', duracao: '3 min', descricao: 'Reduzir tensão na panturrilha.', icon: '🧘' },
      { nome: 'Aula educativa', duracao: '3 min', descricao: 'Como evitar dor ao caminhar.', icon: '📚' },
    ],
    tempoTotal: 13,
  },
  {
    dia: 7,
    titulo: 'Dia 7 — Integração e Manutenção',
    exercicios: [
      { nome: 'Sequência de Mobilidade Global', duracao: '4 min', descricao: 'Mobilizar todo o corpo.', icon: '🌀' },
      { nome: 'Agachamento Isométrico Leve', duracao: '3 min', descricao: 'Fortalecer pernas de forma estática.', icon: '⚡' },
      { nome: 'Alongamento de Corpo Inteiro', duracao: '3 min', descricao: 'Relaxar todo o corpo.', icon: '🧘' },
      { nome: 'Aula educativa', duracao: '3 min', descricao: 'Como manter seu joelho saudável a longo prazo.', icon: '📚' },
    ],
    tempoTotal: 13,
  },
];

export default function PlanoPage() {
  const router = useRouter();
  const [diaSelecionado, setDiaSelecionado] = useState(1);
  const [diasConcluidos, setDiasConcluidos] = useState<number[]>([]);

  const diaAtual = diasPrograma.find(d => d.dia === diaSelecionado) || diasPrograma[0];

  const handleIniciarTreino = () => {
    router.push(`/treino?dia=dia${diaSelecionado}`);
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7] pb-24">
      <Navigation />
      
      {/* Header */}
      <header className="bg-[#2F66F2] text-white pt-12 pb-8 px-6">
        <div className="max-w-md mx-auto">
          <Link href="/resultado" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <h1 className="text-3xl font-bold mb-2">Plano de 7 Dias</h1>
          <p className="text-[#70CFFF]">Vamos começar com uma rotina leve e eficaz para reduzir sua dor já no primeiro dia.</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-4">
        {/* Progresso - Box Motivador */}
        <div className="bg-gradient-to-br from-[#2F66F2] to-[#1e4fd9] rounded-2xl shadow-lg p-6 mb-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-2xl font-bold">Dia {diaSelecionado} de 7 — Excelente!</h2>
              <p className="text-[#70CFFF] text-sm mt-1">
                {diaSelecionado === 1 ? 'Esse é o seu primeiro passo para o alívio.' : 'Continue assim, você está progredindo!'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{Math.round((diasConcluidos.length / 7) * 100)}%</div>
              <p className="text-xs text-white/70">Concluído</p>
            </div>
          </div>
          
          <div className="bg-white/20 rounded-full h-2.5 mt-4">
            <div 
              className="bg-white rounded-full h-2.5 transition-all duration-300" 
              style={{ width: `${(diasConcluidos.length / 7) * 100}%` }}
            />
          </div>
        </div>

        {/* Calendário Semanal - Seletor de Dias */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="font-bold text-[#1C1C1C] mb-4">Sua Semana</h3>
          <div className="grid grid-cols-7 gap-2 mb-3">
            {diasPrograma.map((dia) => {
              const concluido = diasConcluidos.includes(dia.dia);
              const selecionado = diaSelecionado === dia.dia;
              const bloqueado = dia.dia > 1 && !diasConcluidos.includes(dia.dia - 1);
              
              return (
                <button
                  key={dia.dia}
                  onClick={() => !bloqueado && setDiaSelecionado(dia.dia)}
                  disabled={bloqueado}
                  className={`relative w-full aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-semibold transition-all ${
                    bloqueado
                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                      : concluido
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : selecionado
                      ? 'bg-[#2F66F2] text-white ring-4 ring-[#2F66F2]/20 scale-110'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {bloqueado ? (
                    <Lock className="w-4 h-4" />
                  ) : concluido ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span className="text-lg font-bold">{dia.dia}</span>
                  )}
                  <span className="text-[10px] mt-1">Dia {dia.dia}</span>
                </button>
              );
            })}
          </div>
          <p className="text-center text-sm text-gray-600 mt-4 italic">
            Avance no seu ritmo. Cada dia conta!
          </p>
        </div>

        {/* Título do Dia Selecionado */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#1C1C1C] mb-2">{diaAtual.titulo}</h3>
          <p className="text-sm text-gray-600">Exercícios planejados para hoje:</p>
        </div>

        {/* Exercícios do Dia */}
        <div className="mb-4">
          <div className="space-y-3">
            {diaAtual.exercicios.map((exercicio, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#2F66F2]/10 rounded-full flex items-center justify-center text-2xl">
                      {exercicio.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-[#1C1C1C]">{exercicio.nome}</h4>
                      <span className="text-xs bg-[#70CFFF]/20 text-[#2F66F2] px-2 py-1 rounded-full font-medium ml-2">
                        {exercicio.duracao}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{exercicio.descricao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tempo Total */}
        <div className="bg-[#70CFFF]/10 rounded-xl p-4 mb-6 flex items-center justify-center gap-2">
          <Clock className="w-5 h-5 text-[#2F66F2]" />
          <p className="text-sm font-medium text-[#1C1C1C]">
            Tempo total estimado do treino: <span className="font-bold text-[#2F66F2]">{diaAtual.tempoTotal} minutos</span>
          </p>
        </div>

        {/* CTA Principal - Maior e com mais contraste */}
        <button
          onClick={handleIniciarTreino}
          className="w-full bg-[#2F66F2] hover:bg-[#1e4fd9] text-white font-bold text-lg py-5 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl mb-4"
        >
          <Play className="w-6 h-6" />
          Iniciar treino do dia {diaSelecionado}
        </button>

        {/* Botão de Acesso Rápido - Plano de Crise */}
        <Link
          href="/crise"
          className="block w-full bg-white hover:bg-gray-50 text-[#2F66F2] font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md border border-[#2F66F2]/20 mb-8"
        >
          <AlertCircle className="w-5 h-5" />
          Dor aumentou? Abrir Plano de Crise
        </Link>

        {/* Dicas do Dia */}
        <div className="bg-gradient-to-br from-[#70CFFF]/20 to-[#2F66F2]/20 rounded-2xl p-6">
          <h3 className="font-bold text-[#1C1C1C] mb-3 flex items-center gap-2">
            💡 Dica do Dia {diaSelecionado}
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {diaSelecionado === 1 && 'Faça os exercícios no seu ritmo. Se sentir dor aguda, pare e descanse. O objetivo é fortalecer sem agredir o joelho.'}
            {diaSelecionado === 2 && 'Foque na ativação dos glúteos. Eles são essenciais para proteger seu joelho durante movimentos do dia a dia.'}
            {diaSelecionado === 3 && 'Preste atenção no alinhamento. O joelho deve seguir a linha do pé, sem "cair para dentro".'}
            {diaSelecionado === 4 && 'O quadril e o joelho trabalham juntos. Fortalecer o quadril reduz a sobrecarga no joelho.'}
            {diaSelecionado === 5 && 'Movimentos funcionais como o step-up preparam você para atividades do dia a dia.'}
            {diaSelecionado === 6 && 'Você está quase lá! Continue com consistência - os resultados virão.'}
            {diaSelecionado === 7 && 'Parabéns por chegar até aqui! Hoje é dia de integrar tudo que aprendeu e celebrar seu progresso.'}
          </p>
        </div>
      </main>
    </div>
  );
}
