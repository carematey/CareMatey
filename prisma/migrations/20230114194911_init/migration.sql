-- CreateTable
CREATE TABLE "Pets" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "title" TEXT,
    "content" TEXT,
    "petsId" INTEGER,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_petsId_fkey" FOREIGN KEY ("petsId") REFERENCES "Pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
