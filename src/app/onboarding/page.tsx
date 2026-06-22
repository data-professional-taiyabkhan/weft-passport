import Link from 'next/link'

export default function OnboardingPage() {
  const steps = [
    { num: 1, title: 'Account Created', desc: 'Your Weft Passport account is set up and ready.', done: true },
    { num: 2, title: 'Brand Profile', desc: 'Add your brand name, logo and contact details.', done: false, link: '/dashboard/settings' },
    { num: 3, title: 'Register an Artisan', desc: 'Add your first artisan to the verified registry.', done: false, link: '/dashboard/artisans/new' },
    { num: 4, title: 'Create a Batch', desc: 'Record a production batch and link it to an artisan.', done: false, link: '/dashboard/batches/new' },
    { num: 5, title: 'Generate QR Code', desc: 'Get a scannable QR code for your certified batch.', done: false, link: '/dashboard/qr-codes' },
  ]

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#1B1464] flex items-center justify-center text-[#F4A300] font-black">W</div>
            <span className="font-bold text-[#1B1464]">Weft Passport</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1B1464] font-serif mb-2">🌟 Welcome aboard!</h1>
          <p className="text-[#6B7280] text-sm">Complete these 5 steps to get your first certified provenance record live.</p>
        </div>

        <div className="space-y-3">
          {steps.map(step => (
            <div key={step.num} className={`bg-white rounded-xl border p-4 flex items-center gap-4 ${
              step.done ? 'border-green-200 bg-green-50/50' : 'border-[#E5E0D8]'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                step.done ? 'bg-green-500 text-white' : 'bg-[#1B1464] text-white'
              }`}>
                {step.done ? '✓' : step.num}
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${step.done ? 'text-green-700 line-through' : 'text-[#1A1A2E]'}`}>{step.title}</p>
                <p className="text-[#6B7280] text-xs mt-0.5">{step.desc}</p>
              </div>
              {!step.done && step.link && (
                <Link href={step.link}
                  className="text-[#1B1464] text-xs font-semibold hover:underline shrink-0">
                  Start →
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link href="/dashboard"
            className="inline-flex bg-[#1B1464] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#231A7A] transition-colors">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
