import React, { useState } from "react";

const AgregarAlimentoForm = ({ onAlimentoAgregado }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [beneficios, setBeneficios] = useState("");

  const backendUrl = "https://apivitalandina.puceecoexplora.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !descripcion) {
      alert("Completa nombre y descripción.");
      return;
    }

    try {
      const resp = await fetch(`${backendUrl}/api/alimentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, descripcion, beneficios }),
      });

      const data = await resp.json();
      alert("Alimento agregado correctamente.");

      onAlimentoAgregado(data);

      setNombre("");
      setDescripcion("");
      setBeneficios("");
    } catch (error) {
      alert("Error al guardar alimento.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="alimentos-form">
      <input
        type="text"
        placeholder="Nombre del alimento"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <textarea
        placeholder="Descripción breve"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        rows={3}
        required
      />

      <textarea
        placeholder="Beneficios (opcional)"
        value={beneficios}
        onChange={(e) => setBeneficios(e.target.value)}
        rows={3}
      />

      <button type="submit">Registrar alimento</button>
    </form>
  );
};

export default AgregarAlimentoForm;
