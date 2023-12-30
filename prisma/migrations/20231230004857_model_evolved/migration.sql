/*
  Warnings:

  - The values [COMPLETED] on the enum `AppointmentStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `emailVarificationToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `frogotPasswordExpiry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `frogotPasswordToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `varificationToken` on the `User` table. All the data in the column will be lost.
  - Added the required column `appointmentDuration` to the `TimeSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AppointmentStatus_new" AS ENUM ('PENDING', 'SCHEDULED', 'FULLFILLED', 'CANCELED');
ALTER TABLE "Appointment" ALTER COLUMN "status" TYPE "AppointmentStatus_new" USING ("status"::text::"AppointmentStatus_new");
ALTER TYPE "AppointmentStatus" RENAME TO "AppointmentStatus_old";
ALTER TYPE "AppointmentStatus_new" RENAME TO "AppointmentStatus";
DROP TYPE "AppointmentStatus_old";
COMMIT;

-- DropIndex
DROP INDEX "TimeSlot_startTime_key";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "doseDoctorAccepted" BOOLEAN;

-- AlterTable
ALTER TABLE "TimeSlot" ADD COLUMN     "appointmentDuration" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVarificationToken",
DROP COLUMN "frogotPasswordExpiry",
DROP COLUMN "frogotPasswordToken",
DROP COLUMN "refreshToken",
DROP COLUMN "varificationToken";

-- CreateTable
CREATE TABLE "Tokens" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "refreshToken" TEXT,
    "varificationToken" TEXT,
    "emailVarificationToken" TIMESTAMP(3),
    "frogotPasswordToken" TEXT,
    "frogotPasswordExpiry" TIMESTAMP(3),

    CONSTRAINT "Tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointmentSlot" (
    "id" SERIAL NOT NULL,
    "appointmentId" INTEGER NOT NULL,
    "checkinTime" TIMESTAMP(3) NOT NULL,
    "checkoutTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointmentSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_userId_key" ON "Tokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "appointmentSlot_appointmentId_key" ON "appointmentSlot"("appointmentId");

-- AddForeignKey
ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointmentSlot" ADD CONSTRAINT "appointmentSlot_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
