import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./Recetas.css";

/* ================= ALIMENTOS ================= */
const alimentosDisponibles = [
  "Habas","Quinua","Tarwi (Chocho)","Choclo","Zapallo","Zambo",
  "Lenteja","Garbanzo","Granadilla","Cebada","Oca","Melloco","Uvilla",
  "Fresa","Mora","Frejol","Papa","Camote","Manzana","Cacao","Avena",
  "Trigo","Morocho","Mote","Zanahoria","Arveja","Alverja seca",
  "Almendra","Maní tostado","Pepa de zambo","Semilla de zapallo",
  "Nuez","Acelga","Lechuga","Cebolla larga","Pepino","Coliflor",
  "Repollo","Tomate","Manzanilla","Hierbaluisa","Menta","Ruda",
  "Orégano","Toronjil","Ortiga"
];
/* ================= RECETAS COMPLETAS ================= */
const recetasBase = [
  {
    nombre: "Ensalada fresca de quinua andina",
    descripcion: "Plato frío, ligero y muy nutritivo, ideal como almuerzo o acompañamiento.",
    alimentos: ["Quinua", "Tomate", "Pepino", "Lechuga"],
    beneficios: [
      "Proteína vegetal completa",
      "Favorece la digestión",
      "Baja en grasas y rica en fibra"
    ],
    ingredientes: [
      "1 taza de quinua cruda",
      "2 tazas de agua",
      "1 tomate mediano, lavado y picado en cubos",
      "1 pepino mediano, pelado y picado",
      "4 hojas grandes de lechuga, lavadas y troceadas",
      "Jugo de 1 limón",
      "Sal al gusto"
    ],
    pasos: [
      "Colocar la quinua en un colador fino y lavarla varias veces bajo el chorro de agua hasta eliminar completamente la espuma.",
      "Hervir las 2 tazas de agua en una olla mediana.",
      "Agregar la quinua lavada, bajar el fuego y cocinar tapado durante 12 a 15 minutos hasta que el grano se abra.",
      "Apagar el fuego, escurrir si queda agua y dejar enfriar completamente.",
      "Picar el tomate, pepino y lechuga en tamaños similares.",
      "Colocar todos los ingredientes en un recipiente grande.",
      "Agregar el jugo de limón y sal al gusto.",
      "Mezclar suavemente y servir fría."
    ]
  },

  {
    nombre: "Hamburguesas caseras de lenteja",
    descripcion: "Alternativa vegetal rica en proteína, ideal para almuerzos saludables.",
    alimentos: ["Lenteja", "Cebolla larga", "Zanahoria"],
    beneficios: [
      "Alta en hierro",
      "Buena fuente de proteína vegetal",
      "Ideal para vegetarianos"
    ],
    ingredientes: [
      "2 tazas de lentejas cocidas y escurridas",
      "1 zanahoria mediana rallada",
      "1 cebolla larga finamente picada",
      "1/2 cucharadita de comino",
      "Sal al gusto",
      "2 cucharadas de aceite vegetal"
    ],
    pasos: [
      "Colocar las lentejas cocidas en un bol grande.",
      "Aplastar ligeramente con un tenedor hasta obtener una textura espesa pero con algunos granos visibles.",
      "Agregar la zanahoria rallada y la cebolla picada.",
      "Condimentar con sal y comino.",
      "Mezclar bien hasta integrar todos los ingredientes.",
      "Formar hamburguesas del mismo tamaño con las manos.",
      "Calentar el aceite en una sartén a fuego medio.",
      "Cocinar las hamburguesas 3 a 4 minutos por cada lado hasta que estén doradas.",
      "Retirar y servir calientes."
    ]
  },

  
  {
    nombre: "Ensalada tradicional de tarwi",
    descripcion: "Receta fresca y ancestral, muy nutritiva, ideal como entrada o acompañamiento.",
    alimentos: ["Tarwi (Chocho)", "Tomate", "Cebolla larga"],
    beneficios: [
      "Fortalece huesos",
      "Alta en proteína vegetal",
      "Aporta calcio y energía"
    ],
    ingredientes: [
      "1 taza de tarwi cocido y completamente desamargado",
      "1 tomate mediano, lavado y picado en cubos pequeños",
      "1 cebolla larga, lavada y finamente picada",
      "Jugo de 1 limón fresco",
      "Sal al gusto"
    ],
    pasos: [
      "Colocar el tarwi cocido en un colador.",
      "Lavar el tarwi bajo el chorro de agua durante varios minutos para eliminar cualquier residuo amargo.",
      "Escurrir bien el tarwi y dejar reposar 5 minutos.",
      "Lavar el tomate y cortarlo en cubos pequeños.",
      "Lavar la cebolla larga y picarla finamente.",
      "Colocar el tarwi, tomate y cebolla en un recipiente amplio.",
      "Agregar el jugo de limón y sal al gusto.",
      "Mezclar suavemente con una cuchara.",
      "Servir inmediatamente o refrigerar 10 minutos para un sabor más fresco."
    ]
  },

  {
    nombre: "Jugo antioxidante de mora",
    descripcion: "Bebida natural refrescante, ideal para iniciar el día con energía.",
    alimentos: ["Mora"],
    beneficios: [
      "Refuerza defensas",
      "Alto contenido antioxidante",
      "Aporta vitaminas naturales"
    ],
    ingredientes: [
      "1 taza de mora fresca y madura",
      "2 tazas de agua potable fría",
      "1 cucharada de avena",
      "1 cucharadita de miel (opcional)"
    ],
    pasos: [
      "Seleccionar moras maduras y retirar hojas o impurezas.",
      "Lavar las moras cuidadosamente bajo agua corriente.",
      "Colocar las moras en la licuadora.",
      "Agregar el agua fría.",
      "Añadir la avena y la miel si se desea endulzar.",
      "Licuar durante 1 a 2 minutos hasta obtener una bebida homogénea.",
      "Servir inmediatamente para conservar los nutrientes."
    ]
  },

  {
    nombre: "Colada de avena con manzana",
    descripcion: "Bebida caliente tradicional andina, espesa y nutritiva.",
    alimentos: ["Avena", "Manzana", "Morocho"],
    beneficios: [
      "Mejora la digestión",
      "Aporta energía prolongada",
      "Alta en fibra"
    ],
    ingredientes: [
      "1 taza de avena",
      "1 manzana mediana, lavada y rallada",
      "1 cucharada de morocho",
      "3 tazas de agua",
      "1 pizca de canela"
    ],
    pasos: [
      "Colocar el agua en una olla mediana y llevar a ebullición.",
      "Agregar la avena y el morocho.",
      "Cocinar a fuego medio durante 10 minutos, removiendo constantemente.",
      "Agregar la manzana rallada.",
      "Continuar cocinando por 5 minutos más hasta que espese.",
      "Añadir la canela y mezclar bien.",
      "Retirar del fuego y servir caliente."
    ]
  },

  {
    nombre: "Tortillas de zapallo",
    descripcion: "Preparación suave y energética, ideal para desayunos o meriendas.",
    alimentos: ["Zapallo", "Trigo", "Avena"],
    beneficios: [
      "Ricas en vitamina A",
      "Aportan energía sostenida"
    ],
    ingredientes: [
      "1 taza de zapallo cocido y hecho puré",
      "1 taza de harina de trigo",
      "3 cucharadas de avena",
      "2 cucharadas de aceite vegetal"
    ],
    pasos: [
      "Cocer el zapallo hasta que esté blando y hacer puré.",
      "Colocar el puré en un recipiente grande.",
      "Agregar la harina de trigo y la avena.",
      "Mezclar hasta obtener una masa homogénea.",
      "Formar pequeñas tortillas con las manos.",
      "Calentar el aceite en una sartén a fuego medio.",
      "Freír las tortillas durante 2 a 3 minutos por lado.",
      "Retirar cuando estén doradas y servir calientes."
    ]
  },

  {
    nombre: "Puré de papa con acelga",
    descripcion: "Plato suave y reconfortante, ideal para niños y adultos.",
    alimentos: ["Papa", "Acelga"],
    beneficios: [
      "Fácil digestión",
      "Rico en minerales"
    ],
    ingredientes: [
      "3 papas medianas",
      "1 taza de acelga lavada y picada",
      "Sal al gusto"
    ],
    pasos: [
      "Pelar las papas y cortarlas en trozos medianos.",
      "Cocer las papas en agua con sal hasta que estén blandas.",
      "Escurrir las papas y hacer puré.",
      "Lavar y picar la acelga.",
      "Saltear la acelga en una sartén durante 2 a 3 minutos.",
      "Mezclar la acelga con el puré.",
      "Ajustar sal y servir caliente."
    ]
  },

  {
    nombre: "Ensalada de pepino y uvilla",
    descripcion: "Ensalada fresca, hidratante y rica en vitamina C.",
    alimentos: ["Pepino", "Uvilla"],
    beneficios: ["Antioxidante", "Hidratante"],
    ingredientes: [
      "1 pepino mediano",
      "10 uvillas maduras",
      "Jugo de 1 limón",
      "Sal al gusto"
    ],
    pasos: [
      "Lavar el pepino y pelarlo.",
      "Cortar el pepino en rodajas finas.",
      "Lavar las uvillas y cortarlas por la mitad.",
      "Colocar todo en un recipiente.",
      "Agregar el jugo de limón y sal.",
      "Mezclar suavemente y servir frío."
    ]
  },

  {
    nombre: "Arroz con zanahoria y arveja",
    descripcion: "Plato básico, completo y equilibrado para el almuerzo.",
    alimentos: ["Zanahoria", "Arveja"],
    beneficios: ["Fibra", "Energía"],
    ingredientes: [
      "1 taza de arroz",
      "1 zanahoria mediana picada",
      "1/2 taza de arveja",
      "2 tazas de agua",
      "Sal al gusto"
    ],
    pasos: [
      "Lavar el arroz hasta que el agua salga clara.",
      "Colocar el arroz, agua y sal en una olla.",
      "Cocinar a fuego medio hasta que el agua se evapore.",
      "En una sartén, saltear la zanahoria y la arveja por 5 minutos.",
      "Agregar las verduras al arroz cocido.",
      "Mezclar bien y servir caliente."
    ]
  },

  {
    nombre: "Sopa tradicional de mote",
    descripcion: "Sopa espesa y nutritiva, ideal para climas fríos.",
    alimentos: ["Mote", "Papa", "Cebolla larga"],
    beneficios: ["Saciante", "Energética"],
    ingredientes: [
      "1 taza de mote cocido",
      "1 papa mediana picada",
      "1 cebolla larga picada",
      "3 tazas de agua",
      "Sal al gusto"
    ],
    pasos: [
      "Hervir el agua en una olla.",
      "Agregar el mote y la papa.",
      "Cocinar a fuego medio hasta que la papa esté blanda.",
      "En una sartén aparte, sofreír la cebolla.",
      "Agregar el sofrito a la sopa.",
      "Ajustar sal y servir caliente."
    ]
  },

  {
    nombre: "Ensalada de lechuga con maní tostado",
    descripcion: "Ensalada crujiente y nutritiva.",
    alimentos: ["Lechuga", "Maní tostado"],
    beneficios: ["Fibra", "Grasas saludables"],
    ingredientes: [
      "Lechuga fresca",
      "1/4 taza de maní tostado",
      "Jugo de 1 limón",
      "Sal al gusto"
    ],
    pasos: [
      "Lavar y desinfectar la lechuga.",
      "Trocearla con las manos.",
      "Agregar el maní tostado.",
      "Aliñar con limón y sal.",
      "Mezclar suavemente y servir."
    ]
  },

  {
    nombre: "Crema de zapallo y zanahoria",
    descripcion: "Crema suave y reconfortante, ideal para la cena.",
    alimentos: ["Zapallo", "Zanahoria"],
    beneficios: ["Vitamina A", "Salud visual"],
    ingredientes: [
      "1 taza de zapallo picado",
      "1 zanahoria picada",
      "1 cebolla larga picada",
      "3 tazas de agua",
      "Sal al gusto"
    ],
    pasos: [
      "Colocar el zapallo y la zanahoria en una olla con el agua.",
      "Cocinar hasta que estén completamente blandos.",
      "Licuar hasta obtener una crema homogénea.",
      "Sofreír la cebolla en una sartén.",
      "Agregar la cebolla a la crema.",
      "Ajustar sal y servir caliente."
    ]
  },
  {
  nombre: "Bowl de avena con almendras y fresa",
  descripcion: "Bowl nutritivo y energético, ideal para el desayuno o merienda.",
  alimentos: ["Almendra", "Avena", "Fresa"],
  beneficios: ["Energía", "Fibra", "Antioxidantes"],
  ingredientes: [
    "1/2 taza de avena",
    "1 taza de leche o agua",
    "5 almendras picadas",
    "1/2 taza de fresas picadas",
    "Miel al gusto (opcional)"
  ],
  pasos: [
    "Cocinar la avena con la leche o el agua hasta que esté suave.",
    "Servir la avena caliente en un bowl.",
    "Agregar las almendras picadas.",
    "Colocar las fresas por encima.",
    "Endulzar con miel si se desea."
  ]
},

{
  nombre: "Menestra de garbanzo casera",
  descripcion: "Menestra tradicional y nutritiva, ideal para el almuerzo.",
  alimentos: ["Garbanzo"],
  beneficios: ["Proteína vegetal", "Fibra", "Energía"],
  ingredientes: [
    "1 taza de garbanzos cocidos",
    "1 cebolla picada",
    "1 diente de ajo",
    "1 cucharada de aceite",
    "1 cucharadita de comino",
    "2 tazas de agua o caldo",
    "Sal al gusto"
  ],
  pasos: [
    "Sofreír la cebolla y el ajo en el aceite.",
    "Agregar el comino y mezclar.",
    "Incorporar los garbanzos y el agua o caldo.",
    "Cocinar a fuego medio por 15 minutos.",
    "Ajustar la sal y servir caliente."
  ]
},
{
  nombre: "Sopa suave de coliflor",
  descripcion: "Sopa ligera y reconfortante, ideal para la cena.",
  alimentos: ["Coliflor"],
  beneficios: ["Digestión", "Vitamina C"],
  ingredientes: [
    "2 tazas de coliflor picada",
    "1 papa pequeña",
    "1 cebolla",
    "3 tazas de agua",
    "1 cucharada de aceite",
    "Sal al gusto"
  ],
  pasos: [
    "Sofreír la cebolla en el aceite.",
    "Agregar la coliflor y la papa.",
    "Añadir el agua y cocinar hasta que esté blando.",
    "Licuar hasta obtener una sopa cremosa.",
    "Ajustar sal y servir caliente."
  ]
},
{
  nombre: "Menestra de frejol y alverja",
  descripcion: "Preparación casera y sustanciosa para el almuerzo.",
  alimentos: ["Frejol", "Alverja"],
  beneficios: ["Proteína vegetal", "Saciedad"],
  ingredientes: [
    "1 taza de frejol cocido",
    "1/2 taza de alverja",
    "1 cebolla picada",
    "1 cucharada de aceite",
    "1 cucharadita de achiote",
    "Sal al gusto"
  ],
  pasos: [
    "Sofreír la cebolla con el achiote en el aceite.",
    "Agregar el frejol y la alverja.",
    "Añadir un poco de agua si es necesario.",
    "Cocinar por 10 minutos.",
    "Ajustar sal y servir."
  ]
},
{
  nombre: "Ensalada tibia de acelga y nuez",
  descripcion: "Ensalada nutritiva y diferente, ideal como acompañamiento.",
  alimentos: ["Acelga", "Nuez"],
  beneficios: ["Minerales", "Grasas saludables"],
  ingredientes: [
    "1 atado de acelga",
    "1/4 taza de nuez picada",
    "1 cucharada de aceite de oliva",
    "Sal al gusto",
    "Limón al gusto"
  ],
  pasos: [
    "Lavar y cocinar ligeramente la acelga.",
    "Escurrir y picar.",
    "Mezclar con las nueces.",
    "Agregar aceite, sal y limón.",
    "Servir tibia o fría."
  ]
},
{
  nombre: "Mix tostado de semillas",
  descripcion: "Acompañamiento crocante y nutritivo.",
  alimentos: ["Semilla de zapallo", "Pepa de zambo"],
  beneficios: ["Zinc", "Grasas saludables"],
  ingredientes: [
    "1/4 taza de semilla de zapallo",
    "1/4 taza de pepa de zambo",
    "Una pizca de sal"
  ],
  pasos: [
    "Colocar las semillas en una sartén.",
    "Tostar a fuego bajo moviendo constantemente.",
    "Agregar una pizca de sal.",
    "Dejar enfriar y servir."
  ]
},
{
  nombre: "Guiso de melloco y habas",
  descripcion: "Plato tradicional, nutritivo y reconfortante.",
  alimentos: ["Melloco", "Habas"],
  beneficios: ["Energía", "Fibra"],
  ingredientes: [
    "1 taza de melloco cocido",
    "1/2 taza de habas cocidas",
    "1 cebolla picada",
    "1 cucharada de aceite",
    "Sal al gusto"
  ],
  pasos: [
    "Sofreír la cebolla en el aceite.",
    "Agregar el melloco y las habas.",
    "Mezclar y cocinar por 10 minutos.",
    "Ajustar la sal y servir caliente."
  ]
},
{
  nombre: "Camote asado al horno",
  descripcion: "Acompañamiento dulce y saludable.",
  alimentos: ["Camote"],
  beneficios: ["Vitamina A", "Energía"],
  ingredientes: [
    "1 camote grande",
    "1 cucharada de aceite",
    "Una pizca de sal"
  ],
  pasos: [
    "Lavar y cortar el camote en rodajas.",
    "Colocar en una bandeja.",
    "Agregar aceite y sal.",
    "Hornear hasta que esté dorado.",
    "Servir caliente."
  ]
},
{
  nombre: "Postre fresco de granadilla",
  descripcion: "Postre natural y refrescante.",
  alimentos: ["Granadilla"],
  beneficios: ["Vitamina C", "Digestión"],
  ingredientes: [
    "2 granadillas",
    "1 cucharada de miel",
    "1/2 taza de leche (opcional)"
  ],
  pasos: [
    "Extraer la pulpa de la granadilla.",
    "Mezclar con la miel.",
    "Agregar leche si se desea.",
    "Servir frío."
  ]
},
{
  nombre: "Ensalada de quinua y repollo",
  descripcion: "Ensalada fresca y completa, ideal para el almuerzo.",
  alimentos: ["Quinua", "Repollo"],
  beneficios: ["Proteína", "Fibra"],
  ingredientes: [
    "1 taza de quinua cocida",
    "1 taza de repollo rallado",
    "1 cucharada de aceite",
    "Sal y limón al gusto"
  ],
  pasos: [
    "Cocer la quinua y dejar enfriar.",
    "Mezclar con el repollo.",
    "Agregar aceite, sal y limón.",
    "Mezclar bien y servir."
  ]
},
{
  nombre: "Almíbar de fresa casero",
  descripcion: "Dulce natural y fácil, ideal para acompañar postres o yogur.",
  alimentos: ["Fresa"],
  beneficios: ["Antioxidantes", "Vitamina C"],
  ingredientes: [
    "1 taza de fresas picadas",
    "1/4 taza de agua",
    "2 cucharadas de azúcar o panela"
  ],
  pasos: [
    "Colocar las fresas, el agua y el azúcar en una olla.",
    "Cocinar a fuego medio hasta que las fresas se deshagan.",
    "Remover constantemente hasta obtener un almíbar.",
    "Retirar del fuego y dejar enfriar.",
    "Guardar en un frasco limpio."
  ]
},
{
  nombre: "Bebida caliente de cacao",
  descripcion: "Bebida reconfortante y energética, ideal para las noches frías.",
  alimentos: ["Cacao"],
  beneficios: ["Antioxidantes", "Mejora el estado de ánimo"],
  ingredientes: [
    "1 cucharada de cacao en polvo",
    "1 taza de leche o agua",
    "Azúcar o panela al gusto"
  ],
  pasos: [
    "Calentar la leche o el agua en una olla.",
    "Agregar el cacao y mezclar bien.",
    "Endulzar al gusto.",
    "Cocinar por unos minutos sin dejar hervir.",
    "Servir caliente."
  ]
},
{
  nombre: "Cebada cocida suave",
  descripcion: "Preparación simple y saludable, ideal como base para comidas o sopas.",
  alimentos: ["Cebada"],
  beneficios: ["Fibra", "Digestión"],
  ingredientes: [
    "1/2 taza de cebada",
    "3 tazas de agua",
    "Sal al gusto"
  ],
  pasos: [
    "Lavar la cebada con abundante agua.",
    "Colocarla en una olla con el agua.",
    "Cocinar a fuego medio hasta que esté blanda.",
    "Agregar sal al gusto.",
    "Usar como acompañamiento o base de otras recetas."
  ]
},
{
  nombre: "Ensalada tibia de choclo y papa",
  descripcion: "Ensalada casera y nutritiva, ideal como almuerzo ligero.",
  alimentos: ["Choclo", "Papa"],
  beneficios: ["Energía", "Saciedad"],
  ingredientes: [
    "1 taza de choclo cocido",
    "1 papa grande cocida en cubos",
    "1 cucharada de aceite",
    "Sal al gusto",
    "Cilantro o perejil (opcional)"
  ],
  pasos: [
    "Cocer la papa y cortarla en cubos.",
    "Mezclar la papa con el choclo en un bowl.",
    "Agregar aceite y sal.",
    "Mezclar bien.",
    "Decorar con cilantro o perejil y servir."
  ]
},
{
  nombre: "Infusión refrescante de menta",
  descripcion: "Bebida aromática y refrescante, ideal para después de las comidas.",
  alimentos: ["Menta"],
  beneficios: ["Digestión", "Alivia malestares estomacales"],
  ingredientes: [
    "1 cucharada de hojas de menta fresca o seca",
    "1 taza de agua",
    "Miel al gusto"
  ],
  pasos: [
    "Hervir el agua en una olla.",
    "Agregar las hojas de menta.",
    "Apagar el fuego y tapar.",
    "Dejar reposar por 5 minutos.",
    "Colar, endulzar con miel y servir."
  ]
},
{
  nombre: "Infusión relajante de toronjil",
  descripcion: "Infusión suave y reconfortante, ideal para la noche.",
  alimentos: ["Toronjil"],
  beneficios: ["Relajación", "Reduce el estrés"],
  ingredientes: [
    "1 cucharada de hojas de toronjil",
    "1 taza de agua",
    "Miel o azúcar al gusto"
  ],
  pasos: [
    "Hervir el agua.",
    "Agregar el toronjil.",
    "Tapar y dejar reposar 5 a 7 minutos.",
    "Colar la infusión.",
    "Endulzar al gusto y servir caliente."
  ]
},
{
  nombre: "Infusión suave de ortiga",
  descripcion: "Infusión nutritiva y reconfortante, ideal para fortalecer el cuerpo.",
  alimentos: ["Ortiga"],
  beneficios: ["Minerales", "Purificación del organismo"],
  ingredientes: [
    "1 cucharadita de hojas de ortiga seca",
    "1 taza de agua",
    "Miel o limón al gusto"
  ],
  pasos: [
    "Hervir el agua.",
    "Agregar la ortiga seca.",
    "Apagar el fuego y tapar.",
    "Dejar reposar por 7 minutos.",
    "Colar, agregar miel o limón y servir."
  ]
}




];




/* ================= COMPONENTE ================= */
const Recetas = () => {
  const [alimentoSeleccionado, setAlimentoSeleccionado] = useState("");
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);

  const recetasFiltradas =
    alimentoSeleccionado === ""
      ? recetasBase
      : recetasBase.filter(r =>
          r.alimentos
            .map(a => a.toLowerCase())
            .includes(alimentoSeleccionado.toLowerCase())
        );

  return (
    <div className="recetas-container">
      <h2 className="titulo-principal">🌿 Recetas de Sabiduría Andina</h2>
      <p className="subtitulo">Recetas completas paso a paso.</p>

      {/* Selector */}
      <div className="buscador-dropdown text-center mb-4">
        <Form.Select
          value={alimentoSeleccionado}
          onChange={e => setAlimentoSeleccionado(e.target.value)}
        >
          <option value="">🔎 Ver todas las recetas</option>
          {alimentosDisponibles.sort().map(al => (
            <option key={al} value={al}>{al}</option>
          ))}
        </Form.Select>
      </div>

      {/* ===== LISTA DE TARJETAS PEQUEÑAS ===== */}
      <div className="recetas-lista">
        {recetasFiltradas.map((receta, i) => (
          <div
            key={i}
            className="receta-card-mini"
            onClick={() => setRecetaSeleccionada(receta)}
          >
            <h3 className="receta-titulo">{receta.nombre}</h3>

            <p className="receta-descripcion">
              {receta.descripcion}
            </p>

            <div className="receta-tags">
              {receta.alimentos.slice(0, 3).map((a, idx) => (
                <span key={idx} className="tag-alimento">
                  🌿 {a}
                </span>
              ))}
              {receta.alimentos.length > 3 && (
                <span className="tag-alimento extra">
                  +{receta.alimentos.length - 3}
                </span>
              )}
            </div>

            <div className="mini-beneficios">
              <strong>✨ Beneficios:</strong>
              <ul>
                {receta.beneficios.slice(0, 2).map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>

            <div className="ver-mas">
              👉 Ver receta completa
            </div>
          </div>
        ))}
      </div>

      {/* ===== MODAL DETALLADO (NO SE TOCA) ===== */}
      <Modal
        show={!!recetaSeleccionada}
        onHide={() => setRecetaSeleccionada(null)}
        centered
        className="modal-receta"
      >
        <Modal.Header closeButton>
          <Modal.Title>{recetaSeleccionada?.nombre}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p><strong>Descripción:</strong> {recetaSeleccionada?.descripcion}</p>

          <p><strong>Ingredientes:</strong></p>
          <ul>
            {recetaSeleccionada?.ingredientes.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>

          <p><strong>Preparación:</strong></p>
          <ol>
            {recetaSeleccionada?.pasos.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ol>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => setRecetaSeleccionada(null)}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Recetas;
