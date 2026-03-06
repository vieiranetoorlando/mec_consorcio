# MEC Consorcio - Fullstack Next.js + Supabase

Projeto fullstack em Next.js (App Router) para geracao de leads via WhatsApp e gestao de cartas contempladas em area administrativa.

## Stack

- Next.js (App Router)
- TypeScript
- TailwindCSS
- ESLint
- Prettier
- Supabase (Postgres + Auth + RLS)

## Estrutura

```txt
src/
  app/
    (public)/
      page.tsx
      cartas/page.tsx
      sobre/page.tsx
    (admin)/
      admin/login/page.tsx
      admin/cartas/page.tsx
    api/
      cartas/route.ts
      admin/cartas/route.ts
      admin/cartas/[id]/route.ts
  components/
    layout/
    home/
    cartas/
    admin/
    ui/
  domain/
    cartas/
      types.ts
      mapper.ts
      service.ts
      validation.ts
  lib/
    supabase/
      client.ts
      server.ts
      auth.ts
    http/
      responses.ts
      errors.ts
  data/
    cartas.mock.ts
```

## Variaveis de ambiente

Crie `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Use `.env.example` como referencia.

## Supabase (resumo)

1. Criar projeto.
2. Criar tabela `public.cartas`.
3. Ativar RLS.
4. Criar policies de leitura publica de ATIVA e CRUD do owner autenticado.
5. Criar usuario admin (Menderson) no Auth.

## Regras de negocio

- Publico: ve apenas cartas com status `ATIVA`.
- Admin autenticado autorizado: ve todas as proprias cartas (`ATIVA`, `VENDIDA`, `PAUSADA`) e faz CRUD.
- Front usa camelCase; banco usa snake_case (mapper no dominio faz conversao).

## Rotas API

- `GET /api/cartas`
- `GET /api/admin/cartas`
- `POST /api/admin/cartas`
- `PATCH /api/admin/cartas/[id]`
- `DELETE /api/admin/cartas/[id]`

## Rodando local

```bash
npm install
npm run dev
```

Aplicacao em `http://localhost:3000`.

## Validacao antes de deploy

```bash
npm run lint
npm run build
```

## Deploy

Deploy recomendado: Vercel.

- Conectar repositório GitHub.
- Configurar env vars na Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
