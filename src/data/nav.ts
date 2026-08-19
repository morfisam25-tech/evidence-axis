export interface NavItem {
  label: string;
  href: string;
}

/** Primary navigation — deliberately compact for a premium executive-facing header. */
export const primaryNav: NavItem[] = [
  { label: 'Services', href: '/#services' },
  { label: 'Method', href: '/method/' },
  { label: 'Sample', href: '/sample-report/' },
  { label: 'Work', href: '/work/' },
  { label: 'About', href: '/about/' },
];

export const footerServices: NavItem[] = [
  { label: 'Competitive Decision Sprint', href: '/competitor-brief/' },
  { label: 'Competitive Response Sprint', href: '/strategic-blueprint/' },
  { label: 'Competitive Radar', href: '/market-intelligence/' },
];

export const footerCompany: NavItem[] = [
  { label: 'Method', href: '/method/' },
  { label: 'Sample Intelligence Brief', href: '/sample-report/' },
  { label: 'Work', href: '/work/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerLegal: NavItem[] = [
  { label: 'Privacy', href: '/privacy/' },
  { label: 'Terms', href: '/terms/' },
];
