# Math Studio — Vercel / GitHub ready

Static website with vanilla JavaScript, separate CSS, and a bundled local copy of MathJax. No Node server, no build command, no API key, and no database required.

## Deploy
Upload **all** files and the `mathjax/` folder to the root of your GitHub repository (not the ZIP itself). In Vercel select **Other** for framework, leave build command empty, and deploy.

## Running locally
Use a small static server from the project folder (`python3 -m http.server 8000`) then open `http://localhost:8000`. Opening `index.html` directly may work in some browsers, but serving the files is more reliable.

## What's where
- `index.html` — page structure and MathJax configuration
- `styles.css` — dark UI, collapsible navigation, solved/incorrect states
- `app.js` — 41 study topics, practice questions, instructor quiz sets, answer checking, progress persistence, and mathematical formula mappings
- `mathjax/` — bundled math-rendering engine and fonts, so no CDN access is needed

Progress is saved to the browser's localStorage and is private to each browser/device. Browser data can be lost if cleared. Different origins (file://, localhost, vercel.app) do not automatically share saved progress.
