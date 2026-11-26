# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## AI onboarding assistant

The assistant sends chat messages through the local Node API. Gemini is the default provider for free-tier testing; keep its key on the server.

1. Create a Gemini API key in [Google AI Studio](https://aistudio.google.com/apikey).
2. Copy `.env.example` to `src/.env` and add `AI_PROVIDER=gemini`, `GEMINI_API_KEY`, and `GEMINI_MODEL=gemini-3.5-flash-lite`. Do not put the key in a `VITE_*` variable or commit it.
3. In one terminal run `npm run api`.
4. In another terminal run `npm run dev`.

The Gemini 3.5 Flash-Lite model currently has a free tier with quotas; access may vary by account or region. Google says free-tier content may be used to improve its products, so avoid sending sensitive data. Details: [Gemini API pricing](https://aistudio.google.com/docs/models/gemini-3.5-flash-lite#pricing). OpenAI remains available by setting `AI_PROVIDER=openai`, `OPENAI_API_KEY`, and optionally `OPENAI_MODEL`. The assistant can answer questions, but external actions such as connecting integrations still need their own secure implementations.

### Image generation

The workspace chat's **Generate image** action uses Stability AI's Stable Diffusion 3.5 Flash model. Create a key at [Stability AI API keys](https://platform.stability.ai/dashboard/api-keys) and add `STABILITY_API_KEY` to `src/.env`. Each successful generation costs 2.5 Stability credits; new accounts currently receive 25 free credits, subject to account eligibility and remaining balance. The app does not purchase or refill credits. When credits run out, generation returns an error. See [Stability AI pricing](https://docs.stability.ai/pricing).

### Authentication

Google sign-in uses Google Identity Services. Email entry is a localhost-only test flow and does not verify or save the email. Connect the backend authentication before enabling email sign-in outside local development.
