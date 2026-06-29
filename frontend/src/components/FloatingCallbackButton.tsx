'use client';

import { useState } from 'react';
import { Phone, X } from 'lucide-react';
import { CallbackRequestForm } from './CallbackRequestForm';
import { cn } from '@/lib/utils';

interface FloatingCallbackButtonProps {
  propertyId?: string;
  propertyTitle?: string;
  className?: string;
}

export function FloatingCallbackButton({ propertyId, propertyTitle, className }: FloatingCallbackButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-20 right-4 z-40 flex items-center gap-2 bg-[#A1834C] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#8a6d3f] transition-all hover:scale-105 active:scale-95',
          'md:hidden', // Only show on mobile
          className
        )}
        aria-label="Request callback"
      >
        <Phone className="w-5 h-5" />
        <span className="text-sm font-medium">Callback</span>
      </button>

      {/* Bottom Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Sheet */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 animate-slide-up max-h-[80vh] overflow-y-auto">
            {/* Handle */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Request a Callback</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Form */}
            <CallbackRequestForm
              propertyId={propertyId}
              propertyTitle={propertyTitle}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
