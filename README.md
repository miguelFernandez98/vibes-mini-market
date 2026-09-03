# Mig Market

> **Prueba de UI** replicando el diseño de [7-Eleven](https://www.7-eleven.com/). Este proyecto es un ejercicio de frontend que demuestra la capacidad de replicar un diseño real de una tienda de conveniencia moderna.

## Descripcion

**Mig Market** es un prototipo de tienda en linea inspirado en el sitio web de 7-Eleven. El proyecto fue creado como prueba tecnica de UI, replicando los patrones de diseno, navegacion y estructura visual del sitio oficial de 7-Eleven.

### Caracteristicas de la UI

- **Header sticky** con barra de notificaciones, navegacion por categorias, busqueda y iconos de usuario/carrito (estilo 7-Eleven)
- **Hero section** con banner promocional animado
- **Grid de productos** responsive con cards modernas y animaciones suaves
- **Filtros y busqueda** en tiempo real con panel de filtros colapsable
- **Paginacion** con navegacion numerica
- **Pagina de detalle** de producto con layout moderno, rating de estrellas y botones de accion
- **Footer** completo con newsletter, links de navegacion y redes sociales
- **Animaciones** fluidas usando [Motion](https://motion.dev/) (antes Framer Motion)

## Stack Tecnologico

| Tecnologia | Version | Proposito |
|---|---|---|
| **Next.js** | 15 | Framework de React (App Router) |
| **React** | 19 | Libreria de UI |
| **TypeScript** | 5 | Tipado estatico |
| **Tailwind CSS** | 4 | Utility-first CSS |
| **Motion** | 13 | Animaciones |
| **Lucide React** | - | Iconos |

## API de Productos

Este proyecto utiliza [FakeStoreAPI](https://fakestoreapi.com/) como fuente de datos. Es una API REST gratuita que proporciona datos ficticios de productos para prototipos y testing.

**Endpoints utilizados:**
- `GET /products` - Listado de productos
- `GET /products/:id` - Detalle de producto
- `GET /products/categories` - Lista de categorias
- `GET /products/category/:category` - Productos por categoria

## Estructura del Proyecto

```
mini-market/
├── shared/
│   └── interfaces/
│       └── products.ts        # Interfaces TypeScript compartidas
├── web/                       # Frontend (Next.js 15)
│   ├── app/
│   │   ├── globals.css        # Estilos globales y tema
│   │   ├── layout.tsx         # Layout raiz con Header y Footer
│   │   ├── page.tsx           # Homepage con Hero y categorias
│   │   └── products/
│   │       ├── page.tsx       # Listado de productos con filtros
│   │       └── [id]/
│   │           └── page.tsx   # Detalle de producto
│   ├── components/
│   │   ├── Header.tsx         # Header sticky estilo 7-Eleven
│   │   ├── Footer.tsx         # Footer con newsletter
│   │   ├── Hero.tsx           # Banner hero animado
│   │   ├── ProductCard.tsx    # Card de producto con animaciones
│   │   └── ProductFilters.tsx # Panel de filtros y busqueda
│   ├── lib/
│   │   └── products-api.ts    # Cliente API (FakeStoreAPI)
│   └── next.config.ts         # Configuracion de Next.js
└── api/                       # API original (Express) - referencia
```

## Instalacion

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/vibes-mini-market.git

# 2. Acceder a la carpeta del proyecto
cd vibes-mini-market/mini-market/web

# 3. Instalar dependencias
pnpm install

# 4. Ejecutar en desarrollo
pnpm dev
```

La app estara disponible en `http://localhost:3000`.

## Decisiones de Diseno

- **Colores**: Verde primario (`#00703C`) inspirado en 7-Eleven, con acentos naranjas
- **Tipografia**: Roboto (Google Fonts) para mantener consistencia visual
- **Componentes**: Componentes modulares y reutilizables
- **Animaciones**: Transiciones suaves con Motion para mejorar la experiencia de usuario
- **Responsive**: Diseno mobile-first que se adapta a todos los tamanos de pantalla

## Notas

- Este proyecto es una **prueba de UI** y no incluye funcionalidad de backend completa
- Los datos de productos provienen de FakeStoreAPI (datos ficticios)
- El carrito de compras y autenticacion son solo visuales
- El diseno esta inspirado en 7-Eleven pero no es una copia exacta

## Licencia

Este proyecto es para fines educativos y de demostracion.
