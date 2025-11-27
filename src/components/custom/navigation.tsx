'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Dumbbell, BookOpen, TrendingUp, User, LogOut } from 'lucide-react';
import { getCurrentUser, signOut } from '@/lib/auth-helpers';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const user = await getCurrentUser();
    setIsLoggedIn(!!user);
  };

  const handleLogout = async () => {
    await signOut();
    setIsLoggedIn(false);
    setShowLogoutMenu(false);
    router.push('/');
    router.refresh();
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    if (isLoggedIn && pathname === '/perfil') {
      e.preventDefault();
      setShowLogoutMenu(!showLogoutMenu);
    }
  };
  
  const links = [
    { href: '/', icon: Home, label: 'Início' },
    { href: '/trilhas', icon: Dumbbell, label: 'Trilhas' },
    { href: '/aulas', icon: BookOpen, label: 'Aulas' },
    { href: '/progresso', icon: TrendingUp, label: 'Progresso' },
    { href: '/perfil', icon: User, label: 'Perfil' },
  ];
  
  return (
    <>
      {/* Menu de Logout */}
      {showLogoutMenu && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-end justify-center pb-20" onClick={() => setShowLogoutMenu(false)}>
          <div className="bg-white rounded-t-2xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              Sair da conta
            </button>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={link.href === '/perfil' ? handleProfileClick : undefined}
                className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                  isActive 
                    ? 'text-[#0A66C2]' 
                    : 'text-gray-500 hover:text-[#0A66C2]'
                }`}
              >
                <div className={`p-2 rounded-full transition-all duration-300 relative ${
                  isActive 
                    ? 'bg-[#36C2FF]/20' 
                    : 'hover:bg-gray-100'
                }`}>
                  <Icon className="w-5 h-5" strokeWidth={2.5} />
                  {link.href === '/perfil' && isLoggedIn && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <span className="text-xs font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
