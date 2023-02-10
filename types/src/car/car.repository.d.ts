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

export type GetCarsList = (take: number, skip: number) => Promise<Car[]>;
export type GetCarById = (id: number) => Promise<Car> | null;

export interface CarRepository {
  getCarById: GetCarById;
  getCarsList: GetCarsList;
}