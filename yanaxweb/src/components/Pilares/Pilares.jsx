import { useRef } from 'react';
import { useAnimacionPilaresScroll } from '../../hooks/useAnimacionPilaresScroll';
import './Pilares.css';

import imagenPilarCercania from '../../assets/capibaras-768x512.jpg';
import imagenPilarCalidadTecnica from '../../assets/drawing-the-cat-as-random-cat-memes-day-57-original-in-v0-ww64vba9zb6a1.jpg';
import imagenPilarResultadosReales from '../../assets/images (1).jpg';

const listaDePilares = [
  {
    id: 'cercania',
    etiqueta: 'Cercanía',
    titulo: 'Hablas con quien construye, no con un vendedor.',
    descripcion:
      'Desde la primera llamada trabajas directo con el desarrollador de tu proyecto. Nada se pierde en traducción entre lo que pides y lo que se entrega.',
    invertido: false,
    imagen: imagenPilarCercania,
  },
  {
    id: 'calidad-tecnica',
    etiqueta: 'Calidad técnica',
    titulo: 'Cada línea de código pensada para durar, no para salir rápido.',
    descripcion:
      'Arquitecturas limpias, documentación real y decisiones técnicas explicadas en términos que entiendes, sin tecnicismos innecesarios.',
    invertido: true,
    imagen: imagenPilarCalidadTecnica,
  },
  {
    id: 'resultados-reales',
    etiqueta: 'Resultados reales',
    titulo: 'Herramientas que tu negocio realmente usa todos los días.',
    descripcion:
      'No entregamos un proyecto y desaparecemos. Acompañamos el lanzamiento y seguimos cerca para lo que necesites después.',
    invertido: false,
    imagen: imagenPilarResultadosReales,
  },
];

export default function Pilares() {
  const refEnvoltura = useRef(null);
  const refFijo = useRef(null);

  useAnimacionPilaresScroll(refEnvoltura, refFijo);

  return (
    <section ref={refEnvoltura} className="pilares-envoltura" id="pilares">
      <div ref={refFijo} className="pilares-fijo">
        {listaDePilares.map((pilar) => (
          <div
            key={pilar.id}
            className={`pilar-diapositiva${pilar.invertido ? ' invertido' : ''}`}
          >
            <div className="pilar-texto">
              <span className="pilar-etiqueta">{pilar.etiqueta}</span>
              <h2>{pilar.titulo}</h2>
              <p>{pilar.descripcion}</p>
            </div>
            <div className="pilar-visual">
              <img
                src={pilar.imagen}
                alt={pilar.etiqueta}
                className="pilar-visual-imagen"
              />
            </div>
          </div>
        ))}

        <div className="pilares-progreso">
          {listaDePilares.map((pilar, indice) => (
            <span key={pilar.id} className={indice === 0 ? 'activo' : ''} />
          ))}
        </div>
      </div>
    </section>
  );
}