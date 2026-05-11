import { tegelSearchIndex, type TegelSearchItem } from './tegelSearchIndex'

const defaultResourceTitles = [
  'Tegel Design System',
  'Getting started development',
  'Design tokens',
  'Typography',
  'Button',
  'Form patterns',
]

const searchStopWords = new Set([
  'a',
  'about',
  'do',
  'find',
  'for',
  'guidance',
  'how',
  'i',
  'me',
  'please',
  'rules',
  'show',
  'the',
  'use',
])

export const normalizeSearchValue = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9@.-]+/g, ' ')
    .trim()

export function getDefaultTegelResources() {
  return defaultResourceTitles
    .map((title) => tegelSearchIndex.find((item) => item.title === title))
    .filter((item): item is TegelSearchItem => Boolean(item))
}

export function getTegelSearchResultLabel(query: string, results: TegelSearchItem[]) {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    return 'Popular Tegel documentation'
  }

  return `${results.length} results for "${trimmedQuery}"`
}

export function searchTegelResources(query: string): TegelSearchItem[] {
  const normalizedQuery = normalizeSearchValue(query)

  if (!normalizedQuery) {
    return getDefaultTegelResources()
  }

  const terms = normalizedQuery
    .split(/\s+/)
    .filter((term) => term && !searchStopWords.has(term))

  if (terms.length === 0) {
    return getDefaultTegelResources()
  }

  return tegelSearchIndex
    .map((item) => {
      const title = normalizeSearchValue(item.title)
      const section = normalizeSearchValue(item.section)
      const description = normalizeSearchValue(item.description)
      const keywords = item.keywords.map(normalizeSearchValue)
      const haystack = [title, section, description, keywords.join(' ')].join(' ')

      if (!terms.every((term) => haystack.includes(term))) {
        return { item, score: 0 }
      }

      const score =
        terms.reduce((total, term) => {
          if (title === term) return total + 96
          if (title.startsWith(term)) return total + 68
          if (title.includes(term)) return total + 48
          if (keywords.some((keyword) => keyword.includes(term))) return total + 32
          if (section.includes(term)) return total + 18
          if (description.includes(term)) return total + 10
          return total + 1
        }, 0) +
        (item.section === 'Components' ? 4 : 0) +
        (item.section === 'Foundations' ? 3 : 0)

      return { item, score }
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .map((result) => result.item)
}
