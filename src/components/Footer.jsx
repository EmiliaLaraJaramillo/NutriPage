import React from "react";
import puceLogo from "/assets/puce-logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-contenido">

        {/* LOGO PUCE CLICABLE */}
        <a 
          href="https://www.puce.edu.ec/" 
          target="_blank" 
          rel="noopener noreferrer"
          title="Sitio oficial PUCE"
        >
          <img src={puceLogo} alt="Logo PUCE" className="puce-logo" />
        </a>

        <p className="footer-texto">
          Proyecto académico desarrollado en la Pontificia Universidad Católica del Ecuador,
          en el marco de formación y fomento a la identidad alimentaria, cultural y comunitaria.
          La información y recursos presentados están destinados exclusivamente para fines
          educativos y de aprendizaje.
        </p>
      </div>

      <div className="footer-copy">
        © {new Date().getFullYear()} NutriPueblo. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
