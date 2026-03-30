/*
  Warnings:

  - The `isPublic` column on the `playlists` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "playlists" DROP COLUMN "isPublic",
ADD COLUMN     "isPublic" BOOLEAN;
