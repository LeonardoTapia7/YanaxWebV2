import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useAnimacionServiciosScroll
 * ---------------------------
 * Pinea la sección de servicios: cada servicio ocupa toda la pantalla y,
 * al seguir bajando el scroll, se desliza hacia afuera mientras el
 * siguiente entra desde el costado (combinando un desplazamiento chico en
 * píxeles con un fade, no un porcentaje del ancho — así nunca hay riesgo
 * de que dos diapositivas queden superpuestas por un mal cálculo de
 * tamaño). También actualiza los puntos de progreso.
 *
 * @param {React.RefObject<HTMLElement>} refEnvoltura - contenedor alto que define cuánto dura el scroll
 * @param {React.RefObject<HTMLElement>} refFijo       - contenedor de 100vh que se pinea en pantalla
 */
export function useAnimacionServiciosScroll(refEnvoltura, refFijo) {
  useEffect(() => {
    const elementoEnvoltura = refEnvoltura.current;
    const elementoFijo = refFijo.current;

    if (!elementoEnvoltura || !elementoFijo) {
      return undefined;
    }

    const contextoAnimacion = gsap.context(() => {
      const diapositivas = gsap.utils.toArray('.servicio-diapositiva');
      const puntosDeProgreso = gsap.utils.toArray('.servicios-progreso span');

      // Estado inicial explícito por código: solo la primera diapositiva
      // es visible. No depende de medir el ancho real de nada, así que
      // no hay riesgo de que arranque con dos servicios superpuestos.
      diapositivas.forEach((diapositiva, indice) => {
        gsap.set(diapositiva, {
          x: indice === 0 ? 0 : 80,
          opacity: indice === 0 ? 1 : 0,
        });
        diapositiva.classList.toggle('activo', indice === 0);
      });

      const lineaDeTiempoServicios = gsap.timeline({
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
            diapositivas.forEach((diapositiva, indice) => {
              diapositiva.classList.toggle('activo', indice === indiceActivo);
            });
          },
        },
      });

      diapositivas.forEach((diapositivaActual, indice) => {
        if (indice === 0) return;

        const diapositivaAnterior = diapositivas[indice - 1];
        const momentoDeTransicion = indice - 0.5;

        lineaDeTiempoServicios
          .to(
            diapositivaAnterior,
            { x: -80, opacity: 0, duration: 0.5, ease: 'power1.inOut' },
            momentoDeTransicion
          )
          .fromTo(
            diapositivaActual,
            { x: 80, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power1.inOut' },
            momentoDeTransicion
          );
      });
    }, elementoEnvoltura);

    return () => {
      contextoAnimacion.revert();
    };
  }, [refEnvoltura, refFijo]);
}
