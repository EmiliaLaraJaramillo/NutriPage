import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AgregarRecetaForm.css";

const backendUrl = 'https://apivitalandina.puceecoexplora.com'; // URL del backend

const AgregarRecetaForm = ({ onRecetaAgregada }) => {
  const [alimentos, setAlimentos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    pasos: "",
    ingredientes: "",
    beneficios: "",
    alimento_id: "",
  });
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // 🔥 Trae los alimentos para el dropdown
    axios
      .get(`${backendUrl}/api/alimentos`)
      .then((res) => setAlimentos(res.data))
      .catch((err) => console.error("Error al obtener alimentos:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 Convertir cadenas separadas por comas a arrays
    const recetaData = {
      ...formData,
      pasos: formData.pasos
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p !== ""),
      ingredientes: formData.ingredientes
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i !== ""),
      beneficios: formData.beneficios
        .split(",")
        .map((b) => b.trim())
        .filter((b) => b !== ""),
    };

    try {
      const res = await axios.post(`${backendUrl}/api/recetas`, recetaData);
      setMensaje("✅ Receta agregada correctamente");
      setFormData({
        nombre: "",
        descripcion: "",
        pasos: "",
        ingredientes: "",
        beneficios: "",
        alimento_id: "",
      });
      onRecetaAgregada(res.data); //  Actualiza la lista de recetas
    } catch (err) {
      console.error("❌ Error al agregar receta:", err);
      setMensaje("❌ Error al agregar receta");
    }
  };

  return (
    <div className="agregar-receta-form">
      <h3> Ingresar Receta</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la receta"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          required
        ></textarea>
        <textarea
          name="pasos"
          placeholder="Pasos (separa con comas)"
          value={formData.pasos}
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          name="ingredientes"
          placeholder='Ingredientes (ej: "Leche, Huevos")'
          value={formData.ingredientes}
          onChange={handleChange}
        />
        <input
          type="text"
          name="beneficios"
          placeholder='Beneficios (ej: "Fibra, Proteína")'
          value={formData.beneficios}
          onChange={handleChange}
        />
        <select
          name="alimento_id"
          value={formData.alimento_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un alimento relacionado</option>
          {alimentos.map((alimento) => (
            <option key={alimento.id} value={alimento.id}>
              {alimento.nombre}
            </option>
          ))}
        </select>
        <button type="submit">Agregar Receta</button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default AgregarRecetaForm;
