-- CreateTable
CREATE TABLE "Film" (
    "id" TEXT NOT NULL,
    "titolo" TEXT NOT NULL,
    "anno" TEXT NOT NULL,
    "regista" TEXT NOT NULL,
    "genere" TEXT[],
    "valutazione" TEXT NOT NULL,

    CONSTRAINT "Film_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Film_titolo_key" ON "Film"("titolo");
