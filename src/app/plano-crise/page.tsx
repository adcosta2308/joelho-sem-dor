'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, AlertTriangle, CheckCircle2, Phone } from 'lucide-react';

export default function PlanoCrisePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="bg-red-600 text-white pt-12 pb-8 px-6">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-2 text-white/90 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Plano de Crise</h1>
          </div>
          <p className="text-red-100">
            O que fazer quando a dor aumenta
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-8">
        {/* Alerta Importante */}
        <div className="bg-red-100 border-2 border-red-300 rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-900 mb-2">
                Atenção: Dor intensa ou súbita
              </h3>
              <p className="text-sm text-red-800 leading-relaxed">
                Se sua dor aumentou muito de repente, está insuportável ou vem acompanhada de inchaço, vermelhidão ou febre, procure um médico imediatamente.
              </p>
            </div>
          </div>
        </div>

        {/* Instruções */}
        <div className="space-y-6 mb-8">
          <InstrucaoCard
            numero={1}
            titulo="Pare e descanse"
            descricao="Interrompa qualquer atividade que esteja causando dor. Deite-se ou sente-se confortavelmente e mantenha o joelho em repouso por 15-30 minutos."
            cor="bg-blue-500"
          />

          <InstrucaoCard
            numero={2}
            titulo="Aplique gelo"
            descricao="Coloque uma bolsa de gelo (ou saco de gelo envolto em toalha) sobre o joelho por 15-20 minutos. Repita a cada 2-3 horas se necessário. Nunca aplique gelo diretamente na pele."
            cor="bg-cyan-500"
          />

          <InstrucaoCard
            numero={3}
            titulo="Eleve a perna"
            descricao="Deite-se e coloque o joelho elevado acima do nível do coração usando travesseiros. Isso ajuda a reduzir o inchaço e alivia a pressão."
            cor="bg-purple-500"
          />
        </div>

        {/* O que evitar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-[#1C1C1C] mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            O que NÃO fazer
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold">✗</span>
              <span className="text-gray-700 text-sm">Não force movimentos que causam dor</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold">✗</span>
              <span className="text-gray-700 text-sm">Não aplique calor nas primeiras 48 horas</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold">✗</span>
              <span className="text-gray-700 text-sm">Não tome medicamentos sem orientação médica</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 font-bold">✗</span>
              <span className="text-gray-700 text-sm">Não ignore dor intensa ou persistente</span>
            </li>
          </ul>
        </div>

        {/* Quando retornar */}
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-green-900 mb-2">
                Quando retornar aos exercícios?
              </h3>
              <p className="text-sm text-green-800 leading-relaxed">
                Retome os exercícios apenas quando a dor aguda diminuir e você conseguir realizar movimentos básicos sem desconforto intenso. Comece devagar e ouça seu corpo.
              </p>
            </div>
          </div>
        </div>

        {/* Contato de Emergência */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="w-6 h-6 text-[#2F66F2]" />
            <h3 className="font-bold text-[#1C1C1C]">Precisa de ajuda?</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Se a dor não melhorar em 48 horas ou piorar, consulte um fisioterapeuta ou médico ortopedista.
          </p>
          <a
            href="tel:192"
            className="block w-full text-center bg-red-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-red-700 transition-all duration-300"
          >
            Ligar para emergência (192)
          </a>
        </div>

        {/* Botão de retorno */}
        <button
          onClick={() => router.back()}
          className="w-full bg-[#2F66F2] hover:bg-[#2557d6] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300"
        >
          Retornar ao treino
        </button>
      </main>
    </div>
  );
}

function InstrucaoCard({ 
  numero, 
  titulo, 
  descricao, 
  cor 
}: { 
  numero: number; 
  titulo: string; 
  descricao: string; 
  cor: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-start gap-4">
        <div className={`${cor} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0`}>
          {numero}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-[#1C1C1C] mb-2 text-lg">
            {titulo}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {descricao}
          </p>
        </div>
      </div>
    </div>
  );
}
