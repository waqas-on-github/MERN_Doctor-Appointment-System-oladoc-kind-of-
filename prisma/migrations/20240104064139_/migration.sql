/*
  Warnings:

  - A unique constraint covering the columns `[startTime]` on the table `slotTimestemps` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[endTime]` on the table `slotTimestemps` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "slotTimestemps_startTime_key" ON "slotTimestemps"("startTime");

-- CreateIndex
CREATE UNIQUE INDEX "slotTimestemps_endTime_key" ON "slotTimestemps"("endTime");
