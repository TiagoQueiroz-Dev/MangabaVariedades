# Mangaba Variedades

Projeto reestruturado a partir do template `TanstackNestJsTemplate`.

- Prisma as database ORM
- Zod as the single source of truth
- NestJs for dependency injection in the backend
- Open api for strongly typed fetch api
- Tanstack start for strongly typed routing
- Turbo repo for monorepo management

## Desenvolvimento

```powershell
docker compose up -d db
pnpm db:push
pnpm db:seed
pnpm start
```

- Web: http://localhost:3000
- API: http://localhost:3001
- Swagger: http://localhost:3001/api
- Postgres: localhost:55432

- Figma: https://www.figma.com/design/Wq1wm9RbKn88JD3xzgxvf4/Mangaba-Variedades---Catalogo-WEB?node-id=0-1&p=f
