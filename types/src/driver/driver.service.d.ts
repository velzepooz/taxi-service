import {Driver, DriverRepository} from "./driver.repository";
import { CreateDriverDto } from "./dto/create-driver.dto";
import {CarRepository} from "../car/car.repository";

export type Deps = {
  driverRepository: DriverRepository;
  carRepository: CarRepository;
};

export type CreateDriver = (payload: CreateDriverDto, userId: number) => Promise<Driver>;
export type DriverService = {
  createDriver: CreateDriver;
};