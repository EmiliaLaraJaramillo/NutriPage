// src/pages/NutricionIA.jsx - VERSIÓN COMPATIBLE (3 COMIDAS)
import React, { useState } from 'react';
import { generarMenuDelDia } from "../services/geminiService";
import './NutricionIA.css';

const NutricionIA = () => {
  const [menu, setMenu] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [mostrarConsejo, setMostrarConsejo] = useState(true);

  // Función para generar el menú (llamada desde el botón)
  const generarMenu = async () => {
    console.log('🔄 Botón presionado - Generando menú...');
    
    setCargando(true);
    setError(null);
    setMenu(null); // Limpiar menú anterior
    
    try {
      console.log('🤖 Llamando a Gemini Service...');
      const menuGenerado = await generarMenuDelDia();
      console.log('✅ Menú recibido:', menuGenerado);
      setMenu(menuGenerado);
    } catch (err) {
      console.error('❌ Error al generar menú:', err);
      setError('No se pudo generar el menú. Intenta nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  // ===== COMPONENTES DE ESTADO =====
  
  const Cargando = () => (
    <div className="cargando-container">
      <div className="spinner-ia"></div>
      <h2>Generando tu menú saludable del día...</h2>
      <p>🤖 Nuestra IA está seleccionando los mejores ingredientes para ti</p>
    </div>
  );

  const ErrorMessage = () => (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3>{error}</h3>
      <button className="btn-intentar" onClick={generarMenu}>
        🔄 Intentar nuevamente
      </button>
    </div>
  );

  // ===== COMPONENTE DE MENÚ GENERADO =====
  
  const MenuGenerado = () => {
    if (!menu) return null;

    // Función para renderizar una comida
    const renderComida = (comida, tipo) => {
      if (!comida || typeof comida !== 'object') return null;

      const config = {
        desayuno: { icono: '☀️', color: '#FFC107', hora: '6:00 - 8:00 AM', nombre: 'Desayuno' },
        almuerzo: { icono: '🌞', color: '#4CAF50', hora: '12:00 - 2:00 PM', nombre: 'Almuerzo' },
        merienda: { icono: '🌅', color: '#2196F3', hora: '4:00 - 5:00 PM', nombre: 'Merienda' }
      };

      const { icono, color, hora, nombre } = config[tipo];
      
      // Compatibilidad: usar macronutrientes o macros
      const macros = comida.macronutrientes || comida.macros || {};
      const nombrePlato = comida.plato || comida.nombre || `${nombre} saludable`;

      return (
        <div className={`comida-card comida-${tipo}`}>
          {/* Encabezado */}
          <div className="comida-header">
            <h3>
              <span className="comida-icono">{icono}</span>
              {nombre}
            </h3>
            <span className="comida-hora">{comida.hora_recomendada || hora}</span>
          </div>

          {/* Nombre del plato */}
          <h4 className="nombre-plato">{nombrePlato}</h4>

          {/* Ingredientes */}
          {comida.ingredientes && (
            <div className="seccion-ingredientes">
              <h5>📋 Ingredientes</h5>
              <div className="ingredientes-lista">
                {Array.isArray(comida.ingredientes) 
                  ? comida.ingredientes.map((ing, idx) => (
                      <div key={idx} className="ingrediente-item">
                        <span className="ingrediente-nombre">
                          {typeof ing === 'object' ? ing.nombre || ing : ing}:
                        </span>
                        <span className="ingrediente-cantidad">
                          {typeof ing === 'object' && ing.cantidad ? ` ${ing.cantidad}` : ' al gusto'}
                        </span>
                        {typeof ing === 'object' && ing.notas && (
                          <span className="ingrediente-notas"> ({ing.notas})</span>
                        )}
                      </div>
                    ))
                  : <p>{comida.ingredientes}</p>
                }
              </div>
            </div>
          )}

          {/* Valor Nutricional */}
          {(macros.proteina || macros.carbohidratos || macros.vegetales) && (
            <div className="seccion-nutricion">
              <h5>⚖️ Valor Nutricional</h5>
              <div className="nutricion-grid">
                {macros.proteina && (
                  <div className="nutricion-item">
                    <span className="nutricion-label">🥩 Proteína</span>
                    <span className="nutricion-valor">{macros.proteina}</span>
                  </div>
                )}
                {macros.carbohidratos && (
                  <div className="nutricion-item">
                    <span className="nutricion-label">🍚 Carbohidratos</span>
                    <span className="nutricion-valor">{macros.carbohidratos}</span>
                  </div>
                )}
                {macros.vegetales && (
                  <div className="nutricion-item">
                    <span className="nutricion-label">🥦 Vegetales</span>
                    <span className="nutricion-valor">{macros.vegetales}</span>
                  </div>
                )}
                {macros.calorias_totales && (
                  <div className="nutricion-item">
                    <span className="nutricion-label">🔥 Calorías</span>
                    <span className="nutricion-valor">{macros.calorias_totales}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Preparación */}
          {comida.preparacion && (
            <div className="seccion-preparacion">
              <div className="preparacion-header">
                <h5>👩‍🍳 Preparación</h5>
                {comida.tiempo_preparacion && (
                  <span className="tiempo-preparacion">
                    ⏱️ {comida.tiempo_preparacion}
                  </span>
                )}
              </div>
              <div className="pasos-lista">
                {Array.isArray(comida.preparacion) ? (
                  comida.preparacion.map((paso, idx) => (
                    <div key={idx} className="paso-item">
                      <span className="paso-numero">{idx + 1}.</span>
                      <span className="paso-texto">{paso}</span>
                    </div>
                  ))
                ) : (
                  <p className="preparacion-texto">{comida.preparacion}</p>
                )}
              </div>
            </div>
          )}

          {/* Variante */}
          {(comida.variante_sin || comida.alternativa) && (
            <div className="variante-container">
              <span className="variante-icono">🔄</span>
              <div className="variante-content">
                <h6>Variante disponible</h6>
                <p>{comida.variante_sin || comida.alternativa}</p>
              </div>
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="menu-real">
        {/* Encabezado del menú */}
        <div className="menu-info-header">
          <div className="menu-meta">
            {menu.fecha && (
              <div className="fecha-menu">
                <span className="fecha-icono">📅</span>
                <span className="fecha-texto">{menu.fecha}</span>
              </div>
            )}
            {menu.presupuesto_diario_estimado && (
              <div className="presupuesto-menu">
                <span className="presupuesto-icono">💰</span>
                <span className="presupuesto-texto">{menu.presupuesto_diario_estimado}</span>
              </div>
            )}
            <div className={`origen-menu ${menu.generadoConIA ? 'ia-real' : 'ia-ejemplo'}`}>
              {menu.generadoConIA ? '🤖 Generado por IA' : '📋 Menú de ejemplo'}
            </div>
          </div>
          
          {menu.consejo_del_dia && (
            <div className="consejo-menu">
              <div className="consejo-icono">💡</div>
              <p className="consejo-texto">{menu.consejo_del_dia}</p>
            </div>
          )}
        </div>

        {/* Comidas - SOLO 3 */}
        <div className="comidas-container">
          {renderComida(menu.desayuno, 'desayuno')}
          {renderComida(menu.almuerzo, 'almuerzo')}
          {renderComida(menu.merienda, 'merienda')}
        </div>

        {/* Información adicional */}
        <div className="info-adicional">
          {/* Lista de compras */}
          {menu.lista_compras_dia && (
            <div className="lista-compras">
              <h4>🛒 Lista de Compras del Día</h4>
              <div className="compras-grid">
                {Array.isArray(menu.lista_compras_dia) 
                  ? menu.lista_compras_dia.map((item, idx) => (
                      <div key={idx} className="compra-item">
                        <span className="compra-check">✓</span>
                        <span className="compra-nombre">{item}</span>
                      </div>
                    ))
                  : <div className="compra-item">
                      <span className="compra-check">✓</span>
                      <span className="compra-nombre">{menu.lista_compras_dia}</span>
                    </div>
                }
              </div>
            </div>
          )}

          {/* Notas importantes */}
          {menu.notas_importantes && (
            <div className="notas-importantes">
              <h4>📝 Notas Importantes</h4>
              <ul className="notas-lista">
                {Array.isArray(menu.notas_importantes) 
                  ? menu.notas_importantes.map((nota, idx) => (
                      <li key={idx} className="nota-item">
                        <span className="nota-punto">•</span>
                        <span className="nota-texto">{nota}</span>
                      </li>
                    ))
                  : <li className="nota-item">
                      <span className="nota-punto">•</span>
                      <span className="nota-texto">{menu.notas_importantes}</span>
                    </li>
                }
              </ul>
            </div>
          )}
        </div>

        {/* Botón para regenerar */}
        <div className="acciones-menu">
          <button className="btn-regenerar" onClick={generarMenu}>
            🔄 Generar Nuevo Menú
          </button>
        </div>
      </div>
    );
  };

  // ===== VISTA PRINCIPAL =====
  
  return (
    <div className="nutricion-ia-container">
      {/* SECCIÓN 1: Encabezado */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            🌾 Tu Menú Saludable del Día
          </h1>
          <p className="hero-subtitle">
            Especialmente diseñado para comunidades rurales del Ecuador
          </p>

          {/* Consejo nutricional */}
          {mostrarConsejo && (
            <div className="consejo-flotante">
              <div className="consejo-header">
                <span>💡 Consejo del Día</span>
                <button 
                  className="cerrar-consejo"
                  onClick={() => setMostrarConsejo(false)}
                >
                  ×
                </button>
              </div>
              <p>
                Combina leguminosas (lentejas, garbanzos) con cereales (arroz, trigo) 
                para obtener proteína completa de origen vegetal.
              </p>
            </div>
          )}

          {/* Mensaje motivacional */}
          <div className="concientizacion-card">
            <h2>🍎 ¿Por qué es importante comer balanceado?</h2>
            <p>
              Una alimentación equilibrada es clave para tener energía, 
              prevenir enfermedades y mantener un cuerpo saludable. No se trata 
              de comer menos, sino de comer <strong>mejor</strong> con lo que tenemos disponible.
            </p>
            
            <div className="proporciones-grid">
              <div className="proporcion-item">
                <div className="proporcion-icon">🥩</div>
                <h3>Proteínas</h3>
                <p>Reparan tejidos y construyen músculo</p>
                <span className="proporcion-tag">25% del plato</span>
              </div>
              
              <div className="proporcion-item">
                <div className="proporcion-icon">🍚</div>
                <h3>Carbohidratos</h3>
                <p>Te dan energía para todo el día</p>
                <span className="proporcion-tag">25% del plato</span>
              </div>
              
              <div className="proporcion-item">
                <div className="proporcion-icon">🥦</div>
                <h3>Vegetales</h3>
                <p>Vitaminas, minerales y fibra</p>
                <span className="proporcion-tag">50% del plato</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: Menú generado */}
      <section className="menu-section">
        <div className="section-header">
          <h2>🍽️ Menú del Día Generado por IA</h2>
          <p className="section-description">
            Basado en alimentos disponibles en zonas rurales del Ecuador
          </p>
          
          {/* BOTÓN PRINCIPAL - AQUÍ SE HACE EL LLAMADO */}
          <div className="menu-acciones">
            <button 
              className="btn-generar-menu"
              onClick={generarMenu}
              disabled={cargando}
            >
              {cargando ? '🔄 Generando...' : '✨ Generar Mi Menú del Día'}
            </button>
          </div>
        </div>

        {/* Estados: Cargando, Error o Menú */}
        {error && <ErrorMessage />}
        {cargando && <Cargando />}
        {menu && <MenuGenerado />}
        
        {/* Placeholder inicial */}
        {!cargando && !menu && !error && (
          <div className="menu-placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">🤖</div>
              <h3>Menú Personalizado con Inteligencia Artificial</h3>
              <p>
                Haz clic en "Generar Mi Menú del Día" para obtener un menú completo 
                con desayuno, almuerzo y merienda, creado especialmente considerando 
                los alimentos disponibles en tu zona.
              </p>
              
              <div className="comidas-preview">
                <div className="comida-preview">
                  <span className="hora-preview">☀️ 6:00 - 8:00 AM</span>
                  <h4>Desayuno Energético</h4>
                  <p>Porción balanceada para empezar el día</p>
                </div>
                
                <div className="comida-preview">
                  <span className="hora-preview">🌞 12:00 - 2:00 PM</span>
                  <h4>Almuerzo Nutritivo</h4>
                  <p>Plato completo con todos los nutrientes</p>
                </div>
                
                <div className="comida-preview">
                  <span className="hora-preview">🌅 4:00 - 5:00 PM</span>
                  <h4>Merienda Ligera</h4>
                  <p>Para terminar el día con energía equilibrada</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECCIÓN 3: Información adicional */}
      <section className="info-section">
        <h2>📋 ¿Cómo funciona nuestro sistema de IA?</h2>
        <div className="pasos-grid">
          <div className="paso">
            <div className="paso-numero">1</div>
            <h3>Analiza Alimentos Locales</h3>
            <p>Considera más de 80 ingredientes disponibles en zonas rurales ecuatorianas</p>
          </div>
          
          <div className="paso">
            <div className="paso-numero">2</div>
            <h3>Aplica Nutrición Científica</h3>
            <p>Balancea proteínas, carbohidratos y vegetales en proporciones saludables</p>
          </div>
          
          <div className="paso">
            <div className="paso-numero">3</div>
            <h3>Genera Menú Personalizado</h3>
            <p>Crea un plan realista, económico y fácil de preparar</p>
          </div>
        </div>
        
        <div className="ia-info">
          <h4>🤖 Sobre nuestra Inteligencia Artificial</h4>
          <p>
            Usamos <strong>Google Gemini</strong> entrenado específicamente con ingredientes 
            y preparaciones típicas del Ecuador rural. La IA considera temporada, costo y 
            disponibilidad real de alimentos.
          </p>
        </div>
      </section>
    </div>
  );
};

export default NutricionIA;