/*
  Warnings:

  - Added the required column `carColor` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carId` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carVRN` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CarColor" AS ENUM ('red', 'orange', 'yellow', 'green', 'blue', 'violet', 'pink', 'black', 'brown', 'grey', 'white');

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "carColor" "CarColor" NOT NULL,
ADD COLUMN     "carId" INTEGER NOT NULL,
ADD COLUMN     "carVRN" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
