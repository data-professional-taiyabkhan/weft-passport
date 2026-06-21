import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 bg-heritage-gradient relative overflow-hidden">
      <div className="absolute inset-0 loom-pattern opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-weft-terracotta opacity-10 blur-3xl" />

      <div className="section-container relative z-10 text-center">
        <span className="inline-block px-4 py-2 bg-white bg-opacity-10 rounded-full text-white text-sm font-medium border border-white border-opacity-20 mb-6">
          Limited pilot slots available
        </span>
        <h2 className="font-serif text-4xl lg:text-5xl text-white mb-6">
          Ready to Certify Your First Collection?
        </h2>
        <p className="text-xl text-white text-opacity-80 max-w-2xl mx-auto mb-10">
          Join ethical fashion brands already using Weft Passport to verify their artisan claims,
          protect their regulatory position, and connect consumers to the weavers behind their products.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup" className="btn-terracotta text-base px-10 py-4 justify-center">
            Start Free Pilot <ArrowRight size={20} />
          </Link>
          <a href="mailto:hello@weftpassport.com" className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-white border-opacity-40 text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200">
            <Mail size={20} /> Contact Mahjabeen
          </a>
        </div>
      </div>
    </section>
  );
}
