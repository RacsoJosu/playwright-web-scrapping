# Playwright Web Scraper

Este es un proyecto de prueba para realizar web scraping utilizando **Playwright** y un servidor API ligero construido con **Hono**.

## 🚀 Características

- **Automatización de Navegador**: Utiliza Playwright para interactuar con aplicaciones web modernas.
- **API REST**: Expone endpoints para activar procesos de scraping.
- **Gestión de Sesión**: Incluye lógica para realizar login y mantener el estado de la sesión.
- **TypeScript**: Desarrollado con tipado fuerte para mayor robustez.

## 🛠️ Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [pnpm](https://pnpm.io/) (gestor de paquetes recomendado)

## 📦 Instalación

1. Clona este repositorio o descarga los archivos.
2. Instala las dependencias:
   ```bash
   pnpm install
   ```
3. Instala los navegadores necesarios para Playwright:
   ```bash
   pnpm dlx playwright install chromium
   ```

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto basándote en el archivo `.env.example`:

```env
LOGIN_EMAIL=tu_email@ejemplo.com
LOGIN_PASSWORD=tu_password
BASE_URL=https://tu-url-de-aplicacion.com
PORT=3000
```

## 🏃 Ejecución

### Modo Desarrollo (con recarga automática)
```bash
pnpm dev
```

### Construcción y Ejecución de Producción
```bash
pnpm build
pnpm start
```

## 📖 Uso de la API

Una vez que el servidor esté en ejecución (por defecto en `http://localhost:3000`), puedes realizar peticiones de scraping:

### Scraper de Usuarios
Busca información de un usuario específico por su correo electrónico.

- **URL**: `/scrape`
- **Method**: `GET`
- **Query Params**:
  - `email`: El correo electrónico del usuario a buscar.

**Ejemplo de petición:**
`http://localhost:3000/scrape?email=test@example.com`

## 📁 Estructura del Proyecto

- `index.ts`: Punto de entrada del servidor Hono y definición de rutas.
- `browser.ts`: Lógica de inicialización del navegador y gestión de login.
- `playwright.config.ts`: Configuración global de Playwright.
- `.env`: Variables de entorno (credenciales y URLs).
- `auth.json`: Archivo generado que guarda el estado de autenticación.

---
> [!NOTE]
> Este es un proyecto de prueba y debe ser utilizado de manera responsable de acuerdo con los términos de servicio del sitio web objetivo.
