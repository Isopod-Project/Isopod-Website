import { useEffect, useState } from 'react'

export type View = 'landing' | 'downloads' | 'wiki'

export interface Route {
  view: View
  articleId?: string
  sectionId?: string
}

const ROUTE_CHANGE = 'routechange'

// Hash routes: #/downloads, #/wiki, #/wiki/<article>, #/wiki/<article>/<section>.
// Plain anchors like #features are in-page links on the landing view, not routes.
// The Isopod dashboard's help buttons deep-link into the wiki with these.
export const parseRoute = (hash = window.location.hash): Route => {
  if (!hash.startsWith('#/')) return { view: 'landing' }
  const [view, articleId, sectionId] = hash.slice(2).split('/')
  if (view === 'wiki') return { view: 'wiki', articleId: articleId || undefined, sectionId: sectionId || undefined }
  if (view === 'downloads') return { view: 'downloads' }
  return { view: 'landing' }
}

const routeHash = ({ view, articleId, sectionId }: Route) =>
  view === 'landing' ? '' : '#/' + [view, articleId, sectionId].filter(Boolean).join('/')

// href for a route, so route links are real links (open in new tab, copy link)
export const routeHref = (route: Route) => {
  const { pathname, search } = window.location
  return `${pathname}${search}${routeHash(route)}`
}

export const navigate = (route: Route) => {
  window.history.pushState(null, '', routeHref(route))
  window.dispatchEvent(new Event(ROUTE_CHANGE))
  // Section links scroll themselves into view (see WikiPage); everything else starts at the top
  if (!route.sectionId) window.scrollTo({ top: 0 })
}

export const useRoute = () => {
  const [route, setRoute] = useState<Route>(() => parseRoute())

  useEffect(() => {
    const sync = () => setRoute(parseRoute())
    const events = ['popstate', 'hashchange', ROUTE_CHANGE]
    events.forEach(e => window.addEventListener(e, sync))
    return () => events.forEach(e => window.removeEventListener(e, sync))
  }, [])

  return route
}
