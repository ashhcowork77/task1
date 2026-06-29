'use client';

import { useState } from 'react';
import { Phone, User, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CallbackRequestFormProps {
  propertyId?: string;
  propertyTitle?: string;
  className?: string;
}

export function CallbackRequestForm({ propertyId, propertyTitle, className }: CallbackRequestFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Submit to leads API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'callback_request',
          name,
          phone,
          propertyId,
          propertyTitle,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSuccess(true);
      setName('');
      setPhone('');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={cn('bg-green-50 border border-green-200 rounded-xl p-6 text-center', className)}>
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Callback Requested!</h3>
        <p className="text-sm text-gray-600">
          We will call you shortly. Usually within 30 minutes during business hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 text-sm text-[#A1834C] hover:text-[#8a6d3f] font-medium"
        >
          Request another callback
        </button>
      </div>
    );
  }

  return (
    <div className={cn('bg-white border border-gray-200 rounded-xl p-6', className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#A1834C]/10 rounded-lg">
          <Phone className="w-5 h-5 text-[#A1834C]" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Request a Callback</h3>
          <p className="text-xs text-gray-500">We will call you shortly</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="callback-name" className="sr-only">Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              id="callback-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              placeholder="Your name"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#A1834C] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="callback-phone" className="sr-only">Phone number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              id="callback-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              pattern="[+]?[0-9]{10,13}"
              placeholder="+91 98765 43210"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#A1834C] focus:border-transparent"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#A1834C] text-white py-3 rounded-lg font-medium text-sm hover:bg-[#8a6d3f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Request Callback
            </>
          )}
        </button>

        <p className="text-xs text-gray-400 text-center">
          By submitting, you agree to receive a call from our team.
        </p>
      </form>
    </div>
  );
}
