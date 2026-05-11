import type { InputHTMLAttributes } from 'react'

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'> {
  size?: 'sm' | 'lg'
  headline?: string
  label?: string
  className?: string
}

export default function Toggle({
  size = 'lg',
  headline,
  label,
  id,
  className = '',
  ...rest
}: ToggleProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  const inputClasses = [
    'tl-toggle__input',
    size === 'sm' ? 'tl-toggle__input--sm' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={['tl-toggle', className].filter(Boolean).join(' ')}>
      {headline && <div className="tl-toggle__headline">{headline}</div>}
      <label htmlFor={inputId}>
        <input id={inputId} className={inputClasses} type="checkbox" {...rest} />
        {label && <span className="tl-toggle__label">{label}</span>}
      </label>
    </div>
  )
}
