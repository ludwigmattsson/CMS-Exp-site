interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  id: string
  label?: string
  labelPosition?: 'outside' | 'inside' | 'none'
  options: DropdownOption[]
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary'
  value: string
  onChange: (value: string) => void
}

export default function Dropdown({
  id,
  label,
  labelPosition = 'outside',
  options,
  size = 'md',
  variant = 'primary',
  value,
  onChange,
}: DropdownProps) {
  const classes = [
    'tl-dropdown',
    `tl-dropdown--${variant}`,
    `tl-dropdown--${size}`,
    labelPosition === 'inside' && 'tl-dropdown--label-inside',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {label && labelPosition !== 'none' && (
        <label className="tl-dropdown__label" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        className="tl-dropdown__select"
        id={id}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
