export interface NavItem {
  label: string;
  href: string;
}

/** Primary navigation. Services grouped conceptually but flat for clarity. */
export const primaryNav: NavItem[] = [
  { label: 'Competitor Brief', href: '/competitor-brief/' },
  { label: 'Market Intelligence', href: '/market-intelligence/' },
  { label: 'Strategic Blueprint', href: '/strategic-blueprint/' },
  { label: 'Method', href: '/method/' },
  { label: 'Sample Report', href: '/sample-report/' },
  { label: 'About', href: '/about/' },
];

export const footerServices: NavItem[] = [
  { label: 'Two-Competitor Decision Brief', href: '/competitor-brief/' },
  { label: 'Five-Competitor Evidence Brief', href: '/competitor-brief/' },
  { label: 'Market Intelligence', href: '/market-intelligence/' },
  { label: 'Strategic Blueprint', href: '/strategic-blueprint/' },
];

export const footerCompany: NavItem[] = [
  { label: 'Method', href: '/method/' },
  { label: 'Sample Report', href: '/sample-report/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerLegal: NavItem[] = [
  { label: 'Privacy', href: '/privacy/' },
  { label: 'Terms', href: '/terms/' },
];
