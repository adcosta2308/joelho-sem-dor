'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, Clock, TrendingUp, CheckCircle2, Sparkles } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function RecomendacaoPage() {
  const router = useRouter();
  const avaliacao = useAppStore((state) => state.avaliacao);

  // Determina a trilha recomendada baseada na avaliação
  const getTrilhaRecomendada = () => {
    if (!avaliacao) {
      return {
        nome: 'Condromalácia',
        descricao: 'Fortaleça os músculos que protegem sua patela e reduza a pressão no joelho.',
        duracao: '30 dias',
        nivel: 'Iniciante',
        cor: 'from-[#0A66C2] to-[#186FEC]',
      };
    }

    // Lógica de recomendação baseada nos sintomas
    if (avaliacao.quandoDoi.includes('Agachar')) {
      return {
        nome: 'Dor ao Agachar',
        descricao: 'Recupere sua capacidade de agachar sem dor com correção de movimento e fortalecimento direcionado.',
        duracao: '21 dias',
        nivel: 'Iniciante',
        cor: 'from-purple-500 to-pink-500',
      };
    }

    if (avaliacao.quandoDoi.includes('Subir escada') || avaliacao.quandoDoi.includes('Descer escada')) {
      return {
        nome: 'Dor ao Subir e Descer Escadas',
        descricao: 'Melhore estabilidade e força para subir e descer escadas sem incômodo.',
        duracao: '21 dias',
        nivel: 'Iniciante',
        cor: 'from-orange-500 to-red-500',
      };
    }

    return {
      nome: 'Condromalácia',
      descricao: 'Fortaleça os músculos que protegem sua patela e reduza a pressão no joelho.',
      duracao: '30 dias',
      nivel: 'Iniciante',
      cor: 'from-[#0A66C2] to-[#186FEC]',
    };
  };

  const trilha = getTrilhaRecomendada();

  const beneficios = [
    'Redução significativa da dor em 2-3 semanas',
    'Fortalecimento muscular progressivo e seguro',
    'Melhora da estabilidade e mobilidade do joelho',
    'Exercícios adaptados ao seu nível atual',
    'Acompanhamento diário do seu progresso',
  ];

  const previewDias = [
    {
      dia: 1,
      titulo: 'Avaliação e Mobilidade',
      descricao: 'Exercícios suaves de mobilidade e alongamento',
      duracao: '15 min',
    },
    {
      dia: 2,
      titulo: 'Ativação Muscular',
      descricao: 'Ativação dos músculos estabilizadores do joelho',
      duracao: '18 min',
    },
    {
      dia: 3,
      titulo: 'Fortalecimento Inicial',
      descricao: 'Início do fortalecimento com exercícios leves',
      duracao: '20 min',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A66C2]/5 to-white pb-6">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0A66C2] to-[#186FEC] text-white pt-12 pb-16 px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Sua Trilha Personalizada</h1>
          <p className="text-white/90">Baseada na sua avaliação</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-8">
        {/* Card Principal da Trilha */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className={`h-2 bg-gradient-to-r ${trilha.cor}`} />
          
          <div className="p-8">
            {/* Badge de Recomendação */}
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <CheckCircle2 className="w-4 h-4" />
              Recomendada para você
            </div>

            {/* Nome da Trilha */}
            <h2 className="text-3xl font-bold text-[#2B2F36] mb-3">
              {trilha.nome}
            </h2>

            {/* Descrição */}
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              {trilha.descricao}
            </p>

            {/* Informações */}
            <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-[#0A66C2]" />
                <span className="font-medium">{trilha.duracao}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <TrendingUp className="w-5 h-5 text-[#0A66C2]" />
                <span className="font-medium">{trilha.nivel}</span>
              </div>
            </div>

            {/* Benefícios */}
            <div className="mb-6">
              <h3 className="font-bold text-[#2B2F36] mb-4 text-lg">Benefícios principais:</h3>
              <ul className="space-y-3">
                {beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm leading-relaxed">{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Preview dos Primeiros 3 Dias */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="font-bold text-[#2B2F36] mb-4 text-lg">Prévia dos primeiros 3 dias:</h3>
          <div className="space-y-4">
            {previewDias.map((dia) => (
              <div key={dia.dia} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 bg-gradient-to-br ${trilha.cor} rounded-lg flex items-center justify-center text-white font-bold`}>
                    {dia.dia}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[#2B2F36] mb-1">{dia.titulo}</h4>
                  <p className="text-sm text-gray-600 mb-2">{dia.descricao}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{dia.duracao}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Principal */}
        <button
          onClick={() => router.push('/trial')}
          className={`w-full bg-gradient-to-r ${trilha.cor} hover:opacity-90 text-white font-bold py-5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg mb-4`}
        >
          Começar 7 dias gratuitos
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 text-center px-4">
          Sem compromisso. Cancele quando quiser durante o período gratuito.
        </p>
      </main>
    </div>
  );
}
