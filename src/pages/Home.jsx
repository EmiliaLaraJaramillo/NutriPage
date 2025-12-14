// src/pages/Home.jsx
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect, useState } from "react";

const heroImages = [
  "/assets/hero/img3.png",
  "/assets/hero/img1.jpg",
  "/assets/hero/hero3.jpg",
  "/assets/hero/img2.jpg"
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <>
      {/* ========================== */}
      {/* HERO SLIDER               */}
      {/* ========================== */}
      <section className="home-hero-carousel">
        <div className="hero-slider-wrapper">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentIndex ? "active" : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}

          <div className="home-hero-overlay"></div>

          <div className="hero-carousel-content" data-aos="fade-up">
            <p className="home-hero-badge">Nutrición • Cultura • Comunidad</p>

            <h1 className="home-hero-title">Sabores que guardan memoria</h1>

            <p className="home-hero-subtitle">
              NutriPueblo recoge alimentos, historias y recetas que dan identidad
              a los pueblos andinos, donde cada cultivo es raíz y comunidad.
            </p>

            <div className="home-hero-actions">
              <Link to="/alimentos" className="btn btn-nutripueblo">Explorar alimentos</Link>
              <Link to="/recetas" className="btn btn-nutripueblo-outline">Recetas con tradición</Link>
            </div>
          </div>

          {/* FLECHAS */}
          <button className="hero-arrow left" onClick={prevSlide}>‹</button>
          <button className="hero-arrow right" onClick={nextSlide}>›</button>
        </div>
      </section>

      {/* ========================== */}
      {/* PILARES                    */}
      {/* ========================== */}
      <section className="home-pilares-np">
        <div className="container text-center">
          <h2 className="home-section-title">
            Alimentar el cuerpo es también cuidar la memoria
          </h2>

          <p className="home-section-subtitle">
            Cada alimento resguarda historias y sostiene vínculos con la tierra.
          </p>

          <div className="row row-cols-1 row-cols-md-4 g-4">
            <Paso
              numero="1"
              titulo="Cuerpo en bienestar"
              descripcion="Nutrientes que fortalecen el desarrollo, energía y salud diaria."
              link="/guia#bienestar"
            />

            <Paso
              numero="2"
              titulo="Respeto a la tierra"
              descripcion="Cultivos propios, limpios y acorde al calendario agrícola."
              link="/guia#tierra"
            />

            <Paso
              numero="3"
              titulo="Memoria viva"
              descripcion="Cocina, legado y tradiciones que continúan en cada mesa."
              link="/guia#memoria"
            />

            <Paso
              numero="4"
              titulo="Comunidad"
              descripcion="Saberes compartidos que preservan identidad alimentaria."
              link="/alimentos"
            />
          </div>
        </div>
      </section>
    </>
  );
}

/* ========================== */
/* CARD PASO                  */
/* ========================== */
function Paso({ numero, titulo, descripcion, link }) {
  return (
    <div className="col" data-aos="zoom-in">
      <div className="home-step-card h-100">
        <div className="home-step-circle">{numero}</div>
        <h5 className="fw-semibold mb-2">{titulo}</h5>
        <p className="text-muted small mb-3">{descripcion}</p>
        <Link to={link} className="home-step-link">ver más</Link>
      </div>
    </div>
  );
}

export default Home;
