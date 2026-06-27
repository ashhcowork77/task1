import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, MapPin } from 'lucide-react';
import { getFeaturedProperties } from '@/lib/data/properties';
import type { Property } from '@/types';
import { getPropertyImageUrl } from '@/lib/media';
import { Reveal } from '@/components/Reveal';

const heroImage = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2400&q=85&auto=format&fit=crop';
const storyImage = 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1800&q=85&auto=format&fit=crop';
const diningImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=85&auto=format&fit=crop';
const wellnessImage = 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&q=85&auto=format&fit=crop';
const poolImage = 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1800&q=85&auto=format&fit=crop';

const fallbackProperties: Property[] = [
  {
    id: 'villa-solace',
    slug: 'villa-solace',
    title: 'Villa Solace',
    description: 'A private pool villa in peaceful Assagao with generous living spaces and garden views.',
    shortDescription: 'A private pool villa in peaceful Assagao with generous living spaces and garden views.',
    address: { city: 'Mapusa', state: 'Goa', locality: 'Assagao', country: 'India' },
    nightlyPrice: 18000,
    currency: 'INR',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=85&auto=format&fit=crop',
      alt: 'Villa Solace private pool',
    },
  },
  {
    id: 'rosa-blanca',
    slug: 'rosa-blanca',
    title: 'Rosa Blanca',
    description: 'A Portuguese-style Anjuna villa with an infinity pool, gardens, and grand gathering spaces.',
    shortDescription: 'A Portuguese-style Anjuna villa with an infinity pool, gardens, and grand gathering spaces.',
    address: { city: 'Mapusa', state: 'Goa', locality: 'Anjuna', country: 'India' },
    nightlyPrice: 25000,
    currency: 'INR',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85&auto=format&fit=crop',
      alt: 'Rosa Blanca villa exterior',
    },
  },
  {
    id: 'nova-solace',
    slug: 'nova-solace',
    title: 'Nova Solace',
    description: 'A modern Chapora villa with a plunge pool near Vagator beach and the fort.',
    shortDescription: 'A modern Chapora villa with a plunge pool near Vagator beach and the fort.',
    address: { city: 'Mapusa', state: 'Goa', locality: 'Vagator', country: 'India' },
    nightlyPrice: 14000,
    currency: 'INR',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=85&auto=format&fit=crop',
      alt: 'Nova Solace modern exterior',
    },
  },
];

function imageFor(property?: Property) {
  return getPropertyImageUrl(property) || poolImage;
}

function hrefFor(property: Property) {
  return `/properties/${property.slug || property.id}`;
}

export default async function HomePage() {
  const payloadProperties = await getFeaturedProperties();
  const properties = payloadProperties.length > 0 ? payloadProperties : fallbackProperties;

  const estateCards = [
    {
      title: 'Villas',
      text: 'Private homes across Assagao, Anjuna, Vagator and Siolim.',
      href: '/properties',
      image: imageFor(properties[0]),
      alt: properties[0]?.featuredImage?.alt || 'Private villa in North Goa',
    },
    {
      title: 'Experiences',
      text: 'Poolside meals, slow mornings, local hosts and coastal days.',
      href: '#experiences',
      image: diningImage,
      alt: 'Villa dining experience',
    },
    {
      title: 'Visit, Eat, Stay',
      text: 'Old village lanes, beaches, markets and calm corners.',
      href: '#estate',
      image: poolImage,
      alt: 'North Goa villa pool',
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#141414]">
      <section className="relative min-h-screen overflow-hidden">
        <Image src={heroImage} alt="Private villa estate in North Goa" fill priority className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-white/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/55 via-[#141414]/10 to-white/15" />
        <div className="relative z-10 grid min-h-screen grid-cols-1 content-end gap-10 px-5 pb-16 pt-28 md:grid-cols-12 md:px-10 md:pb-20">
          <Reveal className="md:col-span-7">
            <p className="mb-6 text-[12px] font-bold uppercase text-white/85">North Goa private villas</p>
            <h1 className="max-w-5xl text-5xl font-medium leading-[1.03] tracking-tight text-white md:text-7xl lg:text-8xl">
              Discover space you truly belong in
            </h1>
            <Link href="/properties" className="mt-9 inline-flex bg-[#141414] px-9 py-4 text-[13px] font-bold uppercase text-white shadow-2xl transition-colors hover:bg-white hover:text-[#141414]">
              Book a call
            </Link>
          </Reveal>
          <Reveal delay={180} className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="max-w-md text-[17px] leading-[1.55] text-white/78">
              Experience more than a house; find a sanctuary where your journey unfolds with comfort, privacy and hosted local care.
            </p>
          </Reveal>
        </div>
        <a href="#welcome" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[11px] font-bold uppercase text-white/75 transition-opacity hover:opacity-60">
          Scroll to explore
        </a>
      </section>

      <section id="welcome" className="px-5 py-24 text-center md:px-10 md:py-36">
        <Reveal>
          <p className="estate-kicker mb-6">Welcome to Not Just A Stay</p>
          <h2 className="mx-auto max-w-6xl text-4xl font-medium leading-[1.12] tracking-tight md:text-6xl">
            Set among village lanes, garden pools and coastal light, our collection brings together the best ways to stay, gather and slow down in North Goa.
          </h2>
        </Reveal>
      </section>

      <section className="grid border-y border-black/10 bg-white md:grid-cols-3">
        {estateCards.map((card, index) => (
          <Reveal
            key={card.title}
            delay={index * 110}
            className="group border-b border-black/10 md:border-b-0 md:border-r md:last:border-r-0"
          >
            <Link href={card.href} className="block">
              <div className="goodwood-image relative aspect-[4/3]">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-8 md:p-10">
                <p className="estate-kicker mb-5">Explore</p>
                <h3 className="mb-4 text-3xl font-medium tracking-tight md:text-4xl">{card.title}</h3>
                <p className="max-w-sm leading-7 text-[#6f6f6f]">{card.text}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      <section id="estate" className="grid bg-[#eee9df] md:grid-cols-2">
        <div className="goodwood-image relative min-h-[520px] md:min-h-[720px]">
          <Image src={storyImage} alt="Elegant villa interior" fill className="object-cover" unoptimized />
        </div>
        <div className="flex items-center px-5 py-24 md:px-16 md:py-32">
          <Reveal className="max-w-xl">
            <p className="estate-kicker mb-6">Visit, Eat, Stay</p>
            <h2 className="mb-8 text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">A place for long weekends and longer memories.</h2>
            <p className="mb-10 text-lg leading-8 text-[#5f5b54]">
              From chef-led dinners and poolside mornings to village walks and beach evenings, every stay is built around the shape of your group.
            </p>
            <Link href="/properties" className="estate-button">
              Plan your stay
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#F8F8F8] px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-14 grid gap-8 border-b border-black/10 pb-8 md:grid-cols-12 md:items-end">
            <div>
              <p className="estate-kicker mb-3">What&apos;s on</p>
              <h2 className="max-w-4xl text-[2rem] font-medium leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
                <span className="md:hidden">Residences for slow, memorable stays</span>
                <span className="hidden md:inline">Guiding you toward the residence of your dreams</span>
              </h2>
            </div>
            <p className="text-sm leading-7 text-[#6f6f6f] md:col-span-4 md:col-start-9">
              Our vision bridges balance, design and attention so every guest resides in a space reflecting their values.
            </p>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3">
            {properties.slice(0, 3).map((property, index) => (
              <Reveal key={property.id} delay={index * 120} className="group">
                <Link href={hrefFor(property)} className="block">
                  <div className="goodwood-image relative mb-6 aspect-[4/3] md:aspect-square">
                    <Image
                      src={imageFor(property)}
                      alt={property.featuredImage?.alt || property.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h3 className="mb-4 text-3xl font-medium leading-tight tracking-tight transition-colors group-hover:text-[#a1834c]">{property.title}</h3>
                  <div className="mb-4 space-y-2 text-sm text-neutral-600">
                    <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /> From ₹{property.nightlyPrice.toLocaleString()} per night</p>
                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {property.address?.locality || property.locality || property.address?.city}</p>
                  </div>
                  <p className="leading-7 text-neutral-600">{property.shortDescription}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-36">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-12">
          <Reveal className="bg-white p-8 md:col-span-4 md:p-14">
            <p className="estate-kicker mb-6">How it works</p>
            <h2 className="text-4xl font-medium leading-[1.1] tracking-tight">Explore our service and the process</h2>
            <p className="mt-8 leading-7 text-[#6f6f6f]">
              Digital walk-throughs, curated portfolios and host insight give you the tools to search and secure with ease.
            </p>
            <Link href="/properties" className="mt-10 inline-flex border border-black/10 px-7 py-4 text-[13px] font-bold uppercase transition-colors hover:bg-[#f8f8f8]">
              Free consult
            </Link>
            <div className="mt-16 space-y-4 text-[13px] font-bold">
              {['Market Analysis', 'Exclusive collection', 'Policy Support', 'Closing Deal'].map((item) => (
                <p key={item} className={item === 'Exclusive collection' ? 'text-[#141414]' : 'text-[#a5a5a5]'}>
                  {item}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="goodwood-image relative min-h-[520px] md:col-span-8">
            <Image src={poolImage} alt="Private pool villa in Goa" fill className="object-cover" unoptimized />
          </Reveal>
        </div>
      </section>

      <section id="experiences" className="grid bg-neutral-950 text-white md:grid-cols-[0.9fr_1.1fr]">
        <div className="flex items-center px-5 py-24 md:px-16 md:py-32">
          <Reveal className="max-w-xl">
            <p className="mb-4 text-sm font-semibold uppercase text-[#b99b63]">Dining, wellness and more</p>
            <h2 className="mb-6 text-4xl font-medium leading-tight md:text-6xl">Unforgettable experiences</h2>
            <p className="mb-8 text-lg leading-8 text-white/70">
              Arrange a private table, a wellness morning, a market visit or a day exploring the coast. The villa is only the beginning.
            </p>
            <a href="#contact" className="estate-button-light">
              Enquire
            </a>
          </Reveal>
        </div>
        <div className="goodwood-image relative min-h-[620px]">
          <Image src={wellnessImage} alt="Wellbeing experience" fill className="object-cover" unoptimized />
        </div>
      </section>

      <section id="stories" className="bg-white px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-14 border-b border-neutral-200 pb-8">
            <p className="estate-kicker mb-3">Latest News</p>
            <h2 className="text-4xl font-medium md:text-6xl">Stories from the estate</h2>
            <p className="mt-4 max-w-2xl leading-7 text-neutral-600">Highlights, notes and seasonal ideas from our corner of North Goa.</p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ['A season of renewal in Assagao', 'Village lanes, shaded courtyards and villas ready for the monsoon light.'],
              ['How to spend a slow weekend in Siolim', 'Markets, river views and long dinners without hurrying back.'],
              ['What makes a villa stay feel hosted', 'The details that turn a private house into a complete experience.'],
            ].map(([title, text], index) => (
              <Reveal as="article" key={title} delay={index * 100} className="border-t border-neutral-200 pt-5">
                <p className="mb-3 text-sm text-neutral-500">June 2026</p>
                <h3 className="mb-3 text-2xl font-medium leading-tight">{title}</h3>
                <p className="leading-7 text-neutral-600">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-neutral-950 px-5 py-12 text-white md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/15 pt-8 md:grid-cols-3">
          <div>
            <h3 className="text-3xl font-medium">Not Just A Stay</h3>
            <p className="mt-3 text-white/55">A North Goa estate of private villas and hosted experiences.</p>
          </div>
          <div className="text-sm leading-7 text-white/65">
            <p>North Goa, India</p>
            <p>hello@notjustastay.com</p>
          </div>
          <div className="text-sm leading-7 text-white/65 md:text-right">
            <Link href="/properties" className="hover:text-[#b99b63]">Book a villa</Link>
            <p>© 2026 Not Just A Stay</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
