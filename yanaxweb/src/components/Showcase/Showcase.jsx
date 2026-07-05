import imagenSimuladorEspe from '../../assets/Simulador.png';
import './Showcase.css';

export default function Showcase() {
  return (
    <section className="showcase" id="showcase">
      <div className="showcase-encabezado">
        <span className="showcase-etiqueta">Portafolio</span>
        <h2>Pocos proyectos, mostrados a fondo.</h2>
        <p>
          Preferimos enseñarte menos casos con más profundidad que llenar
          una grilla con trabajo que no representa lo que hacemos hoy.
        </p>
      </div>

      <div className="showcase-grilla">
        <div className="caso-tarjeta">
          <img
            src={imagenSimuladorEspe}
            alt="Simulador Termodinámico ESPE"
            className="caso-tarjeta-imagen"
          />
          <span className="caso-tarjeta-etiqueta">Caso de estudio</span>
          <h3>Simulador Termodinámico — ESPE</h3>
          <p>
            Cuatro procesos termodinámicos interactivos, diagrama
            animado y memoria de cálculo paso a paso, en React.
          </p>
        </div>

        <div className="caso-marcador">
          <span className="caso-marcador-etiqueta">Próximo caso</span>
          <p>Reservado para el siguiente proyecto que valga la pena mostrar.</p>
        </div>
      </div>
    </section>
  );
}