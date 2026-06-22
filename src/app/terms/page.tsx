import type { Metadata } from 'next';
import LegalPage from '@/components/site/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service — Weft Passport',
  description: 'The terms governing use of the Weft Passport platform operated by Silk and Soil Ltd.',
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="June 2026"
      intro="These Terms of Service govern your access to and use of the Weft Passport platform, operated by Silk and Soil Ltd, a company registered in England and Wales. By creating an account or using the service, you agree to these terms."
      sections={[
        { heading: 'The service', paras: [
          'Weft Passport provides provenance verification and compliance documentation for handwoven textiles. Certification outputs are produced from data verified at source and are intended to support, not replace, your own regulatory and legal due diligence.',
        ] },
        { heading: 'Accounts and acceptable use', paras: [
          'You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.',
          'You agree not to misuse the platform, submit false verification data, or use certification outputs in a misleading way.',
        ] },
        { heading: 'Subscriptions and fees', paras: [
          'Access is offered on subscription plans with per-batch certification fees as described on our pricing page. Fees, trial terms, and renewal details are confirmed during onboarding.',
        ] },
        { heading: 'Intellectual property', paras: [
          'The platform, its design system, and certification methodology are the property of Silk and Soil Ltd. Verified provenance records remain associated with the relevant artisans, cooperatives, and brands.',
        ] },
        { heading: 'Liability', paras: [
          'The service is provided on a commercially reasonable basis. To the extent permitted by law, our liability is limited to the fees paid for the service in the preceding twelve months.',
        ] },
      ]}
    />
  );
}
