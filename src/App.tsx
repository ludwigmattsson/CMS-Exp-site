import { useMemo, useState } from 'react'

import Card from './components/Card'
import Footer from './components/Footer'
import Header from './components/Header'
import TegelSearchPanel from './components/TegelSearchPanel'
import { getTegelSearchResultLabel, searchTegelResources } from './data/tegelSearch'

type LinkItem = {
  label: string
  href: string
}

type Principle = {
  title: string
  description: string
}

type PathItem = {
  title: string
  subtitle: string
  image: string
  href: string
  description: string
}

type StoryItem = {
  title: string
  image: string
  href: string
}

type ContactLink = {
  title: string
  label: string
  href: string
  description: string
}

export type SiteContent = {
  hero: {
    title: string
    lead: string
    image: string
    primaryAction: LinkItem
    secondaryAction: LinkItem
  }
  intro: {
    title: string
    body: string
  }
  principles: Principle[]
  paths: PathItem[]
  stories: StoryItem[]
  contact: {
    title: string
    body: string
    links: ContactLink[]
  }
}

type AppProps = {
  content: SiteContent
}

const experienceHeroVideoDesktop =
  'https://cdn.sanity.io/files/l19l5hti/experience-hub-production/89da94832c9bd22d615d8e3060ab40a699077f81.mp4'

const experienceHeroVideoMobile =
  'https://cdn.sanity.io/files/l19l5hti/experience-hub-production/f2f1bad8e80247be08e7c75cb9340a3158ce0788.mp4'

const basePath = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '')

const assetPath = (path: string) => {
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:') || path.startsWith('#')) {
    return path
  }

  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`
}

function App({ content }: AppProps) {
  const [isDarkMode, setDarkMode] = useState(true)
  const [query, setQuery] = useState('')

  const resourceResults = useMemo(() => searchTegelResources(query), [query])
  const resourceResultLabel = getTegelSearchResultLabel(query, resourceResults)

  const paths = useMemo(
    () =>
      content.paths.map((path, index) => ({
        ...path,
        id: path.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `path-${index}`,
      })),
    [content.paths],
  )

  const stories = useMemo(
    () =>
      content.stories.map((story, index) => ({
        ...story,
        id: story.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `story-${index}`,
      })),
    [content.stories],
  )

  const contactLinks = useMemo(
    () =>
      content.contact.links.map((link) => ({
        ...link,
        copy: link.description,
      })),
    [content.contact.links],
  )

  const navigate = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const openContactLink = (href: string) => {
    if (href.startsWith('mailto:')) {
      window.location.href = href
      return
    }

    window.open(href, '_blank', 'noopener,noreferrer')
  }

  const openTegelPage = (href: string) => {
    window.location.href = href
  }

  return (
    <div className={`scania ${isDarkMode ? 'tl-mode-dark' : 'tl-mode-light'}`}>
      <Header
        onNavigate={navigate}
        isDarkMode={isDarkMode}
        onToggleMode={setDarkMode}
      />

      <main>
        <section id="hero" className="hero-section">
          <video
            className="hero-section__image"
            poster={assetPath(content.hero.image)}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src={experienceHeroVideoMobile} type="video/mp4" media="(max-width: 768px)" />
            <source src={experienceHeroVideoDesktop} type="video/mp4" media="(min-width: 769px)" />
          </video>
          <div className="hero-section__overlay" />
          <div className="hero-section__content">
            <h1>{content.hero.title}</h1>
            <p>{content.hero.lead}</p>
            <div className="hero-section__actions">
              <a
                className="tl-button tl-button--secondary tl-button--sm hero-section__button-link"
                href={content.hero.primaryAction.href}
              >
                {content.hero.primaryAction.label}
              </a>
              <a
                className="tl-button tl-button--secondary tl-button--sm hero-section__button-link"
                href={content.hero.secondaryAction.href}
              >
                {content.hero.secondaryAction.label}
              </a>
            </div>
          </div>
        </section>

        <section id="principles" className="content-section content-section--intro">
          <div className="section-heading">
            <h2>{content.intro.title}</h2>
          </div>
          <p className="intro-grid__lead">{content.intro.body}</p>
          <div className="principle-grid">
            {content.principles.map((principle) => (
              <Card key={principle.title} stretch className="principle-card">
                <Card.Body>
                  <Card.Header>
                    <Card.Headings title={principle.title} />
                  </Card.Header>
                  <Card.Content>
                    <p>{principle.description}</p>
                  </Card.Content>
                </Card.Body>
              </Card>
            ))}
          </div>
        </section>

        <section className="story-strip" aria-labelledby="story-title">
          <div className="story-strip__heading">
            <h2 id="story-title">Show the detail, then reveal the system.</h2>
          </div>
          <div className="story-strip__rail">
            {stories.map((story) => (
              <a
                className="story-card"
                key={story.id}
                href={story.href}
                aria-label={`Open ${story.title} on Tegel`}
              >
                <img src={assetPath(story.image)} alt="" />
                <span className="story-card__label">{story.title}</span>
              </a>
            ))}
          </div>
        </section>

        <section id="paths" className="content-section">
          <div className="section-heading">
            <h2>Choose a path before choosing a component.</h2>
          </div>
          <div className="path-layout">
            <div className="path-grid">
              {paths.map((path) => (
                <Card
                  key={path.id}
                  clickable
                  imageAboveHeader
                  stretch
                  className="path-card"
                  aria-label={`Open ${path.title} on Tegel`}
                  data-href={path.href}
                  onClick={() => openTegelPage(path.href)}
                >
                  <Card.Image src={assetPath(path.image)} alt="" />
                  <Card.Body>
                    <Card.Header>
                      <Card.Headings title={path.title} subtitle={path.subtitle} />
                    </Card.Header>
                    <Card.Content>
                      <p>{path.description}</p>
                    </Card.Content>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="resources" className="content-section content-section--layered resource-search-section">
          <div className="section-heading">
            <h2>Search</h2>
          </div>
          <Card stretch className="resource-search" role="region" aria-label="Tegel resource search">
            <Card.Body>
              <Card.Content>
                <TegelSearchPanel
                  className="site-search__panel--embedded"
                  inputId="resource-search"
                  inputLabel="Search Tegel resources"
                  placeholder="Search components, tokens, typography..."
                  query={query}
                  items={resourceResults}
                  resultLabel={resourceResultLabel}
                  maxResults={6}
                  emptyMessage="No Tegel pages matched that search. Try a component name, token, or pattern."
                  onQueryChange={setQuery}
                />
              </Card.Content>
            </Card.Body>
          </Card>
        </section>

        <section id="patterns" className="content-section contact-section">
          <div className="contact-section__content">
            <h2>{content.contact.title}</h2>
            <p>{content.contact.body}</p>
            <div className="contact-link-grid" aria-label="Useful Tegel links">
              {contactLinks.map((item) => (
                <Card
                  key={item.title}
                  clickable
                  stretch
                  className="contact-link-card"
                  onClick={() => openContactLink(item.href)}
                >
                  <Card.Body>
                    <Card.Header>
                      <Card.Headings title={item.title} />
                    </Card.Header>
                    <Card.Content>
                      <p>{item.copy}</p>
                    </Card.Content>
                    <Card.BottomRow>
                      <Card.Actions>
                        <span className="contact-link-card__cta">{item.label}</span>
                      </Card.Actions>
                    </Card.BottomRow>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
