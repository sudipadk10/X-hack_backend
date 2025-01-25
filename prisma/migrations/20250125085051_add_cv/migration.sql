-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "cv" TEXT,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
