import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/footer.css";
import TaurelLogo from "../assets/logo.png";
import LinkedinIcon from "../assets/linkedin.png";
import FacebookIcon from "../assets/facebook.png";
import InstagramIcon from "../assets/instagram.png";
import whatsapp from "../assets/whatsapp.svg";
import location from "../assets/location.png";
import relojIcon from "../assets/alarm.png";
import bandera from "../assets/bandera.png";
import arrowpUT from "../assets/arrorflow.png";
import instaPost1 from "../assets/redes/1.jpg";
import instaPost2 from "../assets/redes/2.jpg";
import instaPost3 from "../assets/redes/3.jpg";
import "../styles/partners-slider.css";
import { useLanguage } from "../contexts/LanguageContext";

const Footer = () => {
  const { language, setLanguage, t } = useLanguage();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);


  const fallbackPosts = [
    {
      id: "1",
      image: instaPost1,
      url: "https://www.instagram.com/taurel_oficial/",
      alt: "Publicación de Instagram 1"
    },
    {
      id: "2",
      image: instaPost2,
      url: "https://www.instagram.com/taurel_oficial/",
      alt: "Publicación de Instagram 2"
    },
    {
      id: "3",
      image: instaPost3,
      url: "https://www.instagram.com/taurel_oficial/",
      alt: "Publicación de Instagram 3"
    }
  ];

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "nombre":
        if (!value.trim()) {
          error = t("footer.name") + " " + t("footer.errorRequired");
        }
        break;
      case "email":
        if (!value.trim()) {
          error = t("footer.email") + " " + t("footer.errorRequired");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = t("footer.errorInvalidEmail");
        }
        break;
    }

    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      nombre: validateField("nombre", formData.nombre),
      email: validateField("email", formData.email),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFormData({
        nombre: "",
        email: "",
      });

      alert(t("footer.successMessage"));
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      alert(t("footer.errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.nombre.trim() &&
    formData.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-inner">
          <div className="footer-left">
            <Link to="/" className="footer-logo-line" aria-label="Ir al inicio">
              <img src={TaurelLogo} alt="Taurel" />
            </Link>
            <p className="footer-tagline">{t("footer.tagline")}</p>

            <ul className="contact-list">
              <li>
                <span className="icon-wrap">
                  <img src={whatsapp} alt="WhatsApp" />
                </span>
                <a
                  style={{ color: "white" }}
                  href="https://wa.me/584241665906"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-link"
                  aria-label={t("footer.contactWhatsApp")}
                >
                  +58 424-1665906
                </a>
              </li>
              <li>
                <span className="icon-wrap">
                  <img src={whatsapp} alt="WhatsApp" />
                </span>
                <a
                  style={{ color: "white" }}
                  href="https://wa.me/584242584353"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-link"
                  aria-label={t("footer.contactWhatsApp")}
                >
                  +58 424-2584353
                </a>
              </li>
              <li>
                <span className="icon-wrap icon-custom-location">
                  <img
                    style={{ width: "28px", height: "28px" }}
                    src={location}
                    alt="Ubicación"
                  />
                </span>
                <a
                  href="https://maps.app.goo.gl/c9y35v4JSKUY3s5N8"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white" }}
                  aria-label={t("footer.viewLocation")}
                >
                  Boleíta Norte, Caracas Dtto Capital
                </a>
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <span className="icon-wrap icon-custom-location">
                  <img
                    style={{ width: "26px", height: "26px" }}
                    src={relojIcon}
                    alt="Ubicación"
                  />
                </span>
                <p rel="noopener noreferrer" style={{ color: "white" }}>
                  Lunes a Viernes 8:00am a 5:00pm
                </p>
              </li>
            </ul>

            <div className="footer-social">
              <a
                href="https://www.linkedin.com/company/taurel-operador-logistico/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={LinkedinIcon}
                  alt="LinkedIn"
                  className="social-icon"
                />
              </a>
              <a
                href="https://www.facebook.com/share/1DVDQCVnjk/?mibextid=wwXIfr"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={FacebookIcon}
                  alt="Facebook"
                  className="social-icon"
                />
              </a>
              <a
                href="https://www.instagram.com/taurel.ve?igsh=dXhlYW5zZGJ5MzZ6"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={InstagramIcon}
                  alt="Instagram"
                  className="social-icon"
                />
              </a>
            </div>
          </div>

          <div className="footer-right">
            <div className="recent-posts">
              <h3>{t("footer.recentPosts")}</h3>
              <div className="posts-row">
                {fallbackPosts.map((post, index) => (
                  <motion.a
                    key={post.id}
                    className="post-card"
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={post.alt}
                    style={{
                      backgroundImage: `url(${post.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  />
                ))}
              </div>
            </div>

            <div className="quick-contact">
              <h3>{t("footer.quickContact")}</h3>
              <form className="quick-form" onSubmit={handleSubmit}>
                <div className="footer-form-group-row">
                  <div className="footer-form-group">
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className={errors.nombre ? "input-error" : ""}
                      placeholder={t("footer.name")}
                      aria-label={t("footer.name")}
                    />
                    {errors.nombre && (
                      <span className="footer-error-message">
                        {errors.nombre}
                      </span>
                    )}
                  </div>
                  <div className="footer-form-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "input-error" : ""}
                      placeholder={t("footer.email")}
                      aria-label={t("footer.email")}
                    />
                    {errors.email && (
                      <span className="footer-error-message">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>
                <div className="footer-form-group">
                  <button
                    type="submit"
                    className={`btn-send ${!isFormValid ? "btn-disabled" : ""}`}
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? t("footer.sending") : t("footer.send")}
                  </button>
                </div>
              </form>
            </div>
          </div>


        </div>
        <div className="footer-lang">
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
              setLanguage("es");
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
              setLanguage("en");
            }}
          >
            ENG
          </a>
        </div>


        <motion.button
          className="back-to-top"
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <img src={arrowpUT} alt="" />
        </motion.button>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
