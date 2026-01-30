import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './../styles/navigation.css';

const Navigation: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [allShipments, setAllShipments] = useState<any[]>([]);
  const [token, setToken] = useState('');
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Función de autenticación y carga de shipments
  const initializeTracking = async () => {
    if (token && allShipments.length > 0) return;

    try {
      const res = await fetch('https://taurel.cargologik.app/api/v2/users/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "integration@taurel.com",
          password: "QGd0EX59of3aVP3M"
        })
      });
      const data = await res.json();
      if (res.ok && data.data?.token) {
        const accessToken = data.data.token;
        setToken(accessToken);
        
        // Cargar shipments
        const shipmentsRes = await fetch('https://taurel.cargologik.app/api/v2/shipments', {
          method: "POST",
          headers: { 
            "Authorization": `Bearer ${accessToken}`, 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            limit: 300,
            page: 1,
            filter: {}, 
            fields: [
              "shipmentId", "mbl", "hbl", "referenceName", "currentStatus",
              "etd", "eta", "carrier", "lastKnownLocation", "containersNumber",
              "events", "cargoDescription", "totalWeight",
              "totalWeightUnit", "totalVolume", "totalVolumeUnit", "freightType"
            ]
          })
        });

        if (shipmentsRes.ok) {
          const shipmentsData = await shipmentsRes.json();
          setAllShipments(shipmentsData.data || []);
        }
      }
    } catch (err) {
      console.error('Error initializing tracking:', err);
    }
  };

  const openTrackingModal = () => {
    setTrackingModalOpen(true);
    initializeTracking();
    setTimeout(() => {
      const searchInput = document.getElementById('tracking-search-input') as HTMLInputElement;
      if (searchInput) searchInput.focus();
    }, 100);
  };

  const closeTrackingModal = () => {
    setTrackingModalOpen(false);
    setSearchQuery('');
    setTrackingResult(null);
    setIsMapLoaded(false);
    if (mapInstance) {
      mapInstance.remove();
      setMapInstance(null);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Por favor escribe una referencia.");
      return;
    }
    
    if (!allShipments.length) {
      setTrackingResult({ error: "⏳ Aún cargando datos..." });
      return;
    }

    const found = allShipments.find(s =>
      (s.shipmentId || "").toUpperCase() === searchQuery.toUpperCase() ||
      (s.mbl || "").toUpperCase() === searchQuery.toUpperCase() ||
      (s.hbl || "").toUpperCase() === searchQuery.toUpperCase() ||
      (s.referenceName || "").toUpperCase() === searchQuery.toUpperCase()
    );

    if (!found) {
      setTrackingResult({ error: "❌ No se encontró ningún envío." });
      return;
    }

    setTrackingResult({ data: found });
    
    // Importante: Esperar a que el DOM se actualice antes de dibujar el mapa
    setTimeout(() => {
      drawMap(found);
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const drawMap = (shipment: any) => {
    if (!shipment) return;

    let points: any[] = [];

    // Recopilar puntos válidos
    if (shipment.origin && shipment.origin.lat && shipment.origin.lng) {
      points.push({ lat: parseFloat(shipment.origin.lat), lng: parseFloat(shipment.origin.lng), title: "Origen" });
    } 

    if (shipment.events && shipment.events.length > 0) {
      shipment.events.forEach((e: any) => {
        if (e.location && e.location.lat && e.location.lng) {
          points.push({ 
            lat: parseFloat(e.location.lat), 
            lng: parseFloat(e.location.lng), 
            title: e.location.name || e.title || "Evento"
          });
        } else if (e.coordinates && e.coordinates.lat && e.coordinates.lon) {
          points.push({ 
            lat: parseFloat(e.coordinates.lat), 
            lng: parseFloat(e.coordinates.lon), 
            title: e.description || "Evento"
          });
        }
      });
    }

    if (shipment.destination && shipment.destination.lat && shipment.destination.lng) {
      points.push({ lat: parseFloat(shipment.destination.lat), lng: parseFloat(shipment.destination.lng), title: "Destino" });
    }

    if (points.length === 0) {
      console.log("No hay coordenadas para mostrar mapa.");
      return;
    }

    // Mostrar contenedor del mapa
    const mapContainer = document.getElementById('tracking-map-container');
    if (mapContainer) {
      mapContainer.style.display = 'block';
    }

    // Limpiar instancia previa
    if (mapInstance) {
      mapInstance.remove();
      setMapInstance(null);
    }

    // Esperar a que el contenedor sea visible
    setTimeout(() => {
      const L = (window as any).L;
      if (!L) {
        console.error('Leaflet no está cargado');
        return;
      }
      
      // Inicializar mapa
      const newMapInstance = L.map('tracking-map').setView([points[0].lat, points[0].lng], 3);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(newMapInstance);

      const latLngs = points.map((p: any) => [p.lat, p.lng]);

      // Agregar marcadores
      points.forEach((p: any, index: number) => {
        let colorIcon;
        if (index === 0) {
          colorIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34]
          });
        } else if (index === points.length - 1) {
          colorIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34]
          });
        } else {
          colorIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34]
          });
        }

        L.marker([p.lat, p.lng], { icon: colorIcon })
          .addTo(newMapInstance)
          .bindPopup(`<b>${p.title}</b>`);
      });

      // Dibujar línea conectora
      if (latLngs.length > 1) {
        const polyline = L.polyline(latLngs, {
          color: '#00529b',
          weight: 3,
          opacity: 0.7,
          dashArray: '5, 10'
        }).addTo(newMapInstance);
        
        newMapInstance.fitBounds(polyline.getBounds(), { padding: [20, 20] });
      }

      newMapInstance.invalidateSize();
      setMapInstance(newMapInstance);
      setIsMapLoaded(true);

    }, 300);
  };

  // Cargar Leaflet
  useEffect(() => {
    // Cargar Leaflet CSS
    const leafletCss = document.createElement('link');
    leafletCss.rel = 'stylesheet';
    leafletCss.href = 'https://unpkg.com/leaflet/dist/leaflet.css';
    document.head.appendChild(leafletCss);

    // Cargar Leaflet JS
    const leafletScript = document.createElement('script');
    leafletScript.src = 'https://unpkg.com/leaflet/dist/leaflet.js';
    document.head.appendChild(leafletScript);

    return () => {
      // Cleanup
      if (mapInstance) {
        mapInstance.remove();
      }
      // Remover elementos añadidos al head
      if (leafletCss.parentNode) {
        document.head.removeChild(leafletCss);
      }
      if (leafletScript.parentNode) {
        document.head.removeChild(leafletScript);
      }
    };
  }, []);

  // Para debugging - remover en producción
  useEffect(() => {
    console.log('Idioma actual en Navigation:', language);
    console.log('Texto del botón de tracking:', t('nav.trackShipment'));
  }, [language, t]);

  return (
    <>
      <nav className="navigation">
        <div className="nav-container">
          <div className="logo-container">
            <a href="/">
              <img src="/app/assets/logo.png" alt="Taurel" className="logo" />
            </a>
          </div>

          <div className="desktop-nav">
            <ul>
              <li><a href="/">{t('nav.home')}</a></li>
              <li><a href="/servicios">{t('nav.services')}</a></li>
              <li><a href="/sobre-nosotros">{t('nav.aboutUs')}</a></li>
              <li><a href="/contactanos">{t('nav.contact')}</a></li>
            </ul>
          </div>

          <div className="special-links">
            {/* Grupo de botones con divisor */}
            <div className="button-group">
              {/* BOTÓN CON TRADUCCIÓN - IMPORTANTE: Usa t() no texto fijo */}
              <button onClick={openTrackingModal} className="tracking-button">
                📍 {t('nav.trackShipment')}
              </button>
              <div className="button-divider"></div>
              <a 
                href="https://logistics.taurel.com/#/login" 
                target="_blank" 
                rel="noopener noreferrer"
                className="tracking-button logistics-button"
              >
                🚢 Taurel Logistics
              </a>
            </div>
            
            <div className="header-lang-compact">
              <img src="/app/assets/bandera.png" alt="Venezuela" className="flag-ven-small" />
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault(); 
                  setLanguage('es');
                  console.log('Cambiando idioma a español');
                }}
                className={language === 'es' ? 'lang-header-active' : 'lang-header-inactive'}
              >
                ESP
              </a>
              <span className="lang-sep">|</span>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault(); 
                  setLanguage('en');
                  console.log('Cambiando idioma a inglés');
                }}
                className={language === 'en' ? 'lang-header-active' : 'lang-header-inactive'}
              >
                ENG
              </a>
            </div>
          </div>

          <button className="mobile-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="/">{t('nav.home')}</a></li>
            <li><a href="/servicios">{t('nav.services')}</a></li>
            <li><a href="/sobre-nosotros">{t('nav.aboutUs')}</a></li>
            <li><a href="/contactanos">{t('nav.contact')}</a></li>
            <li>
              <div className="button-group mobile-button-group">
                {/* BOTÓN MÓVIL CON TRADUCCIÓN - IMPORTANTE: Usa t() no texto fijo */}
                <button onClick={openTrackingModal} className="tracking-button">
                  📍 {t('nav.trackShipment')}
                </button>
                <div className="button-divider mobile-divider"></div>
                <a 
                  href="https://logistics.taurel.com/#/login" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="tracking-button logistics-button"
                >
                  🚢 Taurel Logistics
                </a>
              </div>
            </li>
            <li><a href="#">{t('nav.jobs')}</a></li>
          </ul>
          
          <div className="mobile-lang">
            <div className="mobile-lang-content">
              <img src="/app/assets/bandera.png" alt="Venezuela" className="flag-ven" />
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault(); 
                  setLanguage('es');
                  setIsMenuOpen(false);
                }}
                className={language === 'es' ? 'lang-active' : ''}
              >
                ESP
              </a>
              <span className="sep">|</span>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault(); 
                  setLanguage('en');
                  setIsMenuOpen(false);
                }}
                className={language === 'en' ? 'lang-active' : ''}
              >
                ENG
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Modal de Tracking */}
      {trackingModalOpen && (
        <div className="tracking-modal-overlay" style={{display: 'flex'}} onClick={closeTrackingModal}>
          <div className="tracking-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="tracking-modal-header">
              {/* TÍTULO DEL MODAL CON TRADUCCIÓN */}
              <h2>{t('nav.trackShipment')}</h2>
              <span className="tracking-close-btn" onClick={closeTrackingModal}>&times;</span>
            </div>

            <div className="tracking-modal-body">
              <div className="tracking-search-bar">
                <input 
                  type="text" 
                  id="tracking-search-input"
                  placeholder="Ingrese MBL, HBL o Referencia..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button onClick={handleSearch} className="tracking-search-btn">
                  {language === 'es' ? 'Buscar' : 'Search'}
                </button>
              </div>

              <div id="tracking-output">
                {trackingResult && (
                  <>
                    {trackingResult.error ? (
                      <div className="tracking-error-msg">{trackingResult.error}</div>
                    ) : (
                      <>
                        <div className="tracking-card">
                          <div className="tracking-card-title">
                            {language === 'es' ? '📦 Información General' : '📦 General Information'}
                          </div>
                          <div className="tracking-info-grid">
                            <div className="tracking-info-item">
                              <strong>Shipment ID</strong> {trackingResult.data.shipmentId || "N/A"}
                            </div>
                            <div className="tracking-info-item">
                              <strong>MBL</strong> {trackingResult.data.mbl || "N/A"}
                            </div>
                            <div className="tracking-info-item">
                              <strong>HBL</strong> {trackingResult.data.hbl || "N/A"}
                            </div>
                            <div className="tracking-info-item">
                              <strong>{language === 'es' ? 'Referencia' : 'Reference'}</strong> 
                              {trackingResult.data.referenceName || "N/A"}
                            </div>
                            <div className="tracking-info-item">
                              <strong>{language === 'es' ? 'Transportista' : 'Carrier'}</strong> 
                              {trackingResult.data.carrier?.name || "N/A"}
                            </div>
                            <div className="tracking-info-item">
                              <strong>{language === 'es' ? 'Estado' : 'Status'}</strong> 
                              <span className={`tracking-status-badge ${(trackingResult.data.currentStatus || "").includes("Delay") ? "tracking-status-delay" : "tracking-status-ok"}`}>
                                {trackingResult.data.currentStatus || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="tracking-card">
                          <div className="tracking-card-title">
                            {language === 'es' ? '📅 Últimos Eventos' : '📅 Recent Events'}
                          </div>
                          {(trackingResult.data.events || []).length > 0 ? (
                            trackingResult.data.events.slice(-3).reverse().map((e: any, index: number) => (
                              <div key={index}>
                                • <strong>{new Date(e.date).toLocaleDateString(language === 'es' ? "es-ES" : "en-US")}</strong>: 
                                {e.title || e.description}
                              </div>
                            ))
                          ) : (
                            <div>{language === 'es' ? 'Sin eventos.' : 'No events.'}</div>
                          )}
                        </div>

                        <div id="tracking-map-container" style={{display: 'none'}}>
                          <div style={{
                            background: '#f1f1f1', 
                            color: '#333', 
                            padding: '12px 15px', 
                            fontSize: '0.9rem', 
                            fontWeight: '700', 
                            borderBottom: '1px solid #ddd'
                          }}>
                            {language === 'es' ? '🗺️ Ruta del Envío' : '🗺️ Shipment Route'}
                          </div>
                          <div id="tracking-map" style={{height: '300px', width: '100%'}}></div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;