/*
  Warnings:

  - You are about to drop the column `homeId` on the `card` table. All the data in the column will be lost.
  - You are about to drop the `home` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `spaceId` to the `card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "card" DROP CONSTRAINT "card_homeId_fkey";

-- DropForeignKey
ALTER TABLE "home" DROP CONSTRAINT "home_userId_fkey";

-- AlterTable
ALTER TABLE "card" DROP COLUMN "homeId",
ADD COLUMN     "spaceId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "home";

-- CreateTable
CREATE TABLE "space" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "space_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "space" ADD CONSTRAINT "space_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
