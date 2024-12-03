import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function NavLink({ to, children, icon }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'bg-green-700 text-white' 
          : 'text-green-100 hover:bg-green-700/50'
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}