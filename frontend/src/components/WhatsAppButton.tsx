'use client';

import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  propertyTitle?: string;
  variant?: 'default' | 'icon-only' | 'floating';
  className?: string;
}

/**
 * WhatsApp Direct Button Component
 * Opens WhatsApp with pre-filled message
 */
export function WhatsAppButton({
  phoneNumber = '919876543210', // Default placeholder - should be configured
  message = '',
  propertyTitle,
  variant = 'default',
  className,
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(
    message || (propertyTitle ? `Hi, I'm interested in: ${propertyTitle}` : 'Hi, I would like to know more about your properties.')
  );
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;

  const handleClick = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (variant === 'icon-only') {
    return (
      <button
        onClick={handleClick}
        className={cn(
          'p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors',
          className
        )}
        title="Contact via WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </button>
    );
  }

  if (variant === 'floating') {
    return (
      <button
        onClick={handleClick}
        className={cn(
          'fixed bottom-20 right-4 z-40 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-105 active:scale-95',
          'md:bottom-6 md:right-6',
          className
        )}
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-medium">WhatsApp</span>
      </button>
    );
  }

  // Default variant
  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors',
        className
      )}
    >
      <MessageCircle className="w-5 h-5" />
      <span className="font-medium">WhatsApp</span>
    </button>
  );
}
