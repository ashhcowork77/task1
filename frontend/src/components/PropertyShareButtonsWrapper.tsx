'use client';

import { PropertyShareButtons } from './PropertyShareButtons';

interface PropertyShareButtonsWrapperProps {
  url: string;
  title: string;
  description?: string;
  variant?: 'default' | 'compact' | 'icon-only';
  className?: string;
}

export function PropertyShareButtonsWrapper(props: PropertyShareButtonsWrapperProps) {
  return <PropertyShareButtons {...props} />;
}
