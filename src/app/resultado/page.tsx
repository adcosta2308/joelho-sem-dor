'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function ResultadoPage() {
  const router = useRouter();
  const avaliacao = useAppStore((state) => state.avaliacao);

  const getDiagnostico = () => {
    if (!avaliacao) return 'Condromalácia leve';
    
    if (avaliacao.intensidade >= 7) return 'Condromalácia moderada';
    if (avaliacao.intensidade >= 4) return 'Condromalácia leve';
    return 'Desconforto no joelho';
  };

  const getDescricao = () => {
    const diagnostico = getDiagnostico();
    
    if (diagnostico === 'Condromalácia moderada') {
      return 'Seus sintomas indicam uma condição que precisa de atenção. A boa notícia: com os exercícios certos e consistência, você pode reduzir significativamente a dor.';
    }
    
    if (diagnostico === 'Condromalácia leve') {
      return 'Você tem sinais de Condromalácia leve. A boa notícia: isso melhora rápido com exercícios certos.';
    }
    
    return 'Você apresenta desconforto no joelho que pode ser aliviado com fortalecimento e mobilidade adequados.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2F66F2]/5 to-white pb-6">
      {/* Header */}
      <header className="bg-[#2F66F2] text-white pt-12 pb-16 px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Avaliação Concluída</h1>
          <p className="text-[#70CFFF]">Aqui está seu resultado</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-8">
        {/* Resultado Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="text-center mb-6">
            <span className="inline-block bg-[#70CFFF]/20 text-[#2F66F2] font-semibold px-4 py-2 rounded-full text-sm mb-4">
              Diagnóstico Provável
            </span>
            <h2 className="text-2xl font-bold text-[#1C1C1C] mb-3">
              {getDiagnostico()}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {getDescricao()}
            </p>
          </div>

          {/* Sintomas Identificados */}
          {avaliacao && (
            <div className="bg-[#F2F4F7] rounded-xl p-5 mb-6">
              <h3 className="font-semibold text-[#1C1C1C] mb-3">Sintomas identificados:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#2F66F2] mt-0.5">•</span>
                  <span>Dor na região: <strong>{avaliacao.ondeDoi}</strong></span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#2F66F2] mt-0.5">•</span>
                  <span>Intensidade: <strong>{avaliacao.intensidade}/10</strong></span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#2F66F2] mt-0.5">•</span>
                  <span>Teste funcional: <strong>{avaliacao.testeGuiado}</strong></span>
                </li>
              </ul>
            </div>
          )}

          {/* O que esperar */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-[#1C1C1C] mb-4">O que esperar:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="font-medium text-[#1C1C1C]">Primeiros 7 dias</p>
                  <p className="text-sm text-gray-600">Redução inicial da dor e melhora da mobilidade</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💪</span>
                <div>
                  <p className="font-medium text-[#1C1C1C]">Até 30 dias</p>
                  <p className="text-sm text-gray-600">Fortalecimento progressivo e alívio significativo</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="font-medium text-[#1C1C1C]">Longo prazo</p>
                  <p className="text-sm text-gray-600">Joelho mais forte e funcional para suas atividades</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push('/plano')}
          className="w-full bg-[#2F66F2] hover:bg-[#2557d6] text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-md"
        >
          Iniciar plano de 7 dias
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 text-center mt-6 px-4">
          Esta avaliação não substitui consulta médica. Em caso de dor intensa ou persistente, procure um profissional de saúde.
        </p>
      </main>
    </div>
  );
}
