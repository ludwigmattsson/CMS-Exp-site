import type { AnchorHTMLAttributes, ReactNode } from 'react'
import Icon from './Icon'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  underline?: boolean
  standalone?: boolean
  disabled?: boolean
  icon?: string
}

export default function Link({
  children,
  underline = false,
  standalone = false,
  disabled = false,
  icon,
  className = '',
  ...rest
}: LinkProps) {
  const classes = [
    'tl-link',
    standalone && 'tl-link--standalone',
    underline && 'tl-link--underline',
    disabled && 'tl-link--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (disabled) {
    return (
      <span className={classes}>
        {children}
        {icon && (
          <span className="tl-link__icon">
            <Icon name={icon} size="16" />
          </span>
        )}
      </span>
    )
  }

  return (
    <a className={classes} {...rest}>
      {children}
      {icon && (
        <span className="tl-link__icon">
          <Icon name={icon} size="16" />
        </span>
      )}
    </a>
  )
}
