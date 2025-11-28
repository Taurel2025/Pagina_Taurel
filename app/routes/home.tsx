import type { Route } from "./+types/home";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import AnimatedElement from "../components/AnimatedElement";
import CountUp from "../components/CountUp";
import ServicesSlider from "../components/ServicesSlider";
import CertificationModal from "../components/CertificationModal";
import PartnersSlider from "../components/PartnersSlider";
import LocationsBanner from "../components/LocationsBanner";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/home.css";
import isoLogo from "../assets/Logo-ISO.png";
import fondonormaLogo from "../assets/brillante _FONDONORMA_ 1.png";
import img1911 from "../assets/1911.png";
import img1945 from "../assets/1945.png";
import img1999 from "../assets/1999.png";
import img2002 from "../assets/2002.png";
import img2024 from "../assets/2024.png";
import img1994 from "../assets/1994.png";
import videoBannerHorizontal from "../assets/videobanner.mp4";
import videoBannerVertical from "../assets/BANNER VERTICAL.mp4";
import maos2 from "../assets/maos2.png";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Taurel - Soluciones Logísticas" },
    {
      name: "description",
      content:
        "Taurel - Empresa líder en soluciones logísticas y transporte internacional",
    },
  ];
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleCtaClick = () => navigate("/servicios");

  return (
    <div className="home-page">
      <section className="main-hero">
        <video
          className="main-hero-video main-hero-video-horizontal"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          onLoadStart={() => console.log("Video horizontal loading started")}
          onCanPlay={() => console.log("Video horizontal can play")}
          onError={(e) => console.error("Video horizontal error:", e)}
        >
          <source src={videoBannerHorizontal} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
        <video
          className="main-hero-video main-hero-video-vertical"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          onLoadStart={() => console.log("Video vertical loading started")}
          onCanPlay={() => console.log("Video vertical can play")}
          onError={(e) => console.error("Video vertical error:", e)}
        >
          <source src={videoBannerVertical} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
        <div className="main-hero-overlay"></div>
        <div className="main-hero-content">
          <div className="main-hero-text">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1>
                {t('home.hero.title')}
              </h1>
              <motion.button
                className="cta-button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCtaClick}
              >
                {t('home.hero.cta')}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="stats-hero">
        <div className="stats-hero-overlay"></div>
        <div className="container stats-hero-container">
          <img className="maos2" src={maos2} alt="" />
          <motion.div
            className="stats-hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="stats-title">
              {t('home.stats.title')}
            </p>
            <p className="stats-subtitle">
              {t('home.stats.subtitle')}
            </p>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>
                  <CountUp end={9} duration={2.5} prefix="+" />
                </h3>
                <p>{t('home.stats.offices')}</p>
              </div>
              <div className="stat-card">
                <h3>
                  <CountUp end={180} duration={2.8} prefix="+" />
                </h3>
                <p>{t('home.stats.partners')}</p>
              </div>
              <div className="stat-card">
                <h3>
                  <CountUp end={200} duration={3} prefix="+" />
                </h3>
                <p>{t('home.stats.employees')}</p>
              </div>
              <div className="stat-card">
                <h3>
                  <CountUp end={2000} duration={3.2} prefix="+" />
                </h3>
                <p>{t('home.stats.clients')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="services-slider section">
        <ServicesSlider />
      </section>
      <section className="timeline-section section">
        <div className="container">
          <AnimatedElement animation="fadeUp">
            <div className="section-title">
              <h2>{t('home.timeline.title')}</h2>
            </div>
          </AnimatedElement>

          <div className="hex-timeline">
            <motion.div
              className="timeline-line"
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
            />

            <div className="hex-row top">
              <motion.div
                className="hex-item top"
                initial={{ opacity: 0, y: -100, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="hex"
                  style={{
                    backgroundImage: `url(${img1911})`,
                  }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    className="hex-content-wrapper"
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="hex-overlay" />
                    <motion.span
                      className="hex-year"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      1911
                    </motion.span>
                  </motion.div>
                </motion.div>
                <motion.p
                  className="hex-caption"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  {t('home.timeline.year1911')}
                </motion.p>
              </motion.div>

              <motion.div
                className="hex-item top"
                initial={{ opacity: 0, y: -100, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="hex"
                  style={{
                    backgroundImage: `url(${img1945})`,
                  }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    className="hex-content-wrapper"
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="hex-overlay" />
                    <motion.span
                      className="hex-year"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      1945
                    </motion.span>
                  </motion.div>
                </motion.div>
                <motion.p
                  className="hex-caption"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  {t('home.timeline.year1945')}
                </motion.p>
              </motion.div>

              <motion.div
                className="hex-item top"
                initial={{ opacity: 0, y: -100, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="hex"
                  style={{
                    backgroundImage: `url(${img1994})`,
                  }}
                  whileHover={{
                    scale: 1.1,
                    /*  rotateY: 10,
                    rotateX: -5, */
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    className="hex-content-wrapper"
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="hex-overlay" />
                    <motion.span
                      className="hex-year"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.0 }}
                      viewport={{ once: true }}
                    >
                      1994
                    </motion.span>
                  </motion.div>
                </motion.div>
                <motion.p
                  className="hex-caption"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  viewport={{ once: true }}
                >
                  {t('home.timeline.year1994')}
                </motion.p>
              </motion.div>
            </div>

            <div className="hex-row bottom">
              <motion.div
                className="hex-item bottom"
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="hex"
                  style={{
                    backgroundImage: `url(${img1999})`,
                  }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    className="hex-content-wrapper"
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="hex-overlay" />
                    <motion.span
                      className="hex-year"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      1999
                    </motion.span>
                  </motion.div>
                </motion.div>
                <motion.p
                  className="hex-caption"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  {t('home.timeline.year1999')}
                </motion.p>
              </motion.div>

              <motion.div
                className="hex-item bottom"
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="hex"
                  style={{
                    backgroundImage: `url(${img2002})`,
                  }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    className="hex-content-wrapper"
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="hex-overlay" />
                    <motion.span
                      className="hex-year"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      viewport={{ once: true }}
                    >
                      2002
                    </motion.span>
                  </motion.div>
                </motion.div>
                <motion.p
                  className="hex-caption"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  viewport={{ once: true }}
                >
                  {t('home.timeline.year2002')}
                </motion.p>
              </motion.div>

              <motion.div
                className="hex-item bottom"
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="hex"
                  style={{
                    backgroundImage: `url(${img2024})`,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotateY: -10,
                    rotateX: 5,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    className="hex-content-wrapper"
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="hex-overlay" />
                    <motion.span
                      className="hex-year"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                      viewport={{ once: true }}
                    >
                      2024
                    </motion.span>
                  </motion.div>
                </motion.div>
                <motion.p
                  className="hex-caption"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  viewport={{ once: true }}
                >
                  {t('home.timeline.year2024')}
                </motion.p>
              </motion.div>
            </div>

            <motion.div
              className="hex-decoration hex-left"
              aria-hidden="true"
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              animate={{
                scale: [1, 1.015, 1],
                y: [0, -4, 0],
              }}
              whileHover={{
                opacity: 0.8,
                scale: 1.05,
                filter:
                  "brightness(1.1) drop-shadow(0 0 12px rgba(26, 144, 206, 0.4))",
              }}
            />
            <motion.div
              className="hex-decoration hex-right"
              aria-hidden="true"
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              animate={{
                rotate: [0, 1.5, 0, -1.5, 0],
                scale: [1, 1.015, 1],
                y: [0, 3, 0, -3, 0],
              }}
              whileHover={{
                opacity: 0.8,
                scale: 1.05,
                rotate: 5,
                filter:
                  "brightness(1.1) drop-shadow(0 0 12px rgba(26, 144, 206, 0.4))",
              }}
            />
          </div>
        </div>
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
      <LocationsBanner />
      <PartnersSlider />
      <CertificationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
