export interface NavItem {
  label: string;
  href: string;
}

/** Primary navigation — v1.3 commercial architecture. */
export const primaryNav: NavItem[] = [
  { label: 'Decision Sprint', href: '/competitor-brief/' },
  { label: 'Response Sprint', href: '/strategic-blueprint/' },
  { label: 'Competitive Radar', href: '/market-intelligence/' },
  { label: 'Method', href: '/method/' },
  { label: 'Sample', href: '/sample-report/' },
  { label: 'Work', href: '/work/' },
  { label: 'About', href: '/about/' },
];

export const footerServices: NavItem[] = [
  { label: 'Complimentary Competitive Intelligence Brief', href: '/contact/?intent=complimentary-brief' },
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
