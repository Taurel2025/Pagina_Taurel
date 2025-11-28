import React, { useState } from 'react';
import LocationsMap from './LocationsMap';
import '../styles/locations-finder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';

interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone?: string;
  email?: string;
  schedule?: string;
}

const sampleLocations: Location[] = [
  {
    id: '1',
    name: 'Caracas',
    address: 'Ciudad Center. Calle Sanatorio del Ávila. Torre F. Piso 2. Boleíta Norte, Caracas. Venezuela.',
    coordinates: { lat: 10.491016, lng: -66.831833 },
    phone: '+58 (212)-718.9700'
  },
  {
    id: '2',
    name: 'San Antonio del Táchira',
    address: 'Av. 1ro. De Mayo Centro Cívico Piso 1 Local 1-6 San Antonio Edo.Tachira',
    coordinates: { lat: 7.817551, lng: -72.440567 },
    phone: '+58 (276)-771.00.11'
  },
  {
    id: '3',
    name: 'La Guaira',
    address: 'Av. Soublette, Sector El Cantón, Edificio Taurel, La Guaira, Edo-Vargas, Venezuela.',
    coordinates: { lat: 10.601945, lng: -66.933567 },
    phone: '+58 (212)-303.2200'
  },
  {
    id: '4',
    name: 'Barquisimeto',
    address: 'Av. Las Industrias Centro de Servicio Mercantil Piso 1 Ofc. 7. Barquisimeto, Edo. Lara.',
    coordinates: { lat: 10.064696, lng: -69.319170 },
    phone: '+58 (251) 443.3198'
  },
  {
    id: '5',
    name: 'Maracaibo',
    address: 'Av. 4 Bella Vista con calle 86A C. C Akrai Center Piso 2 Locales C-1 y C-2. Maracaibo; Edo. Zulia',
    coordinates: { lat: 10.641413, lng: -71.611824 },
    phone: '+58 (261) 723.1164'
  },
  {
    id: '6',
    name: 'CUSALCA Catia La Mar',
    address: 'Entrada Urb. Playa Grande, Zona Industrial. Catia La Mar, Edo. Vargas.',
    coordinates: { lat: 10.603761, lng: -67.033211 },
    phone: '+58 (212) 352-1802'
  },
  {
    id: '7',
    name: 'Valencia',
    address: 'Zona Ind. Sur. Av. Henry Ford. C.C. Paseo las Industrias. Valencia. Venezuela.',
    coordinates: { lat: 10.162083, lng: -67.993889 },
    phone: '+58 (241) 8331808'
  },
  {
    id: '8',
    name: 'Puerto Cabello',
    address: 'Prolongación Av. La Marina, detrás de La Catedral San José, Edif. Taurel & Cia., Puerto Cabello Edo- Carabobo. 2050 – Venezuela.',
    coordinates: { lat: 10.472222, lng: -68.012500 },
    phone: '+58 (242) 406300'
  }
];

interface LocationsFinderProps {
  googleMapsApiKey: string;
}

const LocationsFinder: React.FC<LocationsFinderProps> = ({ googleMapsApiKey }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [term, setTerm] = useState('');

  return (
    <div className="map-component">
      <div className="map-component-card">
        <LocationsMap
          apiKey={googleMapsApiKey}
          locations={sampleLocations}
          onSelectLocation={setSelectedLocation}
          searchTerm={term}
          onSearchChange={setTerm}
          hideSearch={false}
          panelMode="list"
        />
      </div>

      {selectedLocation && (
        <div className="selected-location-details">
          <h3>{selectedLocation.name}</h3>
          <div className="details-grid">
            <div className="detail-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="detail-icon" />
              <p>{selectedLocation.address}</p>
            </div>
            {selectedLocation.phone && (
              <div className="detail-item">
                <FontAwesomeIcon icon={faPhone} className="detail-icon" />
                <p>{selectedLocation.phone}</p>
              </div>
            )}
            {selectedLocation.email && (
              <div className="detail-item">
                <FontAwesomeIcon icon={faEnvelope} className="detail-icon" />
                <p>{selectedLocation.email}</p>
              </div>
            )}
            {selectedLocation.schedule && (
              <div className="detail-item">
                <FontAwesomeIcon icon={faClock} className="detail-icon" />
                <p>{selectedLocation.schedule}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationsFinder;