import React, { useState, useEffect } from "react";
import { useLanguage } from "~/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/empleo.css";

// ---------- Tipos ----------
interface Job {
  id: number;
  title: string;
  description: string;
  requirements: string[];
}

interface Application {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  cargo: string;
  ubicacion: string;
  linkedin: string;
  cvFileName: string;
  cvBase64: string;
  fecha: string;
}

// ---------- Constantes ----------
const API_BASE_URL = "https://logistics.taurel.com/api";
const ADMIN_PASSWORD = "TaurelAdmin2025";

// Cargos iniciales de respaldo (mientras se carga la API)
const fallbackJobs: Job[] = [
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
    {
      name: "description",
      content:
        "Únete al equipo de Taurel. Conoce nuestras vacantes y envía tu currículum."
    }
  ];
}

export default function Empleo() {
  const { t } = useLanguage();

  // ---------- Estados de carga de la API ----------
  const [apiJobs, setApiJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [errorJobs, setErrorJobs] = useState(false);

  // Cargar cargos desde la API
  const fetchJobs = async () => {
    setLoadingJobs(true);
    setErrorJobs(false);
    try {
      const response = await fetch(`${API_BASE_URL}/cargo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estatus_id: 0 })
      });
      if (response.ok) {
        const data = await response.json();
        const rawJobs = data.data || data || [];
        const normalized: Job[] = Array.isArray(rawJobs)
          ? rawJobs.map((j: any, index: number) => ({
              id: j.id || index + 1,
              title: j.nombre_cargo || j.title || "Sin título",
              description: j.descripcion || j.description || "",
              requirements: Array.isArray(j.requisitos)
                ? j.requisitos
                : typeof j.requisitos === "string"
                  ? j.requisitos.split("\n").filter((r: string) => r.trim())
                  : []
            }))
          : [];
        setApiJobs(normalized);
      } else {
        setErrorJobs(true);
      }
    } catch (err) {
      console.error("Error al obtener cargos desde la API:", err);
      setErrorJobs(true);
    } finally {
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // ---------- Empleos personalizados (localStorage) ----------
  const [customJobs, setCustomJobs] = useState<Job[]>(() => {
    try {
      const saved = localStorage.getItem("taurel_custom_jobs");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error al cargar empleos personalizados", e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("taurel_custom_jobs", JSON.stringify(customJobs));
  }, [customJobs]);

  // Combinar empleos de la API + personalizados
  const allJobs: Job[] =
    apiJobs.length > 0
      ? [...apiJobs, ...customJobs]
      : errorJobs
        ? [...fallbackJobs, ...customJobs]
        : loadingJobs
          ? []
          : [...fallbackJobs, ...customJobs];

  // ---------- Postulaciones (localStorage + API) ----------
  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      const saved = localStorage.getItem("taurel_applications");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error al cargar solicitudes", e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("taurel_applications", JSON.stringify(applications));
  }, [applications]);

  // ---------- Formulario de postulación ----------
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    cargo: "",
    ubicacion: "",
    linkedin: "",
    cvFile: null as File | null,
    cvBase64: ""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ---------- Modal de requisitos ----------
  const [requirementsModal, setRequirementsModal] = useState<Job | null>(null);

  // ---------- Panel de administración ----------
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState(false);
  const [showApplications, setShowApplications] = useState(false);

  // ---------- Agregar cargo (admin) ----------
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    requirements: [] as string[]
  });
  const [currentRequirement, setCurrentRequirement] = useState("");

  // ---------- Carrusel ----------
  const [activeSlide, setActiveSlide] = useState(0);
  const jobsPerSlide = 3;
  const totalSlides = Math.max(1, Math.ceil(allJobs.length / jobsPerSlide));

  const nextSlide = () =>
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 7000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  // ---------- Validación del formulario ----------
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
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // NUEVO: Convertir el archivo PDF a base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setFormData((prev) => ({ ...prev, cvFile: null, cvBase64: "" }));
      return;
    }

    // Guardamos el archivo para mostrar su nombre
    setFormData((prev) => ({ ...prev, cvFile: file }));

    // Convertir a base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData((prev) => ({ ...prev, cvBase64: base64String }));
    };
  };

  // ---------- Envío del formulario a la API ----------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedJob = allJobs.find((j) => j.title === formData.cargo);
      const cargo_id = selectedJob ? selectedJob.id : 0;

      const payload = {
        nombreApellido: formData.nombre,
        correoElectronico: formData.email,
        telefono: formData.telefono,
        ubicacion: formData.ubicacion,
        linkedin: formData.linkedin,
        resumenCurricular: formData.cvBase64 || "", // Enviar base64 (o cadena vacía)
        cargo_id: cargo_id
      };

      const response = await fetch(`${API_BASE_URL}/update_postulacion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Error al enviar la postulación a la API");
      }

      // Guardar en localStorage para el panel admin
      const newApp: Application = {
        id: Date.now(),
        nombre: formData.nombre,
        telefono: formData.telefono,
        email: formData.email,
        cargo: formData.cargo,
        ubicacion: formData.ubicacion,
        linkedin: formData.linkedin,
        cvFileName: formData.cvFile ? formData.cvFile.name : "No adjunto",
        cvBase64: formData.cvBase64,
        fecha: new Date().toLocaleString("es-VE")
      };
      setApplications((prev) => [newApp, ...prev]);

      setSubmitted(true);
      setFormData({
        nombre: "",
        telefono: "",
        email: "",
        cargo: "",
        ubicacion: "",
        linkedin: "",
        cvFile: null,
        cvBase64: ""
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

  // ---------- Administración ----------
  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setAdminAuthenticated(true);
      setAdminError(false);
      setShowAdminLogin(false);
      setAdminPassword("");
    } else {
      setAdminError(true);
    }
  };

  const handleAddRequirement = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentRequirement.trim()) {
      e.preventDefault();
      setNewJob((prev) => ({
        ...prev,
        requirements: [...prev.requirements, currentRequirement.trim()]
      }));
      setCurrentRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    setNewJob((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleAddJob = () => {
    if (!newJob.title.trim() || !newJob.description.trim()) {
      alert("Título y descripción son obligatorios.");
      return;
    }
    const maxId = allJobs.reduce((max, j) => Math.max(max, j.id), 0);
    const jobToAdd: Job = {
      id: maxId + 1,
      title: newJob.title,
      description: newJob.description,
      requirements: newJob.requirements
    };
    setCustomJobs((prev) => [...prev, jobToAdd]);
    setNewJob({ title: "", description: "", requirements: [] });
  };

  const handleDeleteJob = (id: number) => {
    setCustomJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setShowApplications(false);
  };

  return (
    <div className="empleo-page">
      {/* ======= Header ======= */}
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

      {/* ======= Carrusel de vacantes ======= */}
      <section className="empleo-carousel section">
        <div className="container">
          {loadingJobs ? (
            <p className="no-jobs">{t("empleo.loading")}</p>
          ) : allJobs.length === 0 ? (
            <p className="no-jobs">
              {errorJobs ? t("empleo.errorLoading") : t("empleo.noJobs")}
            </p>
          ) : (
            <div className="carousel-container">
              <div className="carousel-track-wrapper">
                <motion.div
                  className="carousel-track"
                  animate={{ x: `-${activeSlide * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div className="carousel-slide" key={slideIndex}>
                      {allJobs
                        .slice(
                          slideIndex * jobsPerSlide,
                          slideIndex * jobsPerSlide + jobsPerSlide
                        )
                        .map((job) => (
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
                  ))}
                </motion.div>
              </div>

              {totalSlides > 1 && (
                <>
                  <button
                    className="carousel-arrow carousel-arrow-left"
                    onClick={prevSlide}
                    aria-label="Anterior"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    className="carousel-arrow carousel-arrow-right"
                    onClick={nextSlide}
                    aria-label="Siguiente"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                  <div className="carousel-dots">
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                      <button
                        key={idx}
                        className={`carousel-dot ${idx === activeSlide ? "active" : ""}`}
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`Ir a slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ======= Formulario de postulación ======= */}
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
                    {errors.nombre && <span className="error-message">{errors.nombre}</span>}
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
                    {errors.telefono && <span className="error-message">{errors.telefono}</span>}
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
                    {errors.email && <span className="error-message">{errors.email}</span>}
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
                    {errors.ubicacion && <span className="error-message">{errors.ubicacion}</span>}
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
                      {allJobs.map((job) => (
                        <option key={job.id} value={job.title}>
                          {job.title}
                        </option>
                      ))}
                    </select>
                    {errors.cargo && <span className="error-message">{errors.cargo}</span>}
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

                {/* Campo de CV con conversión a base64 */}
                <div className="form-group file-upload">
                  <label htmlFor="cv-upload" className={formData.cvFile ? "file-selected" : ""}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    {formData.cvFile ? formData.cvFile.name : t("empleo.form.cv")}
                  </label>
                  <input
                    type="file"
                    id="cv-upload"
                    accept=".pdf"
                    onChange={handleFileChange}
                    onClick={(e) => {
                      // Permite volver a seleccionar el mismo archivo
                      (e.target as HTMLInputElement).value = "";
                    }}
                  />
                </div>

                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? t("empleo.form.sending") : t("empleo.form.send")}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ======= Modal de Requisitos ======= */}
      <AnimatePresence>
        {requirementsModal && (
          <div className="requirements-overlay" onClick={closeRequirements}>
            <motion.div
              className="requirements-modal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="requirements-close" onClick={closeRequirements}>
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
      </AnimatePresence>

      {/* ======= Panel de Administración ======= */}
      <section className="empleo-admin section">
        <div className="container">
          {!adminAuthenticated ? (
            <>
              <button
                className="admin-access-btn"
                onClick={() => setShowAdminLogin(true)}
              >
                🔐 {t("empleo.admin.accessButton")}
              </button>
              <AnimatePresence>
                {showAdminLogin && (
                  <motion.div
                    className="admin-login-card"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <h3>{t("empleo.admin.loginTitle")}</h3>
                    <input
                      type="password"
                      placeholder={t("empleo.admin.password")}
                      value={adminPassword}
                      onChange={(e) => {
                        setAdminPassword(e.target.value);
                        setAdminError(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAdminLogin();
                      }}
                    />
                    <button onClick={handleAdminLogin}>
                      {t("empleo.admin.enter")}
                    </button>
                    {adminError && (
                      <p className="admin-error">{t("empleo.admin.wrongPassword")}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <motion.div
              className="admin-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="admin-header">
                <h3>{t("empleo.admin.addJobTitle")}</h3>
                <button onClick={handleLogout} className="admin-logout-btn">
                  ✕ Cerrar sesión
                </button>
              </div>
              <div className="admin-form">
                <input
                  type="text"
                  placeholder={t("empleo.admin.jobTitlePlaceholder")}
                  value={newJob.title}
                  onChange={(e) => setNewJob((prev) => ({ ...prev, title: e.target.value }))}
                />
                <input
                  type="text"
                  placeholder={t("empleo.admin.jobDescriptionPlaceholder")}
                  value={newJob.description}
                  onChange={(e) => setNewJob((prev) => ({ ...prev, description: e.target.value }))}
                />
                <div className="admin-requirements-input">
                  <input
                    type="text"
                    placeholder={t("empleo.admin.jobRequirementsPlaceholder")}
                    value={currentRequirement}
                    onChange={(e) => setCurrentRequirement(e.target.value)}
                    onKeyDown={handleAddRequirement}
                  />
                  <div className="admin-requirements-tags">
                    {newJob.requirements.map((req, idx) => (
                      <span key={idx} className="req-tag">
                        {req}
                        <button type="button" onClick={() => removeRequirement(idx)}>
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <button onClick={handleAddJob} className="btn-add-job">
                  {t("empleo.admin.addButton")}
                </button>
              </div>

              {customJobs.length > 0 && (
                <div className="custom-jobs-list">
                  <h4>{t("empleo.admin.customJobsTitle")}</h4>
                  {customJobs.map((job) => (
                    <div key={job.id} className="custom-job-item">
                      <div>
                        <strong>{job.title}</strong> – {job.description}
                        <ul>
                          {job.requirements.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                      <button className="btn-delete-job" onClick={() => handleDeleteJob(job.id)}>
                        {t("empleo.admin.deleteButton")}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ marginTop: "30px", textAlign: "center" }}>
                <button
                  className="btn-view-applications"
                  onClick={() => setShowApplications(!showApplications)}
                >
                  {showApplications
                    ? t("empleo.admin.hideApplications")
                    : t("empleo.admin.viewApplications")}
                </button>
              </div>

              <AnimatePresence>
                {showApplications && (
                  <motion.div
                    className="applications-section"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <h4>{t("empleo.admin.applicationsTitle")}</h4>
                    {applications.length === 0 ? (
                      <p className="no-applications">{t("empleo.admin.noApplications")}</p>
                    ) : (
                      <div className="applications-table-wrapper">
                        <table className="applications-table">
                          <thead>
                            <tr>
                              <th>{t("empleo.form.name")}</th>
                              <th>{t("empleo.form.email")}</th>
                              <th>{t("empleo.admin.phone")}</th>
                              <th>{t("empleo.form.position")}</th>
                              <th>{t("empleo.admin.locationLabel")}</th>
                              <th>{t("empleo.admin.date")}</th>
                              <th>{t("empleo.admin.cvFile")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {applications.map((app) => (
                              <tr key={app.id}>
                                <td>{app.nombre}</td>
                                <td>{app.email}</td>
                                <td>{app.telefono}</td>
                                <td>{app.cargo}</td>
                                <td>{app.ubicacion}</td>
                                <td>{app.fecha}</td>
                                <td className="cv-cell">{app.cvFileName}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}