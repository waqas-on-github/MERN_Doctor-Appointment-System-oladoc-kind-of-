/*
  Warnings:

  - You are about to drop the column `date` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "slotTimestemps" ADD COLUMN     "requestedToBook" BOOLEAN NOT NULL DEFAULT false;
