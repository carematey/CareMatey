/*
  Warnings:

  - You are about to drop the column `archivedAt` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `spaceName` on the `SpaceAuthorization` table. All the data in the column will be lost.
  - Made the column `userId` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "archivedAt",
DROP COLUMN "ownerId",
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "SpaceAuthorization" DROP COLUMN "spaceName",
ALTER COLUMN "role" SET DEFAULT 'WRITE';
