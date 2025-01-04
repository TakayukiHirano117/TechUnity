/*
  Warnings:

  - You are about to drop the column `applicantId` on the `recruits` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "recruits" DROP CONSTRAINT "recruits_applicantId_fkey";

-- AlterTable
ALTER TABLE "recruits" DROP COLUMN "applicantId";

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "recruitId" TEXT NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "applications_userId_recruitId_key" ON "applications"("userId", "recruitId");

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_recruitId_fkey" FOREIGN KEY ("recruitId") REFERENCES "recruits"("id") ON DELETE CASCADE ON UPDATE CASCADE;
