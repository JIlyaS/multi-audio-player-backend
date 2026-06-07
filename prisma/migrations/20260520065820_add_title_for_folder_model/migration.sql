/*
  Warnings:

  - Added the required column `title` to the `folders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "folders" ADD COLUMN     "title" TEXT NOT NULL;
