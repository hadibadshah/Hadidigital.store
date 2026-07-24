import { Product } from '../types';

/**
 * Converts a product name into a clean, SEO-friendly URL slug.
 * e.g. "CapCut Pro (1-Year)" -> "capcut-pro" or "capcut-pro-1-year"
 */
export function getProductSlug(productOrName: Product | string): string {
  const name = typeof productOrName === 'string' ? productOrName : productOrName.name;
  return name
    .toLowerCase()
    .trim()
    .replace(/\(.*?\)/g, '') // Remove parenthesis content if desired or keep clean
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with dash
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing dashes
}

/**
 * Returns full direct URL for product sharing
 */
export function getProductDirectUrl(product: Product): string {
  const slug = getProductSlug(product);
  return `https://hadidigital.store/#/product/${slug}`;
}

/**
 * Finds a product by ID or slug string matching
 */
export function findProductByParam(products: Product[], param: string): Product | undefined {
  if (!param) return undefined;
  const cleanParam = decodeURIComponent(param).toLowerCase().trim();

  // 1. Direct ID Match
  const byId = products.find((p) => String(p.id) === cleanParam);
  if (byId) return byId;

  // 2. Exact Slug Match
  const bySlug = products.find((p) => getProductSlug(p.name) === cleanParam);
  if (bySlug) return bySlug;

  // 3. Partial Slug Match (e.g. "capcut" matching "capcut-pro")
  const byPartialSlug = products.find((p) => {
    const slug = getProductSlug(p.name);
    return slug.startsWith(cleanParam) || cleanParam.startsWith(slug);
  });
  if (byPartialSlug) return byPartialSlug;

  // 4. Name contains query
  return products.find((p) => p.name.toLowerCase().includes(cleanParam));
}
