-- DropForeignKey
ALTER TABLE "recruits" DROP CONSTRAINT "recruits_applicantId_fkey";

-- AlterTable
ALTER TABLE "recruits" ALTER COLUMN "applicantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "recruits" ADD CONSTRAINT "recruits_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
