'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signUp, signInWithGoogle } from '@/lib/auth-helpers';
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validações básicas
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    const result = await signUp(email, password, nome);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
        router.refresh();
      }, 2000);
    } else {
      setError(result.error || 'Erro ao criar conta');
    }

    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);

    const result = await signInWithGoogle();

    if (!result.success) {
      setError(result.error || 'Erro ao cadastrar com Google');
      setLoading(false);
    }
    // Se sucesso, o usuário será redirecionado automaticamente
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#36C2FF]/10 to-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#2B2F36] mb-2">Conta criada com sucesso!</h2>
            <p className="text-gray-600 mb-4">Redirecionando...</p>
            <Loader2 className="w-6 h-6 animate-spin text-[#0A66C2] mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#36C2FF]/10 to-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/2fd8a863-c8a1-4df9-b664-fde628c8aef4.png" 
            alt="Orthoxis Logo" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-[#2B2F36] mb-2">Crie sua conta</h1>
          <p className="text-gray-600">Comece sua jornada para um joelho livre</p>
        </div>

        {/* Card de Cadastro */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Erro */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nome */}
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                Nome completo
              </label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all"
                placeholder="Seu nome"
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all"
                placeholder="seu@email.com"
                disabled={loading}
              />
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all pr-12"
                  placeholder="Mínimo 6 caracteres"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Mínimo de 6 caracteres</p>
            </div>

            {/* Botão de Cadastro */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A66C2] hover:bg-[#186FEC] text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Criando conta...
                </>
              ) : (
                'Criar conta'
              )}
            </button>
          </form>

          {/* Divisor */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">ou</span>
            </div>
          </div>

          {/* Cadastro Social */}
          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar com Google
          </button>

          {/* Link para Login */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-[#0A66C2] font-semibold hover:underline">
              Entrar
            </Link>
          </p>
        </div>

        {/* Link para voltar */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-800">
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
