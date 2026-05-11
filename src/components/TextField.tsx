import type { KeyboardEventHandler } from 'react'

interface TextFieldProps {
  id: string
  label?: string
  labelPosition?: 'outside' | 'inside' | 'none'
  type?: 'text' | 'password' | 'number'
  placeholder?: string
  helper?: string
  size?: 'lg' | 'md' | 'sm'
  variant?: 'primary' | 'secondary'
  state?: 'success' | 'error'
  prefixIcon?: string
  value?: string
  autoFocus?: boolean
  ariaLabel?: string
  className?: string
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
  onChange?: (value: string) => void
}

export default function TextField({
  id,
  label,
  labelPosition = 'outside',
  type = 'text',
  placeholder,
  helper,
  size = 'lg',
  variant = 'primary',
  state,
  prefixIcon,
  value,
  autoFocus,
  ariaLabel,
  className,
  onKeyDown,
  onChange,
}: TextFieldProps) {
  const classes = [
    'tl-text-field',
    `tl-text-field--${variant}`,
    `tl-text-field--${size}`,
    state && `tl-text-field--${state}`,
    labelPosition === 'inside' && 'tl-text-field--label-inside',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {label && labelPosition === 'outside' && (
        <label className="tl-text-field__label" htmlFor={id}>
          {label}
        </label>
      )}
      {label && labelPosition === 'inside' && (
        <label className="tl-text-field__label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className="tl-text-field__input"
        id={id}
        type={type}
        aria-label={ariaLabel ?? label}
        placeholder={labelPosition === 'inside' ? ' ' : placeholder}
        value={value}
        autoFocus={autoFocus}
        onKeyDown={onKeyDown}
        onChange={(event) => onChange?.(event.currentTarget.value)}
      />
      {prefixIcon && (
        <span
          className={`tl-icon tl-icon--${prefixIcon} tl-icon--20 tl-text-field__prefix--icon`}
          aria-hidden="true"
        />
      )}
      {helper && (
        <div className="tl-text-field__bottom">
          <span className="tl-text-field__helper">{helper}</span>
        </div>
      )}
    </div>
  )
}
