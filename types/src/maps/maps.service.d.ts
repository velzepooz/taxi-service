import {DiContainer} from "../di-container";

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
export type MapsAPIProviderDeps = {
  logger: DiContainer['logger'];
};
export type DirectionInfoParams = {
  departurePoint: PlaceCoordinates;
  destinationPoint: PlaceCoordinates;
}
export type GetDirectionInfo = (params: DirectionInfoParams) => Promise<DirectionsInfo | null>;
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
