/*
  Warnings:

  - Added the required column `availableInHrs` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Appointment_doctorId_key";

-- DropIndex
DROP INDEX "Appointment_patientId_key";

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "availableInHrs" INTEGER NOT NULL;
