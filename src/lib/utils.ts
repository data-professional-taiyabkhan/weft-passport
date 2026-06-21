import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  }).format(new Date(date))
}

export function generateBatchRef(cluster: string = 'BNS') {
  const year = new Date().getFullYear()
  const seq = Math.floor(Math.random() * 9000) + 1000
  return `WP-${year}-${cluster.toUpperCase().slice(0,3)}-${seq}`
}

export function generateCertRef(seq?: number) {
  const year = new Date().getFullYear()
  const n = seq ?? Math.floor(Math.random() * 9000) + 1000
  return `WPC-${year}-${String(n).padStart(4,'0')}`
}

export function generateQRSlug(brandSlug: string, skuCode: string) {
  return `${brandSlug}-${skuCode.toLowerCase().replace(/[^a-z0-9]/g,'-')}-${Date.now().toString(36)}`
}

export function tierLabel(tier: string) {
  const map: Record<string, string> = {
    trial: 'Trial — 60 days',
    standard: 'Standard Plan',
    premium: 'Premium Plan',
    enterprise: 'Enterprise'
  }
  return map[tier] ?? tier
}

export function statusColor(status: string) {
  const map: Record<string, string> = {
    pending: 'amber',
    field_verified: 'indigo',
    certified: 'sage',
    rejected: 'madder'
  }
  return map[status] ?? 'muted'
}
