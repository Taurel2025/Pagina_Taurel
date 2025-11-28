import { useState } from "react";
import { useLanguage } from "~/contexts/LanguageContext";
import "../styles/sobre-nosotros.css";
import { motion } from "framer-motion";
import AboutUsSlider from "../components/AboutUsSlider";
import ChambersSlider from "../components/ChambersSlider";
import CertificationModal from "../components/CertificationModal";
import imageG1 from "../assets/package-nosotros/Logo camara de comercio 1.png";
import imageG2 from "../assets/package-nosotros/Logo camara de comercio 2.png";
import imageG3 from "../assets/package-nosotros/Logo camara de comercio 3.png";
import imageG4 from "../assets/package-nosotros/Logo camara de comercio 4.png";
import imageG5 from "../assets/package-nosotros/Logo camara de comercio 5.png";
import imageG6 from "../assets/package-nosotros/Logo camara de comercio 6.png";
import imageG7 from "../assets/package-nosotros/Logo camara de comercio 7.png";
import imageG8 from "../assets/package-nosotros/Logo camara de comercio 8.png";
import imageG9 from "../assets/package-nosotros/Logo camara de comercio 9.png";
import imageG10 from "../assets/package-nosotros/Logo camara de comercio 10.png";
import imageG11 from "../assets/package-nosotros/Logo camara de comercio 11.png";
import imageG12 from "../assets/package-nosotros/Logo camara de comercio 12.png";
import imageG13 from "../assets/package-nosotros/Logo camara de comercio 13.png";
import imageG14 from "../assets/package-nosotros/Logo camara de comercio 14.png";
import imageG15 from "../assets/package-nosotros/Logo camara de comercio 15.png";
import imageG16 from "../assets/package-nosotros/Logo camara de comercio 16.png";
import imageG17 from "../assets/package-nosotros/Logo camara de comercio 17.png";
import imageG18 from "../assets/package-nosotros/Logo camara de comercio 18.png";
import imageG19 from "../assets/package-nosotros/FEDECAMARAS.png";
import imageEmpresa1 from "../assets/package-nosotros-empresa/1.png";
import imageEmpresa2 from "../assets/package-nosotros-empresa/2.png";
import imageEmpresa3 from "../assets/package-nosotros-empresa/3.png";
import imageEmpresa4 from "../assets/package-nosotros-empresa/4.png";
import imageEmpresa5 from "../assets/package-nosotros-empresa/5.png";
import imageEmpresa6 from "../assets/package-nosotros-empresa/6.png";
import backgroundHexLeft from "../assets/Hexagonos-11.png";
import backgroundHexRight from "../assets/Hexagonos 2.png";
import isoLogo from "../assets/Logo-ISO.png";
import fondonormaLogo from "../assets/brillante _FONDONORMA_ 1.png";
import TopBrandsSlider from "~/contexts/TopBrandsSlider";

export function meta() {
  return [
    { title: "Sobre Nosotros - Taurel" },
    {
      name: "description",
      content: "Conoce más sobre Taurel, nuestra historia, valores y equipo",
    },
  ];
}

export default function SobreNosotros() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const valores = [
    {
      icon: imageEmpresa1,
      titulo: t('aboutUs.values.value1.title'),
      texto: t('aboutUs.values.value1.text'),
    },
    {
      icon: imageEmpresa2,
      titulo: t('aboutUs.values.value2.title'),
      texto: t('aboutUs.values.value2.text'),
    },
    {
      icon: imageEmpresa3,
      titulo: t('aboutUs.values.value3.title'),
      texto: t('aboutUs.values.value3.text'),
    },
    {
      icon: imageEmpresa4,
      titulo: t('aboutUs.values.value4.title'),
      texto: t('aboutUs.values.value4.text'),
    },
    {
      icon: imageEmpresa5,
      titulo: t('aboutUs.values.value5.title'),
      texto: t('aboutUs.values.value5.text'),
    },
    {
      icon: imageEmpresa6,
      titulo: t('aboutUs.values.value6.title'),
      texto: t('aboutUs.values.value6.text'),
    },
  ];

  const gremios = [
    { nombre: "VenAmCham", slug: imageG1 },
    { nombre: "Consecomercio", slug: imageG2 },
    { nombre: "Conindustria", slug: imageG3 },
    { nombre: "Cámara de Comercio de Valencia", slug: imageG4 },
    { nombre: "Cavecol", slug: imageG5 },
    { nombre: "Cámara de Comercio de Puerto Cabello", slug: imageG6 },
    { nombre: "ALV", slug: imageG7 },
    { nombre: "AEX", slug: imageG8 },
    { nombre: "ASADAEZ", slug: imageG9 },
    { nombre: "Cámara de Comercio de Maracaibo", slug: imageG10 },
    { nombre: "ANV", slug: imageG11 },
    { nombre: "CCI Valencia", slug: imageG12 },
    { nombre: "Fondonorma", slug: imageG13 },
    { nombre: "Cámara Venezolano Francesa", slug: imageG14 },
    { nombre: "ASOCAV", slug: imageG15 },
    { nombre: "Colegio de Ingenieros", slug: imageG16 },
    { nombre: "Cámara de Comercio Colombo Venezolana", slug: imageG17 },
    {
      nombre: "Cámara de Comercio e Industria Venezolano Italiana",
      slug: imageG18,
    },
    { nombre: "FEDECAMARAS", slug: imageG19 },
  ];

  return (
    <div className="sobre-nosotros-page">
      <AboutUsSlider />
      <TopBrandsSlider />
      <section className="values-section section">
        <div className="container">
          <div className="values-header">
            <h3>
              {t('aboutUs.values.header')}
            </h3>
            <p className="values-subtitle">
              {t('aboutUs.values.subtitle')}
            </p>
          </div>

          <div className="values-grid">
            <img src={backgroundHexLeft} className="values-section-before" />
            <img src={backgroundHexRight} className="values-section-after" />
            {valores.map((v, idx) => (
              <div key={idx} className="value-card">
                <div className="value-icon-wrap" aria-hidden>
                  <img src={v.icon} alt={v.titulo} />
                </div>
                <h4>{v.titulo}</h4>
                <p>{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="chambers-section section">
        <div className="container">
          <div className="section-title">
            <h2 className="uppercase">
              {t('aboutUs.chambers.title')}
            </h2>
            <p className="chambers-subtitle">
              {t('aboutUs.chambers.subtitle')}
            </p>
          </div>
        </div>

        <ChambersSlider chambers={gremios} />
      </section>

      <div className="certifications section">
        <div className="cert-banner">
          <img src={isoLogo} alt="ISO" className="cert-logo cert-logo-left" />
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1, cursor: "pointer" }}
            whileTap={{ scale: 0.98 }}
            onClick={openModal}
            className="cert-title"
          >
            {t('home.certification.title')}
          </motion.h3>
          <img
            src={fondonormaLogo}
            alt="FONDONORMA"
            className="cert-logo cert-logo-right"
          />
        </div>
      </div>
      <CertificationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
