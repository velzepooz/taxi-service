export type PlaceCoordinates = {
  lat: number;
  long: number;
};

/**
 * Info about trip.
 */
export type DirectionsInfo = {
  // distance in meters
  distance: number;
  // duration in seconds
  duration: number;
  departureAddress: string;
  destinationAddress: string;
};
export type GetDirectionInfo = (departurePoint: PlaceCoordinates, destinationPoint: PlaceCoordinates) => Promise<DirectionsInfo | null>;
export interface MapsAPIProvider {
  getDirectionInfo: GetDirectionInfo;
}

export type Deps = {
  mapsApiProvider: MapsAPIProvider;
};

export type GetTripInfo = (depaturePoint: PlaceCoordinates, destinationPoint: PlaceCoordinates) => Promise<DirectionsInfo | null>;
export type MapsSerivce = {
  getTripInfo: GetTripInfo;
};
