import type { Metadata } from 'next';
import LegalPage from '@/components/site/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy — Weft Passport',
  description: 'How Weft Passport (Silk and Soil Ltd) collects, uses, and protects personal data.',
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 2026"
      intro="This Privacy Policy explains how Silk and Soil Ltd (“Weft Passport”, “we”, “us”) collects, uses, and protects personal data when you use our website and platform. We are committed to handling the data of brands, field coordinators, and artisans with care and in line with UK GDPR."
      sections={[
        { heading: 'Information we collect', paras: [
          'Account information you provide when you register — such as name, email address, organisation, and role.',
          'Production and provenance data submitted through the platform, including artisan profiles, loom and batch records, and geo-tagged media captured with informed consent.',
          'Usage data such as pages visited and actions taken, used to operate and improve the service.',
        ] },
        { heading: 'How we use your information', paras: [
          'To provide the certification platform, generate compliance evidence, and produce consumer-facing provenance pages.',
          'To communicate with you about your account, enquiries, and service updates.',
          'To meet our legal and regulatory obligations and to protect the integrity of the verification record.',
        ] },
        { heading: 'Artisan data and consent', paras: [
          'Artisan identity, likeness, and production data are only added to the registry where the artisan has given informed consent, recorded during field onboarding. Artisans may request access to, correction of, or removal of their data.',
        ] },
        { heading: 'Sharing and storage', paras: [
          'We do not sell personal data. Data may be shared with brands you work with, and with infrastructure providers (such as our hosting and database providers) strictly to operate the service.',
          'Data is stored on secured cloud infrastructure with access controls and audit logging.',
        ] },
        { heading: 'Your rights', paras: [
          'Under UK GDPR you have rights to access, rectify, erase, and restrict processing of your personal data, and to object to processing. To exercise these rights, contact us at hello@weftpassport.com.',
        ] },
      ]}
    />
  );
}
