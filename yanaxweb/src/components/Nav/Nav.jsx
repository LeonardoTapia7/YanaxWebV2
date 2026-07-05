import { useRef } from 'react';
import { useAnimacionNavScroll } from '../../hooks/useAnimacionNavScroll';
import './Nav.css';

export default function Nav() {
  const refNav = useRef(null);

  useAnimacionNavScroll(refNav);

  return (
    <nav ref={refNav} className="nav-principal">
      <div className="nav-logotipo">
        Yanax<span>&</span>Studio
      </div>
      <div className="nav-enlaces">
        <a href="#pilares">Estudio</a>
        <a href="#showcase">Portafolio</a>
        <a href="#servicios">Servicios</a>
      </div>
      <a href="#contacto" className="nav-boton">
        Contáctanos
      </a>
    </nav>
  );
}
