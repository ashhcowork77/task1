'use client';

import { useCallback, useState } from 'react';
import { Share2, Link2, Check, MessageCircle, Facebook, Twitter, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

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
          <Facebook className="w-5 h-5" />
        </button>

        {/* Twitter/X */}
        <button
          onClick={() => openShare(twitterUrl)}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-900 transition-colors"
          title="Share on X (Twitter)"
        >
          <Twitter className="w-5 h-5" />
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
          <Facebook className="w-4 h-4" />
          <span className="text-sm font-medium">Facebook</span>
        </button>

        {/* Twitter/X */}
        <button
          onClick={() => openShare(twitterUrl)}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Twitter className="w-4 h-4" />
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
