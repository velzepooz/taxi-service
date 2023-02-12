import {Car, CarRepository} from "./car.repository";

export type Deps = {
  carRepository: CarRepository;
};

export type GetCarsListParams = {
  page: number;
  perPage: number;
  search: string;
};

export type GetCarsList = (params: GetCarsListParams) => Promise<Car[]>;

export interface CarService {
  getCarsList: GetCarsList;
}