/*
  Warnings:

  - You are about to drop the column `status` on the `Appointment` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "appointmentStatus" AS ENUM ('PENDING', 'SCHEDULED', 'FULLFILLED', 'CANCELED');

-- CreateEnum
CREATE TYPE "appointmentStatusByPatient" AS ENUM ('PENDING', 'SCHEDULED', 'FULLFILLED', 'CANCELED');

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "status",
ADD COLUMN     "statusByDoctor" "appointmentStatus",
ADD COLUMN     "statusByPatient" "appointmentStatusByPatient";

-- DropEnum
DROP TYPE "AppointmentStatus";
