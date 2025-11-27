'use client';

import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { aulasRapidas, categorias, recomendacoesPorTrilha } from '@/lib/aulas-data';
import { PlayCircle, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

export default function AulasRapidasPage() {
  const router = useRouter();
  const { aulasConcluidasIds, ultimaAulaVisualizada, progresso } = useAppStore();

  // Calcular progresso por categoria
  const calcularProgressoCategoria = (categoria: string) => {
    const aulasDaCategoria = aulasRapidas.filter(a => a.categoria === categoria);
    const concluidasDaCategoria = aulasDaCategoria.filter(a => 
      aulasConcluidasIds.includes(a.id)
    ).length;
    return Math.round((concluidasDaCategoria / aulasDaCategoria.length) * 100);
  };

  // Obter aula recomendada baseada na trilha atual
  const aulaRecomendada = progresso.trilhaAtual 
    ? aulasRapidas.find(a => a.id === recomendacoesPorTrilha[progresso.trilhaAtual])
    : null;

  // Obter última aula visualizada para "Continuar de onde parei"
  const ultimaAula = ultimaAulaVisualizada 
    ? aulasRapidas.find(a => a.id === ultimaAulaVisualizada)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Aulas Rápidas
          </h1>
          <p className="text-gray-600 text-lg">
            Aulas rápidas para entender sua dor, melhorar sua técnica e acelerar resultados.
          </p>
        </div>

        {/* Botão Continuar de onde parei */}
        {ultimaAula && (
          <button
            onClick={() => router.push(`/aulas-rapidas/${ultimaAula.id}`)}
            className="w-full mb-8 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-between transition-colors shadow-lg"
          >
            <div className="flex items-center gap-3">
              <PlayCircle className="w-6 h-6" />
              <div className="text-left">
                <div className="font-semibold">Continuar de onde parei</div>
                <div className="text-sm text-blue-100">{ultimaAula.titulo}</div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}

        {/* Recomendação baseada na trilha */}
        {aulaRecomendada && !aulasConcluidasIds.includes(aulaRecomendada.id) && (
          <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                <PlayCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">
                  Recomendado para você
                </h3>
                <p className="text-gray-700 font-semibold mb-1">
                  {aulaRecomendada.titulo}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {aulaRecomendada.subtitulo}
                </p>
                <button
                  onClick={() => router.push(`/aulas-rapidas/${aulaRecomendada.id}`)}
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Assistir agora
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Categorias */}
        <div className="space-y-8">
          {Object.entries(categorias).map(([key, categoria]) => {
            const progresso = calcularProgressoCategoria(key);
            const aulasDaCategoria = aulasRapidas.filter(a => a.categoria === key);

            return (
              <div key={key} className="space-y-4">
                {/* Header da Categoria */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-gray-900">
                      {categoria.nome}
                    </h2>
                    <span className="text-sm font-semibold text-blue-600">
                      {progresso}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {categoria.descricao}
                  </p>
                  {/* Barra de Progresso */}
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${progresso}%` }}
                    />
                  </div>
                </div>

                {/* Cards das Aulas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aulasDaCategoria.map((aula) => {
                    const concluida = aulasConcluidasIds.includes(aula.id);

                    return (
                      <button
                        key={aula.id}
                        onClick={() => router.push(`/aulas-rapidas/${aula.id}`)}
                        className={`p-5 rounded-xl border-2 text-left transition-all hover:shadow-lg ${
                          concluida
                            ? 'bg-green-50 border-green-300'
                            : 'bg-white border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Ícone */}
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            concluida ? 'bg-green-500' : 'bg-blue-500'
                          }`}>
                            {concluida ? (
                              <CheckCircle2 className="w-6 h-6 text-white" />
                            ) : (
                              <PlayCircle className="w-6 h-6 text-white" />
                            )}
                          </div>

                          {/* Conteúdo */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">
                              {aula.titulo}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                              {aula.subtitulo}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{aula.duracao}</span>
                              {concluida && (
                                <span className="ml-auto text-green-600 font-semibold">
                                  Concluída
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
