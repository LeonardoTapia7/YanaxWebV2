# Yanax Studio — Sitio completo (React + GSAP)

## Por qué se veía "a la mitad de la pantalla"

Vite trae, por defecto, dos archivos que casi nadie borra y que arruinan
cualquier layout full-width:

- `src/index.css` (importado en `main.jsx`) trae `body { display: flex;
  place-items: center; min-width: 320px; }`
- `src/App.css` le pone a `#root` un `max-width: 1280px; margin: 0 auto;
  padding: 2rem; text-align: center;`

Eso es exactamente lo que centra y encoge todo el sitio. **Hay que
borrarlos** (o vaciarlos) y usar en su lugar `src/styles/global.css`, que
ya viene incluido en este paquete.

### `main.jsx` correcto

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// NO importar aquí './index.css' del template de Vite — bórralo o vacíalo.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

`App.jsx` ya se encarga de importar `global.css` y `tokens.css` por ti.

## Instalación

```bash
npm install gsap
```

Y agrega la fuente Fraunces en tu `index.html` (dentro de `<head>`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link
  href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&display=swap"
  rel="stylesheet">
```

## Estructura

```
src/
  styles/
    global.css                          → reset (soluciona el bug de ancho)
    tokens.css                          → variables de diseño (colores, tipografía)
  hooks/
    useAnimacionHeroScroll.js           → scroll-scrubbing del video del Hero (con versión mobile sin pin)
    useAnimacionPilaresScroll.js        → pin + crossfade de los 3 pilares
    useAnimacionServiciosScroll.js      → pin + slide horizontal de los servicios
    useAnimacionPieDePaginaReveal.js    → reveal del nombre gigante en el footer
    useAnimacionNavScroll.js            → fondo del nav al hacer scroll
  components/
    Nav/            Nav.jsx + Nav.css
    Hero/           Hero.jsx + Hero.css
    Pilares/        Pilares.jsx + Pilares.css
    Showcase/       Showcase.jsx + Showcase.css
    Servicios/      Servicios.jsx + Servicios.css
    CtaFooter/      CtaFooter.jsx + CtaFooter.css
  App.jsx           → arma el sitio completo en orden
```

Cada sección animada sigue el mismo patrón: el componente `.jsx` solo
arma el markup y expone un par de `refs`; toda la lógica de GSAP vive en
su propio hook. Así, si mañana quieres reusar una animación en otra
sección, reusas el hook sin duplicar código.

## Qué es contenido de ejemplo (reemplazar)

- **Showcase**: el caso de ESPE ya tiene texto real; el bloque "Próximo
  caso" es un marcador de posición a propósito, para cuando tengas otro
  proyecto que valga la pena mostrar.
- **Hero**: `URL_VIDEO_APERTURA_LAPTOP` en `Hero.jsx` apunta a un video de
  prueba — cámbiala por tu clip final.
- **Pilares y Servicios**: los recuadros "Imagen / mockup ___" son
  marcadores de posición; reemplázalos por tus imágenes reales cuando
  las tengas (en `Pilares.jsx` / `Servicios.jsx`, dentro de
  `pilar-visual-interior` / `servicio-visual-interior`).
- **Morado de marca**: sigue en `--color-morado` dentro de
  `tokens.css`, con un valor de referencia. Cámbialo por tu hex exacto
  cuando lo tengas.
- **Links de contacto** (WhatsApp, Instagram, correo) en `CtaFooter.jsx`
  están vacíos (`href="#"`) — falta que me pases los datos reales.
