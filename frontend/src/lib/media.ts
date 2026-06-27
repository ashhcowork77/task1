import type { Property } from '@/types';

const fallbackVillaImage =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85&auto=format&fit=crop';

const propertyImageMap: Record<string, string> = {
  'villa-solace': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=85&auto=format&fit=crop',
  'villa-solace-pool.jpg': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=85&auto=format&fit=crop',
  'rosa-blanca': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85&auto=format&fit=crop',
  'rosa-blanca-exterior.jpg': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85&auto=format&fit=crop',
  'nova-solace': 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=85&auto=format&fit=crop',
  'nova-solace-exterior.jpg': 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=85&auto=format&fit=crop',
  'luna-blanca': 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1400&q=85&auto=format&fit=crop',
  'luna-blanca-pool.jpg': 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1400&q=85&auto=format&fit=crop',
};

function slugify(value?: string | number | null) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function filenameFromUrl(url?: string | null) {
  if (!url) return '';
  return url.split('/').pop()?.split('?')[0] || '';
}

export function getStableImageUrl(url?: string | null, title?: string | null) {
  const filename = filenameFromUrl(url);
  const titleSlug = slugify(title);

  if (filename && propertyImageMap[filename]) return propertyImageMap[filename];
  if (titleSlug && propertyImageMap[titleSlug]) return propertyImageMap[titleSlug];
  if (url && !url.startsWith('/api/media/file/')) return url;

  return fallbackVillaImage;
}

export function getPropertyImageUrl(property?: Property | null) {
  return getStableImageUrl(property?.featuredImage?.url, property?.title);
}
