import React from "react";
import { motion } from "framer-motion";
import "../styles/locations-banner.css";
import { useLanguage } from "../contexts/LanguageContext";

import taurelLogo from "../assets/logo.png";
import mapVenezuela from "../assets/mappoints.png";
import tuerca from "../assets/IMG_7051.png";
const LocationsBanner: React.FC = () => {
  const { t } = useLanguage();
  const locations = [
    "Caracas, Dtto. Capital.",
    "La Guaira, Edo. Vargas.",
    "Catia La Mar, Vargas.",
    "Valencia, Edo. Carabobo.",
    "El Guamache, Nueva Esparta.",
    "Maracaibo, Edo. Zulia.",
    "Barquisimeto, Edo. Lara.",
    "Pto. Cabello, Edo. Carabobo.",
    "San Antonio del Táchira, Edo. Táchira.",
    "Santa Elena de Uairén, Bolívar.",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  };

  return (
    <section className="locations-banner">
      <img className="terca-back" src={tuerca} alt="" />
      <div className="locations-banner-container">
        <motion.div
          className="locations-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="locations-header" variants={logoVariants}>

            <img src={taurelLogo} alt="Taurel" className="taurel-logo" />
            <motion.h2
              className="locations-tagline"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t("locationsBanner.tagline")}
            </motion.h2>
          </motion.div>

          {/* Lista de ubicaciones */}
          <motion.div className="locations-list" variants={containerVariants}>
            <div className="locations-column left">
              {locations.slice(0, 5).map((location, index) => (
                <motion.div
                  key={index}
                  className="location-item"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    x: 5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="location-dot" />
                  <span>{location}</span>
                </motion.div>
              ))}
            </div>
            <div className="locations-column right">
              {locations.slice(5).map((location, index) => (
                <motion.div
                  key={index + 5}
                  className="location-item"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    x: 5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="location-dot" />
                  <span>{location}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Mapa de Venezuela con puntos */}
        <motion.div
          className="locations-map"
          variants={mapVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        ></motion.div>
      </div>
      <img
        className="mapa-venezuela-points"
        style={{
          position: "absolute",
          top: "0",
          right: 0,
          zIndex: 100,
        }}
        src={mapVenezuela}
        alt=""
      />
    </section>
  );
};

export default LocationsBanner;
