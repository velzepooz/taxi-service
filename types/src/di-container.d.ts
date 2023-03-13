import {JwtService} from "./auth/jwt.service";
import {Database} from "metasql";
import {UserRepository} from "./auth/user.repository";
import {AuthService} from "./auth/auth.service";
import {DriverRepository} from "./driver/driver.repository";
import {DriverService} from "./driver/driver.service";
import {CarRepository} from "./car/car.repository";
import {MapsAPIProvider, MapsService} from "./maps/maps.service";
import {TripService} from "./trip/trip.service";
import {Logger} from './logger';

export type DiContainer = {
  logger: Logger;
  queryBuilder: Database;
  jwtService: JwtService;
  userRepository: UserRepository;
  authService: AuthService;
  driverRepository: DriverRepository;
  driverService: DriverService;
  carRepository: CarRepository;
  mapsApiProvider: MapsAPIProvider;
  mapsService: MapsService;
  tripService: TripService;
};
