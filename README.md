# ReFut Landing Page

Landing page para ReFut - El futuro del fútbol amateur en México.

**Producción futura:** `refut.app` · **Staging actual:** `landing.refut.app` (Vercel: `refut-landing`)

## Audiencias

Switcher **Jugadores | Dueños** en el navbar. Por defecto: **Dueños**.

## URLs (staging)

- Landing: https://landing.refut.app
- App: https://dev.refut.app
- Acceso restringido: `?access=TU_STAGING_ACCESS_SECRET`

Ver [docs/DEPLOY.md](../docs/DEPLOY.md) para variables de entorno en Vercel.

## Desarrollo local

```bash
npm install
cp firebase-config.example.env .env.local
npm run dev
```

Abre `http://localhost:3000` o `http://localhost:3000/?audience=jugadores`.

## Deploy en Vercel (refut-landing)

1. Root directory: `landing-page`
2. Dominio: `landing.refut.app`
3. Variables: ver `firebase-config.example.env` y `docs/DEPLOY.md`

## Estructura destacada

- `lib/env.ts` — URLs por entorno (`SITE_URL`, `APP_URL`)
- `middleware.ts` — protección staging con `STAGING_ACCESS_SECRET`
- `pages/staging-access.tsx` — pantalla de código de acceso
