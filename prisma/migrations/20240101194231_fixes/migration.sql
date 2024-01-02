/*
  Warnings:

  - You are about to drop the column `days` on the `TimeSlot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TimeSlot" DROP COLUMN "days",
ADD COLUMN     "availabilitydays" TEXT[];
