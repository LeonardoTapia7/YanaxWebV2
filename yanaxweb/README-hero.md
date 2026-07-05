# Hero — Yanax Studio (scroll-scrubbing de video)

## Estructura

```
src/
  styles/
    tokens.css                      → variables de diseño (colores, tipografía)
  hooks/
    useAnimacionHeroScroll.js       → toda la lógica de GSAP, aislada y reutilizable
  components/
    Hero/
      Hero.jsx                      → maqueta del Hero, solo conecta el hook
      Hero.css                      → estilos del Hero
  App.jsx                           → ejemplo de cómo montar el Hero
```

La idea de separarlo así: el componente `Hero.jsx` no sabe nada de GSAP ni de
ScrollTrigger, solo arma el markup y le pasa 3 referencias (`refSeccion`,
`refVideo`, `refContenido`) al hook. Toda la animación vive en
`useAnimacionHeroScroll.js`, así que si mañana quieres el mismo efecto de
scroll-scrubbing en otra sección, reutilizas el hook sin copiar y pegar código.

## Instalación

```bash
npm install gsap
```

(Ya tienes React + Vite + Tailwind, así que no hace falta nada más.)

## Comportamiento responsive

El Hero se comporta distinto según el tamaño de pantalla (usando
`gsap.matchMedia()` con el punto de quiebre `min-width: 768px`):

- **Escritorio** (≥768px): igual que antes — la sección se pinea y el
  video hace scroll-scrubbing mientras el texto se desvanece.
- **Celular** (<768px): **no se pinea nada**. El scroll-jacking se siente
  incómodo con el dedo y consume más batería en un video que además se ve
  chico en pantallas angostas. En su lugar, el video se reproduce en loop
  como ambientación y el texto entra con una animación simple apenas
  carga la página. El layout también cambia: en vez de video a la derecha
  + texto superpuesto abajo, en celular se apilan uno debajo del otro
  para que nada se encime.

Si en algún momento quieres cambiar el punto de quiebre (por ejemplo,
para que tablets también usen la versión de escritorio), lo ajustas en
una sola línea: la constante `CONSULTA_MEDIA_ESCRITORIO` al inicio de
`useAnimacionHeroScroll.js`.

## Qué falta de tu lado

1. **Reemplazar el video**: en `Hero.jsx`, cambia la constante
   `URL_VIDEO_APERTURA_LAPTOP` por la ruta a tu clip final (sin marca de
   agua) una vez que resuelvas el pipeline de generación + interpolación.
   Puede ser una ruta local (`/videos/laptop-apertura.mp4`, poniendo el
   archivo en `public/videos/`) o una URL externa.

2. **Ajustar el ritmo de la animación**, si hace falta, cambiando las
   opciones del hook en `Hero.jsx`:
   - `distanciaScroll`: cuánto scroll adicional dura el pin mientras se
     scrubbea el video (`'+=150%'` = 1.5 alturas de pantalla). Súbelo si
     quieres que la apertura del laptop se sienta más lenta y dramática.
   - `duracionDesvanecido`: qué fracción de ese scroll tarda en
     desaparecer el texto del hero (0.35 = el texto se esfuma en el
     primer 35% del recorrido).

3. **Fuente Fraunces**: el CSS usa `var(--fuente-titulo)` que apunta a
   `'Fraunces', serif`. Agrega el import de Google Fonts en tu
   `index.html` (dentro de `<head>`):

   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link
     href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&display=swap"
     rel="stylesheet">
   ```

## Notas técnicas

- El hook usa `gsap.context()` para agrupar todo lo que crea (timeline,
  tween, ScrollTrigger) y poder limpiarlo entero en el `return` del
  `useEffect`. Esto evita animaciones duplicadas o "fantasma" si el
  componente se desmonta y se vuelve a montar (por ejemplo, al navegar
  entre rutas si en el futuro usas React Router).
- Incluye el truco de `play().then(pause())` al cargar el video, necesario
  en iOS Safari para poder mover `currentTime` manualmente por scroll.
- El scrubbing solo arranca cuando el navegador ya conoce la duración del
  video (evento `loadedmetadata`), para no dividir por `NaN`.
