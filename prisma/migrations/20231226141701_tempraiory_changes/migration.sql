/*
  Warnings:

  - You are about to drop the column `about` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `availability` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `memberships` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `qualification` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `services` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `specializations` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `waitTime` on the `Doctor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "about",
DROP COLUMN "availability",
DROP COLUMN "languages",
DROP COLUMN "memberships",
DROP COLUMN "qualification",
DROP COLUMN "services",
DROP COLUMN "specializations",
DROP COLUMN "waitTime";
