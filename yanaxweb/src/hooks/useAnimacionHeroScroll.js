import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// A partir de este ancho se considera "escritorio". Debajo de esto,
// el hero usa la versión simplificada (sin pin ni scroll-scrubbing).
const CONSULTA_MEDIA_ESCRITORIO = '(min-width: 768px)';

/**
 * useAnimacionHeroScroll
 * ----------------------
 * Controla la animación del Hero de forma distinta según el tamaño de
 * pantalla:
 *
 * - ESCRITORIO: la sección se pinea y el video avanza cuadro a cuadro
 *   según el progreso del scroll (scroll-scrubbing), mientras el texto
 *   se desvanece al inicio del recorrido.
 *
 * - CELULAR: no se pinea nada (el scroll-jacking se siente mal con el
 *   dedo y consume más batería). El video simplemente se reproduce en
 *   loop como ambientación, y el texto entra con una animación simple
 *   apenas carga la página.
 *
 * @param {Object} referencias
 * @param {React.RefObject<HTMLElement>} referencias.refSeccion   - contenedor del Hero
 * @param {React.RefObject<HTMLVideoElement>} referencias.refVideo    - elemento <video>
 * @param {React.RefObject<HTMLElement>} referencias.refContenido - bloque de texto
 *
 * @param {Object} [opciones]
 * @param {string} [opciones.distanciaScroll='+=150%'] - scroll extra del pin (solo escritorio)
 * @param {number} [opciones.duracionDesvanecido=0.35] - fracción del scroll en que se desvanece el texto (solo escritorio)
 */
export function useAnimacionHeroScroll(
  { refSeccion, refVideo, refContenido },
  opciones = {}
) {
  const {
    distanciaScroll = '+=150%',
    duracionDesvanecido = 0.35,
  } = opciones;

  useEffect(() => {
    const elementoSeccion = refSeccion.current;
    const elementoVideo = refVideo.current;
    const elementoContenido = refContenido.current;

    if (!elementoSeccion || !elementoVideo || !elementoContenido) {
      return undefined;
    }

    const contextoAnimacion = gsap.context(() => {
      const administradorMedia = gsap.matchMedia();

      // ----- VERSIÓN ESCRITORIO: pin + scroll-scrubbing del video -----
      administradorMedia.add(CONSULTA_MEDIA_ESCRITORIO, () => {
        const configurarScrubbingEscritorio = () => {
          const duracionVideo = elementoVideo.duration;

          if (!duracionVideo || Number.isNaN(duracionVideo)) {
            return;
          }

          // Truco necesario en iOS Safari para poder mover currentTime
          // manualmente: reproducir y pausar una vez, sin que se note.
          elementoVideo
            .play()
            .then(() => elementoVideo.pause())
            .catch(() => {
              // Autoplay bloqueado por el navegador: no es grave, el
              // scrubbing igual funciona en la mayoría de los casos.
            });

          const lineaDeTiempoHero = gsap.timeline({
            scrollTrigger: {
              trigger: elementoSeccion,
              start: 'top top',
              end: distanciaScroll,
              scrub: true,
              pin: true,
              anticipatePin: 1,
              onUpdate: (instanciaScroll) => {
                elementoVideo.currentTime =
                  instanciaScroll.progress * duracionVideo;
              },
            },
          });

          lineaDeTiempoHero.to(
            elementoContenido,
            {
              opacity: 0,
              y: -30,
              duration: duracionDesvanecido,
              ease: 'power1.out',
            },
            0
          );
        };

        if (elementoVideo.readyState >= 1) {
          configurarScrubbingEscritorio();
        } else {
          elementoVideo.addEventListener(
            'loadedmetadata',
            configurarScrubbingEscritorio,
            { once: true }
          );
        }

        // Esta función de limpieza la ejecuta gsap.matchMedia() solo si
        // la pantalla deja de cumplir la consulta de escritorio (por
        // ejemplo, si el usuario rota o cambia el tamaño de la ventana).
        return () => {
          elementoVideo.removeEventListener(
            'loadedmetadata',
            configurarScrubbingEscritorio
          );
        };
      });

      // ----- VERSIÓN CELULAR: sin scroll-jacking -----
      administradorMedia.add(`not ${CONSULTA_MEDIA_ESCRITORIO}`, () => {
        elementoVideo.loop = true;
        elementoVideo.play().catch(() => {
          // Si el navegador bloquea el autoplay, el video se queda quieto
          // en su primer cuadro, lo cual igual se ve bien como imagen fija.
        });

        const animacionEntradaTexto = gsap.from(elementoContenido, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.2,
        });

        return () => {
          elementoVideo.loop = false;
          animacionEntradaTexto.kill();
        };
      });
    }, elementoSeccion);

    return () => {
      contextoAnimacion.revert();
    };
  }, [refSeccion, refVideo, refContenido, distanciaScroll, duracionDesvanecido]);
}

