import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from 'react'

type CardVariant = 'primary' | 'secondary'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  clickable?: boolean
  stretch?: boolean
  imageAboveHeader?: boolean
  children: ReactNode
}

type CardComponent = ((props: CardProps) => ReactElement) & {
  Body: typeof CardBody
  Header: typeof CardHeader
  Headings: typeof CardHeadings
  Image: typeof CardImage
  Content: typeof CardContent
  BottomRow: typeof CardBottomRow
  Actions: typeof CardActions
}

function CardRoot({
  variant = 'primary',
  clickable = false,
  stretch = false,
  imageAboveHeader = false,
  children,
  className = '',
  ...rest
}: CardProps) {
  const classes = [
    'tl-card',
    `tl-card--${variant}`,
    clickable && 'tl-card--clickable',
    stretch && 'tl-card--stretch',
    imageAboveHeader && 'tl-card--image-above-header',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (clickable) {
    return (
      <button className={classes} type="button" {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    )
  }

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

function CardBody({ children }: { children: ReactNode }) {
  return <div className="tl-card__body">{children}</div>
}

function CardHeader({ children }: { children: ReactNode }) {
  return <div className="tl-card__header">{children}</div>
}

function CardHeadings({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="tl-card__headings">
      <span className="tl-card__title">{title}</span>
      {subtitle && <span className="tl-card__subtitle">{subtitle}</span>}
    </div>
  )
}

function CardImage({ src, alt }: { src: string; alt: string }) {
  return <img className="tl-card__image" src={src} alt={alt} />
}

function CardContent({ children }: { children: ReactNode }) {
  return <div className="tl-card__content">{children}</div>
}

function CardBottomRow({ children }: { children: ReactNode }) {
  return <div className="tl-card__bottom-row">{children}</div>
}

function CardActions({ children }: { children: ReactNode }) {
  return <div className="tl-card__actions">{children}</div>
}

const Card = CardRoot as CardComponent

Card.Body = CardBody
Card.Header = CardHeader
Card.Headings = CardHeadings
Card.Image = CardImage
Card.Content = CardContent
Card.BottomRow = CardBottomRow
Card.Actions = CardActions

export default Card
