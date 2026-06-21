import { AlertTriangle, ExternalLink } from 'lucide-react';

export default function ComplianceAlert() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-4">
      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <AlertTriangle size={20} className="text-amber-600" />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-amber-900 text-sm">EU Green Claims Directive — Active from 27 September 2026</div>
        <p className="text-amber-700 text-xs mt-1">
          All sustainability claims must be substantiated with third-party evidence. Non-compliance fines up to 4% of annual turnover. Ensure your active batches are fully certified before the deadline.
        </p>
      </div>
      <a href="https://ec.europa.eu/environment/green-claims" target="_blank" rel="noopener noreferrer"
        className="flex-shrink-0 flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 font-medium">
        Learn more <ExternalLink size={12} />
      </a>
    </div>
  );
}
