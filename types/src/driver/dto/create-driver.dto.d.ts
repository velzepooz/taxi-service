import { DriverDto } from "./driver.dto";

export type CreateDriverDto = Pick<DriverDto, 'driverLicenceId'|'carColor'|'carVRN'|'carId'>;