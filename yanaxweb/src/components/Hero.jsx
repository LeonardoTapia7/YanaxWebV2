import { useRef } from 'react';
import { useAnimacionHeroScroll } from '../../hooks/useAnimacionHeroScroll';
import './Hero.css';

// Reemplaza esta ruta por tu clip final (sin marca de agua) una vez
// resuelto el pipeline de generación + interpolación de video.
const URL_VIDEO_APERTURA_LAPTOP = '/videos/laptop-apertura.mp4';

export default function Hero() {
  const refSeccion = useRef(null);
  const refVideo = useRef(null);
  const refContenido = useRef(null);

  useAnimacionHeroScroll(
    { refSeccion, refVideo, refContenido },
    {
      distanciaScroll: '+=150%',
      duracionDesvanecido: 0.35,
    }
  );

  return (
    <section ref={refSeccion} className="hero">
      <div className="hero-fondo" aria-hidden="true" />

      <div className="hero-laptop-contenedor">
        <video
          ref={refVideo}
          className="hero-laptop-video"
          src={URL_VIDEO_APERTURA_LAPTOP}
          muted
          playsInline
          preload="auto"
        />
      </div>

      <div ref={refContenido} className="hero-contenido">
        <span className="hero-etiqueta">Yanax Studio · Quito, Ecuador</span>
        <h1 className="hero-titulo">Software hecho para quedarse.</h1>
        <p className="hero-descripcion">
          Web, e-commerce, apps móviles y sistemas de escritorio construidos
          con la misma precisión con la que un estudio de arquitectura
          entrega una casa.
        </p>
        <a href="#contacto" className="hero-boton-primario">
          Cuéntanos tu proyecto
        </a>
      </div>

      <div className="hero-indicador-scroll" aria-hidden="true">
        <span>Scroll</span>
        <span className="hero-indicador-linea" />
      </div>
    </section>
  );
}
