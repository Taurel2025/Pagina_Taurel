// app/contexts/TrackingContext.tsx
import React, { createContext, useContext, useRef } from 'react';

// Definimos el tipo del contexto (la función que expondremos)
interface TrackingContextType {
  openTrackingModalWithShipment: (shipmentNumber: string) => void;
}

// Creamos el contexto
const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

// Proveedor del contexto
export const TrackingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Usamos una ref para almacenar la función real que vendrá desde Navigation
  const openFnRef = useRef<(shipmentNumber: string) => void>(() => {});

  // Esta es la función que se expone a través del contexto
  const openTrackingModalWithShipment = (shipmentNumber: string) => {
    openFnRef.current(shipmentNumber);
  };

  return (
    <TrackingContext.Provider value={{ openTrackingModalWithShipment }}>
      {children}
    </TrackingContext.Provider>
  );
};

// Hook para usar el contexto en cualquier componente
export const useTracking = () => {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error('useTracking debe usarse dentro de un TrackingProvider');
  }
  return context;
};

// Hook interno para que Navigation registre su función (solo debe usarse en Navigation)
export const useRegisterTrackingOpen = (openFn: (shipmentNumber: string) => void) => {
  const context = useContext(TrackingContext);
  // Necesitamos acceder a la ref interna. Como es seguro porque solo lo usamos en Navigation,
  // hacemos un cast a any para acceder a la propiedad privada.
  const ref = (context as any)?.openFnRef;
  React.useEffect(() => {
    if (ref) {
      ref.current = openFn;
    }
  }, [openFn, ref]);
};