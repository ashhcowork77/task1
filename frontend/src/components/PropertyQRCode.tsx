'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { Download, Share2, QrCode, X } from 'lucide-react';
import QRCode from 'qrcode';
import { cn } from '@/lib/utils';

interface PropertyQRCodeProps {
  propertyUrl: string;
  propertyTitle: string;
  size?: number;
  showOnCard?: boolean;
  className?: string;
}

export function PropertyQRCode({
  propertyUrl,
  propertyTitle,
  size = 200,
  showOnCard = false,
  className,
}: PropertyQRCodeProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate QR code
  useEffect(() => {
    const generateQR = async () => {
      try {
        setIsLoading(true);
        const dataUrl = await QRCode.toDataURL(propertyUrl, {
          width: size,
          margin: 2,
          color: {
            dark: '#141414',
            light: '#ffffff',
          },
        });
        setQrDataUrl(dataUrl);
      } catch (error) {
        console.error('Failed to generate QR code:', error);
      } finally {
        setIsLoading(false);
      }
    };

    generateQR();
  }, [propertyUrl, size]);

  // Download QR code
  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.download = `${propertyTitle.replace(/\s+/g, '-').toLowerCase()}-qr-code.png`;
    link.href = qrDataUrl;
    link.click();
  }, [qrDataUrl, propertyTitle]);

  // Copy URL to clipboard
  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(propertyUrl);
      alert('Link copied!');
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = propertyUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }, [propertyUrl]);

  // Draw to canvas for printing
  useEffect(() => {
    if (canvasRef.current && qrDataUrl) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          canvas.width = size;
          canvas.height = size + 60; // Extra space for title
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, size, size);
          ctx.fillStyle = '#141414';
          ctx.font = '14px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(propertyTitle.substring(0, 30), size / 2, size + 25);
          ctx.font = '10px Arial';
          ctx.fillStyle = '#6f6f6f';
          ctx.fillText(propertyUrl.substring(0, 50), size / 2, size + 45);
        };
        img.src = qrDataUrl;
      }
    }
  }, [qrDataUrl, propertyTitle, propertyUrl, size]);

  // For card display (small inline version)
  if (showOnCard) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm',
          className
        )}
        title="View QR Code"
      >
        <QrCode className="w-4 h-4 text-[#A1834C]" />
        <span className="hidden sm:inline">QR</span>
      </button>
    );
  }

  // Modal version
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 bg-[#A1834C] text-white rounded-lg hover:bg-[#8a6d3f] transition-colors',
          className
        )}
      >
        <QrCode className="w-4 h-4" />
        View QR Code
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Property QR Code</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-52">
                <div className="w-8 h-8 border-2 border-[#A1834C] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {/* QR Code Display */}
                <div className="flex justify-center p-4 bg-white rounded-xl border border-gray-200">
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={qrDataUrl} alt={`QR Code for ${propertyTitle}`} className="w-48 h-48" />
                </div>

                {/* Property Info */}
                <p className="text-center mt-4 font-medium text-gray-900">{propertyTitle}</p>
                <p className="text-center text-sm text-gray-500 truncate">{propertyUrl}</p>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#A1834C] text-white rounded-lg hover:bg-[#8a6d3f] transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Copy Link
                  </button>
                </div>

                {/* Print Instructions */}
                <p className="text-center text-xs text-gray-400 mt-4">
                  Right-click the QR code and select &quot;Print&quot; for print ads
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hidden canvas for print quality */}
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}
