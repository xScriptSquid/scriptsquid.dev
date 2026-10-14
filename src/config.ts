export const site = {
  // While false, `npm run build` ships only the coming-soon page.
  launched: false,
  name: 'Ray Renteria',
  brand: 'ScriptSquid',
  role: 'Systems & security engineer',
  tagline: 'I automate infrastructure, then try to break it.',
  signoff: 'Automation, hardening, and the attempts to break it.',
  oneLiner: 'Systems & security engineer. I automate infrastructure, then try to break it.',
  description: 'Systems & security engineer. I automate infrastructure, then try to break it.',
  url: 'https://scriptsquid.dev',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/projects/', label: 'Projects' },
    { href: '/writeups/', label: 'Writeups' },
    { href: '/about/', label: 'About' },
    { href: '/contact/', label: 'Contact' },
  ],
  links: [
    { label: 'Resume', href: '/resume.pdf' },
    { label: 'GitHub', href: 'https://github.com/xscriptsquid' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/r-renteria/' },
    { label: 'Email', href: 'mailto:ray@scriptsquid.dev' },
  ],
} as const;
