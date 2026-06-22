import Link from 'next/link'

export default function PassportNotFound() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      <header className="bg-[#1B1464] text-white px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#F4A300] text-xs font-semibold tracking-widest uppercase">Weft Passport</p>
          <p className="text-white/70 text-xs mt-0.5">Verified Heritage Textile Provenance</p>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-[#1B1464] font-serif mb-2">Passport Not Found</h1>
          <p className="text-[#6B7280] text-sm mb-6">
            This QR code may be invalid, the product hasn't been certified yet, or the link has expired.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-[#1B1464] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#231A7A] transition-colors">
            Learn about Weft Passport
          </Link>
        </div>
      </main>
    </div>
  )
}
