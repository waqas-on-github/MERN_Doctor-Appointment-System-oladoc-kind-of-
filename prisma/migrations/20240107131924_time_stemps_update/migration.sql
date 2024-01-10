/*
  Warnings:

  - Added the required column `slotId` to the `slotTimestemps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "slotTimestemps" ADD COLUMN     "slotId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "slotTimestemps" ADD CONSTRAINT "slotTimestemps_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "TimeSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
