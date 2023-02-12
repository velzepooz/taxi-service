import {Database} from "metasql";

export type Car = {
  id: number;
  year: number;
  manufacturer: string;
  model: string;
};

export type Deps = {
  queryBuilder: Database
}

export type GetCarsListQueryParams = {
  limit: number;
  offset: number;
  search: string;
}

export type GetCarsList = (queryParams: GetCarsListQueryParams) => Promise<Car[]>;
export type GetCarById = (id: number) => Promise<Car> | null;

export interface CarRepository {
  getCarById: GetCarById;
  getCarsList: GetCarsList;
}