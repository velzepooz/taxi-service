import {MapsSerivce} from "../maps/maps.service";
import {CalculateTripPriceDto} from "./dto/calculate-trip-price.dto";

export type Deps = {
  mapsService: MapsSerivce;
};

export type TripInfo = {
  departureAddress: string;
  destinationAddress: string;
  duration: number;
  price: number;
  distance: number;
};

export type GetTripCalculationInfo = (payload: CalculateTripPriceDto) => TripInfo;
export type TripService = {
  getTripCalculationInfo: GetTripCalculationInfo,
};
