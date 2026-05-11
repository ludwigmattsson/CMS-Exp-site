type IconSize = '16' | '20' | '24'

interface IconProps {
  name: string
  size?: IconSize
}

export default function Icon({ name, size = '20' }: IconProps) {
  return <span className={`tl-icon tl-icon--${name} tl-icon--${size}`} aria-hidden="true" />
}
