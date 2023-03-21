export type LatLngLiteral = {
  lat: number;
  lng: number;
};

export type TextValueObject = {
  text: string;
  value: number;
};

export type DirectionsStep = {
  duration: TextValueObject;
  end_location: LatLngLiteral;
  start_location: LatLngLiteral;
  distance: TextValueObject;
  steps: unknown;
};

export type DirectionsLeg = {
  end_address: string;
  end_location: LatLngLiteral;
  start_address: string;
  start_location: LatLngLiteral;
  steps: DirectionsStep[];
  distance: TextValueObject;
  duration: TextValueObject;
};

export type Bounds = {
  northeast: LatLngLiteral;
  southwest: LatLngLiteral;
};

export type DirectionsRoute = {
  bounds: Bounds;
  legs: DirectionsLeg[];
  summary: string;
  warnings: string[];
  waypoint_order: number[];
};

export type DirectionsStatus = 'OK' | 'NOT_FOUND' | 'ZERO_RESULTS' | 'MAX_WAYPOINTS_EXCEEDED' | 'MAX_ROUTE_LENGTH_EXCEEDED' | 'INVALID_REQUEST' | 'OVER_DAILY_LIMIT' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'UNKNOWN_ERROR';

export type DirectionsGeocodedWaypoint = {
  geocoder_status: string;
  partial_match?: unknown;
  place_id?: string;
  types?: string[];
};

export type GoogleDirectionResponse = {
  routes: DirectionsRoute[];
  status: DirectionsStatus;
  available_travel_modes?: ('DRIVING' | 'BICYCLING' | 'TRANSIT' | 'WALKING))')[]
  error_message?: string;
  geocoded_waypoints: [];
};
