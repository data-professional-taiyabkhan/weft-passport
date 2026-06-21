import { Shield, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const FRAMEWORKS = [
  { code: 'EU ECGT', label: 'Green Claims',    deadline: '27 Sept 2026', urgent: true },
  { code: 'EU DPP',  label: 'Digital Passport', deadline: 'Late 2026',   urgent: false },
  { code: 'CSDDD',   label: 'Due Diligence',    deadline: '2027',        urgent: false },
  { code: 'UK GCC',  label: 'Green Claims Code', deadline: 'Active',     urgent: true },
];

interface Props { score: number; tier: string }

export default function ComplianceWidget({ score, tier }: Props) {
  const color = score >= 80 ? 'text-weft-moss' : score >= 50 ? 'text-weft-gold' : 'text-weft-terracotta';
  const ring  = score >= 80 ? '#4A5E40' : score >= 50 ? '#C9A227' : '#B85C38';

  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-weft-charcoal">Compliance Score</h3>
        <Shield size={18} className="text-weft-muted" />
      </div>

      {/* Score ring */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-28 h-28">
          <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
            <circle cx="56" cy="56" r="48" fill="none" stroke="#E8DCC8" strokeWidth="10" />
            <circle cx="56" cy="56" r="48" fill="none" stroke={ring} strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 48}`}
              strokeDashoffset={`${2 * Math.PI * 48 * (1 - score / 100)}`}
              strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`font-serif font-bold text-3xl ${color}`}>{score.toFixed(0)}%</span>
            <span className="text-xs text-weft-muted">ready</span>
          </div>
        </div>
      </div>

      {/* Frameworks */}
      <div className="space-y-2">
        {FRAMEWORKS.map(({ code, label, deadline, urgent }) => (
          <div key={code} className="flex items-center justify-between p-2.5 bg-weft-ivory rounded-lg">
            <div className="flex items-center gap-2">
              {urgent
                ? <AlertCircle size={14} className="text-weft-terracotta" />
                : <Clock size={14} className="text-weft-gold" />}
              <div>
                <span className="text-xs font-semibold text-weft-charcoal">{code}</span>
                <p className="text-xs text-weft-muted">{label}</p>
              </div>
            </div>
            <span className={`text-xs font-medium ${urgent ? 'text-weft-terracotta' : 'text-weft-muted'}`}>
              {deadline}
            </span>
          </div>
        ))}
      </div>

      {tier === 'trial' && (
        <p className="text-xs text-weft-muted mt-4 text-center">
          Upgrade to Standard for full compliance reports
        </p>
      )}
    </div>
  );
}
