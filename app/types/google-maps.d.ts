declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, options?: MapOptions);
      setCenter(latLng: LatLng | LatLngLiteral): void;
      getCenter(): LatLng;
      setZoom(zoom: number): void;
      getZoom(): number;
      panTo(latLng: LatLng | LatLngLiteral): void;
    }

    class Marker {
      constructor(opts?: MarkerOptions);
      setMap(map: Map | null): void;
      getPosition(): LatLng;
      getTitle(): string;
      addListener(eventName: string, handler: Function): MapsEventListener;
      [key: string]: any;
    }

    class InfoWindow {
      constructor(opts?: InfoWindowOptions);
      open(options: InfoWindowOpenOptions): void;
      close(): void;
    }

    interface InfoWindowOpenOptions {
      anchor?: Marker;
      map?: Map;
    }

    interface MarkerOptions {
      position: LatLng | LatLngLiteral;
      map?: Map;
      title?: string;
      animation?: any;
    }

    interface InfoWindowOptions {
      content?: string | Element;
      position?: LatLng | LatLngLiteral;
    }

    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      mapTypeId?: string;
      mapTypeControl?: boolean;
      streetViewControl?: boolean;
      zoomControl?: boolean;
      fullscreenControl?: boolean;
    }

    class LatLng {
      constructor(lat: number, lng: number, noWrap?: boolean);
      lat(): number;
      lng(): number;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface MapsEventListener {
      remove(): void;
    }

    namespace Animation {
      const DROP: number;
      const BOUNCE: number;
    }

    namespace event {
      function trigger(instance: any, eventName: string, ...args: any[]): void;
    }
  }
}