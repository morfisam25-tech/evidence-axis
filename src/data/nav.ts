export interface NavItem {
  label: string;
  href: string;
}

/** Primary navigation — deliberately compact for a premium executive-facing header. */
export const primaryNav: NavItem[] = [
  { label: 'Services', href: '/#services' },
  { label: 'Research', href: '/research/' },
  { label: 'Method', href: '/method/' },
  { label: 'Work', href: '/work/' },
  { label: 'About', href: '/about/' },
];

export const footerServices: NavItem[] = [
  { label: 'Competitive Intelligence', href: '/competitive-intelligence/' },
  { label: 'Competitor Analysis', href: '/competitor-analysis/' },
  { label: 'Competitive Decision Brief', href: '/decision-brief/' },
  { label: 'Competitive Decision Sprint', href: '/competitor-brief/' },
  { label: 'Competitive Response Sprint', href: '/strategic-blueprint/' },
  { label: 'Competitive Radar', href: '/market-intelligence/' },
];

export const footerCompany: NavItem[] = [
  { label: 'Research', href: '/research/' },
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
