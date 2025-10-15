/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('MOVIE', 'TV', 'BOOK', 'ANIME');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "List" (
    "guid" TEXT NOT NULL,
    "userGuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "List_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "ListItem" (
    "guid" TEXT NOT NULL,
    "listGuid" TEXT NOT NULL,
    "mediaGuid" TEXT NOT NULL,

    CONSTRAINT "ListItem_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "Media" (
    "guid" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "title" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "posterUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "MovieDetails" (
    "guid" TEXT NOT NULL,
    "mediaGuid" TEXT NOT NULL,
    "runtime" INTEGER,
    "director" TEXT,
    "tmdbId" TEXT,

    CONSTRAINT "MovieDetails_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "BookDetails" (
    "guid" TEXT NOT NULL,
    "mediaGuid" TEXT NOT NULL,
    "author" TEXT,
    "isbn" TEXT,
    "pages" INTEGER,

    CONSTRAINT "BookDetails_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "TvDetails" (
    "guid" TEXT NOT NULL,
    "mediaGuid" TEXT NOT NULL,
    "episodes" INTEGER,
    "network" TEXT,

    CONSTRAINT "TvDetails_pkey" PRIMARY KEY ("guid")
);

-- CreateTable
CREATE TABLE "AnimeDetails" (
    "guid" TEXT NOT NULL,
    "mediaGuid" TEXT NOT NULL,
    "studio" TEXT,
    "episodeCount" INTEGER,

    CONSTRAINT "AnimeDetails_pkey" PRIMARY KEY ("guid")
);

-- CreateIndex
CREATE UNIQUE INDEX "List_name_key" ON "List"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MovieDetails_mediaGuid_key" ON "MovieDetails"("mediaGuid");

-- CreateIndex
CREATE UNIQUE INDEX "BookDetails_mediaGuid_key" ON "BookDetails"("mediaGuid");

-- CreateIndex
CREATE UNIQUE INDEX "TvDetails_mediaGuid_key" ON "TvDetails"("mediaGuid");

-- CreateIndex
CREATE UNIQUE INDEX "AnimeDetails_mediaGuid_key" ON "AnimeDetails"("mediaGuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_userGuid_fkey" FOREIGN KEY ("userGuid") REFERENCES "User"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_listGuid_fkey" FOREIGN KEY ("listGuid") REFERENCES "List"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_mediaGuid_fkey" FOREIGN KEY ("mediaGuid") REFERENCES "Media"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieDetails" ADD CONSTRAINT "MovieDetails_mediaGuid_fkey" FOREIGN KEY ("mediaGuid") REFERENCES "Media"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookDetails" ADD CONSTRAINT "BookDetails_mediaGuid_fkey" FOREIGN KEY ("mediaGuid") REFERENCES "Media"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TvDetails" ADD CONSTRAINT "TvDetails_mediaGuid_fkey" FOREIGN KEY ("mediaGuid") REFERENCES "Media"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeDetails" ADD CONSTRAINT "AnimeDetails_mediaGuid_fkey" FOREIGN KEY ("mediaGuid") REFERENCES "Media"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;
