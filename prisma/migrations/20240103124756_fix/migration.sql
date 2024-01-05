-- CreateTable
CREATE TABLE "slotTimestemps" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "booked" BOOLEAN,

    CONSTRAINT "slotTimestemps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "slotTimestemps" ADD CONSTRAINT "slotTimestemps_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
