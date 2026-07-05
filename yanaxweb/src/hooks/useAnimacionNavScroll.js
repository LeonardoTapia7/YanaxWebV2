import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useAnimacionNavScroll
 * ----------------------
 * Agrega la clase "nav-con-scroll" al elemento de navegación apenas el
 * usuario baja más de 80px, para que el fondo transparente pase a un
 * fondo sólido con blur (ver Nav.css).
 *
 * @param {React.RefObject<HTMLElement>} refNav - el <nav>
 */
export function useAnimacionNavScroll(refNav) {
  useEffect(() => {
    const elementoNav = refNav.current;

    if (!elementoNav) {
      return undefined;
    }

    const contextoAnimacion = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { targets: elementoNav, className: 'nav-con-scroll' },
      });
    });

    return () => {
      contextoAnimacion.revert();
    };
  }, [refNav]);
}
