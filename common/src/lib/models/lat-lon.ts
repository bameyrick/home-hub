export interface LatLon {
  latitude: number;
  longitude: number;
  name?: string;
}

export interface NullableLatLon {
  latitude: number | null;
  longitude: number | null;
  name?: string;
}
