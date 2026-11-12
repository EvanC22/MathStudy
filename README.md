# Math Studio — Groq AI Tutor (Vercel-ready)

This version switches the existing AI tutor from Gemini to **Groq**, while retaining the local **Ollama** option, the 41 topics, practice exercises, MathJax formatting, worked examples, step-by-step solutions, and local browser progress.

## Deploy to GitHub + Vercel

1. Extract this ZIP. Upload its **contents** to the root of your GitHub repository, replacing old files. Make sure the `api/` and `mathjax/` folders upload too.
2. Vercel → Your Project → **Settings** → **Environment Variables** → **Add New**.
   - Name: `GROQ_API_KEY`
   - Value: your Groq key (keep private)
   - Environment: **Production** (also Preview/Development if you use those)
   - Save.
3. Deploy the new repository commit. If you added the key after an earlier deployment, go to **Deployments**, choose a deployment, and select **Redeploy**. New environment variables apply to new deployments.
4. Visit the Vercel URL, open **AI Tutor**, select **Groq · shared website**, and ask about a math problem.
5. Optional: Set `GROQ_MODEL` in Vercel to another supported model. Default: `openai/gpt-oss-120b`.

The API key is used only in `api/tutor.js` on Vercel servers. **Never** put the key in your HTML, `tutor.js`, GitHub commits, or screenshots.

## Local Ollama

Ollama remains available in the tutor dropdown, using `http://localhost:11434`. This is for the *visitor's own computer* and is not a shared cloud service. Open the website locally via `python3 -m http.server 8000` rather than `file://` if you intend to test the local connection. Check `ollama list` for the installed model name.

## Testing locally with a Vercel function

The static Python HTTP server cannot run `/api/tutor`. Either test on your deployed Vercel domain or use Vercel CLI: `npx vercel dev` (requires Vercel login/project setup and locally configured environment variables).

## Free quota and security

Groq's Free Plan has limits (requests/tokens per minute/day). If reached, the tutor shows a rate-limit error; no fallback paid usage is assumed. The in-memory throttle in this demo is **not reliable across multiple serverless instances**. If sharing publicly, add durable rate limiting and ideally authentication/abuse prevention. All visitors share your Groq account's rate limits. Any AI model can make mathematical mistakes; verify against the worked examples.

Progress remains browser-local via `localStorage`, not shared across devices.


## New homework and exam-review content

- Adds original Homework G–P, Homework L’s handwritten solution sheet, LM Problems, and the November 12 Test 2 review sheet in `homework_sources/`.
- **46 topics, 209 interactive questions** (previously 41 topics, 138 questions); old topic indices and saved progress keys retained.
- New portfolio section: asset returns and weights, expected portfolio return, covariance matrix, portfolio risk, minimum-risk portfolios.
- New interactive questions are tagged by source (`HOMEWORK H`, `HOMEWORK L`, `LM PROBLEMS`, etc.) and include numbered worked solutions; a homework-only filter appears on relevant practice pages.
- The full LM Problems textbook page contains far more exercises than the hand-verified subset. All original exercises remain available in the linked reference PDF; not all are interactive or have instructor-provided solutions.
- **Accuracy note:** Only Homework L has a provided official homework answer key. The remaining homework answers here are independently derived; unusual wording (e.g., “two tails”) is disambiguated in the question. Some free-response fields expect a particular answer format; use the step-by-step solution if the checker rejects an equivalent expression.
- No personal API key is included. Continue to set `GROQ_API_KEY` privately in Vercel.
