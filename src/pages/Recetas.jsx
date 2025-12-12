import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./Recetas.css";

// ⭐ LISTA COMPLETA DE ALIMENTOS DEL PROYECTO
const alimentosDisponibles = [
  "Habas", "Quinua", "Tarwi (Chocho)", "Choclo", "Zapallo", "Zambo",
  "Lenteja", "Garbanzo", "Granadilla", "Cebada", "Oca", "Melloco", "Uvilla",
  "Fresa", "Mora", "Frejol", "Papa", "Camote", "Manzana", "Cacao", "Avena",
  "Trigo", "Morocho", "Mote", "Zanahoria", "Arveja", "Alverja seca",
  "Almendra", "Maní tostado", "Pepa de zambo", "Semilla de zapallo",
  "Nuez", "Acelga", "Lechuga", "Cebolla larga", "Pepino", "Coliflor",
  "Repollo", "Tomate", "Manzanilla", "Hierbaluisa", "Menta", "Ruda",
  "Orégano", "Toronjil", "Ortiga"
];

// ⭐ LISTA DE RECETAS COMPLETA
const recetasBase = [
  {
    nombre: "Ensalada fresca de quinua",
    descripcion: "Ligera, nutritiva y perfecta para acompañar almuerzos.",
    alimentos: ["Quinua", "Tomate", "Pepino", "Lechuga"],
    beneficios: [
      "Alta en proteína vegetal",
      "Rica en fibra",
      "Ideal para dietas saludables"
    ],
    ingredientes: [
      "1 taza de quinua cocida",
      "1 tomate picado",
      "1 pepino picado",
      "Hojas de lechuga",
      "Sal y limón"
    ],
    pasos: [
      "Lavar bien la quinua.",
      "Cocer 12 minutos y dejar enfriar.",
      "Picar tomate y pepino.",
      "Mezclar todo con lechuga.",
      "Aliñar con limón y sal."
    ]
  },

  {
    nombre: "Hamburguesas de lenteja",
    descripcion: "Alto contenido proteico y fibra.",
    alimentos: ["Lenteja", "Cebolla larga", "Zanahoria"],
    beneficios: [
      "Ricas en proteína vegetal",
      "Mejoran la digestión",
      "Bajas en grasa"
    ],
    ingredientes: [
      "2 tazas de lentejas cocidas",
      "1 zanahoria rallada",
      "1 cebolla larga picada",
      "Sal y comino"
    ],
    pasos: [
      "Triturar las lentejas.",
      "Mezclar con zanahoria y cebolla.",
      "Formar hamburguesas.",
      "Dorar al sartén."
    ]
  },

  {
    nombre: "Ensalada de tarwi",
    descripcion: "Receta fresca con tarwi cocido.",
    alimentos: ["Tarwi (Chocho)", "Tomate", "Cebolla larga"],
    beneficios: [
      "Alta en calcio",
      "Rica en proteína vegetal",
      "Fortalece músculos"
    ],
    ingredientes: [
      "1 taza de tarwi cocido",
      "1 tomate picado",
      "Cebolla larga picada",
      "Limón y sal"
    ],
    pasos: [
      "Lavar bien el tarwi.",
      "Picar tomate y cebolla.",
      "Mezclar y aliñar."
    ]
  },

  {
    nombre: "Jugo energizante de mora",
    descripcion: "Bebida antioxidante para comenzar el día.",
    alimentos: ["Mora"],
    beneficios: [
      "Rico en antioxidantes",
      "Aumenta defensas",
      "Energía natural"
    ],
    ingredientes: [
      "1 taza de mora",
      "1 cucharada de avena",
      "1 cucharadita de miel"
    ],
    pasos: [
      "Licuar la mora con agua.",
      "Agregar avena y miel.",
      "Servir frío."
    ]
  },

  {
    nombre: "Colada de avena con manzana",
    descripcion: "Clásica receta andina.",
    alimentos: ["Avena", "Manzana", "Morocho"],
    beneficios: [
      "Ideal para el sistema digestivo",
      "Alta en fibra",
      "Aporta energía sostenida"
    ],
    ingredientes: [
      "1 taza de avena",
      "1 manzana rallada",
      "1 cucharada de morocho",
      "Canela"
    ],
    pasos: [
      "Cocinar avena.",
      "Agregar manzana rallada.",
      "Mezclar morocho y canela."
    ]
  },

  {
    nombre: "Tortillas de zapallo",
    descripcion: "Perfectas para la merienda.",
    alimentos: ["Zapallo", "Harina de trigo", "Avena"],
    beneficios: [
      "Ricas en vitamina A",
      "Energéticas",
      "Muy nutritivas"
    ],
    ingredientes: [
      "1 taza de zapallo cocido",
      "1 taza de harina",
      "3 cucharadas de avena"
    ],
    pasos: [
      "Hacer puré de zapallo.",
      "Mezclar todos los ingredientes.",
      "Freír tortillas pequeñas."
    ]
  },

  {
    nombre: "Puré de papa con acelga",
    descripcion: "Suave y reconfortante.",
    alimentos: ["Papa", "Acelga"],
    beneficios: [
      "Buena digestión",
      "Rico en minerales",
      "Ideal para niños"
    ],
    ingredientes: [
      "3 papas cocidas",
      "1 taza de acelga picada",
      "Sal"
    ],
    pasos: [
      "Preparar el puré.",
      "Saltear acelga.",
      "Mezclar."
    ]
  },

  {
    nombre: "Ensalada de pepino y uvilla",
    descripcion: "Fresca, cítrica y antioxidante.",
    alimentos: ["Pepino", "Uvilla"],
    beneficios: ["Refrescante", "Rica en vitamina C"],
    ingredientes: ["1 pepino", "10 uvillas", "Limón y sal"],
    pasos: ["Picar pepino.", "Picar uvillas.", "Mezclar y aliñar."]
  },

  {
    nombre: "Arroz con zanahoria y arveja",
    descripcion: "Clásico de la cocina andina.",
    alimentos: ["Zanahoria", "Arveja"],
    beneficios: ["Aporta fibra", "Ideal para almuerzos"],
    ingredientes: ["1 taza arroz", "1 zanahoria", "1/2 taza arveja"],
    pasos: ["Cocinar arroz.", "Saltear zanahoria y arveja.", "Mezclar."]
  },

  {
    nombre: "Sopa de mote",
    descripcion: "Sopa tradicional.",
    alimentos: ["Mote", "Papa", "Cebolla larga"],
    beneficios: ["Saciante", "Energética"],
    ingredientes: ["1 taza mote", "1 papa", "Cebolla larga"],
    pasos: ["Hervir mote.", "Agregar papa.", "Saltear cebolla y mezclar."]
  },

  {
    nombre: "Ensalada de lechuga con maní tostado",
    descripcion: "Crujiente y deliciosa.",
    alimentos: ["Lechuga", "Maní tostado"],
    beneficios: ["Alta en fibra", "Grasas saludables"],
    ingredientes: ["Lechuga", "Maní tostado", "Limón"],
    pasos: ["Lavar lechuga.", "Agregar maní.", "Aliñar."]
  },

  {
    nombre: "Crema de zapallo y zanahoria",
    descripcion: "Suave y nutritiva.",
    alimentos: ["Zapallo", "Zanahoria"],
    beneficios: ["Vitamina A", "Salud visual"],
    ingredientes: ["Zapallo", "Zanahoria", "Cebolla larga"],
    pasos: [
      "Cocer ingredientes.",
      "Licuar.",
      "Saltear cebolla y mezclar."
    ]
  }
];

// COMPONENTE PRINCIPAL
const Recetas = () => {
  const [alimentoSeleccionado, setAlimentoSeleccionado] = useState("");
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);

  // ⭐ NUEVA LÓGICA:
  // - Si NO se selecciona alimento → mostrar TODAS las recetas
  // - Si se selecciona alimento → filtrar
  const recetasFiltradas =
    alimentoSeleccionado.trim() === ""
      ? recetasBase
      : recetasBase.filter((receta) =>
          receta.alimentos
            .map((a) => a.toLowerCase())
            .includes(alimentoSeleccionado.toLowerCase())
        );

  return (
    <div className="recetas-container">
      <h2 className="titulo-principal">🌿 Recetas de Sabiduría Andina</h2>
      <p className="subtitulo">
        Preparaciones nutritivas con ingredientes tradicionales de Cruz Loma.
      </p>

      {/* Selector */}
      <div className="buscador-dropdown text-center mb-4">
        <Form.Select
          value={alimentoSeleccionado}
          onChange={(e) => setAlimentoSeleccionado(e.target.value)}
        >
          <option value="">🔎 Ver todas las recetas</option>
          {alimentosDisponibles
            .sort((a, b) => a.localeCompare(b))
            .map((al) => (
              <option key={al} value={al}>
                {al}
              </option>
            ))}
        </Form.Select>
      </div>

      {/* Tarjetas */}
      <div className="recetas-lista">
        {recetasFiltradas.map((receta, index) => (
          <div
            key={index}
            className={`receta-card-horizontal ${
              index % 2 === 0 ? "fondo-claro" : "fondo-oscuro"
            }`}
            onClick={() => setRecetaSeleccionada(receta)}
          >
            <div className="receta-info">
              <h3>{receta.nombre}</h3>
              <p className="descripcion">{receta.descripcion}</p>
              <span className="etiqueta">🍀 {receta.alimentos.join(", ")}</span>
            </div>

            <div className="beneficios-info">
              <h5>✨ Beneficios</h5>
              <ul>
                {receta.beneficios.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        show={recetaSeleccionada !== null}
        onHide={() => setRecetaSeleccionada(null)}
        centered
        className="modal-receta"
      >
        <Modal.Header closeButton>
          <Modal.Title>{recetaSeleccionada?.nombre}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            <strong>Descripción:</strong> {recetaSeleccionada?.descripcion}
          </p>

          <p><strong>Ingredientes:</strong></p>
          <ul>
            {recetaSeleccionada?.ingredientes.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>

          <p><strong>Pasos:</strong></p>
          <ol>
            {recetaSeleccionada?.pasos.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ol>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={() => setRecetaSeleccionada(null)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Recetas;
