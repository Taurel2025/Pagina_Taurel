import React from "react";
import { motion } from "framer-motion";
import "../styles/sobre-nosotros.css";

interface Chamber {
  nombre: string;
  slug: string;
}

interface ChambersSliderProps {
  chambers: Chamber[];
}

const ChambersSlider: React.FC<ChambersSliderProps> = ({ chambers }) => {
  const duplicated = [...chambers, ...chambers, ...chambers];

  return (
    <div className="chambers-strip">
      <div className="container-fluid">
        <div className="chambers-slider-wrapper">
          <motion.div
            className="chambers-slider-track"
            animate={{ x: [0, -100 * chambers.length] }}
            transition={{
              duration: chambers.length * 1,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {duplicated.map((chamber, i) => (
              <motion.div
                key={`${chamber.slug}-${i}`}
                className="chamber-logo-item"
                whileHover={{
                  scale: 1.1,
                  filter: "brightness(1.1) contrast(1.1)"
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <img
                  src={chamber.slug}
                  alt={chamber.nombre}
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = "none";
                    const placeholder = img.nextElementSibling as HTMLElement | null;
                    if (placeholder) placeholder.style.display = "flex";
                  }}
                />
                <span className="chamber-placeholder" aria-hidden>
                  {chamber.nombre}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChambersSlider;