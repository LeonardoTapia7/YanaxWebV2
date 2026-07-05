import { useRef } from 'react';
import { useAnimacionServiciosScroll } from '../../hooks/useAnimacionServiciosScroll';
import './Servicios.css';

import imagenServicioWeb from '../../assets/images (2).jpg';
import imagenServicioEcommerce from '../../assets/images.jpg';
import imagenServicioAppsMoviles from '../../assets/meu-gato-é-praticamente-o-gato-do-meme-v0-n9dleoj8dgfc1.jpg';
import imagenServicioSistemasEscritorio from '../../assets/original.jpg';

const listaDeServicios = [
  {
    id: 'desarrollo-web',
    numero: '01 · Lo más pedido',
    titulo: 'Desarrollo Web',
    descripcion:
      'Sitios y landing pages a medida, rápidos y fáciles de mantener a largo plazo.',
    destacado: true,
    imagen: imagenServicioWeb,
  },
  {
    id: 'ecommerce',
    numero: '02',
    titulo: 'E-commerce',
    descripcion:
      'Catálogos y tiendas conectadas a WhatsApp o pasarelas de pago, con panel propio.',
    destacado: false,
    imagen: imagenServicioEcommerce,
  },
  {
    id: 'apps-moviles',
    numero: '03',
    titulo: 'Apps móviles (Flutter)',
    descripcion:
      'Aplicaciones para inventario, ventas y operación diaria, en Android e iOS.',
    destacado: false,
    imagen: imagenServicioAppsMoviles,
  },
  {
    id: 'sistemas-escritorio',
    numero: '04',
    titulo: 'Sistemas de escritorio (Java)',
    descripcion:
      'Software administrativo a medida para gestión interna y facturación.',
    destacado: false,
    imagen: imagenServicioSistemasEscritorio,
  },
];

export default function Servicios() {
  const refEnvoltura = useRef(null);
  const refFijo = useRef(null);

  useAnimacionServiciosScroll(refEnvoltura, refFijo);

  return (
    <section ref={refEnvoltura} className="servicios-envoltura" id="servicios">
      <div ref={refFijo} className="servicios-fijo">
        <div className="servicios-encabezado-fijo">
          <span className="servicios-etiqueta">Servicios</span>
          <h2>Lo que construimos</h2>
          <p>Sigue bajando para recorrer cada línea de servicio.</p>
        </div>

        {listaDeServicios.map((servicio) => (
          <div
            key={servicio.id}
            className={`servicio-diapositiva${
              servicio.destacado ? ' destacado' : ''
            }`}
          >
            <div className="servicio-texto">
              <span className="servicio-numero">{servicio.numero}</span>
              <h2>{servicio.titulo}</h2>
              <p>{servicio.descripcion}</p>
            </div>
            <div className="servicio-visual">
              <img
                src={servicio.imagen}
                alt={servicio.titulo}
                className="servicio-visual-imagen"
              />
            </div>
          </div>
        ))}

        <div className="servicios-progreso">
          {listaDeServicios.map((servicio, indice) => (
            <span key={servicio.id} className={indice === 0 ? 'activo' : ''} />
          ))}
        </div>
      </div>
    </section>
  );
}