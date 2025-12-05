# XView - Manga Store

Tienda de mangas con Next.js deployable en Vercel.

## Características

- Catálogo de productos (mangas)
- Carrito de compras
- Sistema de usuarios y autenticación local
- Historial de pedidos
- Diseño responsive

## Datos

Todos los datos se sirven desde el cliente usando archivos JSON ubicados en `src/data/`. No se requiere un backend separado.

- `products.json` - Catálogo de mangas
- `categories.json` - Categorías de productos
- Los usuarios y pedidos se almacenan en localStorage

## Getting Started

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.


No se requieren variables de entorno.