export function TrustBar() {
  const items = [
    'EU Green Claims Directive Ready',
    'CSDDD Aligned Documentation',
    'Digital Product Passport Compatible',
    'UK Green Claims Code Compliant',
    'Loom-Level SKU Traceability',
    'Geo-Tagged Field Evidence',
    'Co-operative Co-Verification',
  ]

  return (
    <div className="bg-indigo-deep border-y border-white/10 py-3 overflow-hidden">
      <div className="flex gap-12 animate-[scroll_30s_linear_infinite] whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-white/50 text-xs tracking-widest uppercase font-mono">
            <span className="w-1 h-1 rounded-full bg-zari-bright" />
            {item}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
