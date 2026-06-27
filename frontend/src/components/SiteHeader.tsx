'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Home, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Villas', href: '/properties', hasChevron: true },
  { label: 'Experiences', href: '/activities' },
  { label: 'Visit, Eat, Stay', href: '/#estate' },
  { label: 'Stories', href: '/#stories' },
  { label: 'Company', href: '/#contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[#f8f8f8]/[0.82] backdrop-blur-xl">
        <div className="grid grid-cols-3 items-center px-5 py-4 md:px-10">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-11 w-11 items-center justify-center justify-self-start border border-black/10 bg-white/70 text-[#141414] transition-colors hover:bg-white md:hidden"
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 justify-self-start md:flex">
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-1 text-[13px] font-medium text-[#141414] transition-opacity hover:opacity-60"
              >
                {item.label}
                {item.hasChevron && <ChevronDown className="h-3.5 w-3.5" />}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link href="/" className="justify-self-center text-center text-xl font-black leading-[0.85] tracking-tight text-[#141414]">
            NOT JUST<br />A STAY
          </Link>

          {/* Desktop right nav */}
          <div className="hidden items-center gap-7 justify-self-end md:flex">
            {navItems.slice(3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium text-[#141414] transition-opacity hover:opacity-60"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 border border-black/10 bg-white/80 px-6 py-2.5 text-[13px] font-medium text-[#141414] backdrop-blur-md transition-colors hover:bg-white"
            >
              <Home className="h-4 w-4" />
              Book a villa
            </Link>
          </div>

          {/* Mobile Book button */}
          <Link
            href="/properties"
            className="flex h-11 items-center justify-center justify-self-end bg-[#141414] px-4 text-[12px] font-semibold uppercase text-white transition-colors hover:bg-[#a1834c] md:hidden"
          >
            Book
          </Link>
        </div>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/25 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu drawer */}
      <aside
        className={`fixed bottom-0 right-0 top-0 z-[70] flex w-[85vw] max-w-xs flex-col bg-[#f8f8f8] p-6 shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-black leading-[0.85] tracking-tight text-[#141414]">
            NOT JUST<br />A STAY
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-11 w-11 items-center justify-center border border-black/10 bg-white"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-10 flex flex-col gap-0">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between border-t border-black/10 py-4 text-xl font-medium text-[#141414] transition-colors hover:text-[#a1834c]"
              style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateX(0)' : 'translateX(20px)', transition: `opacity 300ms ease ${index * 50}ms, transform 300ms ease ${index * 50}ms` }}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
              {item.hasChevron && <ChevronDown className="h-4 w-4 text-[#a1834c]" />}
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-black/10 pt-6">
          <Link
            href="/properties"
            className="flex items-center justify-center gap-2 bg-[#141414] px-6 py-4 text-[13px] font-semibold uppercase text-white transition-colors hover:bg-[#a1834c]"
            onClick={() => setIsOpen(false)}
          >
            <Home className="h-4 w-4" />
            Book a villa
          </Link>
        </div>
      </aside>
    </>
  );
}