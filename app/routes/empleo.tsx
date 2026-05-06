import React, { useState } from "react";
import { useLanguage } from "~/contexts/LanguageContext";
import { motion } from "framer-motion";
import "../styles/empleo.css";

interface Job {
  id: number;
  title: string;
  description: string;
  requirements: string[];
}

const jobsData: Job[] = [
  {
    id: 1,
    title: "Asistente de Logística",
    description:
      "Apoyo en la coordinación de embarques, seguimiento de documentación aduanera y atención a clientes. Requiere estudiante o graduado en Comercio Exterior o carreras afines.",
    requirements: [
      "Estudiante o graduado en Comercio Exterior, Administración o carreras afines.",
      "Manejo de herramientas ofimáticas (Excel avanzado).",
      "Disponibilidad para trabajar en horario de oficina.",
      "Residir en Caracas o zonas aledañas."
    ]
  },
  {
    id: 2,
    title: "Analista de Aduanas",
    description:
      "Responsable de la clasificación arancelaria, elaboración de declaraciones y gestión de trámites ante la aduana. Experiencia mínima 2 años en agencia aduanal.",
    requirements: [
      "TSU o Licenciatura en Comercio Exterior o Aduanas.",
      "Experiencia mínima de 3 años en agencia aduanal.",
      "Conocimiento del sistema SIDUNEA.",
      "Capacidad para trabajar bajo presión y con fechas límite."
    ]
  },
  {
    id: 3,
    title: "Coordinador de Transporte",
    description:
      "Planificar y supervisar rutas de transporte terrestre nacional, coordinar con proveedores y asegurar entregas a tiempo. Licencia de conducir vigente.",
    requirements: [
      "Experiencia mínima de 2 años en coordinación de transporte.",
      "Licencia de conducir de 5to grado vigente.",
      "Conocimiento de rutas nacionales.",
      "Manejo de GPS y sistemas de rastreo satelital."
    ]
  }
];

export function meta() {
  return [
    { title: "Empleo – Taurel" },
    { name: "description", content: "Únete al equipo de Taurel. Conoce nuestras vacantes y envía tu currículum." }
  ];
}

export default function Empleo() {
  const { t } = useLanguage();

  // -- Estados del formulario --
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    cargo: "",
    ubicacion: "",
    linkedin: "",
    cv: null as File | null
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // -- Modal de requisitos --
  const [requirementsModal, setRequirementsModal] = useState<Job | null>(null);

  const jobs = jobsData;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.nombre.trim()) newErrors.nombre = "Requerido";
    if (!formData.telefono.trim()) newErrors.telefono = "Requerido";
    if (!formData.email.trim()) {
      newErrors.email = "Requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Correo inválido";
    }
    if (!formData.cargo) newErrors.cargo = "Selecciona un cargo";
    if (!formData.ubicacion.trim()) newErrors.ubicacion = "Requerido";
    // linkedin es opcional
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo al escribir
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, cv: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("nombre", formData.nombre);
      data.append("telefono", formData.telefono);
      data.append("email", formData.email);
      data.append("cargo", formData.cargo);
      data.append("ubicacion", formData.ubicacion);
      data.append("linkedin", formData.linkedin);
      if (formData.cv) {
        data.append("cv", formData.cv);
      }

      // Aquí iría la conexión a tu backend (Formspree, API, etc.)
      // Simulación de envío exitoso
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({
        nombre: "",
        telefono: "",
        email: "",
        cargo: "",
        ubicacion: "",
        linkedin: "",
        cv: null
      });
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      alert(t("empleo.form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const openRequirements = (job: Job) => setRequirementsModal(job);
  const closeRequirements = () => setRequirementsModal(null);

  return (
    <div className="empleo-page">
      {/* Header */}
      <section className="empleo-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>{t("empleo.title")}</h1>
            <p className="empleo-subtitle">{t("empleo.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Lista de vacantes */}
      <section className="empleo-list section">
        <div className="container">
          {jobs.length === 0 ? (
            <p className="no-jobs">{t("empleo.noJobs")}</p>
          ) : (
            <div className="jobs-grid">
              {jobs.map((job) => (
                <motion.div
                  key={job.id}
                  className="job-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3>{job.title}</h3>
                  <p>{job.description}</p>
                  <button
                    className="btn-requirements"
                    onClick={() => openRequirements(job)}
                  >
                    {t("empleo.requirements")}
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Formulario de postulación */}
      <section className="empleo-form section" id="formulario-postulacion">
        <div className="container">
          <motion.div
            className="form-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>{t("empleo.form.title")}</h2>
            {submitted ? (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <p>{t("empleo.form.success")}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="nombre"
                      placeholder={t("empleo.form.name")}
                      value={formData.nombre}
                      onChange={handleChange}
                      className={errors.nombre ? "input-error" : ""}
                    />
                    {errors.nombre && (
                      <span className="error-message">{errors.nombre}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      name="telefono"
                      placeholder={t("empleo.form.phone")}
                      value={formData.telefono}
                      onChange={handleChange}
                      className={errors.telefono ? "input-error" : ""}
                    />
                    {errors.telefono && (
                      <span className="error-message">{errors.telefono}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder={t("empleo.form.email")}
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "input-error" : ""}
                    />
                    {errors.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="ubicacion"
                      placeholder={t("empleo.form.location")}
                      value={formData.ubicacion}
                      onChange={handleChange}
                      className={errors.ubicacion ? "input-error" : ""}
                    />
                    {errors.ubicacion && (
                      <span className="error-message">{errors.ubicacion}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <select
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleChange}
                      className={errors.cargo ? "input-error" : ""}
                    >
                      <option value="">{t("empleo.form.position")}</option>
                      {jobs.map((job) => (
                        <option key={job.id} value={job.title}>
                          {job.title}
                        </option>
                      ))}
                    </select>
                    {errors.cargo && (
                      <span className="error-message">{errors.cargo}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="url"
                      name="linkedin"
                      placeholder={t("empleo.form.linkedin")}
                      value={formData.linkedin}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group file-upload">
                  <label
                    htmlFor="cv-upload"
                    className={formData.cv ? "file-selected" : ""}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    {formData.cv ? formData.cv.name : t("empleo.form.cv")}
                  </label>
                  <input
                    type="file"
                    id="cv-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t("empleo.form.sending")
                    : t("empleo.form.send")}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Modal de Requisitos */}
      {requirementsModal && (
        <div
          className="requirements-overlay"
          onClick={closeRequirements}
        >
          <motion.div
            className="requirements-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="requirements-close"
              onClick={closeRequirements}
            >
              ✕
            </button>
            <h3>
              {t("empleo.requirementsTitle")} – {requirementsModal.title}
            </h3>
            <ul>
              {requirementsModal.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}
    </div>
  );
}