/*
  Warnings:

  - Added the required column `expires_in` to the `APIkey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "APIkey" ADD COLUMN     "expires_in" INTEGER NOT NULL;
