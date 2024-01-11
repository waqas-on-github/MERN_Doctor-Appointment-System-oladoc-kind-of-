/*
  Warnings:

  - Made the column `checkinTime` on table `Appointment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `checkoutTime` on table `Appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "checkinTime" SET NOT NULL,
ALTER COLUMN "checkoutTime" SET NOT NULL;
