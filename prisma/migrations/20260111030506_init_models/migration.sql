-- CreateTable
CREATE TABLE "tracks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tracks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playlists" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "playlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlaylistModelToTrackModel" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PlaylistModelToTrackModel_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "tracks_title_idx" ON "tracks"("title");

-- CreateIndex
CREATE INDEX "playlists_title_idx" ON "playlists"("title");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "_PlaylistModelToTrackModel_B_index" ON "_PlaylistModelToTrackModel"("B");

-- AddForeignKey
ALTER TABLE "_PlaylistModelToTrackModel" ADD CONSTRAINT "_PlaylistModelToTrackModel_A_fkey" FOREIGN KEY ("A") REFERENCES "playlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistModelToTrackModel" ADD CONSTRAINT "_PlaylistModelToTrackModel_B_fkey" FOREIGN KEY ("B") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
