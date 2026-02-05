import React, { useState, useEffect } from 'react';
import './../styles/chatbot.css';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isOpen && !isLoaded) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isLoaded]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsLoaded(false);
      setHasError(false);
    }, 300);
  };

  // Manejar errores del iframe
  const handleIframeError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <>
      {/* Botón flotante con imagen de avatar desde Imgur */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'open' : ''} ${isHovering ? 'hovering' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        aria-label={isOpen ? "Cerrar asistente virtual" : "Abrir asistente virtual"}
        title="Asistente Virtual Taurel - Haz clic para chatear"
      >
        <div className="chatbot-avatar-container">
          {/* Imagen del avatar desde Imgur - se muestra cuando está cerrado */}
          {!isOpen && (
            <img 
              src="https://i.imgur.com/pkirPow.png" 
              alt="Avatar del Asistente Taurel" 
              className="chatbot-avatar-image"
              onError={(e) => {
                // Fallback si la imagen no carga
                e.currentTarget.src = 'https://ui-avatars.com/api/?name=Taurel&background=00529b&color=fff&size=128';
                e.currentTarget.alt = 'Avatar de respaldo';
              }}
            />
          )}
          
          {/* Icono de cerrar - se muestra cuando está abierto */}
          {isOpen && (
            <div className="chatbot-close-icon">✕</div>
          )}
        </div>
        
        {/* Efecto de pulso */}
        {!isOpen && <div className="chatbot-pulse"></div>}
        
        {/* Tooltip */}
        <span className="chatbot-tooltip">
          {isOpen ? 'Cerrar Chat' : 'Chatea con nuestro asistente'}
        </span>
      </button>

      {/* Ventana del chatbot */}
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              {/* Avatar en el header también desde Imgur */}
              <div className="chatbot-header-avatar">
                <img 
                  src="https://i.imgur.com/pkirPow.png" 
                  alt="Avatar del Asistente" 
                  className="header-avatar-image"
                  onError={(e) => {
                    // Fallback si la imagen no carga
                    e.currentTarget.src = 'https://ui-avatars.com/api/?name=Taurel&background=00529b&color=fff&size=45';
                    e.currentTarget.alt = 'Avatar de respaldo';
                  }}
                />
              </div>
              <div className="chatbot-title">
                <h3>Asistente Virtual Taurel</h3>
                <p className="chatbot-subtitle">¿En qué puedo ayudarte hoy?</p>
              </div>
            </div>
            <button 
              className="chatbot-close-btn"
              onClick={handleClose}
              aria-label="Cerrar ventana de chat"
            >
              ×
            </button>
          </div>

          <div className="chatbot-content">
            {isOpen && (
              <div className={`chatbot-iframe-wrapper ${isLoaded ? 'loaded' : 'loading'}`}>
                {!isLoaded && !hasError && (
                  <div className="chatbot-loading">
                    <div className="loading-spinner"></div>
                    <p>Cargando asistente virtual...</p>
                  </div>
                )}

                {hasError && (
                  <div className="chatbot-error">
                    <div className="error-icon">⚠️</div>
                    <h4>Error al cargar el asistente</h4>
                    <p>El asistente virtual no está disponible temporalmente.</p>
                    <p className="error-solution">
                      <strong>Solución:</strong> Asegúrate de que el bot esté publicado en Microsoft Copilot Studio.
                    </p>
                    <button 
                      className="retry-button"
                      onClick={() => {
                        setHasError(false);
                        setIsLoaded(false);
                      }}
                    >
                      Reintentar
                    </button>
                  </div>
                )}

                {!hasError && (
                  <iframe
                    src="https://copilotstudio.microsoft.com/environments/Default-b6f746d7-e5ec-486f-9ba3-d0475df395de/bots/cr91f_oriAsistenteAduanero/webchat"
                    title="Asistente Aduanero Taurel - Chatbot de Microsoft Copilot Studio"
                    className="chatbot-iframe"
                    allow="microphone; camera"
                    allowFullScreen
                    loading="eager"
                    onLoad={() => setIsLoaded(true)}
                    onError={handleIframeError}
                  />
                )}
              </div>
            )}
          </div>

          <div className="chatbot-footer">
            <p className="chatbot-disclaimer">
              💡 <strong>Tip:</strong> Pregunta sobre servicios aduaneros, tracking, importación/exportación.
            </p>
            <p className="chatbot-version">
              <small>Powered by Microsoft Copilot Studio</small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;