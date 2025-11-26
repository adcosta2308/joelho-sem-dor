'use client';

import { Lock, Clock, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/custom/navigation';
import { useAppStore } from '@/lib/store';

export default function AulasPage() {
  const router = useRouter();
  const isPremium = useAppStore((state) => state.isPremium);

  const aulas = [
    {
      id: 'o-que-e',
      titulo: 'O que é condromalácia?',
      descricao: 'Entenda a causa da sua dor e como ela se desenvolve',
      duracao: '3 min',
      premium: false,
      categoria: 'Fundamentos',
    },
    {
      id: 'o-que-piora',
      titulo: 'O que piora a dor?',
      descricao: 'Movimentos e hábitos que você deve evitar',
      duracao: '4 min',
      premium: false,
      categoria: 'Fundamentos',
    },
    {
      id: 'o-que-melhora',
      titulo: 'O que melhora a dor?',
      descricao: 'Estratégias comprovadas para alívio',
      duracao: '5 min',
      premium: false,
      categoria: 'Fundamentos',
    },
    {
      id: 'subir-escada',
      titulo: 'Como subir escada sem dor?',
      descricao: 'Técnica correta e exercícios preparatórios',
      duracao: '6 min',
      premium: true,
      categoria: 'Técnicas',
    },
    {
      id: 'agachar-certo',
      titulo: 'Como agachar certo?',
      descricao: 'Biomecânica do agachamento seguro',
      duracao: '7 min',
      premium: true,
      categoria: 'Técnicas',
    },
    {
      id: 'correr-seguro',
      titulo: 'Voltar a correr com segurança',
      descricao: 'Progressão adequada para corredores',
      duracao: '8 min',
      premium: true,
      categoria: 'Avançado',
    },
    {
      id: 'academia',
      titulo: 'Exercícios de academia para joelho',
      descricao: 'Quais fazer e quais evitar',
      duracao: '10 min',
      premium: true,
      categoria: 'Avançado',
    },
    {
      id: 'nutricao',
      titulo: 'Nutrição para saúde articular',
      descricao: 'Alimentos que ajudam na recuperação',
      duracao: '6 min',
      premium: true,
      categoria: 'Estilo de Vida',
    },
  ];

  const categorias = ['Fundamentos', 'Técnicas', 'Avançado', 'Estilo de Vida'];

  return (
    <div className="min-h-screen bg-[#F2F4F7] pb-24">
      <Navigation />
      
      {/* Header */}
      <header className="bg-gradient-to-br from-[#2F66F2] to-[#70CFFF] text-white pt-12 pb-8 px-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2">Aulas Rápidas</h1>
          <p className="text-white/80">Aprenda, entenda e evolua. Conhecimento acelera resultados.</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-4">
        {categorias.map((categoria) => {
          const aulasDaCategoria = aulas.filter(aula => aula.categoria === categoria);
          
          return (
            <div key={categoria} className="mb-8">
              <h2 className="text-lg font-bold text-[#1C1C1C] mb-4 px-1">{categoria}</h2>
              
              <div className="space-y-3">
                {aulasDaCategoria.map((aula) => {
                  const bloqueado = aula.premium && !isPremium;
                  
                  return (
                    <div
                      key={aula.id}
                      className={`bg-white rounded-xl shadow-sm p-5 ${
                        bloqueado ? 'opacity-75' : 'hover:shadow-md cursor-pointer'
                      } transition-all`}
                      onClick={() => {
                        if (bloqueado) {
                          router.push('/premium');
                        }
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            bloqueado 
                              ? 'bg-gray-100' 
                              : 'bg-gradient-to-br from-[#2F66F2] to-[#70CFFF]'
                          }`}>
                            {bloqueado ? (
                              <Lock className="w-5 h-5 text-gray-400" />
                            ) : (
                              <Play className="w-5 h-5 text-white" />
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-semibold text-[#1C1C1C] pr-2">{aula.titulo}</h3>
                            {bloqueado && (
                              <span className="flex-shrink-0 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
                                Premium
                              </span>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">{aula.descricao}</p>
                          
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{aula.duracao}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* CTA Premium */}
        {!isPremium && (
          <div className="bg-gradient-to-br from-[#2F66F2] to-[#70CFFF] rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Desbloqueie todas as aulas</h3>
            <p className="text-white/90 mb-4">
              Acesse conteúdo exclusivo e aprenda tudo sobre saúde do joelho
            </p>
            <button
              onClick={() => router.push('/premium')}
              className="w-full bg-white text-[#2F66F2] font-semibold py-3 px-6 rounded-xl hover:bg-white/90 transition-colors"
            >
              Assinar Premium
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
