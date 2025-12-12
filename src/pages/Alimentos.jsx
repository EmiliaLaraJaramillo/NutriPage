// src/pages/Alimentos.jsx
import React, { useEffect, useState } from "react";
import AlimentosCard from "../components/AlimentosCard";
import "./Alimentos.css";

// =======================
//  CATEGORÍAS
// =======================
const categoriasConfig = [
  {
    id: "cereales",
    icono: "🌾",
    titulo: "Cereales y Granos Andinos",
    keywords: [
      "quinua", "quinoa", "amaranto",
      "maíz", "maiz", "morocho",
      "cebada", "trigo", "avena",
      "mote",
    ],
  },
  {
    id: "tuberculos",
    icono: "🥔",
    titulo: "Tubérculos y Raíces",
    keywords: [
      "melloco", "oca", "mashua",
      "papa", "camote", "zanahoria blanca",
      "zanahoria", "olluco",
    ],
  },
  {
    id: "leguminosas",
    icono: "🌱",
    titulo: "Leguminosas y Proteínas Vegetales",
    keywords: [
      "tarwi", "chocho",
      "haba", "habas",
      "lenteja", "lentejas",
      "arveja", "arvejas",
      "frejol", "frijol", "fréjol",
      "alverja",
    ],
  },
  {
    id: "frutas",
    icono: "🍓",
    titulo: "Frutas de los Andes",
    keywords: [
      "tomate de árbol", "tomate de arbol",
      "uvilla", "babaco", "chirimoya",
      "taxo", "mora", "moras",
      "maracuyá", "maracuya",
      "fresa", "granadilla",
    ],
  },
  {
    id: "frutos_secos",
    icono: "🥜",
    titulo: "Semillas y Frutos Secos",
    keywords: [
      "maní", "mani",
      "maní tostado", "mani tostado",
      "nuez", "nueces",
      "almendra", "almendras",
      "semilla", "semillas",
      "pepita", "pepitas",
      "semilla de zapallo", "semillas de zapallo",
      "pepas de zambo",
    ],
  },
  {
    id: "verduras",
    icono: "🥬",
    titulo: "Verduras y Hortalizas",
    keywords: [
      "lechuga", "acelga", "espinaca",
      "col", "repollo",
      "tomate", "cebolla larga",
      "pepino", "coliflor",
      "choclo",
      "zapallo",
      "zambo",
    ],
  },
  {
    id: "hierbas",
    icono: "🌿",
    titulo: "Hierbas, Aromáticas y Medicinales",
    keywords: [
      "huacatay", "culantro", "cilantro",
      "anís", "anis",
      "comino", "orégano", "oregano",
      "hierbabuena", "menta",
      "laurel", "ruda",
      "hierbaluisa", "manzanilla",
      "ortiga", "toronjil",
    ],
  },
  {
    id: "preparaciones",
    icono: "🍵",
    titulo: "Preparaciones y Bebidas",
    keywords: [
      "chicha", "colada",
      "locro", "sopa",
      "guiso", "mazamorra",
      "jugos", "jugo",
      "ensalada", "caldo",
    ],
  },
];

// =======================
//  ALIMENTOS LOCALES EXTRA
//  (los que agregaste tú con imágenes en /public/alimentos)
// =======================
const alimentosLocalesExtra = [
  // Cereales
  { nombre: "Avena", imagen_url: "/alimentos/avena.jpg", categoriaId: "cereales" },
  { nombre: "Trigo", imagen_url: "/alimentos/trigo.jpg", categoriaId: "cereales" },
  { nombre: "Morocho", imagen_url: "/alimentos/morocho.jpg", categoriaId: "cereales" },
  { nombre: "Mote", imagen_url: "/alimentos/mote.jpg", categoriaId: "cereales" },

  // Tubérculos y raíces
  { nombre: "Zanahoria", imagen_url: "/alimentos/zanahoria.jpg", categoriaId: "tuberculos" },
  { nombre: "Papa", imagen_url: "/alimentos/papa.jpg", categoriaId: "tuberculos" },

  // Leguminosas
  { nombre: "Arveja", imagen_url: "/alimentos/arveja.jpg", categoriaId: "leguminosas" },
  { nombre: "Alverja seca", imagen_url: "/alimentos/alverjaseca.jpg", categoriaId: "leguminosas" },

  // Frutos secos y semillas
  { nombre: "Almendra", imagen_url: "/alimentos/almendra.jpg", categoriaId: "frutos_secos" },
  { nombre: "Maní tostado", imagen_url: "/alimentos/manítostado.jpg", categoriaId: "frutos_secos" },
  { nombre: "Pepa de zambo", imagen_url: "/alimentos/pepadezambo.jpg", categoriaId: "frutos_secos" },
  { nombre: "Semilla de zapallo", imagen_url: "/alimentos/semilladezapallo.jpg", categoriaId: "frutos_secos" },
  { nombre: "Nuez", imagen_url: "/alimentos/nuez.jpg", categoriaId: "frutos_secos" },

  // Verduras y hortalizas
  { nombre: "Acelga", imagen_url: "/alimentos/acelga.jpg", categoriaId: "verduras" },
  { nombre: "Lechuga", imagen_url: "/alimentos/lechuga.jpg", categoriaId: "verduras" },
  { nombre: "Cebolla larga", imagen_url: "/alimentos/cebollalarga.jpg", categoriaId: "verduras" },
  { nombre: "Pepino", imagen_url: "/alimentos/pepino.jpg", categoriaId: "verduras" },
  { nombre: "Coliflor", imagen_url: "/alimentos/coliflor.jpg", categoriaId: "verduras" },
  { nombre: "Repollo", imagen_url: "/alimentos/repollo.jpg", categoriaId: "verduras" },
  { nombre: "Tomate", imagen_url: "/alimentos/tomate.jpg", categoriaId: "verduras" },

  // Hierbas y medicinales
  { nombre: "Manzanilla", imagen_url: "/alimentos/manzanilla.jpg", categoriaId: "hierbas" },
  { nombre: "Hierbaluisa", imagen_url: "/alimentos/hierbaluisa.jpg", categoriaId: "hierbas" },
  { nombre: "Menta", imagen_url: "/alimentos/menta.jpg", categoriaId: "hierbas" },
  { nombre: "Ruda", imagen_url: "/alimentos/ruda.jpg", categoriaId: "hierbas" },
  { nombre: "Orégano", imagen_url: "/alimentos/orégano.jpg", categoriaId: "hierbas" },
  { nombre: "Toronjil", imagen_url: "/alimentos/toronjil.jpg", categoriaId: "hierbas" },
  { nombre: "Ortiga", imagen_url: "/alimentos/ortiga.jpg", categoriaId: "hierbas" },

  // Extra: por si quieres usar frejol/papa locales en algún momento (se filtrarán si ya están en la API)
  // { nombre: "Frejol", imagen_url: "/alimentos/frejo.jpg", categoriaId: "leguminosas" },
];

// =======================
//  CLASIFICAR POR CATEGORÍA
// =======================
function clasificarAlimentos(alimentos) {
  const grupos = {};
  categoriasConfig.forEach((cat) => (grupos[cat.id] = []));

  alimentos.forEach((a) => {
    const nombre = (a.nombre || "").toLowerCase();
    const cat =
      categoriasConfig.find((c) =>
        c.keywords.some((k) => nombre.includes(k))
      ) || null;

    const categoriaId = a.categoriaId || (cat ? cat.id : "verduras");
    if (!grupos[categoriaId]) {
      grupos[categoriaId] = [];
    }
    grupos[categoriaId].push({ ...a, categoriaId });
  });

  return grupos;
}

// =======================
//  COMPONENTE PRINCIPAL
// =======================
const Alimentos = () => {
  const [alimentos, setAlimentos] = useState([]);
  const [alimentosPorCategoria, setAlimentosPorCategoria] = useState({});
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");

  useEffect(() => {
    // 1. Traer alimentos desde la API
    fetch("https://apivitalandina.puceecoexplora.com/api/alimentos")
      .then((res) => res.json())
      .then((data) => {
        // 2. Combinar API + locales extra SIN repetir nombres
        const combinados = [];
        const nombres = new Set();

        const agregarUnicos = (lista) => {
          lista.forEach((a) => {
            const clean = (a.nombre || "").toLowerCase().trim();
            if (clean && !nombres.has(clean)) {
              nombres.add(clean);
              combinados.push(a);
            }
          });
        };

        agregarUnicos(data);                 // primero los de la API
        agregarUnicos(alimentosLocalesExtra); // luego los que agregaste tú

        // 3. Guardar en estado
        setAlimentos(combinados);
        setAlimentosPorCategoria(clasificarAlimentos(combinados));
      })
      .catch((err) => console.error("Error al obtener alimentos:", err));
  }, []);

  return (
    <div className="alimentos-page-np">
      {/* HERO */}
      <section className="alimentos-hero-np">
        <div className="alimentos-hero-contenido">
          <h1>🌾 Sabores que cuentan historias</h1>
          <p>
            Explora los alimentos que sostienen la vida, la cultura y la
            identidad de las familias de Cruz Loma.
          </p>
        </div>
      </section>

      {/* FILTROS */}
      <section className="alimentos-filtros-np">
        <button
          className={`categoria-chip ${
            categoriaSeleccionada === "todas" ? "categoria-chip--activa" : ""
          }`}
          onClick={() => setCategoriaSeleccionada("todas")}
        >
          🔍 Todas
        </button>

        {categoriasConfig.map((cat) => (
          <button
            key={cat.id}
            className={`categoria-chip ${
              categoriaSeleccionada === cat.id ? "categoria-chip--activa" : ""
            }`}
            onClick={() => setCategoriaSeleccionada(cat.id)}
          >
            {cat.icono} {cat.titulo}
          </button>
        ))}
      </section>

      {/* VISTA "TODAS" */}
      {categoriaSeleccionada === "todas" && (
        <section className="alimentos-grid-np">
          {alimentos.map((a, idx) => (
            <AlimentosCard key={`${a.nombre}-${idx}`} alimento={a} />
          ))}
        </section>
      )}

      {/* VISTA POR CATEGORÍA */}
      {categoriaSeleccionada !== "todas" &&
        categoriasConfig.map((cat) => {
          if (categoriaSeleccionada !== cat.id) return null;
          const lista = alimentosPorCategoria[cat.id] || [];

          return (
            <section key={cat.id} className="categoria-bloque-np">
              <div className="categoria-header-np">
                <h2>
                  {cat.icono} {cat.titulo}
                </h2>
              </div>
              <div className="alimentos-grid-np">
                {lista.map((a, idx) => (
                  <AlimentosCard key={`${a.nombre}-${idx}`} alimento={a} />
                ))}
              </div>
            </section>
          );
        })}
    </div>
  );
};

export default Alimentos;
