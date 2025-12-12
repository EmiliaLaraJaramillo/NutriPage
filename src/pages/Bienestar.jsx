// src/pages/Bienestar.jsx
import { useState } from "react";
import "./Bienestar.css";

const imagenes = [
  "/bienestar/bienestar1.jpg",
  "/bienestar/bienestar2.jpg",
  "/bienestar/bienestar3.jpg",
  "/bienestar/bienestar4.jpg",
];

function Bienestar() {
  const [index, setIndex] = useState(0);

  const siguiente = () => {
    setIndex((prev) => (prev + 1) % imagenes.length);
  };

  const anterior = () => {
    setIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  return (
    <div className="bienestar-page">
      {/* ============= HERO CON CARRUSEL ============= */}
      <section
        className="bienestar-hero"
        style={{ backgroundImage: `url(${imagenes[index]})` }}
      >
        <div className="bienestar-hero-content">
          <p className="bienestar-pill">Raíces, equilibrio y vida</p>
          <h1>Bienestar Andino</h1>
          <p className="bienestar-subtitle">
            Sabiduría alimentaria y armonía comunitaria desde la cosmovisión de
            Cruz Loma.
          </p>
        </div>

        {/* Flechas centradas */}
        <div className="bienestar-flechas">
          <button className="flecha" onClick={anterior}>←</button>
          <button className="flecha" onClick={siguiente}>→</button>
        </div>
      </section>

      {/* ============= SECCIÓN DE TARJETAS ============= */}
      <section className="bienestar-section">
        <h2>Saberes para el bienestar</h2>
        <p className="bienestar-intro">
          Prácticas alimentarias, emocionales y comunitarias que fortalecen el
          equilibrio y la vida plena en Cruz Loma.
        </p>

        <div className="bienestar-grid">

          {/* 1 */}
          <div className="bienestar-card">
            <span className="icono">🌿</span>
            <h3>Frescura local</h3>
            <ul>
              <li>Huertas familiares</li>
              <li>Intercambio comunitario</li>
              <li>Cosecha de temporada</li>
            </ul>
          </div>

          {/* 2 */}
          <div className="bienestar-card">
            <span className="icono">🍵</span>
            <h3>Hidratación ancestral</h3>
            <ul>
              <li>Infusiones curativas</li>
              <li>Agua de vertiente</li>
              <li>Evitar procesados</li>
            </ul>
          </div>

          {/* 3 */}
          <div className="bienestar-card">
            <span className="icono">🫘</span>
            <h3>Proteínas andinas</h3>
            <ul>
              <li>Chocho</li>
              <li>Habas</li>
              <li>Lenteja</li>
            </ul>
          </div>

          {/* 4 */}
          <div className="bienestar-card">
            <span className="icono">🫐</span>
            <h3>Plantas medicinales</h3>
            <ul>
              <li>Hierbaluisa</li>
              <li>Marco</li>
              <li>Manzanilla</li>
            </ul>
          </div>

          {/* 5 */}
          <div className="bienestar-card">
            <span className="icono">🧘‍♀️</span>
            <h3>Equilibrio corporal</h3>
            <ul>
              <li>Respiración consciente</li>
              <li>Movimiento suave</li>
              <li>Descanso restaurativo</li>
            </ul>
          </div>

          {/* 6 */}
          <div className="bienestar-card">
            <span className="icono">🔥</span>
            <h3>Rituales de armonía</h3>
            <ul>
              <li>Limpias energéticas</li>
              <li>Baños de florecimiento</li>
              <li>Ofrenda a la Pachamama</li>
            </ul>
          </div>

          {/* ========= NUEVAS TARJETAS AÑADIDAS ========= */}

          {/* 7 */}
          <div className="bienestar-card">
            <span className="icono">🥗</span>
            <h3>Alimentación consciente</h3>
            <ul>
              <li>Porciones equilibradas</li>
              <li>Masticación lenta</li>
              <li>Evitar desperdicio</li>
            </ul>
          </div>

          {/* 8 */}
          <div className="bienestar-card">
            <span className="icono">👣</span>
            <h3>Caminata comunitaria</h3>
            <ul>
              <li>Senderos locales</li>
              <li>Conexión natural</li>
              <li>Movimiento diario</li>
            </ul>
          </div>

          {/* 9 */}
          <div className="bienestar-card">
            <span className="icono">💛</span>
            <h3>Vínculos afectivos</h3>
            <ul>
              <li>Apoyo emocional</li>
              <li>Conversaciones sanas</li>
              <li>Tiempo en familia</li>
            </ul>
          </div>

          {/* 10 */}
          <div className="bienestar-card">
            <span className="icono">🌞</span>
            <h3>Bienestar espiritual</h3>
            <ul>
              <li>Agradecimiento diario</li>
              <li>Silencio consciente</li>
              <li>Honrar la naturaleza</li>
            </ul>
          </div>

          {/* 11 */}
          <div className="bienestar-card">
            <span className="icono">🪴</span>
            <h3>Cuidado del hogar</h3>
            <ul>
              <li>Espacios ordenados</li>
              <li>Aromas naturales</li>
              <li>Luz y ventilación</li>
            </ul>
          </div>

          {/* 12 */}
          <div className="bienestar-card">
            <span className="icono">🤝</span>
            <h3>Solidaridad comunitaria</h3>
            <ul>
              <li>Trabajo colectivo</li>
              <li>Red de apoyo</li>
              <li>Cooperación vecinal</li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Bienestar;
