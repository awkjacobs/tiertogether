/*
  Warnings:

  - You are about to drop the column `backdrop` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `cast` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `directors` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `episodes` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `first_air_date` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `genre_ids` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `last_air_date` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `poster` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `release_date` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `seasons` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Items" DROP COLUMN "backdrop",
DROP COLUMN "cast",
DROP COLUMN "description",
DROP COLUMN "directors",
DROP COLUMN "episodes",
DROP COLUMN "first_air_date",
DROP COLUMN "genre_ids",
DROP COLUMN "last_air_date",
DROP COLUMN "logo",
DROP COLUMN "name",
DROP COLUMN "poster",
DROP COLUMN "release_date",
DROP COLUMN "seasons",
DROP COLUMN "status";
