/*
  Warnings:

  - You are about to drop the `Doctor_availibility` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Doctor_availibility";

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "days" TEXT[],
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "recurring" BOOLEAN NOT NULL,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TimeSlot_doctorId_key" ON "TimeSlot"("doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "TimeSlot_startTime_key" ON "TimeSlot"("startTime");

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
