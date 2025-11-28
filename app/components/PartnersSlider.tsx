import React from "react";
import { motion } from "framer-motion";
import "../styles/partners-slider.css";

import logo1 from "../assets/package-nosotros/Logo camara de comercio 1.png";
import logo2 from "../assets/package-nosotros/Logo camara de comercio 2.png";
import logo3 from "../assets/package-nosotros/Logo camara de comercio 3.png";
import logo4 from "../assets/package-nosotros/Logo camara de comercio 4.png";
import logo5 from "../assets/package-nosotros/Logo camara de comercio 5.png";
import logo6 from "../assets/package-nosotros/Logo camara de comercio 6.png";
import logo7 from "../assets/package-nosotros/Logo camara de comercio 7.png";
import logo8 from "../assets/package-nosotros/Logo camara de comercio 8.png";
import logo9 from "../assets/package-nosotros/Logo camara de comercio 9.png";
import logo10 from "../assets/package-nosotros/Logo camara de comercio 10.png";
import logo11 from "../assets/package-nosotros/Logo camara de comercio 11.png";
import logo12 from "../assets/package-nosotros/Logo camara de comercio 12.png";
import logo13 from "../assets/package-nosotros/Logo camara de comercio 13.png";
import logo14 from "../assets/package-nosotros/Logo camara de comercio 14.png";
import logo15 from "../assets/package-nosotros/Logo camara de comercio 15.png";
import logo16 from "../assets/package-nosotros/Logo camara de comercio 16.png";
import logo17 from "../assets/package-nosotros/Logo camara de comercio 17.png";
import logo18 from "../assets/package-nosotros/Logo camara de comercio 18.png";
import logo19 from "../assets/package-nosotros/FEDECAMARAS.png";

const PartnersSlider: React.FC = () => {
  const partners = [
    { nombre: "VenAmCham", slug: logo1 },
    { nombre: "Consecomercio", slug: logo2 },
    { nombre: "Conindustria", slug: logo3 },
    { nombre: "Cámara de Comercio de Valencia", slug: logo4 },
    { nombre: "Cavecol", slug: logo5 },
    { nombre: "Cámara de Comercio de Puerto Cabello", slug: logo6 },
    { nombre: "ALV", slug: logo7 },
    { nombre: "AEX", slug: logo8 },
    { nombre: "ASADAEZ", slug: logo9 },
    { nombre: "Cámara de Comercio de Maracaibo", slug: logo10 },
    { nombre: "ANV", slug: logo11 },
    { nombre: "CCI Valencia", slug: logo12 },
    { nombre: "Fondonorma", slug: logo13 },
    { nombre: "Cámara Venezolano Francesa", slug: logo14 },
    { nombre: "ASOCAV", slug: logo15 },
    { nombre: "Colegio de Ingenieros", slug: logo16 },
    { nombre: "Cámara de Comercio Colombo Venezolana", slug: logo17 },
    { nombre: "Cámara de Comercio e Industria Venezolano Italiana", slug: logo18 },
    { nombre: "FEDECAMARAS", slug: logo19 },
  ];

  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="partners-container">
      <div className="partners-content">
        <div className="partners-with-button">
          <div className="partners-slider-wrapper">
            <motion.div
              className="partners-slider-track"
              animate={{
                x: [0, -100 * partners.length],
              }}
              transition={{
                duration: partners.length * 1,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <motion.div
                  key={`${partner.nombre}-${index}`}
                  className="partner-logo-item"
                  whileHover={{
                    scale: 1.1,
                    filter: "brightness(1.1) contrast(1.1)"
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <img
                    src={partner.slug}
                    alt={partner.nombre}
                    loading="lazy"
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = "none";
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersSlider;
