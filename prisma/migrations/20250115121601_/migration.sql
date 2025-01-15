-- CreateTable
CREATE TABLE "hires" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "recruitId" TEXT NOT NULL,

    CONSTRAINT "hires_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hires_userId_recruitId_key" ON "hires"("userId", "recruitId");

-- AddForeignKey
ALTER TABLE "hires" ADD CONSTRAINT "hires_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hires" ADD CONSTRAINT "hires_recruitId_fkey" FOREIGN KEY ("recruitId") REFERENCES "recruits"("id") ON DELETE CASCADE ON UPDATE CASCADE;
