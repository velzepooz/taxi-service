import { driverDto } from './driver.dto.js';

export const CreateDriverDto = {
  ...driverDto,
  required: ['driverLicenceId', 'carColor', 'carVRN', 'carId'],
  additionalProperties: false,
};
