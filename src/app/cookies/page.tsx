import type { Metadata } from 'next';
import LegalPage from '@/components/site/LegalPage';

export const metadata: Metadata = {
  title: 'Cookie Policy — Weft Passport',
  description: 'How Weft Passport uses cookies and similar technologies.',
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="June 2026"
      intro="This Cookie Policy explains how Weft Passport uses cookies and similar technologies when you visit our website and platform."
      sections={[
        { heading: 'What cookies we use', paras: [
          'Essential cookies that are required for the platform to function, such as keeping you signed in and maintaining session security.',
          'Preference cookies that remember choices you make, such as dismissed notices.',
        ] },
        { heading: 'Analytics', paras: [
          'We may use privacy-respecting analytics to understand how the site is used and to improve it. These do not identify you personally.',
        ] },
        { heading: 'Managing cookies', paras: [
          'You can control and delete cookies through your browser settings. Disabling essential cookies may prevent parts of the platform — such as signing in — from working correctly.',
        ] },
      ]}
    />
  );
}
