// src/components/AlimentosCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

// descripciones culturales y breves
const descripcionesPorCategoria = {
  cereales:
    "Granos andinos que sostienen la alimentación diaria de las familias de Cruz Loma.",
  tuberculos:
    "Raíces que nacen en los suelos fríos y acompañan sopas, caldos y asados comunitarios.",
  leguminosas:
    "Proteínas vegetales presentes en las mingas y en las comidas de domingo.",
  frutas:
    "Frutas propias de los Andes, usadas en coladas, jugos y festividades locales.",
  frutos_secos:
    "Semillas y frutos que acompañan coladas, panes y preparaciones caseras.",
  verduras:
    "Verduras frescas que nacen de las chacras y completan el plato cotidiano.",
  hierbas:
    "Hierbas aromáticas y medicinales usadas por las familias de Cruz Loma.",
  preparaciones:
    "Preparaciones y bebidas que guardan la memoria culinaria del territorio.",
  default: "Alimento presente en la memoria y cocina tradicional.",
};

const AlimentosCard = ({ alimento }) => {
  const navigate = useNavigate();

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    "https://apivitalandina.puceecoexplora.com";

  const tieneImagen = alimento.imagen_url && alimento.imagen_url.trim() !== "";

  let imagenUrl = null;
  if (tieneImagen) {
    const ruta = alimento.imagen_url;
    if (ruta.startsWith("http")) {
      // URL completa (viene ya de la API)
      imagenUrl = ruta;
    } else if (ruta.startsWith("/alimentos/")) {
      // Imagen estática del frontend (public/alimentos)
      imagenUrl = ruta;
    } else {
      // Ruta relativa del backend (por ejemplo /uploads/...)
      imagenUrl = `${backendUrl}${ruta}`;
    }
  }

  const verRecetas = () => navigate("/recetas");

  // Selección automática según agrupación
  const categoria = alimento?.categoriaId || "default";
  const descripcion =
    descripcionesPorCategoria[categoria] || descripcionesPorCategoria.default;

  return (
    <div className="alimento-card" onClick={verRecetas}>
      {tieneImagen && imagenUrl ? (
        <img src={imagenUrl} alt={alimento.nombre} className="alimento-img" />
      ) : (
        <div className="alimento-sin-imagen">
          <span className="alimento-sin-imagen-icono">🌿</span>
          <p className="alimento-sin-imagen-texto">Registro sin imagen</p>
        </div>
      )}

      <div className="alimento-content">
        <h3>{alimento.nombre}</h3>
        <p>{descripcion}</p>
      </div>
    </div>
  );
};

export default AlimentosCard;
