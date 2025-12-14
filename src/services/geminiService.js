// src/services/geminiService.js - VERSIÓN CORREGIDA (3 COMIDAS)

import { alimentosEcuador, preparacionesTipicas, recomendacionesEspeciales } from '../data/alimentosEcuador';
const geminiDisponible = true;
// API Key desde variables de entorno
/*const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

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
*/
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
  console.log('🤖 Generando menú con IA...');

  if (!geminiDisponible) {
    return await generarMenuEjemploEcuador();
  }

  try {
    const prompt = construirPrompt();

    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error('Error al consultar Gemini');
    }

    const data = await response.json();
    const text = data.text;

    const menuProcesado = procesarRespuestaGemini(text);
    menuProcesado.generadoConIA = true;
    menuProcesado.fechaGeneracion = new Date().toISOString();

    return menuProcesado;

  } catch (error) {
    console.error('❌ Error IA:', error);
    return await generarMenuEjemploEcuador();
  }
};

// ===== PROCESAR RESPUESTA =====
const procesarRespuestaGemini = (textoRespuesta) => {
  let jsonText = textoRespuesta.trim();
  jsonText = jsonText.replace(/```json\s*/g, '');
  jsonText = jsonText.replace(/```\s*/g, '');
  return JSON.parse(jsonText);
};

// ===== MENÚ DEMO =====
const generarMenuEjemploEcuador = async () => {
  return {
    fecha: 'Menú de ejemplo',
    consejo_del_dia: 'Combina cereales y leguminosas',
    generadoConIA: false
  };
};

// ===== REGENERAR =====
export const regenerarMenu = async () => {
  return await generarMenuDelDia();
};