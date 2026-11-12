# Math Studio — AI Tutor

Includes 41 lesson topics, 138 questions (including Quiz 3/4), expandable step-by-step explanations, local MathJax, and a context-aware Gemini/Ollama tutor. Your original `math-studio-progress-v1` browser storage key is preserved, provided you use the same domain and browser.

## Deploy on Vercel

1. Unzip and commit **all** files to the root of your GitHub repository: `index.html`, `styles.css`, `app.js`, `tutor.js`, `api/tutor.js`, and the entire `mathjax/` directory.
2. Import that repository into Vercel, set Framework Preset to **Other**; no build command needed. Vercel serves the static app and deploys `api/tutor.js` as a Node.js serverless function.
3. In [Google AI Studio](https://aistudio.google.com/apikey), create a Gemini developer API key (if your school account allows one). Having Gemini through Fordham **does not guarantee** API access or API credits.
4. Add `GEMINI_API_KEY` under Vercel Project → Settings → Environment Variables, then redeploy. Optionally set `GEMINI_MODEL` to another supported model; default is `gemini-2.5-flash`.
5. On the site choose **Gemini · shared website**. Friends can use the tutor without their own key, subject to your quota.

**Important:** Never commit the API key to GitHub, `index.html`, or `tutor.js`. A public website allows anyone to invoke your server-side key. Included per-IP rate control is only best-effort for one server instance, not sufficient protection against paid API abuse. Configure quotas and billing alerts and consider durable rate limiting or authentication before sharing widely. API free tiers have independent limits and terms.

## Use Ollama locally

1. Run `ollama list` to view downloaded models. If empty: `ollama pull qwen2.5:7b`.
2. Start Ollama (`ollama serve` if not already running).
3. In this folder, run `python3 -m http.server 8000`, then open `http://localhost:8000` in a browser.
4. Choose **Ollama · this computer** and enter the model name.

On a Vercel-hosted site, Ollama connects to **each visitor's own computer**, not your Mac. Browser cross-origin requests may require setting `OLLAMA_ORIGINS` to the exact website origin and restarting Ollama. Local browser restrictions can still apply. Do not expose a local Ollama server publicly to share it.

## Notes

- Bundled MathJax is used in lesson formula cards, prose, worked examples, practice prompts, solutions, and tutor messages. Many legacy math expressions are converted automatically, but exceptionally complex plain-text notation may need explicit LaTeX in the content.
- Every question now includes an ordered solution. The 15 instructor quiz subquestions have detailed handwritten-solution-aligned steps. Many original short conceptual exercises only have a brief computational or conceptual derivation in the source bank, so their walkthroughs are shorter.
- The October 7 classroom examples about constrained extrema and the symbolic form of Cramer's rule were checked and labeled by date.
- Progress is saved in the same browser/site using `localStorage`, not a cross-device account.
