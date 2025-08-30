# vibes-mini-market
## Mini market deportivo
**Prueba técnica**

## 📖 Descripción

**vibes-mini-market** Es un proyecto desarrollado con la intención de cumplir los criterios requeridos en la asignación de la prueba. El proyecto solicitaba una aplicación *fullstack* donde se pudiera visualizar productos y sus detalles, así como filtrarlos y realizar búsquedas avanzadas.

Para lograrlo, se utilizó el siguiente stack tecnológico:

* **Next.js**: Como entorno de ejecución para el frontend.
* **TypeScript**: Para aprovechar el tipado estático y mejorar la escalabilidad del código.
* **Express**: Como el medio para estructurar el backend.

---

## El proyecto cumple con los siguientes requerimientos:

✅ Implementar una API con Express (TS) que devuelva productos (listado y detalle).

✅ Implementar páginas en Next.js (TS): `/products` (lista) y `/products/[id]` (detalle).

✅ Crear un algoritmo utilitario en TS para obtener los productos más baratos disponibles.

✅ Maquetar una UI básica según el *mock* textual (cards y detalle).

✅ Usar Git y compartir el repositorio para la evaluación.

✅ Documentar decisiones y pendientes en un README propio.

---

## El proyecto no cumple o se puede mejorar en:

❌ **Opcional: persistencia en MongoDB y/o tests unitarios.**
* No se implementó una base de datos por falta de tiempo, pero se considera una mejora a futuro.
* La interfaz de usuario puede mejorarse aún más, implementando mejoras de UX para que la aplicación sea más intuitiva.
* El código puede simplificarse para mejorar su claridad y facilidad de modificación.

---

## ⚙️ Instalación

```bash
# 1. Clonar el repositorio
git clone [https://github.com/](https://github.com/)[tu-usuario]/vibes-mini-market.git

# 2. Acceder a la carpeta del proyecto
cd vibes-mini-market

# 3. Acceder a la carpeta correspondiente (web o api)
cd api
# o
cd web

# 4. Instalar las dependencias
npm install
# o
pnpm install

# 5. Configurar las variables de entorno
# Usa el archivo `.env.example` en cada una de las carpetas como base.

# 6. Ejecutar en desarrollo
npm run dev
# o
pnpm run dev
