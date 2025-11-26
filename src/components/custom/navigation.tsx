'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Activity, BookOpen, TrendingUp, User } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  
  const links = [
    { href: '/', icon: Home, label: 'Início' },
    { href: '/treino', icon: Activity, label: 'Treino' },
    { href: '/aulas', icon: BookOpen, label: 'Aulas' },
    { href: '/progresso', icon: TrendingUp, label: 'Progresso' },
    { href: '/perfil', icon: User, label: 'Perfil' },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive 
                  ? 'text-[#2F66F2]' 
                  : 'text-gray-500 hover:text-[#2F66F2]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
