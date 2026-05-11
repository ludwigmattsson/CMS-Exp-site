import { useEffect, useMemo, useRef, useState } from 'react'
import { getTegelSearchResultLabel, searchTegelResources } from '../data/tegelSearch'
import Icon from './Icon'
import TegelSearchPanel from './TegelSearchPanel'
import Toggle from './Toggle'

interface HeaderProps {
  onNavigate: (section: string) => void
  onOpenMenu: () => void
  isDarkMode: boolean
  onToggleMode: (checked: boolean) => void
}

export default function Header({
  onNavigate,
  onOpenMenu,
  isDarkMode,
  onToggleMode,
}: HeaderProps) {
  const [isSearchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchDropdownRef = useRef<HTMLLIElement>(null)

  const searchResults = useMemo(() => searchTegelResources(searchQuery), [searchQuery])
  const resultLabel = getTegelSearchResultLabel(searchQuery, searchResults)

  useEffect(() => {
    if (!isSearchOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false)
      }
    }

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!searchDropdownRef.current?.contains(event.target as Node)) {
        setSearchOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    window.addEventListener('pointerdown', closeOnOutsidePress)
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('pointerdown', closeOnOutsidePress)
    }
  }, [isSearchOpen])

  const openSearch = () => {
    setSearchOpen(true)
    setSearchQuery('')
  }

  return (
    <header className="tl-header app-header">
      <nav className="tl-header__nav" aria-label="Primary">
        <ul className="tl-header__list">
          <li className="tl-header__item app-header__hamburger">
            <button
              type="button"
              className="tl-header__item-wrapper"
              onClick={onOpenMenu}
              aria-label="Open menu"
            >
              <Icon name="burger" size="20" />
            </button>
          </li>
          <li className="tl-header__title">
            <h4 className="tl-header__title-text">Tegel Design System</h4>
          </li>
          <li className="tl-header__middle-spacer" />
          <li className="tl-header__dropdown app-header__search-dropdown" ref={searchDropdownRef}>
            <button
              type="button"
              className={`tl-header__dropdown-wrapper app-header__search-trigger${
                isSearchOpen ? ' tl-header__dropdown-wrapper--open' : ''
              }`}
              aria-label={isSearchOpen ? 'Close Tegel search' : 'Open Tegel search'}
              aria-expanded={isSearchOpen}
              aria-haspopup="dialog"
              aria-controls="site-search-dialog"
              onClick={() => (isSearchOpen ? setSearchOpen(false) : openSearch())}
            >
              <Icon name="search" size="20" />
            </button>
            <TegelSearchPanel
              id="site-search-dialog"
              className={`tl-header__dropdown-menu${
                isSearchOpen ? ' tl-header__dropdown-menu--open' : ''
              }`}
              role="dialog"
              aria-label="Tegel search panel"
              inputId="site-search-input"
              inputLabel="Search Tegel documentation"
              placeholder="Search components, tokens, typography..."
              query={searchQuery}
              items={searchResults}
              resultLabel={resultLabel}
              autoFocus={isSearchOpen}
              emptyMessage="No Tegel pages matched that search. Try a component name, token, or pattern."
              onQueryChange={setSearchQuery}
              onClose={() => setSearchOpen(false)}
            />
          </li>
          <li className="tl-header__item app-header__mode-item">
            <Toggle
              id="mode-toggle"
              size="lg"
              label={isDarkMode ? 'Dark mode' : 'Light mode'}
              checked={isDarkMode}
              onChange={(event) => onToggleMode(event.currentTarget.checked)}
              className="app-header__mode-toggle"
            />
          </li>
          <li className="tl-header__item">
            <button
              type="button"
              className="tl-header__item-wrapper"
              onClick={() => onNavigate('hero')}
              aria-label="Tegel home"
            >
              <div className="tl-header__brand" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
