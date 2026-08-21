import React, { useEffect } from 'react';
import { IconClose } from './Icons';
import { cn } from '@/lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: 'max-w-[380px]',
    md: 'max-w-[560px]',
    lg: 'max-w-[720px]',
    xl: 'max-w-[900px]',
  }[maxWidth];

  return (
    <div
      className="fixed inset-0 z-[250] bg-[#140e0b]/40 backdrop-blur-[2px] flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={cn(
          'w-full bg-[#f7f3ec] border border-[#e8e0d0] rounded-2xl p-6 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto',
          widthClasses
        )}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            {title && <h2 className="font-serif text-xl md:text-2xl font-bold text-[#1e120a]">{title}</h2>}
            {subtitle && <p className="text-xs md:text-sm text-[#6b5744] mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-[#e8e0d0] bg-white flex items-center justify-center text-[#1e120a] hover:bg-[#f7f3ec] hover:border-[#1e120a] transition-all flex-shrink-0"
            aria-label="Close modal"
          >
            <IconClose />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
