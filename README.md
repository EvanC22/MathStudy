# Math Studio — Exam Study Hub

A standalone, interactive math study app with topics, formulas, worked examples, practice problems, quizzes, and browser-local progress.

## Publish on Vercel

1. Create a GitHub repository (e.g. `math-studio`).
2. Upload **`index.html`** and this README to the root of the repository.
3. In Vercel, choose **Add New → Project**, connect GitHub, and import your repository.
4. Set **Framework Preset** to **Other** (if asked). Leave root at `./`, with no build command. Deploy.
5. Share the resulting `https://your-project.vercel.app` URL.

## Run locally

Open `index.html` in your browser. There are no build tools or dependencies.

## Update the website

Replace the root `index.html` in GitHub with a newer version and commit. Vercel will redeploy automatically.

## Study progress

Practice progress is stored in each user's browser using localStorage, not on a shared server. Progress might not follow you to another device, domain, or browser, and can be lost when browser site data is cleared.
