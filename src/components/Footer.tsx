import { useState } from 'react'

const groups = [
  {
    title: 'Foundation',
    links: [
      { label: 'Design tokens', href: 'https://tegel.scania.com/foundations/design-tokens' },
      { label: 'Typography', href: 'https://tegel.scania.com/foundations/typography' },
      { label: 'Accessibility', href: 'https://tegel.scania.com/guidance/accessibility' },
    ],
  },
  {
    title: 'Activation',
    links: [
      { label: 'Components', href: 'https://tegel.scania.com/components' },
      { label: 'Contact', href: '#patterns' },
      { label: 'Release notes', href: 'https://tegel.scania.com/resources/release-notes' },
    ],
  },
  {
    title: 'Scania',
    links: [
      { label: 'Experience hub', href: 'https://experience.scania.com/' },
      { label: 'Tegel documentation', href: 'https://tegel.scania.com/home' },
    ],
  },
]

export default function Footer() {
  const [expandedGroups, setExpandedGroups] = useState<number[]>([])

  const toggleGroup = (index: number) => {
    setExpandedGroups((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    )
  }

  return (
    <footer className="tl-footer tl-footer--primary">
      <div className="tl-footer__top">
        {groups.map((group, index) => (
          <div
            key={group.title}
            className={`tl-footer__group${
              expandedGroups.includes(index) ? ' tl-footer__group--expanded' : ''
            }`}
            role="list"
          >
            <button
              className="tl-footer__top-title"
              type="button"
              aria-expanded={expandedGroups.includes(index)}
              onClick={() => toggleGroup(index)}
            >
              {group.title}
            </button>
            {group.links.map((link) => (
              <a key={link.label} href={link.href} className="tl-footer__link">
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="tl-footer__main">
        <div className="tl-footer__main-top">
          <div className="tl-footer__main-top--start">
            <div className="tl-footer__group" role="list">
              <a
                href="https://www.scania.com/group/en/home/admin/misc/privacy-statement.html"
                className="tl-footer__link"
              >
                Privacy Statement
              </a>
              <a
                href="https://www.scania.com/group/en/home/admin/misc/cookies.html"
                className="tl-footer__link"
              >
                About Cookies
              </a>
              <a
                href="https://www.scania.com/group/en/home/admin/misc/legal-notice.html"
                className="tl-footer__link"
              >
                Legal Notice
              </a>
              <a href="https://www.scania.com/" className="tl-footer__link">
                Scania.com
              </a>
            </div>
          </div>
        </div>
        <div className="tl-footer__main-bottom">
          <small className="tl-footer__copyright">
            © Copyright 2026 Scania CV AB. All rights reserved.
          </small>
          <p className="tl-footer__brand">Scania</p>
        </div>
      </div>
    </footer>
  )
}
