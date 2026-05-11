import type { HTMLAttributes } from 'react'

import type { TegelSearchItem } from '../data/tegelSearchIndex'
import Icon from './Icon'
import TextField from './TextField'

interface TegelSearchPanelProps extends HTMLAttributes<HTMLDivElement> {
  inputId: string
  inputLabel: string
  placeholder: string
  query: string
  items: TegelSearchItem[]
  resultLabel: string
  maxResults?: number
  autoFocus?: boolean
  closeLabel?: string
  emptyMessage: string
  onClose?: () => void
  onQueryChange: (value: string) => void
}

export default function TegelSearchPanel({
  inputId,
  inputLabel,
  placeholder,
  query,
  items,
  resultLabel,
  maxResults = 8,
  autoFocus = false,
  closeLabel = 'Close search',
  emptyMessage,
  onClose,
  onQueryChange,
  className = '',
  ...rest
}: TegelSearchPanelProps) {
  const visibleResults = items.slice(0, maxResults)

  const openResult = (url: string) => {
    onClose?.()
    window.location.href = url
  }

  const openFirstResult = () => {
    const firstResult = visibleResults[0]

    if (firstResult) {
      openResult(firstResult.url)
    }
  }

  const panelClasses = ['site-search__panel', className].filter(Boolean).join(' ')

  return (
    <div className={panelClasses} {...rest}>
      <div className="site-search__form" role="search">
        <TextField
          id={inputId}
          labelPosition="none"
          ariaLabel={inputLabel}
          placeholder={placeholder}
          size="lg"
          prefixIcon="search"
          value={query}
          autoFocus={autoFocus}
          onChange={onQueryChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              openFirstResult()
            }
          }}
        />
        {onClose && (
          <button
            type="button"
            className="site-search__close"
            aria-label={closeLabel}
            onClick={onClose}
          >
            <Icon name="cross" size="20" />
          </button>
        )}
      </div>
      <div className="site-search__meta" aria-live="polite">
        {resultLabel}
      </div>
      <ul className="site-search__results">
        {visibleResults.map((result) => (
          <li className="tl-header__dropdown-menu-item site-search__result-row" key={result.url}>
            <a
              className="site-search__result"
              href={result.url}
              onClick={(event) => {
                event.preventDefault()
                openResult(result.url)
              }}
            >
              <span className="site-search__result-section">{result.section}</span>
              <span className="site-search__result-title">{result.title}</span>
              <span className="site-search__result-description">{result.description}</span>
              <span className="site-search__result-url">{result.url}</span>
            </a>
          </li>
        ))}
      </ul>
      {query.trim() && visibleResults.length === 0 && (
        <div className="site-search__empty">{emptyMessage}</div>
      )}
    </div>
  )
}
