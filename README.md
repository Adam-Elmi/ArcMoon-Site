# ArcMoon Site

The website for [ArcMoon](https://github.com/Adam-Elmi/ArcMoon): docs, playground and tools. Built with ArcMoon.

## Run it

```bash
npm install
npm run build
npm run serve
```

Then open http://localhost:4400.

`npm run build` ends with [Pagefind](https://pagefind.app), which reads the built pages and writes the site search's index to `dist/pagefind/`. It indexes the docs and the release pages (the elements marked `data-pagefind-body`). The search opens from the magnifier in the header, the docs sidebar, `/` or Ctrl/⌘ K. It needs a server (`npm run serve`), not a page opened from disk.

## Layout

- `pages/`: the pages (`docs/`, `tools/`, `versions/`)
- `src/`: components, layouts, styles and code samples
- `dist/`: the built site

## License

MIT © Adam Elmi
