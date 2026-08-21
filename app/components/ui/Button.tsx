import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'call' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-bold transition-all rounded-full cursor-pointer select-none';

  const variantClasses = {
    primary: 'bg-[#1e120a] text-white hover:bg-[#4a2c17] active:scale-[0.98]',
    secondary: 'bg-[#ede6d6] text-[#1e120a] hover:bg-[#e8e0d0]',
    outline: 'border border-[#e8e0d0] bg-white text-[#1e120a] hover:border-[#1e120a]',
    whatsapp: 'bg-[#25d366] text-white hover:bg-[#1ebe5d] active:scale-[0.98]',
    call: 'bg-[#1e120a] text-white hover:bg-[#4a2c17] active:scale-[0.98]',
    ghost: 'bg-transparent text-[#1e120a] hover:bg-[#f7f3ec]',
  }[variant];

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  }[size];

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses,
        sizeClasses,
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
