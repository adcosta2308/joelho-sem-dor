'use client';

import Link from 'next/link';
import { ArrowRight, Heart, Activity, BookOpen, LineChart } from 'lucide-react';
import Navigation from '@/components/custom/navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#70CFFF]/10 to-white pb-24">
      <Navigation />
      
      {/* Header */}
      <header className="bg-[#2F66F2] text-white pt-12 pb-16 px-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-3">Joelho Sem Dor</h1>
          <p className="text-[#70CFFF] text-lg">Seu alívio começa aqui</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 -mt-8">
        {/* Hero Card - Mais compacto */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-[#1C1C1C] mb-2">
            Seu alívio começa aqui
          </h2>
          <p className="text-gray-600 text-sm mb-5 leading-relaxed">
            Avalie sua dor e receba um plano personalizado em 2 minutos.
          </p>
          
          <Link 
            href="/avaliacao"
            className="w-full bg-[#2F66F2] hover:bg-[#2557d6] text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-md mb-3"
          >
            Avaliar minha dor
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <Link 
            href="/trilhas"
            className="block text-center text-[#2F66F2] font-medium text-sm hover:underline"
          >
            Ver exercícios
          </Link>
        </div>

        {/* Features - Com espaçamento aumentado */}
        <div className="space-y-5 mb-8">
          <FeatureCard
            icon={<Heart className="w-7 h-7 text-[#2F66F2]" />}
            title="Avaliação Inteligente"
            description="Identifique seu tipo de dor em poucos minutos."
          />
          <FeatureCard
            icon={<Activity className="w-7 h-7 text-[#2F66F2]" />}
            title="Treinos Personalizados"
            description="Exercícios certos para o seu nível de dor e força."
          />
          <FeatureCard
            icon={<BookOpen className="w-7 h-7 text-[#2F66F2]" />}
            title="Aulas Rápidas"
            description="Aprenda o que acelera e o que atrapalha sua recuperação."
          />
          <FeatureCard
            icon={<LineChart className="w-7 h-7 text-[#2F66F2]" />}
            title="Acompanhamento"
            description="Monitore sua evolução com segurança, semana a semana."
          />
        </div>

        {/* CTA Secundário - Plano de Crise */}
        <div className="mb-8">
          <Link 
            href="/crise"
            className="block w-full text-center bg-white border-2 border-[#2F66F2] text-[#2F66F2] font-medium py-3.5 px-6 rounded-xl hover:bg-[#2F66F2] hover:text-white transition-all duration-300"
          >
            Minha dor piorou hoje
          </Link>
        </div>

        {/* Social Login */}
        <div className="bg-[#F2F4F7] rounded-2xl p-6">
          <p className="text-center text-gray-600 text-sm mb-4">
            Entre para salvar seu progresso
          </p>
          <div className="space-y-3">
            <button className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar com Google
            </button>
            <button className="w-full bg-[#1C1C1C] text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#2d2d2d] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Continuar com Apple
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 bg-[#70CFFF]/10 rounded-full p-3">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-[#1C1C1C] mb-1.5 text-base">{title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
