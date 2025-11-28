import React, { useState, useEffect, useRef } from 'react';
import '../styles/locations-map.css';

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

interface LocationsMapProps {
  apiKey: string;
  locations: Location[];
  onSelectLocation?: (location: Location | null) => void;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  hideSearch?: boolean;
  panelMode?: 'list' | 'details';
}

const LocationsMap: React.FC<LocationsMapProps> = ({ apiKey, locations, onSelectLocation, searchTerm, onSearchChange, hideSearch = false, panelMode = 'list' }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const effectiveSearch = (searchTerm ?? localSearchTerm).trim();
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(locations);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setMapLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const defaultLocation = locations.length > 0
      ? locations[0].coordinates
      : { lat: 40.416775, lng: -3.703790 }; // Madrid como ubicación por defecto

    const newMap = new google.maps.Map(mapRef.current, {
      zoom: 12,
      center: defaultLocation,
      mapTypeControl: true,
      streetViewControl: true,
      zoomControl: true,
      fullscreenControl: true,
    });

    setMap(newMap);
  }, [mapLoaded, locations]);

  useEffect(() => {
    if (!map || !mapLoaded) return;

    markers.forEach(marker => marker.setMap(null));
    const newMarkers: google.maps.Marker[] = [];

    filteredLocations.forEach(location => {
      const marker = new google.maps.Marker({
        position: location.coordinates,
        map: map,
        title: location.name,
        animation: google.maps.Animation.DROP,
      });

      const infowindow = new google.maps.InfoWindow({
        content: `
          <div class="map-info-window">
            <h3>${location.name}</h3>
            <p>${location.address}</p>
            ${location.phone ? `<p><strong>Teléfono:</strong> ${location.phone}</p>` : ''}
            ${location.email ? `<p><strong>Email:</strong> ${location.email}</p>` : ''}
          </div>
        `,
      });

      marker.addListener('click', () => {
        newMarkers.forEach(m => {
          m.getTitle() !== marker.getTitle() && m['infowindow']?.close();
        });

        infowindow.open({
          anchor: marker,
          map,
        });

        marker['infowindow'] = infowindow;

        setSelectedLocation(location);
        if (onSelectLocation) onSelectLocation(location);
        map.panTo(location.coordinates);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

    if (selectedLocation) {
      map.panTo(selectedLocation.coordinates);
      const selectedMarker = newMarkers.find(
        marker => marker.getTitle() === selectedLocation.name
      );
      if (selectedMarker) {
        google.maps.event.trigger(selectedMarker, 'click');
      }
    }
  }, [map, filteredLocations, selectedLocation, mapLoaded]);

  useEffect(() => {
    if (effectiveSearch === '') {
      setFilteredLocations(locations);
    } else {
      const filtered = locations.filter(
        location =>
          location.name.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
          location.address.toLowerCase().includes(effectiveSearch.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [effectiveSearch, locations]);

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    if (onSelectLocation) onSelectLocation(location);
  };

  return (
    <div className="map-locations-container">
      {!hideSearch && (
        <div className="map-search-container map-search-top">
          <input
            type="text"
            placeholder="Busca tu ciudad"
            value={searchTerm ?? localSearchTerm}
            onChange={(e) => (onSearchChange ? onSearchChange(e.target.value) : setLocalSearchTerm(e.target.value))}
            className="map-location-search-input"
          />
          <button className="map-search-button" aria-label="Buscar">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
      )}

      <div className="map-content-wrapper">
        <div className={`map-search-and-locations ${panelMode === 'details' ? 'panel-details' : ''}`}>
          {panelMode === 'list' ? (
            <div className="map-locations-list">
              {filteredLocations.length > 0 ? (
                filteredLocations.map(location => (
                  <div
                    key={location.id}
                    className={`map-location-item ${selectedLocation?.id === location.id ? 'selected' : ''}`}
                    onClick={() => handleLocationClick(location)}
                  >
                    <h3>{location.name}</h3>
                    <p>{location.address}</p>
                    {location.phone && <p className="map-location-detail"><strong>Tel:</strong> {location.phone}</p>}
                  </div>
                ))
              ) : (
                <div className="map-no-locations">No se encontraron ubicaciones</div>
              )}
            </div>
          ) : (
            <div className="location-details-panel">
              <div className="details-inner">
                <h3>{(selectedLocation ?? filteredLocations[0] ?? locations[0])?.name ?? 'Ubicación'}</h3>
                <p className="details-address">{(selectedLocation ?? filteredLocations[0] ?? locations[0])?.address}</p>
              </div>
            </div>
          )}
        </div>

        <div className="map-container" ref={mapRef}></div>
      </div>
    </div>
  );
};

export default LocationsMap;