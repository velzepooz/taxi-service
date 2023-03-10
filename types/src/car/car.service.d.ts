import {Car, CarRepository} from "./car.repository";

export type Deps = {
  carRepository: CarRepository;
};

export type GetCarsListParams = {
  page: number;
  perPage: number;
  search: string;
};

export type CarsList = {
  cars: Car[];
  totalPages: number;
  currentPage: number;
};

export type GetCarsList = (params: GetCarsListParams) => Promise<CarsList>;

export interface CarService {
  getCarsList: GetCarsList;
}