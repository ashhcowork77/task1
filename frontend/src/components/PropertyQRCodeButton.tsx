'use client';

import { PropertyQRCode } from './PropertyQRCode';

interface PropertyQRCodeButtonProps {
  propertyUrl: string;
  propertyTitle: string;
  className?: string;
}

export function PropertyQRCodeButton({ propertyUrl, propertyTitle, className }: PropertyQRCodeButtonProps) {
  return (
    <PropertyQRCode
      propertyUrl={propertyUrl}
      propertyTitle={propertyTitle}
      className={className}
    />
  );
}
