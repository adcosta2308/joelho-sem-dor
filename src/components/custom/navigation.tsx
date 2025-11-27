'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Dumbbell, BookOpen, TrendingUp, User } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  
  const links = [
    { href: '/', icon: Home, label: 'Início' },
    { href: '/trilhas', icon: Dumbbell, label: 'Trilhas' },
    { href: '/aulas', icon: BookOpen, label: 'Aulas' },
    { href: '/progresso', icon: TrendingUp, label: 'Progresso' },
    { href: '/perfil', icon: User, label: 'Perfil' },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                isActive 
                  ? 'text-[#2F66F2]' 
                  : 'text-gray-500 hover:text-[#2F66F2]'
              }`}
            >
              <div className={`p-2 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-[#70CFFF]/20' 
                  : 'hover:bg-gray-100'
              }`}>
                <Icon className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
