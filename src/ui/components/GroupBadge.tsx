import type { Group } from '@/domain/contact/Group'

interface GroupBadgeProps {
  group: Group
  size?: 'sm' | 'md'
}

export function GroupBadge({ group, size = 'md' }: GroupBadgeProps) {
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium text-white ${sizeClass}`}
      style={{ backgroundColor: group.color }}
    >
      {group.name}
    </span>
  )
}
