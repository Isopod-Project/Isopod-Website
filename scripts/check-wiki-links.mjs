// Checks that every wiki deep link the dashboard's help buttons use still resolves.
// Usage: node scripts/check-wiki-links.mjs [path-or-url to HelpButton.tsx]
// Defaults to the file on Isopod's main branch.
import { readFileSync } from 'node:fs'

const DEFAULT_SOURCE = 'https://raw.githubusercontent.com/Isopod-Project/Isopod/main/frontend/src/components/HelpButton.tsx'
const source = process.argv[2] ?? DEFAULT_SOURCE

const helpButton = source.startsWith('http')
  ? await (await fetch(source)).text()
  : readFileSync(source, 'utf8')

const topicsBlock = helpButton.match(/HELP_TOPICS = \{([\s\S]*?)\} as const/)?.[1]
if (!topicsBlock) throw new Error(`No HELP_TOPICS found in ${source}`)
const paths = [...new Set([...topicsBlock.matchAll(/:\s*"([^"]+)"/g)].map(m => m[1]))]

// Split the wiki into article blocks, keyed by article id
const wiki = readFileSync(new URL('../src/WikiPage.tsx', import.meta.url), 'utf8')
const articles = new Map()
for (const block of wiki.split(/\n    \{\n      id: '/).slice(1)) {
  articles.set(block.slice(0, block.indexOf("'")), block)
}

const failures = []
for (const path of paths) {
  const [articleId, sectionId] = path.split('/')
  const block = articles.get(articleId)
  if (!block) failures.push(`${path}: no article "${articleId}"`)
  else if (sectionId && !block.includes(`id="${sectionId}"`)) failures.push(`${path}: article has no element with id "${sectionId}"`)
  else if (sectionId && !block.includes(`id: '${sectionId}'`)) failures.push(`${path}: "${sectionId}" missing from the article's sections list`)
}

if (failures.length) {
  console.error(`Broken wiki deep links:\n  ${failures.join('\n  ')}`)
  process.exit(1)
}
console.log(`All ${paths.length} dashboard help links resolve.`)
