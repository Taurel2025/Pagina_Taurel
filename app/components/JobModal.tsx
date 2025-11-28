import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "~/contexts/LanguageContext";
import "../styles/certification-modal.css";
import haxgonal from "../assets/Hexagonosmodal.png";

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JobModal: React.FC<JobModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    nombre: "",
    pais: "",
    ciudad: "",
    correo: "",
    mensaje: "",
    cv: null as File | null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.nombre.trim())
      newErrors.nombre = t('modals.job.errors.nameRequired');
    if (!form.pais.trim()) newErrors.pais = t('modals.job.errors.countryRequired');
    if (!form.ciudad.trim()) newErrors.ciudad = t('modals.job.errors.cityRequired');
    if (!form.correo.trim()) {
      newErrors.correo = t('modals.job.errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      newErrors.correo = t('modals.job.errors.emailInvalid');
    }
    if (!form.mensaje.trim()) newErrors.mensaje = t('modals.job.errors.messageRequired');
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, cv: e.target.files?.[0] || null }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content size-job"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "35%",
              }}
              src={haxgonal}
              alt="Hexagonos"
            />
            <button className="modal-close" onClick={onClose}>
              <svg
                width="16"
                height="17"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-3.90187e-05 18.375L7.76996 8.295L7.73496 9.52L0.349961 -1.2517e-06H3.14996L9.20496 7.875L8.15496 7.84L14.21 -1.2517e-06H16.94L9.48496 9.625L9.51996 8.295L17.36 18.375H14.525L8.11996 9.975L9.09996 10.115L2.79996 18.375H-3.90187e-05Z"
                  fill="#243C6B"
                />
              </svg>
            </button>

            <div className="modal-header">
              <h2
                className="modal-cert-title"
                style={{
                  margin: "0 auto",
                  color: "#243C6B",
                  fontWeight: 700,
                  borderBottom: "none",
                  paddingBottom: "8px",
                }}
              >
                {t('modals.job.title')}
              </h2>
            </div>
            <div style={{ padding: "40px" }}>
              <p
                style={{
                  textAlign: "center",
                  marginBottom: "24px",
                  color: "#243C6B",
                  fontWeight: 500,
                }}
              >
                {t('modals.job.description')}
              </p>
              <form
                className="job-form"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
                onSubmit={handleSubmit}
                noValidate
              >
                <div>
                  <input
                    type="text"
                    name="nombre"
                    placeholder={t('modals.job.namePlaceholder')}
                    className="job-input"
                    style={{
                      padding: "14px",
                      borderRadius: "8px",
                      border: "1px solid #e0e0e0",
                      fontSize: "1rem",
                      width: "100%",
                      backgroundColor: "#E0E0E070",
                    }}
                    value={form.nombre}
                    onChange={handleChange}
                  />
                  {errors.nombre && (
                    <span style={{ color: "#e53935", fontSize: "0.9rem" }}>
                      {errors.nombre}
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", gap: "18px" }}>
                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      name="pais"
                      placeholder={t('modals.job.countryPlaceholder')}
                      className="job-input"
                      style={{
                        padding: "14px",
                        borderRadius: "8px",
                        border: "1px solid #e0e0e0",
                        fontSize: "1rem",
                        width: "100%",
                        backgroundColor: "#E0E0E070",
                      }}
                      value={form.pais}
                      onChange={handleChange}
                    />
                    {errors.pais && (
                      <span style={{ color: "#e53935", fontSize: "0.9rem" }}>
                        {errors.pais}
                      </span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      name="ciudad"
                      placeholder={t('modals.job.cityPlaceholder')}
                      className="job-input"
                      style={{
                        padding: "14px",
                        borderRadius: "8px",
                        border: "1px solid #e0e0e0",
                        fontSize: "1rem",
                        width: "100%",
                        backgroundColor: "#E0E0E070",
                      }}
                      value={form.ciudad}
                      onChange={handleChange}
                    />
                    {errors.ciudad && (
                      <span style={{ color: "#e53935", fontSize: "0.9rem" }}>
                        {errors.ciudad}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "18px" }}>
                  <div style={{ flex: 1 }}>
                    <input
                      type="email"
                      name="correo"
                      placeholder={t('modals.job.emailPlaceholder')}
                      className="job-input"
                      style={{
                        padding: "14px",
                        borderRadius: "8px",
                        border: "1px solid #e0e0e0",
                        fontSize: "1rem",
                        width: "100%",
                        backgroundColor: "#E0E0E070",
                      }}
                      value={form.correo}
                      onChange={handleChange}
                    />
                    {errors.correo && (
                      <span style={{ color: "#e53935", fontSize: "0.9rem" }}>
                        {errors.correo}
                      </span>
                    )}
                  </div>
                  <label
                    htmlFor="cv-upload"
                    className="job-input"
                    style={{
                      flex: 1,
                      height: "48px",
                      borderRadius: "8px",
                      border: "1px solid #e0e0e0",
                      fontSize: "1rem",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      color: "#243C6B",
                      gap: "8px",
                      backgroundColor: "#E0E0E070",
                      textDecoration: "underline",
                    }}
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <rect
                        width="40"
                        height="40"
                        fill="url(#pattern0_2231_267)"
                      />
                      <defs>
                        <pattern
                          id="pattern0_2231_267"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            xlinkHref="#image0_2231_267"
                            transform="scale(0.00166667)"
                          />
                        </pattern>
                        <image
                          id="image0_2231_267"
                          width="600"
                          height="600"
                          preserveAspectRatio="none"
                          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAJYCAYAAAC+ZpjcAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEsGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI1LTA5LTI5PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPmU3Yzg0N2UyLWUxNzYtNGM1YS04NTVjLWQxMjM0NmQxNWY2OTwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5IaXN0b3JpYSAtIDc8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjph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"
                        />
                      </defs>
                    </svg>
                    {t('modals.job.attachCV')}
                    <input
                      type="file"
                      id="cv-upload"
                      ref={fileInputRef}
                      style={{ display: "none", backgroundColor: "#E0E0E070" }}
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <div>
                  <textarea
                    name="mensaje"
                    placeholder={t('modals.job.messagePlaceholder')}
                    className="job-input"
                    style={{
                      padding: "14px",
                      borderRadius: "8px",
                      border: "1px solid #e0e0e0",
                      fontSize: "1rem",
                      minHeight: "80px",
                      resize: "vertical",
                      width: "100%",
                      backgroundColor: "#E0E0E070",
                    }}
                    value={form.mensaje}
                    onChange={handleChange}
                  />
                  {errors.mensaje && (
                    <span style={{ color: "#e53935", fontSize: "0.9rem" }}>
                      {errors.mensaje}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "18px",
                  }}
                >
                  <button
                    type="submit"
                    style={{
                      background: "#243C6B",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "12px 40px",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      boxShadow: "0 2px 8px rgba(36,60,107,0.08)",
                      cursor: "pointer",
                    }}
                  >
                    {t('modals.job.sendButton')}
                  </button>
                </div>
                {submitted && (
                  <div
                    style={{
                      textAlign: "center",
                      color: "#1A90CE",
                      marginTop: "10px",
                    }}
                  >
                    {t('modals.job.successMessage')}
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobModal;
