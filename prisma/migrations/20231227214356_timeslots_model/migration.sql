-- AlterEnum
ALTER TYPE "AppointmentStatus" ADD VALUE 'PENDING';

-- CreateTable
CREATE TABLE "Doctor_availibility" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Doctor_availibility_pkey" PRIMARY KEY ("id")
);
