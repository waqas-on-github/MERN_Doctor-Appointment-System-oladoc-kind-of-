/*
  Warnings:

  - You are about to drop the `appointmentSlot` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `checkinTime` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkoutTime` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointmentSlot" DROP CONSTRAINT "appointmentSlot_appointmentId_fkey";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "checkinTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "checkoutTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TimeSlot" ALTER COLUMN "recurring" DROP NOT NULL,
ALTER COLUMN "recurring" SET DEFAULT true;

-- DropTable
DROP TABLE "appointmentSlot";
