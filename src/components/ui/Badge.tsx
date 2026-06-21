import { cn } from '@/lib/utils'

type BadgeVariant = 'certified' | 'pending' | 'field_verified' | 'rejected' | 'trial' | 'standard' | 'premium' | 'enterprise'

interface BadgeProps {
  variant: BadgeVariant
  label?: string
  className?: string
}

const variantConfig: Record<BadgeVariant, { dot: string; bg: string; text: string; label: string }> = {
  certified: { dot: 'bg-sage', bg: 'bg-sage-soft', text: 'text-sage', label: 'Certified' },
  pending: { dot: 'bg-amber', bg: 'bg-amber-soft', text: 'text-amber', label: 'Pending' },
  field_verified: { dot: 'bg-indigo', bg: 'bg-indigo-soft', text: 'text-indigo', label: 'Field Verified' },
  rejected: { dot: 'bg-madder', bg: 'bg-madder/10', text: 'text-madder', label: 'Rejected' },
  trial: { dot: 'bg-zari', bg: 'bg-zari-soft', text: 'text-zari', label: 'Trial' },
  standard: { dot: 'bg-indigo', bg: 'bg-indigo-soft', text: 'text-indigo', label: 'Standard' },
  premium: { dot: 'bg-zari-bright', bg: 'bg-zari-soft', text: 'text-zari', label: 'Premium' },
  enterprise: { dot: 'bg-madder', bg: 'bg-madder/10', text: 'text-madder', label: 'Enterprise' },
}

export function Badge({ variant, label, className }: BadgeProps) {
  const config = variantConfig[variant]
  return (
    <span className={cn('badge', className, config.bg, config.text)}>
      <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', config.dot)} />
      {label ?? config.label}
    </span>
  )
}
