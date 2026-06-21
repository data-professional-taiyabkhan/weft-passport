import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  icon?: LucideIcon
  color?: 'default' | 'gold' | 'green' | 'madder'
  className?: string
}

export function StatCard({ label, value, sub, icon: Icon, color = 'default', className }: StatCardProps) {
  const valueColors = {
    default: 'text-indigo',
    gold: 'text-zari',
    green: 'text-sage',
    madder: 'text-madder',
  }

  return (
    <div className={cn('card p-4', className)}>
      <div className="flex items-center gap-2 text-xs text-muted">
        {Icon && <Icon size={14} className="text-muted-soft" />}
        <span>{label}</span>
      </div>
      <div className={cn('font-fraunces font-semibold text-3xl leading-none mt-3', valueColors[color])}>
        {value}
      </div>
      {sub && <div className="text-xs text-muted-soft mt-1.5">{sub}</div>}
    </div>
  )
}
