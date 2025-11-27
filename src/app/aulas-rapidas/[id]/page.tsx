'use client';

import { useRouter, useParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { aulasRapidas, categorias } from '@/lib/aulas-data';
import { PlayCircle, CheckCircle2, ArrowLeft, Lightbulb, Target } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AulaInternaPage() {
  const router = useRouter();
  const params = useParams();
  const { concluirAula, marcarAulaVisualizada, aulasConcluidasIds } = useAppStore();
  const [mostrarProximaAula, setMostrarProximaAula] = useState(false);
  const [proximaAulaSugerida, setProximaAulaSugerida] = useState<any>(null);

  const aulaId = params.id as string;
  const aula = aulasRapidas.find(a => a.id === aulaId);

  useEffect(() => {
    if (aula) {
      marcarAulaVisualizada(aula.id);
    }
  }, [aula, marcarAulaVisualizada]);

  if (!aula) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Aula não encontrada</h1>
          <button
            onClick={() => router.push('/aulas-rapidas')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Voltar para Aulas Rápidas
          </button>
        </div>
      </div>
    );
  }

  const concluida = aulasConcluidasIds.includes(aula.id);
  const categoria = categorias[aula.categoria];

  const handleConcluir = () => {
    concluirAula(aula.id);

    // Buscar próxima aula não concluída da mesma categoria
    const aulasDaCategoria = aulasRapidas.filter(a => a.categoria === aula.categoria);
    const indexAtual = aulasDaCategoria.findIndex(a => a.id === aula.id);
    
    if (indexAtual < aulasDaCategoria.length - 1) {
      const proximaAula = aulasDaCategoria[indexAtual + 1];
      if (!aulasConcluidasIds.includes(proximaAula.id)) {
        setProximaAulaSugerida(proximaAula);
        setMostrarProximaAula(true);
        
        // Retornar após 2 segundos
        setTimeout(() => {
          router.push('/aulas-rapidas');
        }, 2000);
        return;
      }
    }

    // Se não houver próxima aula, retornar imediatamente
    router.push('/aulas-rapidas');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <button
          onClick={() => router.push('/aulas-rapidas')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Voltar para Aulas Rápidas</span>
        </button>

        {/* Badge da Categoria */}
        <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
          {categoria.nome}
        </div>

        {/* Título e Subtítulo */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {aula.titulo}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {aula.subtitulo}
        </p>

        {/* Duração */}
        <div className="flex items-center gap-2 text-gray-500 mb-8">
          <PlayCircle className="w-5 h-5" />
          <span className="font-semibold">{aula.duracao}</span>
        </div>

        {/* Área de Vídeo (Placeholder) */}
        <div className="w-full aspect-video bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl mb-8 flex items-center justify-center shadow-lg">
          <div className="text-center text-white">
            <PlayCircle className="w-20 h-20 mx-auto mb-4 opacity-80" />
            <p className="text-lg font-semibold">Vídeo da Aula</p>
            <p className="text-sm opacity-80 mt-2">Conteúdo em vídeo será adicionado em breve</p>
          </div>
        </div>

        {/* Conteúdo da Aula */}
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-8">
              {aula.conteudo.introducao}
            </p>

            {/* Pontos Principais */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">Pontos Principais</h2>
              </div>
              <ul className="space-y-3">
                {aula.conteudo.pontosprincipais.map((ponto, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{ponto}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Aplicação Prática */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">Aplicação Prática</h2>
              </div>
              <ul className="space-y-3">
                {aula.conteudo.aplicacaoPratica.map((aplicacao, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{aplicacao}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Botão Concluir */}
        {!concluida ? (
          <button
            onClick={handleConcluir}
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg transition-colors shadow-lg"
          >
            Concluir aula
          </button>
        ) : (
          <div className="w-full py-4 bg-green-100 border-2 border-green-300 text-green-700 rounded-xl font-bold text-lg text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            Aula concluída
          </div>
        )}

        {/* Banner Próxima Aula Sugerida */}
        {mostrarProximaAula && proximaAulaSugerida && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Aula Concluída!
                </h3>
                <p className="text-gray-600 mb-6">
                  Próxima aula sugerida:
                </p>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                  <p className="font-bold text-gray-900 mb-1">
                    {proximaAulaSugerida.titulo}
                  </p>
                  <p className="text-sm text-gray-600">
                    {proximaAulaSugerida.subtitulo}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  Retornando para Aulas Rápidas...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
