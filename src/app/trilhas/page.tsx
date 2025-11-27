'use client';

import { useRouter } from 'next/navigation';
import { Lock, Clock, TrendingUp } from 'lucide-react';
import Navigation from '@/components/custom/navigation';
import { useAppStore } from '@/lib/store';

export default function TrilhasPage() {
  const router = useRouter();
  const { isPremium, verificarAcessoTrilha, trilhaRecomendada, verificarTrial } = useAppStore();

  const trialAtivo = verificarTrial();

  const trilhas = [
    {
      id: 'condromalacia',
      nome: 'Condromalácia',
      descricao: 'Fortaleça os músculos que protegem sua patela e reduza a pressão no joelho em até 30 dias.',
      duracao: '30 dias',
      nivel: 'Iniciante',
      premium: false,
      icon: '🎯',
      cor: 'from-[#0A66C2] to-[#186FEC]',
      selo: 'Ideal para dor na frente do joelho',
      resultado: 'Resultado esperado: redução significativa da dor ao subir escadas e agachar em 3–4 semanas.',
      rota: '/trilhas/condromalacia',
    },
    {
      id: 'agachar',
      nome: 'Dor ao Agachar',
      descricao: 'Recupere sua capacidade de agachar sem dor com correção de movimento e fortalecimento direcionado.',
      duracao: '21 dias',
      nivel: 'Iniciante',
      premium: false,
      icon: '💪',
      cor: 'from-purple-500 to-pink-500',
      selo: 'Progressão segura',
      resultado: 'Resultado esperado: agachamento sem dor em 2–3 semanas.',
      rota: '/trilhas/dor-ao-agachar',
    },
    {
      id: 'escadas',
      nome: 'Dor ao Subir e Descer Escadas',
      descricao: 'Melhore estabilidade e força para subir e descer escadas sem incômodo.',
      duracao: '21 dias',
      nivel: 'Iniciante',
      premium: false,
      icon: '🪜',
      cor: 'from-orange-500 to-red-500',
      selo: 'Especial para iniciantes',
      resultado: 'Resultado esperado: menos dor ao subir escadas em 2–3 semanas.',
      rota: '/trilhas/dor-ao-subir-e-descer-escadas',
    },
    {
      id: 'sobrepeso-joelho',
      nome: 'Sobrepeso + Joelho',
      descricao: 'Exercícios sem impacto para fortalecer e proteger suas articulações.',
      duracao: '21 dias',
      nivel: 'Iniciante',
      premium: false,
      icon: '⚖️',
      cor: 'from-green-500 to-teal-500',
      selo: 'Sem impacto',
      resultado: 'Resultado esperado: fortalecimento articular e redução de sobrecarga em 3 semanas.',
      rota: '/trilhas/sobrepeso-joelho',
    },
    {
      id: 'volta-treinos',
      nome: 'Volta aos Treinos',
      descricao: 'Retorne à musculação, funcional ou treinos esportivos com segurança e sem dor no joelho.',
      duracao: '28 dias',
      nivel: 'Intermediário',
      premium: false,
      icon: '💪',
      cor: 'from-orange-500 to-red-500',
      selo: 'Preparação para treinos',
      resultado: 'Resultado esperado: retorno seguro aos treinos em 3–4 semanas.',
      rota: '/trilhas/volta-treinos',
    },
    {
      id: 'corrida-iniciante',
      nome: 'Corrida Iniciante',
      descricao: 'Prepare seu joelho para correr com técnica, mobilidade e força.',
      duracao: '30 dias',
      nivel: 'Intermediário',
      premium: true,
      icon: '🏃',
      cor: 'from-indigo-500 to-purple-500',
      selo: 'Progressão segura',
      resultado: 'Resultado esperado: joelho preparado para corrida em 4 semanas.',
    },
  ];

  const handleTrilhaClick = (trilha: typeof trilhas[0]) => {
    const temAcesso = verificarAcessoTrilha(trilha.id);
    const ehRecomendada = trilha.id === trilhaRecomendada;

    // Premium tem acesso a tudo
    if (isPremium) {
      if (trilha.rota) {
        router.push(trilha.rota);
      }
      return;
    }

    // Trial ativo na trilha recomendada
    if (trialAtivo && ehRecomendada) {
      if (trilha.rota) {
        router.push(trilha.rota);
      }
      return;
    }

    // Trilha comprada individualmente
    if (temAcesso) {
      if (trilha.rota) {
        router.push(trilha.rota);
      }
      return;
    }

    // Bloqueado - redireciona para trial
    router.push('/trial');
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7] pb-24">
      <Navigation />
      
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0A66C2] to-[#186FEC] text-white pt-12 pb-10 px-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/f090dccd-192c-4ce3-8da1-1e81b091548c.png" 
              alt="Orthoxis Logo" 
              className="h-8 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold mb-3">Escolha a trilha ideal para seu joelho</h1>
          <p className="text-white/90 text-base leading-relaxed">
            Programas de 21 a 30 dias com exercícios terapêuticos, progressão segura e resultados reais.
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-4">
        <div className="space-y-4">
          {trilhas.map((trilha) => {
            const temAcesso = verificarAcessoTrilha(trilha.id);
            const ehRecomendada = trilha.id === trilhaRecomendada;
            const bloqueado = !isPremium && !temAcesso && !(trialAtivo && ehRecomendada);
            
            return (
              <div
                key={trilha.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  bloqueado ? 'opacity-75' : 'hover:shadow-xl'
                } transition-all relative`}
              >
                {/* Badge de trilha recomendada */}
                {ehRecomendada && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Recomendada
                    </span>
                  </div>
                )}

                <div className={`h-2 bg-gradient-to-r ${trilha.cor}`} />
                
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 bg-gradient-to-br ${trilha.cor} rounded-xl flex items-center justify-center text-2xl relative`}>
                        {trilha.icon}
                        {bloqueado && (
                          <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                            <Lock className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-[#2B2F36]">{trilha.nome}</h3>
                      </div>
                      
                      {/* Selo */}
                      <div className="mb-3">
                        <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                          {trilha.selo}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 text-sm mb-3 leading-relaxed">{trilha.descricao}</p>
                      
                      {/* Resultado esperado */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <p className="text-green-800 text-xs leading-relaxed">
                          {trilha.resultado}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{trilha.duracao}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{trilha.nivel}</span>
                        </div>
                      </div>
                      
                      {bloqueado ? (
                        <button
                          onClick={() => handleTrilhaClick(trilha)}
                          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                          <Lock className="w-4 h-4" />
                          Desbloquear trilha
                        </button>
                      ) : (
                        <button
                          onClick={() => handleTrilhaClick(trilha)}
                          className={`w-full bg-gradient-to-r ${trilha.cor} hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl transition-all`}
                        >
                          {ehRecomendada && trialAtivo ? 'Continuar trilha' : 'Iniciar trilha'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Premium */}
        {!isPremium && (
          <div className="mt-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Desbloqueie todas as trilhas</h3>
            <p className="text-white/90 mb-4">
              Acesse programas exclusivos e acelere seus resultados
            </p>
            <button
              onClick={() => router.push('/trial')}
              className="w-full bg-white text-orange-600 font-semibold py-3 px-6 rounded-xl hover:bg-white/90 transition-colors"
            >
              {trialAtivo ? 'Ver planos Premium' : 'Começar 7 dias grátis'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
