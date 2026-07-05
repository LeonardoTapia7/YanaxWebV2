import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useAnimacionPieDePaginaReveal
 * -----------------------------
 * Hace que el nombre gigante del footer ("YANAX") aparezca con un fade +
 * desplazamiento hacia arriba cuando el footer entra en la pantalla.
 * No pinea nada, es un reveal simple de una sola vez.
 *
 * @param {React.RefObject<HTMLElement>} refPiePagina - el <footer>
 * @param {React.RefObject<HTMLElement>} refMarca      - el elemento con el nombre gigante
 */
export function useAnimacionPieDePaginaReveal(refPiePagina, refMarca) {
  useEffect(() => {
    const elementoPiePagina = refPiePagina.current;
    const elementoMarca = refMarca.current;

    if (!elementoPiePagina || !elementoMarca) {
      return undefined;
    }

    const contextoAnimacion = gsap.context(() => {
      gsap.from(elementoMarca, {
        opacity: 0,
        y: 40,
        duration: 1,
        scrollTrigger: {
          trigger: elementoPiePagina,
          start: 'top 70%',
        },
      });
    }, elementoPiePagina);

    return () => {
      contextoAnimacion.revert();
    };
  }, [refPiePagina, refMarca]);
}
