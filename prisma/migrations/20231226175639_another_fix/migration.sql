/*
  Warnings:

  - You are about to drop the column `temps` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `about` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availability` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waitTime` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "availability" BOOLEAN NOT NULL,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "memberships" TEXT[],
ADD COLUMN     "qualification" TEXT[],
ADD COLUMN     "services" TEXT[],
ADD COLUMN     "waitTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "temps";
