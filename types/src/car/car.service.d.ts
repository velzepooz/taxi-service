import {Car, CarRepository} from "./car.repository";

export type Deps = {
  carRepository: CarRepository;
};

export type GetCarsList = (page: number, perPage: number) => Promise<Car[]>;

export interface CarService {
  getCarsList: GetCarsList;
}