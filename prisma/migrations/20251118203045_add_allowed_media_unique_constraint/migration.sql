/*
  Warnings:

  - You are about to drop the column `type` on the `Media` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userGuid,name]` on the table `List` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[listGuid,mediaGuid]` on the table `ListItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mediaType` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."List_name_key";

-- AlterTable
ALTER TABLE "List" ADD COLUMN     "allowedMediaType" "MediaType"[];

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "type",
ADD COLUMN     "mediaType" "MediaType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "List_userGuid_name_key" ON "List"("userGuid", "name");

-- CreateIndex
CREATE UNIQUE INDEX "ListItem_listGuid_mediaGuid_key" ON "ListItem"("listGuid", "mediaGuid");
