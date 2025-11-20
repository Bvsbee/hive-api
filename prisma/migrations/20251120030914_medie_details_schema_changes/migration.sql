/*
  Warnings:

  - You are about to drop the column `episodeCount` on the `AnimeDetails` table. All the data in the column will be lost.
  - You are about to drop the column `studio` on the `AnimeDetails` table. All the data in the column will be lost.
  - You are about to drop the column `isbn` on the `BookDetails` table. All the data in the column will be lost.
  - You are about to drop the column `pages` on the `BookDetails` table. All the data in the column will be lost.
  - You are about to drop the column `posterUrl` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `synopsis` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `director` on the `MovieDetails` table. All the data in the column will be lost.
  - You are about to drop the column `runtime` on the `MovieDetails` table. All the data in the column will be lost.
  - You are about to drop the column `tmdbId` on the `MovieDetails` table. All the data in the column will be lost.
  - You are about to drop the column `episodes` on the `TvDetails` table. All the data in the column will be lost.
  - You are about to drop the column `network` on the `TvDetails` table. All the data in the column will be lost.
  - Added the required column `coverImageUrl` to the `AnimeDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `AnimeDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleRomaji` to the `AnimeDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookImageUrl` to the `BookDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `BookDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishedDate` to the `BookDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `BookDetails` table without a default value. This is not possible if the table is not empty.
  - Made the column `author` on table `BookDetails` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `overview` to the `MovieDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posterPath` to the `MovieDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `MovieDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `MovieDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video` to the `MovieDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `backDropPath` to the `TvDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstAirDate` to the `TvDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `TvDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postPath` to the `TvDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `TvDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video` to the `TvDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnimeDetails" DROP COLUMN "episodeCount",
DROP COLUMN "studio",
ADD COLUMN     "averageScore" DOUBLE PRECISION,
ADD COLUMN     "coverImageColor" TEXT,
ADD COLUMN     "coverImageUrl" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "episodes" INTEGER,
ADD COLUMN     "genres" TEXT[],
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "titleEnglish" TEXT,
ADD COLUMN     "titleNative" TEXT,
ADD COLUMN     "titleRomaji" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BookDetails" DROP COLUMN "isbn",
DROP COLUMN "pages",
ADD COLUMN     "bookImageUrl" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "publishedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "author" SET NOT NULL;

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "posterUrl",
DROP COLUMN "synopsis";

-- AlterTable
ALTER TABLE "MovieDetails" DROP COLUMN "director",
DROP COLUMN "runtime",
DROP COLUMN "tmdbId",
ADD COLUMN     "genre" TEXT[],
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "posterPath" TEXT NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "releaseDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "video" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TvDetails" DROP COLUMN "episodes",
DROP COLUMN "network",
ADD COLUMN     "backDropPath" TEXT NOT NULL,
ADD COLUMN     "firstAirDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "genre" TEXT[],
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "postPath" TEXT NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "video" TEXT NOT NULL;
