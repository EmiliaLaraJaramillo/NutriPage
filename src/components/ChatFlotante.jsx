import { useState, useRef, useEffect } from "react";
import axios from "axios";

function ChatFlotante() {
  const [pregunta, setPregunta] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mensajes, setMensajes] = useState([
    { rol: "ia", texto: "Hola, soy la IA Andina. ¿En qué puedo ayudarte hoy?" }
  ]);
  const [abierto, setAbierto] = useState(false);

  const chatRef = useRef(null);

  const hacerPregunta = async (e) => {
    e.preventDefault();
    const texto = pregunta.trim();
    if (!texto) return;

    setMensajes((prev) => [...prev, { rol: "usuario", texto }]);
    setPregunta("");
    setCargando(true);

    try {
      const res = await axios.post("https://apivitalandina.puceecoexplora.com/api/chat", {
        mensaje: texto, 
      });

      const respuesta =
        res.data?.respuesta?.trim() ||
        " La IA no pudo generar una respuesta en este momento.";

      setMensajes((prev) => [...prev, { rol: "ia", texto: respuesta }]);
    } catch (error) {
      console.error(" Error al conectar con la IA:", error);
      setMensajes((prev) => [
        ...prev,
        { rol: "ia", texto: " No se pudo conectar con la IA. Intenta más tarde." },
      ]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensajes, abierto]);

  return (
    <>
      {/* Botón flotante para abrir/cerrar */}
      <button
        onClick={() => setAbierto(!abierto)}
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          background: "#198754",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "3.5rem",
          height: "3.5rem",
          fontSize: "1.5rem",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          cursor: "pointer",
          zIndex: 1001,
        }}
      >
        {abierto ? "✖" : "💬"}
      </button>

      {/* Caja de chat */}
      {abierto && (
        <div
          style={{
            position: "fixed",
            bottom: "5.2rem",
            right: "1rem",
            background: "#ffffff",
            borderRadius: "1rem",
            boxShadow: "0 0 20px rgba(0,0,0,0.15)",
            width: "350px",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
            <strong>IA Andina</strong>
          </div>

          <div
            ref={chatRef}
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {mensajes.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.rol === "usuario" ? "flex-end" : "flex-start",
                  background: m.rol === "usuario" ? "#DCF8C6" : "#F0F0F0",
                  color: "#333",
                  padding: "0.6rem 0.9rem",
                  borderRadius: "15px",
                  maxWidth: "80%",
                  whiteSpace: "pre-wrap",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                {m.texto}
              </div>
            ))}
          </div>

          <form onSubmit={hacerPregunta} style={{ display: "flex", borderTop: "1px solid #eee" }}>
            <input
              type="text"
              placeholder="Escribe tu pregunta..."
              className="form-control border-0"
              style={{ flex: 1, borderRadius: "0 0 0 1rem" }}
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
              disabled={cargando}
            />
            <button
              className="btn btn-success"
              style={{
                borderRadius: "0 0 1rem 0",
                padding: "0 1rem",
                fontWeight: "bold",
              }}
              disabled={cargando}
            >
              {cargando ? "..." : "➤"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ChatFlotante;
