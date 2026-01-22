import React from "react";
import "../styles/sobre-nosotros.css";

interface Chamber {
  nombre: string;
  slug: string;
}

interface ChambersSliderProps {
  chambers: Chamber[];
}

const ChambersSlider: React.FC<ChambersSliderProps> = ({ chambers }) => {
  // Duplicamos 4 veces para asegurar loop perfecto sin saltos
  const duplicated = [...chambers, ...chambers, ...chambers, ...chambers];

  return (
    <div className="chambers-strip">
      <div className="container-fluid">
        <div className="chambers-slider-wrapper">
          <div className="chambers-slider-track">
            {duplicated.map((chamber, i) => (
              <div
                key={`${chamber.slug}-${i}`}
                className="chamber-logo-item"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChambersSlider;