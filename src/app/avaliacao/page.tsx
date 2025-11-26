'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import Link from 'next/link';

export default function AvaliacaoPage() {
  const router = useRouter();
  const setAvaliacao = useAppStore((state) => state.setAvaliacao);
  
  const [step, setStep] = useState(1);
  const [ondeDoi, setOndeDoi] = useState('');
  const [quandoDoi, setQuandoDoi] = useState<string[]>([]);
  const [intensidade, setIntensidade] = useState(5);
  const [testeGuiado, setTesteGuiado] = useState('');

  const handleQuandoDoiToggle = (opcao: string) => {
    if (quandoDoi.includes(opcao)) {
      setQuandoDoi(quandoDoi.filter(item => item !== opcao));
    } else {
      setQuandoDoi([...quandoDoi, opcao]);
    }
  };

  const handleFinalizar = () => {
    setAvaliacao({
      ondeDoi,
      quandoDoi,
      intensidade,
      testeGuiado,
    });
    router.push('/resultado');
  };

  const canProceed = () => {
    if (step === 1) return ondeDoi !== '';
    if (step === 2) return quandoDoi.length > 0;
    if (step === 3) return true;
    if (step === 4) return testeGuiado !== '';
    return false;
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7] pb-6">
      {/* Header */}
      <header className="bg-[#2F66F2] text-white pt-12 pb-8 px-6">
        <div className="max-w-md mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <h1 className="text-3xl font-bold mb-2">Avaliação Inteligente</h1>
          <p className="text-[#70CFFF]">Passo {step} de 4</p>
          
          {/* Progress Bar */}
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 -mt-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Step 1: Onde dói? */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1C1C1C] mb-2">Onde dói?</h2>
              <p className="text-gray-600 mb-6">Selecione a região do joelho com dor</p>
              
              <div className="space-y-3">
                {['Frente', 'Lateral de fora', 'Lateral de dentro', 'Atrás', 'Difusa'].map((opcao) => (
                  <button
                    key={opcao}
                    onClick={() => setOndeDoi(opcao)}
                    className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                      ondeDoi === opcao
                        ? 'border-[#2F66F2] bg-[#2F66F2]/5 text-[#2F66F2]'
                        : 'border-gray-200 hover:border-[#2F66F2]/50'
                    }`}
                  >
                    {opcao}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Quando dói? */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1C1C1C] mb-2">Quando dói?</h2>
              <p className="text-gray-600 mb-6">Selecione todas as situações que se aplicam</p>
              
              <div className="space-y-3">
                {['Subir escada', 'Descer escada', 'Agachar', 'Caminhar', 'Sentado muito tempo', 'Academia'].map((opcao) => (
                  <button
                    key={opcao}
                    onClick={() => handleQuandoDoiToggle(opcao)}
                    className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                      quandoDoi.includes(opcao)
                        ? 'border-[#2F66F2] bg-[#2F66F2]/5 text-[#2F66F2]'
                        : 'border-gray-200 hover:border-[#2F66F2]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {opcao}
                      {quandoDoi.includes(opcao) && (
                        <span className="text-[#2F66F2]">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Intensidade */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1C1C1C] mb-2">Intensidade da dor</h2>
              <p className="text-gray-600 mb-6">De 0 (sem dor) a 10 (dor máxima)</p>
              
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Sem dor</span>
                  <span className="text-2xl font-bold text-[#2F66F2]">{intensidade}</span>
                  <span>Dor máxima</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={intensidade}
                  onChange={(e) => setIntensidade(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2F66F2]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <span key={num}>{num}</span>
                  ))}
                </div>
              </div>

              <div className="bg-[#70CFFF]/10 border border-[#70CFFF]/30 rounded-xl p-4">
                <p className="text-sm text-gray-700">
                  <strong>Dica:</strong> Seja honesto sobre sua dor atual. Isso nos ajuda a criar o melhor plano para você.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Teste Guiado */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-[#1C1C1C] mb-2">Teste Guiado</h2>
              <p className="text-gray-600 mb-6">Levante e sente 5 vezes. Como reage o joelho?</p>
              
              <div className="bg-[#F2F4F7] rounded-xl p-6 mb-6">
                <div className="aspect-video bg-gray-300 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-500 text-sm">🎥 Vídeo demonstrativo</span>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Faça o movimento com calma e atenção
                </p>
              </div>
              
              <div className="space-y-3">
                {['Tudo bem', 'Incomoda', 'Dói bastante', 'Não consigo'].map((opcao) => (
                  <button
                    key={opcao}
                    onClick={() => setTesteGuiado(opcao)}
                    className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                      testeGuiado === opcao
                        ? 'border-[#2F66F2] bg-[#2F66F2]/5 text-[#2F66F2]'
                        : 'border-gray-200 hover:border-[#2F66F2]/50'
                    }`}
                  >
                    {opcao}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-colors"
              >
                Anterior
              </button>
            )}
            
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className={`flex-1 font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  canProceed()
                    ? 'bg-[#2F66F2] hover:bg-[#2557d6] text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Próximo
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleFinalizar}
                disabled={!canProceed()}
                className={`flex-1 font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  canProceed()
                    ? 'bg-[#2F66F2] hover:bg-[#2557d6] text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Ver Resultado
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
