/*
  Warnings:

  - Made the column `type` on table `Items` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Items" ADD COLUMN     "newId" TEXT,
ALTER COLUMN "type" SET NOT NULL;
