import { readFile, writeFile, rm } from 'node:fs/promises'
import { render } from '../.prerender/entry-server.js'

for (const [path, file] of [['/', 'dist/index.html'], ['/event-planners', 'dist/event-planners/index.html']]) {
  const html = await readFile(file, 'utf8')
  await writeFile(file, html.replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`))
}
await rm('.prerender', { recursive: true, force: true })
