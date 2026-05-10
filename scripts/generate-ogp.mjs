import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const origin = (process.env.APP_ORIGIN || 'https://localhost').replace(/\/$/, '')
const gifListPath = path.join(rootDir, 'src', 'gif-list.ts')
const ogpDir = path.join(rootDir, 'public', 'ogp')

const gifListSource = readFileSync(gifListPath, 'utf8')
const gifNames = [...gifListSource.matchAll(/'([^']+\.gif)'/g)].map((match) => match[1])

if (!existsSync(ogpDir)) {
  mkdirSync(ogpDir, { recursive: true })
}

function resolveImagePath(slug, gifName) {
  const defaultPng = `/png/${slug}.png`
  if (existsSync(path.join(rootDir, 'public', 'png', `${slug}.png`))) {
    return defaultPng
  }

  // Project-specific PNG aliases
  const aliasMap = {
    naikouteki: '/png/naikou.png',
    tateyure: '/png/16.png',
  }
  const aliasedPath = aliasMap[slug]
  if (
    aliasedPath &&
    existsSync(path.join(rootDir, 'public', aliasedPath.replace(/^\//, '')))
  ) {
    return aliasedPath
  }

  return `/gif/${gifName}`
}

for (const gifName of gifNames) {
  const slug = gifName.replace(/\.gif$/i, '')
  const imagePath = resolveImagePath(slug, gifName)
  const ogpUrl = `${origin}/ogp/${slug}.html`
  const imageUrl = `${origin}${imagePath}`
  const title = `そぽが好きなのは${gifName} そぽ〜`
  const description = `そぽたん.gif の ${gifName}`

  const html = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:secure_url" content="${imageUrl}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:url" content="${ogpUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@your_account" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta name="twitter:image:alt" content="${gifName}" />
    <meta http-equiv="refresh" content="0; url=${origin}/" />
  </head>
  <body>
    <a href="${origin}/">そぽたん.gif</a>
  </body>
</html>
`

  writeFileSync(path.join(ogpDir, `${slug}.html`), html, 'utf8')
}
