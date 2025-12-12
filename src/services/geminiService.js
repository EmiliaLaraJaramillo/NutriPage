// src/services/geminiService.js - VERSIÓN CORREGIDA (3 COMIDAS)
import { GoogleGenerativeAI } from '@google/generative-ai';
import { alimentosEcuador, preparacionesTipicas, recomendacionesEspeciales } from '../data/alimentosEcuador';

// API Key desde variables de entorno
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// ===== DEPURACIÓN INICIAL =====
console.log('=== 🔧 CONFIGURACIÓN GEMINI ===');
console.log('🔐 API Key cargada:', API_KEY ? 'Sí (' + API_KEY.substring(0, 10) + '...)' : 'No');
console.log('📦 Datos de alimentos:', alimentosEcuador ? Object.keys(alimentosEcuador).length + ' categorías' : 'No cargado');

// Configurar Gemini solo si hay API Key
let genAI = null;
let geminiDisponible = false;

if (API_KEY && API_KEY !== 'tu_clave_aqui_pega_la_clave' && API_KEY.length > 30) {
  try {
    genAI = new GoogleGenerativeAI(API_KEY);
    geminiDisponible = true;
    console.log('✅ Gemini configurado correctamente');
  } catch (error) {
    console.error('❌ Error configurando Gemini:', error);
    geminiDisponible = false;
  }
} else {
  console.warn('⚠️  Modo demo activado');
  console.warn('⚠️  Razón:', !API_KEY ? 'API Key no definida' : 
    API_KEY === 'tu_clave_aqui_pega_la_clave' ? 'API Key de ejemplo' : 
    'API Key muy corta (' + API_KEY.length + ' caracteres)');
}

// ===== PROMPT COMPLETO (SOLO 3 COMIDAS) =====
const construirPrompt = () => {
  return `
# IDENTIDAD Y CONTEXTO
Eres NUTRIBOT ECUADOR, un nutricionista especializado en comunidades rurales del Ecuador. Tu misión es crear menús diarios saludables, realistas y culturalmente apropiados usando EXCLUSIVAMENTE ingredientes disponibles en zonas rurales ecuatorianas.

# REGLAS ABSOLUTAS
1. SOLO usar ingredientes de la lista proporcionada
2. Priorizar ingredientes de bajo costo y alta disponibilidad
3. Considerar la temporada actual (estación del año)
4. Máximo 60 minutos de preparación por comida
5. Proporciones saludables: 50% vegetales, 25% proteína, 25% carbohidratos
6. Evitar completamente ingredientes procesados o importados
7. Usar preparaciones típicas ecuatorianas

# INGREDIENTES DISPONIBLES (USAR SOLO ESTOS)

## 🌾 CEREALES
${alimentosEcuador.cereales?.join(', ') || 'No definidos'}

## 🥕 TUBÉRCULOS Y RAÍCES
${alimentosEcuador.tuberculos?.join(', ') || 'No definidos'}

## 🥬 VEGETALES
${alimentosEcuador.vegetales?.join(', ') || 'No definidos'}

## 🌱 LEGUMINOSAS (Proteína vegetal)
${alimentosEcuador.leguminosas?.join(', ') || 'No definidos'}

## 🥜 FRUTOS SECOS Y SEMILLAS
${alimentosEcuador.frutosSecos?.join(', ') || 'No definidos'}

## 🌿 HIERBAS MEDICINALES Y AROMÁTICAS
${alimentosEcuador.hierbasMedicinales?.join(', ') || 'No definidos'}

## 🍗 PROTEÍNAS
${alimentosEcuador.proteinas?.join(', ') || 'No definidos'}

## 🍎 FRUTAS
${alimentosEcuador.frutas?.join(', ') || 'No definidos'}

## 🧂 OTROS
${alimentosEcuador.otros?.join(', ') || 'No definidos'}

# PREPARACIONES TÍPICAS ECUATORIANAS
${preparacionesTipicas?.join(', ') || 'No definidas'}

# PROPORCIONES POR COMIDA (SOLO 3 COMIDAS)

## DESAYUNO (6:00 - 8:00 AM)
- 30% del requerimiento diario
- Energía para empezar el día
- Incluir: Proteína + Carbohidrato complejo + Fruta

## ALMUERZO (12:00 - 2:00 PM)
- 40% del requerimiento diario
- Plato principal del día
- Proporción: 50% vegetales, 25% proteína, 25% carbohidratos

## MERIENDA (4:00 - 5:00 PM)
- 30% del requerimiento diario
- Última comida del día, debe ser nutritiva pero ligera
- Ideal: Proteína ligera + vegetales + fruta

# FORMATO DE RESPUESTA EXACTO - SOLO JSON

{
  "fecha": "DD de Mes de AAAA",
  "consejo_del_dia": "Consejo nutricional breve para comunidades rurales",
  "desayuno": {
    "plato": "Nombre creativo del plato (usar nombres tradicionales ecuatorianos)",
    "hora_recomendada": "6:00 - 8:00 AM",
    "ingredientes": [
      {"nombre": "ingrediente1", "cantidad": "cantidad exacta para 1 persona", "notas": "ej: picado, rallado, etc"},
      {"nombre": "ingrediente2", "cantidad": "cantidad exacta", "notas": ""}
    ],
    "macronutrientes": {
      "proteina": "XX g (origen: animal/vegetal)",
      "carbohidratos": "XX g (tipo: complejos/simples)",
      "vegetales": "XX g",
      "calorias_totales": "XXX-XXX kcal"
    },
    "preparacion": [
      "Paso 1: Descripción clara",
      "Paso 2: Descripción clara",
      "Paso 3: Descripción clara"
    ],
    "tiempo_preparacion": "XX minutos",
    "costo_aproximado": "Bajo/Medio",
    "variante_sin": "Alternativa si falta algún ingrediente"
  },
  "almuerzo": {
    "plato": "Nombre del plato",
    "hora_recomendada": "12:00 - 2:00 PM",
    "ingredientes": [...],
    "macronutrientes": {...},
    "preparacion": [...],
    "tiempo_preparacion": "...",
    "costo_aproximado": "...",
    "variante_sin": "..."
  },
  "merienda": {
    "plato": "Nombre del plato",
    "hora_recomendada": "4:00 - 5:00 PM",
    "ingredientes": [...],
    "macronutrientes": {...},
    "preparacion": [...],
    "tiempo_preparacion": "...",
    "costo_aproximado": "...",
    "variante_sin": "..."
  },
  "lista_compras_dia": ["ingrediente1", "ingrediente2", ...],
  "presupuesto_diario_estimado": "Bajo (menos de $3)/Medio ($3-$5)",
  "notas_importantes": [
    "Nota 1 sobre combinación de alimentos",
    "Nota 2 sobre aprovechamiento de sobras",
    "Nota 3 sobre almacenamiento"
  ]
}

# EJEMPLO DE MENÚ (para referencia)

Desayuno: "Colada de avena con huevo y plátano"
Almuerzo: "Locro de papa con queso y aguacate"
Merienda: "Batido de papaya con semillas de zapallo"

# INSTRUCCIÓN FINAL
Genera un menú COMPLETO para HOY (solo desayuno, almuerzo y merienda), considerando:
1. Estación del año actual (actualmente es diciembre, época lluviosa en Ecuador)
2. Disponibilidad real en zonas rurales
3. Balance nutricional exacto
4. Preparaciones sencillas
5. Costo accesible (menos de $3 por día)
6. Sabor y tradición ecuatoriana

IMPORTANTE: NO incluir cena, solo 3 comidas al día según tradición rural ecuatoriana.

Responde ÚNICAMENTE con el JSON, sin explicaciones adicionales.
`;
};

// ===== FUNCIÓN PRINCIPAL =====
export const generarMenuDelDia = async () => {
  console.log('=== 🚀 INICIANDO GENERACIÓN DE MENÚ ===');
  console.log('🔍 Gemini disponible:', geminiDisponible);
  
  // Si Gemini no está disponible, usar demo
  if (!geminiDisponible) {
    console.log('🔶 Generando menú de ejemplo (modo demo)');
    const menuEjemplo = await generarMenuEjemploEcuador();
    console.log('✅ Menú de ejemplo generado');
    return menuEjemplo;
  }

  try {
    console.log('🤖 Consultando a Gemini...');
   const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = construirPrompt();
    
    console.log('📤 Enviando prompt... (longitud:', prompt.length, 'caracteres)');
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Respuesta recibida de Gemini');
    console.log('📄 Primeros 300 caracteres:', text.substring(0, 300) + (text.length > 300 ? '...' : ''));
    
    // Procesar y limpiar la respuesta
    const menuProcesado = procesarRespuestaGemini(text);
    
    // Agregar metadata
    menuProcesado.generadoConIA = true;
    menuProcesado.fechaGeneracion = new Date().toISOString();
    
    console.log('✅ Menú procesado correctamente');
    return menuProcesado;
    
  } catch (error) {
    console.error('❌ Error con Gemini:', error);
    console.error('❌ Detalles del error:', {
      nombre: error.name,
      mensaje: error.message,
      tipo: error.constructor.name
    });
    
    // Si hay error, usar menú de ejemplo
    console.log('🔄 Usando menú de ejemplo por error');
    return await generarMenuEjemploEcuador();
  }
};

// ===== PROCESAR RESPUESTA =====
const procesarRespuestaGemini = (textoRespuesta) => {
  try {
    // Limpiar respuesta
    let jsonText = textoRespuesta.trim();
    
    // Remover markdown si existe
    jsonText = jsonText.replace(/```json\s*/g, '');
    jsonText = jsonText.replace(/```\s*/g, '');
    
    // Parsear JSON
    const menuData = JSON.parse(jsonText);
    
    console.log('✅ JSON parseado correctamente');
    console.log('📊 Estructura del menú:', {
      fecha: menuData.fecha,
      tieneDesayuno: !!menuData.desayuno,
      tieneAlmuerzo: !!menuData.almuerzo,
      tieneMerienda: !!menuData.merienda,
      camposDesayuno: menuData.desayuno ? Object.keys(menuData.desayuno) : []
    });
    
    return menuData;
    
  } catch (error) {
    console.error('❌ Error procesando respuesta de Gemini:', error);
    console.error('❌ Texto que falló:', textoRespuesta.substring(0, 200));
    throw error; // Re-lanzar para manejar en la función principal
  }
};

// ===== MENÚ DE EJEMPLO (SOLO 3 COMIDAS) =====
const generarMenuEjemploEcuador = async () => {
  const hoy = new Date();
  const formatoFecha = new Intl.DateTimeFormat('es-EC', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(hoy);
  
  return {
    fecha: formatoFecha,
    consejo_del_dia: "Combina leguminosas con cereales para obtener proteína completa. Ej: arroz con lentejas.",
    generadoConIA: false,
    fechaGeneracion: hoy.toISOString(),
    
    desayuno: {
      plato: "Colada de Avena con Huevo y Plátano",
      hora_recomendada: "6:30 - 7:30 AM",
      ingredientes: [
        { nombre: "avena", cantidad: "4 cucharadas", notas: "en hojuelas" },
        { nombre: "huevo", cantidad: "1 unidad", notas: "preferiblemente criollo" },
        { nombre: "plátano", cantidad: "1/2 unidad", notas: "maduro, en rodajas" },
        { nombre: "panela", cantidad: "1 cucharadita", notas: "rallada (opcional)" },
        { nombre: "canela", cantidad: "1 pizca", notas: "en rama o polvo" },
        { nombre: "leche", cantidad: "1 taza", notas: "o agua" }
      ],
      macronutrientes: {
        proteina: "18 g (origen: huevo y avena)",
        carbohidratos: "45 g (tipo: complejos de avena y plátano)",
        vegetales: "0 g",
        calorias_totales: "320-350 kcal"
      },
      preparacion: [
        "1. En una olla, calentar la leche o agua con la canela",
        "2. Agregar la avena y cocinar por 10 minutos, revolviendo",
        "3. En otra sartén, cocinar el huevo revuelto o frito",
        "4. Servir la colada caliente con el plátano en rodajas",
        "5. Acompañar con el huevo al lado"
      ],
      tiempo_preparacion: "15-20 minutos",
      costo_aproximado: "Bajo",
      variante_sin: "Sin huevo: agregar más avena y semillas de zapallo"
    },
    
    almuerzo: {
      plato: "Locro de Papa con Queso y Aguacate",
      hora_recomendada: "1:00 PM",
      ingredientes: [
        { nombre: "papa", cantidad: "2 unidades medianas", notas: "pelada y en cubos" },
        { nombre: "cebolla larga", cantidad: "1/2 unidad", notas: "picada finamente" },
        { nombre: "queso fresco", cantidad: "50 g", notas: "en cubos" },
        { nombre: "aguacate", cantidad: "1/4 unidad", notas: "en rebanadas" },
        { nombre: "arvejas", cantidad: "3 cucharadas", notas: "frescas o secas remojadas" },
        { nombre: "achiote", cantidad: "1/2 cucharadita", notas: "para color" },
        { nombre: "leche", cantidad: "1/2 taza", notas: "o agua" },
        { nombre: "sal", cantidad: "al gusto", notas: "" }
      ],
      macronutrientes: {
        proteina: "22 g (origen: queso y arvejas)",
        carbohidratos: "55 g (tipo: complejos de papa)",
        vegetales: "150 g (papa, cebolla, arvejas)",
        calorias_totales: "450-500 kcal"
      },
      preparacion: [
        "1. En una olla, sofreír la cebolla con achiote",
        "2. Agregar las papas y arvejas, rehogar 5 minutos",
        "3. Añadir agua o leche hasta cubrir, cocinar 20 minutos",
        "4. Cuando las papas estén blandas, agregar el queso",
        "5. Servir caliente con aguacate por encima"
      ],
      tiempo_preparacion: "35-40 minutos",
      costo_aproximado: "Bajo",
      variante_sin: "Sin queso: usar más arvejas y agregar maní molido"
    },
    
    merienda: {
      plato: "Batido de Papaya con Semillas de Zapallo",
      hora_recomendada: "4:30 PM",
      ingredientes: [
        { nombre: "papaya", cantidad: "1 taza", notas: "pelada y en cubos" },
        { nombre: "semillas de zapallo", cantidad: "1 cucharada", notas: "peladas" },
        { nombre: "hierbaluisa", cantidad: "3 hojas", notas: "frescas" },
        { nombre: "agua", cantidad: "1/2 taza", notas: "fría" },
        { nombre: "miel", cantidad: "1 cucharadita", notas: "opcional" }
      ],
      macronutrientes: {
        proteina: "8 g (origen: semillas de zapallo)",
        carbohidratos: "25 g (tipo: naturales de papaya)",
        vegetales: "200 g (papaya)",
        calorias_totales: "150-180 kcal"
      },
      preparacion: [
        "1. Licuar la papaya con el agua y hierbaluisa",
        "2. Moler ligeramente las semillas de zapallo",
        "3. Servir el batido y espolvorear las semillas",
        "4. Endulzar con miel si se desea"
      ],
      tiempo_preparacion: "5 minutos",
      costo_aproximado: "Bajo",
      variante_sin: "Sin semillas: usar maní tostado molido"
    },
    
    lista_compras_dia: [
      "avena", "huevos", "plátano", "panela", "papa", "queso fresco",
      "aguacate", "arvejas", "papaya", "semillas de zapallo"
    ],
    presupuesto_diario_estimado: "Bajo (menos de $3)",
    notas_importantes: [
      "Las leguminosas deben remojarse desde la noche anterior",
      "Aprovechar las hierbas aromáticas del huerto familiar",
      "Guardar sobras en recipientes limpios para el día siguiente"
    ]
  };
};

// ===== FUNCIÓN PARA REGENERAR =====
export const regenerarMenu = async () => {
  console.log('🔄 Regenerando menú...');
  return await generarMenuDelDia();
};