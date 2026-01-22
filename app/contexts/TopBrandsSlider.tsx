import React from "react";
import "../styles/sobre-nosotros.css";
import image1 from "../assets/slider-nostros/1.png";
import image2 from "../assets/slider-nostros/2.png";
import image3 from "../assets/slider-nostros/3.png";
import image4 from "../assets/slider-nostros/4.png";
import image5 from "../assets/slider-nostros/5.png";
import image6 from "../assets/slider-nostros/6.png";
import image7 from "../assets/slider-nostros/7.png";

const BRANDS: { name: string; slug: string }[] = [
  { name: "MAERSK", slug: image1 },
  { name: "Hapag-Lloyd", slug: image2 },
  { name: "SeaLand", slug: image3 },
  { name: "CEVA Logistics", slug: image4 },
  { name: "CMA CGM", slug: image5 },
  { name: "MSC", slug: image6 },
  { name: "ZIM", slug: image7 },
];

const TopBrandsSlider: React.FC = () => {
  // Duplicamos 4 veces para asegurar loop perfecto sin saltos
  const duplicated = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <div className="brands-strip">
      <div className="container-fluid">
        <div className="brands-slider-wrapper">
          <div className="brands-slider-track">
            {duplicated.map((b, i) => (
              <div key={`${b.slug}-${i}`} className="brand-logo-item">
                <img
                  src={b.slug}
                  alt={b.name}
                  loading="lazy"
                  style={b.name === "MSC" ? { maxHeight: "93px" } : undefined}
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = "none";
                    const placeholder = img.nextElementSibling as HTMLElement | null;
                    if (placeholder) placeholder.style.display = "flex";
                  }}
                />
                <span className="brand-placeholder" aria-hidden>
                  {b.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBrandsSlider;