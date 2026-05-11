interface BadgeProps {
  size?: 'sm' | 'lg'
  value?: number | string
  hidden?: boolean
}

function resolveText(value: number | string | undefined): string {
  if (value === undefined) return ''
  if (typeof value === 'number') return value >= 100 ? '99+' : String(value)
  return value
}

export default function Badge({ size = 'lg', value, hidden = false }: BadgeProps) {
  const isSmall = size === 'sm'
  const text = isSmall ? '' : resolveText(value)
  const pill = !isSmall && typeof value === 'string'
  const classes = [
    'tl-badge',
    `tl-badge--${isSmall ? 'sm' : 'lg'}`,
    pill && 'tl-badge--pill',
    hidden && 'tl-badge--hidden',
  ]
    .filter(Boolean)
    .join(' ')

  return <span className={classes}>{text && <span className="tl-badge__text">{text}</span>}</span>
}
