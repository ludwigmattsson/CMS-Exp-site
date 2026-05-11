import { useState } from 'react'

interface TextareaProps {
  id: string
  label?: string
  labelPosition?: 'outside' | 'inside' | 'none'
  placeholder?: string
  helper?: string
  rows?: number
  variant?: 'primary' | 'secondary'
  state?: 'success' | 'error'
  maxLength?: number
  disabled?: boolean
  readOnly?: boolean
  defaultValue?: string
  onChange?: (value: string) => void
}

export default function Textarea({
  id,
  label,
  labelPosition = 'outside',
  placeholder,
  helper,
  rows = 5,
  variant = 'primary',
  state,
  maxLength,
  disabled,
  readOnly,
  defaultValue = '',
  onChange,
}: TextareaProps) {
  const [charCount, setCharCount] = useState(defaultValue.length)

  const classes = [
    'tl-textarea',
    `tl-textarea--${variant}`,
    state && `tl-textarea--${state}`,
    labelPosition === 'inside' && 'tl-textarea--label-inside',
  ]
    .filter(Boolean)
    .join(' ')

  const showBottom = helper || (maxLength && maxLength > 0)

  return (
    <div className={classes}>
      {label && labelPosition !== 'none' && (
        <label className="tl-textarea__label" htmlFor={id}>
          {label}
        </label>
      )}

      <textarea
        className="tl-textarea__input"
        id={id}
        rows={rows}
        placeholder={labelPosition === 'inside' ? ' ' : placeholder}
        maxLength={maxLength && maxLength > 0 ? maxLength : undefined}
        disabled={disabled}
        readOnly={readOnly}
        defaultValue={defaultValue}
        onChange={(event) => {
          setCharCount(event.currentTarget.value.length)
          onChange?.(event.currentTarget.value)
        }}
      />

      {showBottom && (
        <div className="tl-textarea__bottom">
          {helper && <div className="tl-textarea__helper">{helper}</div>}
          {maxLength && maxLength > 0 && (
            <span className="tl-textarea__charcounter">
              {charCount}
              <span className="tl-textarea__charcounter-divider">/</span>
              {maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
