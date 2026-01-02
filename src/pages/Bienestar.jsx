// src/pages/Bienestar.jsx
import { useState } from "react";
import "./Bienestar.css";

const imagenes = [
  "/bienestar/granos.png",
  "/bienestar/proteinas2.jpg",
  "/bienestar/proteinas.jpg",

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
          <p className="bienestar-pill">Nutrición para nuestra gente</p>
          <h1>Alimentación Sana, Vida Sana</h1>
          <p className="bienestar-subtitle">
            Aprende a comer bien para fortalecer tu cuerpo y tu comunidad, con los alimentos de nuestra tierra.
          </p>
        </div> 

      </section>

      {/* ============= SECCIÓN: CÓMO EQUILIBRAR TU PLATO ============= */}
      <section className="bienestar-section">
        <h2>Equilibra Tu Plato en Cada Comida</h2>
        <p className="bienestar-intro">
          Un plato equilibrado tiene alimentos de diferentes grupos que dan energía, fuerza y salud a tu cuerpo.
        </p>

        <div className="plato-equilibrado-container">
          {/* Plato del desayuno */}
          <div className="plato-card">
            <div className="plato-header">
              <span className="icono">🌅</span>
              <h3>Desayuno</h3>
              <p className="plato-horario">Para comenzar el día con energía</p>
            </div>
            <div className="plato-content">
              <h4>¿Qué debe tener tu desayuno?</h4>
              <ul>
                <li><strong>Granos enteros:</strong> Avena, quinoa o maíz (50% del plato)</li>
                <li><strong>Proteína:</strong> Huevo, queso fresco o habas (25% del plato)</li>
                <li><strong>Fruta:</strong> Papaya, tomate de árbol o moras (25% del plato)</li>
                <li><strong>Bebida:</strong> Agua o infusión sin azúcar</li>
              </ul>
            </div>
          </div>

          {/* Plato del almuerzo */}
          <div className="plato-card">
            <div className="plato-header">
              <span className="icono">☀️</span>
              <h3>Almuerzo</h3>
              <p className="plato-horario">Comida principal del día</p>
            </div>
            <div className="plato-content">
              <h4>Divide tu plato así:</h4>
              <div className="plato-visual">
                <div className="mitad-verde">
                  <strong>½ Plato: Verduras y frutas</strong>
                  <p>Lechuga, espinaca, zanahoria, brócoli, tomate, cebolla</p>
                </div>
                <div className="cuarto-proteina">
                  <strong>¼ Plato: Proteínas</strong>
                  <p>Pollo, pescado, habas, lentejas, chocho, huevo</p>
                </div>
                <div className="cuarto-granos">
                  <strong>¼ Plato: Granos</strong>
                  <p>Arroz integral, quinoa, maíz, papa, yuca</p>
                </div>
              </div>
            </div>
          </div>

          {/* Plato de la merienda */}
          <div className="plato-card">
            <div className="plato-header">
              <span className="icono">🌇</span>
              <h3>Merienda</h3>
              <p className="plato-horario">Para la tarde, ligera y nutritiva</p>
            </div>
            <div className="plato-content">
              <h4>Opciones saludables:</h4>
              <ul>
                <li><strong>Fruta con proteína:</strong> Manzana con queso fresco</li>
                <li><strong>Granos integrales:</strong> Tortilla de maíz con aguacate</li>
                <li><strong>Lácteos naturales:</strong> Yogur sin azúcar con moras</li>
                <li><strong>Verduras:</strong> Zanahorias con limón y sal</li>
              </ul>
              <p className="consejo"><strong>Consejo:</strong> Come algo ligero 2-3 horas antes de dormir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============= SECCIÓN DE TARJETAS INFORMATIVAS ============= */}
      <section className="bienestar-section" style={{backgroundColor: '#f8f9fa'}}>
        <h2>Saber es Poder: Conoce Tus Alimentos</h2>
        <p className="bienestar-intro">
          Información importante sobre lo que comemos y cómo afecta nuestro cuerpo.
        </p>

        <div className="bienestar-grid">
          {/* Tarjeta 1: Azúcar */}
          <div className="info-card danger-card">
            <span className="icono">⚠️</span>
            <h3>El Azúcar: Un Enemigo Dulce</h3>
            <div className="card-content">
              <p>El azúcar refinada daña nuestro cuerpo por dentro:</p>
              <ul>
                <li><strong>Sube y baja la energía:</strong> Te da fuerza por un rato y luego te cansas más.</li>
                <li><strong>Daña los dientes:</strong> Causa caries y dolor.</li>
                <li><strong>Engorda el hígado:</strong> Puede causar enfermedades.</li>
                <li><strong>Sube de peso:</strong> Se convierte en grasa en el cuerpo.</li>
              </ul>
              <p className="consejo-card"><strong>Mejor opción:</strong> Usa miel de abeja poca, frutas dulces o panela con moderación.</p>
            </div>
          </div>

          {/* Tarjeta 2: Vitaminas */}
          <div className="info-card success-card">
            <span className="icono">🥬</span>
            <h3>Vitaminas de las Verduras</h3>
            <div className="card-content">
              <p>Las verduras son como medicina natural:</p>
              <ul>
                <li><strong>Defensas fuertes:</strong> Te protegen de gripe y enfermedades.</li>
                <li><strong>Ojos sanos:</strong> Zanahoria y espinaca mejoran la vista.</li>
                <li><strong>Piel bonita:</strong> Dan brillo y salud a la piel.</li>
                <li><strong>Digestión buena:</strong> Evitan el estreñimiento.</li>
                <li><strong>Huesos fuertes:</strong> Ayudan a crecer sanos los niños.</li>
              </ul>
              <p className="consejo-card"><strong>Come de colores:</strong> Verde, rojo, naranja, morado - cada color da vitaminas diferentes.</p>
            </div>
          </div>

          {/* Tarjeta 3: Proteínas */}
          <div className="info-card protein-card">
            <span className="icono">💪</span>
            <h3>Proteínas: Los Constructores</h3>
            <div className="card-content">
              <p>Las proteínas reparan y construyen tu cuerpo:</p>
              <ul>
                <li><strong>Músculos fuertes:</strong> Para trabajar, caminar y cargar.</li>
                <li><strong>Reparación diaria:</strong> Sanan heridas y cortadas.</li>
                <li><strong>Anticuerpos:</strong> Defienden contra infecciones.</li>
                <li><strong>Cabello y uñas:</strong> Los hacen crecer fuertes.</li>
                <li><strong>Niños en crecimiento:</strong> Esencial para su desarrollo.</li>
              </ul>
              <p className="consejo-card"><strong>Proteínas nuestras:</strong> Habas, lentejas, chocho, quinua, huevo, pollo, pescado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============= CONSEJO FINAL ============= */}
      <section className="consejo-final">
        <div className="contenedor-consejo">
          <span className="icono-grande">❤️</span>
          <h2>Recuerda: La Comida es Medicina</h2>
          <p>
            Lo que comes hoy construye tu salud de mañana. Come variado, come natural, 
            come con gratitud a la Pachamama que nos da estos alimentos.
          </p>
          <div className="frase-destacada">
            <p>"Alimentar bien nuestro cuerpo es honrar la vida que tenemos"</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Bienestar;