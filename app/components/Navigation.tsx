import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/navigation.css";
import logo from "../assets/logo.png";
import bandera from "../assets/bandera.png";
import JobModal from "./JobModal";
import { useLanguage } from "../contexts/LanguageContext";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const openJobModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setJobModalOpen(true);
  };

  const handleLanguageChange = (lang: "es" | "en") => {
    setLanguage(lang);
  };

  return (
    <>
      <motion.header
        className={`navigation ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="nav-container">
          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="Taurel Logo" className="logo" />
            </Link>
          </div>

          <nav className="desktop-nav">
            <ul>
              <li>
                <Link to="/">{t("nav.home")}</Link>
              </li>
              <li>
                <Link to="/servicios">{t("nav.services")}</Link>
              </li>
              <li>
                <Link to="/sobre-nosotros">{t("nav.aboutUs")}</Link>
              </li>
              <li>
                <Link to="/contactanos">{t("nav.contact")}</Link>
              </li>
            </ul>
          </nav>

          <div className="special-links">
            <a href="#" className="track-link">
              {t("nav.trackShipment")}
            </a>
            <a href="#" className="login-link" onClick={openJobModal}>
              {t("nav.jobs")}
            </a>

            <div className="header-lang-compact">
              <img
                className="flag-ven-small"
                src={bandera}
                alt="Venezuela"
                style={{ display: language === "es" ? "block" : "none" }}
              />

              <svg
                className="flag-ven-small"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 30"
                style={{ display: language === "en" ? "block" : "none" }}
              >
                <rect width="50" height="30" fill="#B22234" />
                <rect y="2.31" width="50" height="2.31" fill="#fff" />
                <rect y="6.92" width="50" height="2.31" fill="#fff" />
                <rect y="11.54" width="50" height="2.31" fill="#fff" />
                <rect y="16.15" width="50" height="2.31" fill="#fff" />
                <rect y="20.77" width="50" height="2.31" fill="#fff" />
                <rect y="25.38" width="50" height="2.31" fill="#fff" />

                <rect width="20" height="13.85" fill="#3C3B6E" />

                <g fill="#fff">
                  <circle cx="2.5" cy="2" r="0.8" />
                  <circle cx="7.5" cy="2" r="0.8" />
                  <circle cx="12.5" cy="2" r="0.8" />
                  <circle cx="17.5" cy="2" r="0.8" />

                  <circle cx="5" cy="4.5" r="0.8" />
                  <circle cx="10" cy="4.5" r="0.8" />
                  <circle cx="15" cy="4.5" r="0.8" />

                  <circle cx="2.5" cy="7" r="0.8" />
                  <circle cx="7.5" cy="7" r="0.8" />
                  <circle cx="12.5" cy="7" r="0.8" />
                  <circle cx="17.5" cy="7" r="0.8" />

                  <circle cx="5" cy="9.5" r="0.8" />
                  <circle cx="10" cy="9.5" r="0.8" />
                  <circle cx="15" cy="9.5" r="0.8" />

                  <circle cx="2.5" cy="12" r="0.8" />
                  <circle cx="7.5" cy="12" r="0.8" />
                  <circle cx="12.5" cy="12" r="0.8" />
                  <circle cx="17.5" cy="12" r="0.8" />
                </g>
              </svg>
              <a
                href="#"
                className={
                  language === "es"
                    ? "lang-header-active"
                    : "lang-header-inactive"
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleLanguageChange("es");
                }}
              >
                ESP
              </a>
              <span className="lang-sep">|</span>
              <a
                href="#"
                className={
                  language === "en"
                    ? "lang-header-active"
                    : "lang-header-inactive"
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleLanguageChange("en");
                }}
              >
                ENG
              </a>
            </div>
          </div>

          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            <span
              className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
            ></span>
          </button>

          <div className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}>
            <ul>
              <li>
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link to="/servicios" onClick={() => setMobileMenuOpen(false)}>
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre-nosotros"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contactanos"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <a href="#" onClick={() => setMobileMenuOpen(false)}>
                  {t("nav.trackShipment")}
                </a>
              </li>
              <li>
                <a href="#" onClick={openJobModal}>
                  {t("nav.jobs")}
                </a>
              </li>
              <li className="mobile-lang">
                <div className="mobile-lang-content">
                  <img
                    className="flag-ven"
                    src={bandera}
                    alt="Venezuela"
                    style={{ display: language === "es" ? "block" : "none" }}
                  />
                  <svg
                    className="flag-ven"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 30"
                    style={{ display: language === "en" ? "block" : "none" }}
                  >
                    <rect width="50" height="30" fill="#B22234" />
                    <rect y="2.31" width="50" height="2.31" fill="#fff" />
                    <rect y="6.92" width="50" height="2.31" fill="#fff" />
                    <rect y="11.54" width="50" height="2.31" fill="#fff" />
                    <rect y="16.15" width="50" height="2.31" fill="#fff" />
                    <rect y="20.77" width="50" height="2.31" fill="#fff" />
                    <rect y="25.38" width="50" height="2.31" fill="#fff" />

                    <rect width="20" height="13.85" fill="#3C3B6E" />

                    <g fill="#fff">
                      <circle cx="2.5" cy="2" r="0.8" />
                      <circle cx="7.5" cy="2" r="0.8" />
                      <circle cx="12.5" cy="2" r="0.8" />
                      <circle cx="17.5" cy="2" r="0.8" />

                      <circle cx="5" cy="4.5" r="0.8" />
                      <circle cx="10" cy="4.5" r="0.8" />
                      <circle cx="15" cy="4.5" r="0.8" />

                      <circle cx="2.5" cy="7" r="0.8" />
                      <circle cx="7.5" cy="7" r="0.8" />
                      <circle cx="12.5" cy="7" r="0.8" />
                      <circle cx="17.5" cy="7" r="0.8" />

                      <circle cx="5" cy="9.5" r="0.8" />
                      <circle cx="10" cy="9.5" r="0.8" />
                      <circle cx="15" cy="9.5" r="0.8" />

                      <circle cx="2.5" cy="12" r="0.8" />
                      <circle cx="7.5" cy="12" r="0.8" />
                      <circle cx="12.5" cy="12" r="0.8" />
                      <circle cx="17.5" cy="12" r="0.8" />
                    </g>
                  </svg>
                  <a
                    href="#"
                    className={language === "es" ? "lang-active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLanguageChange("es");
                      setMobileMenuOpen(false);
                    }}
                  >
                    ESP
                  </a>
                  <span className="sep">|</span>
                  <a
                    href="#"
                    className={language === "en" ? "lang-active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLanguageChange("en");
                      setMobileMenuOpen(false);
                    }}
                  >
                    ENG
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </motion.header>
      <JobModal isOpen={jobModalOpen} onClose={() => setJobModalOpen(false)} />
    </>
  );
};

export default Navigation;
