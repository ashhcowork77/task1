'use client';

import { useState, useEffect, useCallback } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'saved_properties';

interface UseSavedPropertiesReturn {
  savedIds: string[];
  isSaved: (propertyId: string) => boolean;
  toggleSaved: (propertyId: string) => void;
  clearAll: () => void;
  count: number;
}

/**
 * Hook to manage saved/shortlisted properties
 * Uses localStorage for persistence
 */
export function useSavedProperties(): UseSavedPropertiesReturn {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setSavedIds(JSON.parse(stored));
        } catch {
          setSavedIds([]);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Persist to localStorage when savedIds changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    }
  }, [savedIds, isLoaded]);

  const isSaved = useCallback(
    (propertyId: string) => savedIds.includes(propertyId),
    [savedIds]
  );

  const toggleSaved = useCallback((propertyId: string) => {
    setSavedIds((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId);
      }
      return [...prev, propertyId];
    });
  }, []);

  const clearAll = useCallback(() => {
    setSavedIds([]);
  }, []);

  return {
    savedIds,
    isSaved,
    toggleSaved,
    clearAll,
    count: savedIds.length,
  };
}

/**
 * Save/Shortlist Button Component
 */
interface SaveButtonProps {
  propertyId: string;
  className?: string;
}

export function SaveButton({ propertyId, className }: SaveButtonProps) {
  const { isSaved, toggleSaved } = useSavedProperties();
  const saved = isSaved(propertyId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSaved(propertyId);
      }}
      className={cn(
        'p-2 rounded-full transition-all',
        saved
          ? 'bg-red-50 text-red-500 hover:bg-red-100'
          : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white',
        className
      )}
      title={saved ? 'Remove from saved' : 'Save property'}
    >
      <Heart
        className={cn('w-5 h-5', saved && 'fill-current')}
      />
    </button>
  );
}

/**
 * Saved Properties Counter Badge
 */
export function SavedCountBadge({ className }: { className?: string }) {
  const { count } = useSavedProperties();

  if (count === 0) return null;

  return (
    <span
      className={cn(
        'absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-bold bg-red-500 text-white rounded-full px-1',
        className
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}
