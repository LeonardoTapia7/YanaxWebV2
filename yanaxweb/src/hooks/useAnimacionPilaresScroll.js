import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useAnimacionPilaresScroll
 * -------------------------
 * Pinea la sección de pilares y hace que cada diapositiva (texto + imagen)
 * se desvanezca hacia el siguiente en el mismo lugar, en vez de que cada
 * pilar ocupe su propio tramo de scroll. También actualiza los puntos de
 * progreso (".pilares-progreso span") para indicar en qué pilar va el
 * usuario.
 *
 * @param {React.RefObject<HTMLElement>} refEnvoltura - contenedor alto que define cuánto scroll dura toda la animación
 * @param {React.RefObject<HTMLElement>} refFijo       - contenedor de 100vh que se pinea en pantalla
 */
export function useAnimacionPilaresScroll(refEnvoltura, refFijo) {
  useEffect(() => {
    const elementoEnvoltura = refEnvoltura.current;
    const elementoFijo = refFijo.current;

    if (!elementoEnvoltura || !elementoFijo) {
      return undefined;
    }

    const contextoAnimacion = gsap.context(() => {
      const diapositivas = gsap.utils.toArray('.pilar-diapositiva');
      const puntosDeProgreso = gsap.utils.toArray('.pilares-progreso span');

      const lineaDeTiempoPilares = gsap.timeline({
        scrollTrigger: {
          trigger: elementoEnvoltura,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          pin: elementoFijo,
          onUpdate: (instanciaScroll) => {
            const indiceActivo = Math.min(
              diapositivas.length - 1,
              Math.floor(instanciaScroll.progress * diapositivas.length)
            );
            puntosDeProgreso.forEach((punto, indice) => {
              punto.classList.toggle('activo', indice === indiceActivo);
            });
          },
        },
      });

      diapositivas.forEach((diapositivaActual, indice) => {
        if (indice === 0) return;

        const diapositivaAnterior = diapositivas[indice - 1];
        const momentoDeTransicion = indice - 0.5;

        lineaDeTiempoPilares
          .to(
            diapositivaAnterior,
            { opacity: 0, y: -24, duration: 0.5, ease: 'power1.inOut' },
            momentoDeTransicion
          )
          .fromTo(
            diapositivaActual,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power1.inOut' },
            momentoDeTransicion
          );
      });
    }, elementoEnvoltura);

    return () => {
      contextoAnimacion.revert();
    };
  }, [refEnvoltura, refFijo]);
}
