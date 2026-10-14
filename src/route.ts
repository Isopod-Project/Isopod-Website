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

export const navigate = (route: Route) => {
  const { pathname, search } = window.location
  window.history.pushState(null, '', `${pathname}${search}${routeHash(route)}`)
  window.dispatchEvent(new Event(ROUTE_CHANGE))
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
