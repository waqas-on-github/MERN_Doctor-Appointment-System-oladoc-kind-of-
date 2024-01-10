/*
  Warnings:

  - You are about to drop the column `availability` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `availableInHrs` on the `Doctor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "availability",
DROP COLUMN "availableInHrs";
