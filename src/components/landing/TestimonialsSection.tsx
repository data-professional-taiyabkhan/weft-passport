import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "Weft Passport gave us the confidence to make genuine artisan-made claims on our new collection. The compliance documentation removed all uncertainty around our EU market positioning.",
    author: "UK Ethical Fashion Brand",
    role: "LOI Pilot Partner",
    initial: "E",
  },
  {
    quote: "For the first time, our Banarasi silk weaves are traceable from our loom to the customer's hands. Weft Passport sees the work that others overlook.",
    author: "Master Weaver, Varanasi",
    role: "Verified Artisan Partner",
    initial: "V",
  },
  {
    quote: "The QR provenance pages transformed how our customers connect with our products. The 18% price uplift we saw validated everything.",
    author: "Premium Fashion Label, London",
    role: "Beta Programme Participant",
    initial: "P",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-weft-indigo font-semibold text-sm uppercase tracking-widest">Validation</span>
          <h2 className="font-serif text-4xl text-weft-charcoal mt-3">
            Trusted by Brands & Weavers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ quote, author, role, initial }) => (
            <div key={author} className="card-heritage relative">
              <Quote size={32} className="text-weft-loom opacity-40 mb-4" />
              <p className="text-weft-charcoal leading-relaxed mb-6 italic text-sm">“{quote}”</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-weft-indigo flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{initial}</span>
                </div>
                <div>
                  <p className="font-semibold text-weft-charcoal text-sm">{author}</p>
                  <p className="text-xs text-weft-muted">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
