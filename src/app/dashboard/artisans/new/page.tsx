import Link from 'next/link'
import { createArtisan } from '@/app/actions/artisans'

export default function NewArtisanPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/dashboard/artisans" className="text-[#1B1464] text-sm hover:underline">← Artisan Registry</Link>
        <h1 className="text-2xl font-bold text-[#1B1464] font-serif mt-2">Register New Artisan</h1>
        <p className="text-[#6B7280] text-sm mt-0.5">Add a verified artisan to the Weft Passport registry</p>
      </div>

      {searchParams.error && (
        <div className="mb-5 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <p className="text-red-700 text-sm">{decodeURIComponent(searchParams.error)}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6">
        <form action={createArtisan} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Full Name *</label>
              <input name="full_name" type="text" required
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]"
                placeholder="e.g. Ramesh Kumar" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Gender</label>
              <select name="gender" className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Years of Experience</label>
              <input name="years_experience" type="number" min="0" max="80"
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]"
                placeholder="e.g. 15" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Village</label>
              <input name="village" type="text"
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]"
                placeholder="e.g. Madanpura" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">District</label>
              <input name="district" type="text"
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]"
                placeholder="e.g. Varanasi" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">State</label>
              <input name="state" type="text"
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]"
                placeholder="e.g. Uttar Pradesh" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Phone (optional)</label>
              <input name="phone" type="tel"
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]"
                placeholder="+91 98xxx xxxxx" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Craft Specialisations</label>
              <input name="specialisations" type="text"
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]"
                placeholder="Banarasi Silk, Zari work (comma-separated)" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Cooperative / Cluster Name</label>
              <input name="cooperative_name" type="text"
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464]"
                placeholder="e.g. Varanasi Handloom Co-op" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">Field Notes</label>
              <textarea name="notes" rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1B1464] resize-none"
                placeholder="Any additional notes about this artisan..." />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Link href="/dashboard/artisans"
              className="flex-1 text-center py-2.5 rounded-lg border border-[#E5E0D8] text-sm font-semibold text-[#6B7280] hover:bg-[#FAF7F2] transition-colors">
              Cancel
            </Link>
            <button type="submit"
              className="flex-1 bg-[#1B1464] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#231A7A] transition-colors">
              Register Artisan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
