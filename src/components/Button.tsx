import type { ButtonHTMLAttributes, ReactNode } from 'react'
import Icon from './Icon'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  onlyIcon?: boolean
  icon?: string
  children?: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onlyIcon = false,
  icon,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const classes = [
    'tl-button',
    `tl-button--${variant}`,
    `tl-button--${size}`,
    fullWidth && 'tl-button--full-width',
    onlyIcon && 'tl-button--only-icon',
    icon && !onlyIcon && 'tl-button--icon',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} type="button" {...rest}>
      {children}
      {icon && <Icon name={icon} size="20" />}
    </button>
  )
}
