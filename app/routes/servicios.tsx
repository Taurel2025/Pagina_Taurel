import { motion } from "framer-motion";
import { useLanguage } from "~/contexts/LanguageContext";
import AnimatedElement from "../components/AnimatedElement";
import "../styles/servicios.css";
import imageMap from "../assets/maps.png";
import hexagonIcon from "../assets/arrow-right.png";
import heaxogono3 from "../assets/Hexagonos 3.png";
import hexagonoBgRight from "../assets/Hexagonos 9.png";
import servicioImg from "../assets/servicio-img-1.png";
import servicioImg2 from "../assets/servicio-img-2.png";
import servicioImg3 from "../assets/servicio-img-3.png";
import servicioImg4 from "../assets/servicio-img-4.png";
import hexagono14 from "../assets/Hexagonos 14.png";
import cadenaImagen1 from "../assets/cadena-imagen1.png";
import cadenaImagen2 from "../assets/cadena-imagen2.png";

export function meta() {
  return [
    { title: "Servicios - Taurel" },
    {
      name: "description",
      content:
        "Conoce nuestros servicios logísticos y de transporte internacional",
    },
  ];
}

export default function Servicios() {
  const { t } = useLanguage();

  return (
    <div className="servicios-page">
      <div className="page-header-servicios">
        <h2>{t("services.page.title")}</h2>
      </div>
      <section className="advisory-section section">
        <motion.img
          src={heaxogono3}
          alt="Hexágonos decorativos"
          className="hexagonos-decorativos"
          whileHover={{
            scale: 1.05,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        <div className="container">
          <div className="service-content-wrapper">
            <AnimatedElement
              animation="fadeLeft"
              className="service-text-content"
            >
              <div className="service-icon-title">
                <img
                  style={{ width: "40px", height: "40px" }}
                  src={hexagonIcon}
                  alt=""
                />
                <h2>{t("services.page.advisory.title")}</h2>
              </div>
              <p className="service-description">
                {t("services.page.advisory.description")}
              </p>
              <ul className="service-list">
                <li>{t("services.page.advisory.list1")}</li>
                <li>{t("services.page.advisory.list2")}</li>
                <li>{t("services.page.advisory.list3")}</li>
              </ul>
              <p className="service-extra-info">
                {t("services.page.advisory.extraInfo")}
              </p>
            </AnimatedElement>

            <AnimatedElement
              animation="fadeRight"
              className="service-image-content"
            >
              <motion.div
                className="hexagon-image-container"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.img
                  src={servicioImg}
                  alt="Asesoría técnica - Reunión de negocios"
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <section className="international-transport-section section">
        <div className="container">
          <div className="service-content-wrapper reverse">
            <div>
              <AnimatedElement
                animation="fadeRight"
                className="service-text-content"
              >
                <div className="service-icon-title">
                  <img
                    style={{ width: "40px", height: "40px" }}
                    src={hexagonIcon}
                    alt=""
                  />
                  <h2>{t("services.page.international.title")}</h2>
                </div>
                <p className="service-highlight">
                  <em>{t("services.page.international.highlight")}</em>
                </p>
                <ul className="service-list">
                  <li>{t("services.page.international.list1")}</li>
                  <li>{t("services.page.international.list2")}</li>
                  <li>{t("services.page.international.list3")}</li>
                  <li>{t("services.page.international.list4")}</li>
                </ul>
              </AnimatedElement>
              <div className="service-content-wrapper">
                <AnimatedElement
                  animation="fadeLeft"
                  className="service-text-content"
                >
                  <div className="service-icon-title">
                    <img
                      style={{ width: "40px", height: "40px" }}
                      src={hexagonIcon}
                      alt=""
                    />
                    <h2>{t("services.page.landTransport.title")}</h2>
                  </div>
                  <p className="service-description">
                    {t("services.page.landTransport.description")}
                  </p>
                </AnimatedElement>
              </div>
            </div>
            <AnimatedElement
              animation="fadeLeft"
              className="service-image-content"
            >
              <motion.div
                className="hexagon-image-container"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.img
                  src={servicioImg2}
                  alt="Transporte de carga internacional"
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <section className="storage-maritime-section section">
        <div className="bg-asolute-heaxogono14">
          <motion.img src={hexagono14} alt="Mapa mundial" />
        </div>

        <div className="container">
          <div className="storage-maritime-content">
            <div className="map-background">
              <motion.img src={imageMap} alt="Mapa mundial" />
            </div>

            <div className="service-content-wrapper">
              <AnimatedElement
                animation="fadeUp"
                delay={0.1}
                className="storage-section"
              >
                <div className="service-icon-title">
                  <img
                    style={{ width: "40px", height: "40px" }}
                    src={hexagonIcon}
                    alt=""
                  />
                  <h2>{t("services.page.storage.title")}</h2>
                </div>

                <p className="service-description">
                  {t("services.page.storage.description")}
                </p>

              </AnimatedElement>
              <AnimatedElement
                animation="fadeLeft"
                className="service-image-content"
              >
                <motion.div
                  className="hexagon-image-container"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.img
                    src={servicioImg3}
                    alt="Transporte de carga internacional"
                    whileHover={{
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.div>
              </AnimatedElement>
            </div>

            <AnimatedElement
              animation="fadeUp"
              delay={0.2}
              className="maritime-section"
            >
              <div className="service-icon-title">
                <img
                  style={{ width: "40px", height: "40px" }}
                  src={hexagonIcon}
                  alt=""
                />
                <h2>{t("services.page.internationals.title")}</h2>
              </div>

              <p className="service-description">
                {t("services.page.internationals.description")}
              </p>

              <ul className="service-list">
                <li>{t("services.page.internationals.list1")}</li>
                <li>{t("services.page.internationals.list2")}</li>
                <li>{t("services.page.internationals.list3")}</li>
                <li>{t("services.page.internationals.list4")}</li>
              </ul>
            </AnimatedElement>
            <AnimatedElement
              animation="fadeUp"
              delay={0.2}
              className="maritime-section"
            >
              <div className="service-icon-title">
                <img
                  style={{ width: "40px", height: "40px" }}
                  src={hexagonIcon}
                  alt=""
                />
                <h2>{t("services.page.maritime.title")}</h2>
              </div>

              <p className="service-description">
                {t("services.page.maritime.description")}
              </p>

              <div className="maritime-services-grid">
                <div className="maritime-service-column">
                  <h4>{t("services.page.maritime.containers.title")}</h4>
                  <ul className="service-sublist">
                    <li>{t("services.page.maritime.containers.list1")}</li>
                    <li>{t("services.page.maritime.containers.list2")}</li>
                    <li>{t("services.page.maritime.containers.list3")}</li>
                    <li>{t("services.page.maritime.containers.list4")}</li>
                  </ul>
                </div>

                <div className="maritime-service-column">
                  <h4>{t("services.page.maritime.actingAs.title")}</h4>
                  <ul className="service-sublist">
                    <li>{t("services.page.maritime.actingAs.list1")}</li>
                    <li>{t("services.page.maritime.actingAs.list2")}</li>
                    <li>{t("services.page.maritime.actingAs.list3")}</li>
                    <li>{t("services.page.maritime.actingAs.list4")}</li>
                  </ul>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <section className="customs-agency-section section">
        <motion.img
          src={hexagonoBgRight}
          alt=""
          className="hexagono-bg right"
          whileHover={{
            scale: 1.1,
            rotate: -5,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        <div>
          <div className="service-content-wrapper service-content-wrapper-edit">
            <AnimatedElement
              animation="fadeRight"
              className="service-image-content"
            >
              <motion.div
                className="hexagon-image-container"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.img
                  src={servicioImg4}
                  alt="Agenciamiento Aduana - Puerto y contenedores"
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.div>
            </AnimatedElement>
            <AnimatedElement
              animation="fadeLeft"
              className="service-text-content"
            >
              <div className="service-icon-title">
                <img
                  style={{ width: "40px", height: "40px" }}
                  src={hexagonIcon}
                  alt=""
                />
                <h2>{t("services.page.customs.title")}</h2>
              </div>
              <p className="service-description">
                {t("services.page.customs.description")}
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <section className="logistics-chain-flow section">
        <div>
          <AnimatedElement animation="fadeUp">
            <div className="logistics-chain-header">
              <h2>{t("services.page.logisticsChain.title")}</h2>
            </div>
          </AnimatedElement>
          <AnimatedElement animation="fadeUp" delay={0.2}>
            <div className="logistics-flow-container">
              <div className="logistics-flow-background"></div>
              <div className="logistics-flow-mobile">
                <img src={cadenaImagen1} alt="Cadena logística parte 1" />
                <img
                  style={{ marginTop: "-40px" }}
                  src={cadenaImagen2}
                  alt="Cadena logística parte 2"
                />
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}
