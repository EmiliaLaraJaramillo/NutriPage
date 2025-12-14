// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import ChatFlotante from "./components/ChatFlotante";

import Home from "./pages/Home";
import Alimentos from "./pages/Alimentos";
import Recetas from "./pages/Recetas";
import Bienestar from "./pages/Bienestar";
// Busca en tu App.js las importaciones y agrega:
import NutricionIA from "./pages/NutricionIA"; // o './pages/NutricionIA.jsx'


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alimentos" element={<Alimentos />} />
-       <Route path="/guia" element={<Bienestar />} />
+       <Route path="/bienestar" element={<Bienestar />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route path="/nutricion-ia" element={<NutricionIA />} />
        
      </Routes>

      <Footer />
      {/* <ChatFlotante /> */}
    </Router>
  );
}

export default App;
