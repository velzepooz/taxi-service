import { Database } from "metasql";

export type CarColor =
| 'red'
| 'orange'
| 'yellow'
| 'green'
| 'blue'
| 'violet'
| 'pink'
| 'black'
| 'brown'
| 'grey'
| 'white'

export type Driver = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  driverLicenceId: string;
  carColor: CarColor;
  carVRN: string;
  userId: number;
  carId: number;
}

export type Deps = {
  queryBuilder: Database;
}

export type DriverToCreate = Pick<Driver, 'driverLicenceId'|'carId'|'carColor'|'carVRN'|'userId'>

export type CreateDriver = (driverToCreate: DriverToCreate) => Promise<Driver>;
export interface DriverRepository {
 createDriver: CreateDriver;
}