'use client';

import { useCallback, useState } from 'react';
import { Share2, Link2, Check, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// SVG icons for social platforms
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

interface PropertyShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  variant?: 'default' | 'compact' | 'icon-only';
  className?: string;
}

export function PropertyShareButtons({
  url,
  title,
  description,
  image,
  variant = 'default',
  className,
}: PropertyShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  // WhatsApp direct message
  const whatsappUrl = `https://wa.me/?text=${encodedTitle}%20-%20${encodedUrl}`;

  // Facebook share
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  // Twitter/X share
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;

  // Instagram (no direct share, just link)
  const instagramUrl = 'https://instagram.com';

  // Copy link
  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  // Native share API
  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url,
        });
      } catch (error) {
        // User cancelled or error
        if ((error as Error).name !== 'AbortError') {
          console.error('Share failed:', error);
        }
      }
    }
  }, [url, title, description]);

  // Open in new window
  const openShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400,noopener,noreferrer');
  };

  const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (variant === 'icon-only') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        {/* WhatsApp */}
        <button
          onClick={() => openShare(whatsappUrl)}
          className="p-2 rounded-full hover:bg-green-50 text-green-600 transition-colors"
          title="Share on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </button>

        {/* Facebook */}
        <button
          onClick={() => openShare(facebookUrl)}
          className="p-2 rounded-full hover:bg-blue-50 text-blue-600 transition-colors"
          title="Share on Facebook"
        >
          <FacebookIcon className="w-5 h-5" />
        </button>

        {/* Twitter/X */}
        <button
          onClick={() => openShare(twitterUrl)}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-900 transition-colors"
          title="Share on X (Twitter)"
        >
          <TwitterIcon className="w-5 h-5" />
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={cn(
            'p-2 rounded-full transition-colors',
            copied ? 'bg-green-50 text-green-600' : 'hover:bg-gray-100 text-gray-600'
          )}
          title={copied ? 'Copied!' : 'Copy link'}
        >
          {copied ? <Check className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {/* Native Share (Mobile) */}
        {isMobile && (
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#141414] text-white rounded-lg hover:bg-[#333] transition-colors text-sm"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        )}

        {/* WhatsApp */}
        <button
          onClick={() => openShare(whatsappUrl)}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          title="WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={cn(
            'p-2 rounded-lg transition-colors',
            copied
              ? 'bg-green-100 text-green-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
          title={copied ? 'Copied!' : 'Copy link'}
        >
          {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
        </button>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn('space-y-3', className)}>
      <p className="text-sm font-medium text-gray-700">Share this property</p>

      <div className="flex flex-wrap gap-2">
        {/* WhatsApp */}
        <button
          onClick={() => openShare(whatsappUrl)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm font-medium">WhatsApp</span>
        </button>

        {/* Facebook */}
        <button
          onClick={() => openShare(facebookUrl)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FacebookIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Facebook</span>
        </button>

        {/* Twitter/X */}
        <button
          onClick={() => openShare(twitterUrl)}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <TwitterIcon className="w-4 h-4" />
          <span className="text-sm font-medium">X</span>
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
            copied
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
          )}
        >
          {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
          <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>

        {/* Native Share (Mobile only) */}
        {isMobile && (
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-2 px-4 py-2 bg-[#A1834C] text-white rounded-lg hover:bg-[#8a6d3f] transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">More...</span>
          </button>
        )}
      </div>

      {/* Instagram Note */}
      <p className="text-xs text-gray-500">
        For Instagram stories, screenshot the property page or use the QR code above.
      </p>
    </div>
  );
}
