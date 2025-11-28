import React, { useState } from "react";
import { useLanguage } from "~/contexts/LanguageContext";
import { motion } from "framer-motion";
import "../styles/contactanos.css";
import LocationsFinder from "../components/LocationsFinder";
import hexagonaWhite from "../assets/Hexagonos-5.png";
import mapapoints from "../assets/maos2.png";
import hexaBlue from "../assets/hexagonos.png";

export function meta() {
  return [
    { title: "Contáctanos - Taurel" },
    {
      name: "description",
      content:
        "Ponte en contacto con Taurel para solicitar información sobre nuestros servicios logísticos",
    },
  ];
}

export default function Contactanos() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    solicitud: "",
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
  });

  const [errors, setErrors] = useState({
    solicitud: "",
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const locations = [
    {
      city: "Caracas, Dtto. Capital",
      phone: "+58212-5584563",
    },
    {
      city: "La Guaira, Edo. Vargas",
      phone: "+58212-5584563",
    },
    {
      city: "Catia La Mar, Vargas",
      phone: "+58212-5584563",
    },
    {
      city: "Valencia, Edo. Carabobo",
      phone: "+58212-5584563",
    },
    {
      city: "El Guamache, Nueva Esparta",
      phone: "+58212-5584563",
    },
    {
      city: "Maracaibo, Edo. Zulia",
      phone: "+58212-5584563",
    },
    {
      city: "Barquisimeto, Edo. Lara",
      phone: "+58212-5584563",
    },
    {
      city: "Pto. Cabello, Edo. Carabobo",
      phone: "+58212-5584563",
    },
    {
      city: "San Antonio del táchira, Edo. Táchira",
      phone: "+58212-5584563",
    },
    {
      city: "Santa Elena de Uairén, Bolívar",
      phone: "+58212-5584563",
    },
  ];

  const validateForm = () => {
    const newErrors = {
      solicitud: validateField("solicitud", formData.solicitud),
      nombre: validateField("nombre", formData.nombre),
      email: validateField("email", formData.email),
      telefono: validateField("telefono", formData.telefono),
      empresa: validateField("empresa", formData.empresa),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "solicitud":
        if (!value.trim()) {
          error = t('contact.errors.requestRequired');
        }
        break;
      case "nombre":
        if (!value.trim()) {
          error = t('contact.errors.nameRequired');
        }
        break;
      case "email":
        if (!value.trim()) {
          error = t('contact.errors.emailRequired');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = t('contact.errors.emailInvalid');
        }
        break;
      case "telefono":
        if (!value.trim()) {
          error = t('contact.errors.phoneRequired');
        }
        break;
      case "empresa":
        if (!value.trim()) {
          error = t('contact.errors.companyRequired');
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

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormData({
        solicitud: "",
        nombre: "",
        email: "",
        telefono: "",
        empresa: "",
      });

      alert("¡Formulario enviado exitosamente!");
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      alert("Error al enviar el formulario. Por favor, inténtelo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.solicitud.trim() &&
    formData.nombre.trim() &&
    formData.email.trim() &&
    formData.telefono.trim() &&
    formData.empresa.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  return (
    <div className="contactanos-page">
      <section className="taurel-contact-section">
        <div className="taurel-contact-container">
          <motion.div
            className="taurel-contact-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>{t('contact.title')}</h1>
          </motion.div>
        </div>
      </section>

      <section className="contact-form-section">
        <img
          className="hexagon-blue-left-form hexagon-hover-zoom"
          src={hexaBlue}
          alt="Mapa de Ubicación"
        />
        <img
          className="hexagon-blue-right-form hexagon-hover-zoom"
          src={hexaBlue}
          alt="Mapa de Ubicación"
        />
        <div className="container">
          <motion.div
            className="contact-form-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="form-header">
              <h2>{t('contact.formTitle')}</h2>
              <p>
                {t('contact.formDescription')}
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group form-group-full">
                <input
                  type="text"
                  name="solicitud"
                  value={formData.solicitud}
                  onChange={handleInputChange}
                  className={`input-white ${errors.solicitud ? "input-error" : ""}`}
                  placeholder={t('contact.requestPlaceholder')}
                  required
                />
                {errors.solicitud && (
                  <span className="error-message">{errors.solicitud}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className={errors.nombre ? "input-error" : ""}
                    placeholder={t('contact.namePlaceholder')}
                    required
                  />
                  {errors.nombre && (
                    <span className="error-message">{errors.nombre}</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "input-error" : ""}
                    placeholder={t('contact.emailPlaceholder')}
                    required
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className={errors.telefono ? "input-error" : ""}
                    placeholder={t('contact.phonePlaceholder')}
                    required
                  />
                  {errors.telefono && (
                    <span className="error-message">{errors.telefono}</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className={errors.empresa ? "input-error" : ""}
                    placeholder={t('contact.companyPlaceholder')}
                    required
                  />
                  {errors.empresa && (
                    <span className="error-message">{errors.empresa}</span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className={`btn-send ${!isFormValid ? "btn-disabled" : ""}`}
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? t('contact.sendingButton') : t('contact.sendButton')}
              </button>
            </form>
          </motion.div>
        </div>

      </section>

      <section className="map-location-section">
        <img
          className="hexagon-map-left"
          src={hexagonaWhite}
          alt="Mapa de Ubicación"
        />
        <img
          className="hexagon-map-right"
          src={hexagonaWhite}
          alt="Mapa de Ubicación"
        />
        <img
          className="hexagon-map-center"
          src={mapapoints}
          alt="Mapa de Ubicación"
        />
        <div className="container">
          <motion.div
            className="map-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="map-header">
              <h2>{t('contact.mapTitle')}</h2>
              <p>
                {t('contact.mapSubtitle')}
              </p>
            </div>

            <div className="map-container" style={{ boxShadow: "none" }}>
              <div className="map-wrapper">
                <LocationsFinder googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""} />
              </div>

              <div className="office-hours">
                <p>
                  <strong>{t('contact.officeHours')}</strong>
                  {t('contact.officeHoursDetails')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </section>
    </div>
  );
}
