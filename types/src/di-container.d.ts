import {JwtService} from "./auth/jwt.service";
import {Database} from "metasql";
import {UserRepository} from "./auth/user.repository";
import {AuthService} from "./auth/auth.service";
import {DriverRepository} from "./driver/driver.repository";
import {DriverService} from "./driver/driver.service";
import {CarRepository} from "./car/car.repository";
import {CarService} from "./car/car.service";

export type DiContainer = {
  queryBuilder: Database;
  jwtService: JwtService;
  userRepository: UserRepository;
  authService: AuthService;
  driverRepository: DriverRepository;
  driverService: DriverService;
  carRepository: CarRepository;
  carService: CarService;
};