-- AlterTable
ALTER TABLE "playlists" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "tracks" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
