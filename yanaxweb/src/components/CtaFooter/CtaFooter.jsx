import { useRef } from 'react';
import { useAnimacionPieDePaginaReveal } from '../../hooks/useAnimacionPieDePaginaReveal';
import './CtaFooter.css';

export default function CtaFooter() {
  const refPiePagina = useRef(null);
  const refMarca = useRef(null);

  useAnimacionPieDePaginaReveal(refPiePagina, refMarca);

  return (
    <>
      <section className="cta-seccion" id="contacto">
        <span className="cta-etiqueta">Empecemos</span>
        <h2>Construyamos algo que tu negocio use por años.</h2>
        <p>
          Si tienes un proyecto en mente, cuéntanos de qué se trata y te
          respondemos con una propuesta clara.
        </p>
       <a 
          href="https://wa.me/593987265163" 
          className="cta-boton" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Escríbenos por WhatsApp
        </a>
      </section>

      <footer ref={refPiePagina} className="pie-pagina">
        <div className="pie-superior">
          <div className="pie-columna">
            <h4>Yanax Studio</h4>
            <a href="#pilares">Estudio</a>
            <a href="#showcase">Portafolio</a>
            <a href="#servicios">Servicios</a>
          </div>
          <div className="pie-columna">
            <h4>Contacto</h4>
            <a href="#">WhatsApp</a>
            <a href="#">Instagram</a>
            <a href="#">Correo</a>
          </div>
        </div>

        <div ref={refMarca} className="pie-marca">
          YANAX
        </div>

        <div className="pie-inferior">
          © 2026 Yanax Studio. Todos los derechos reservados.
        </div>
      </footer>
    </>
  );
}
