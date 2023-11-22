/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `db.profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "db.profiles_userId_key" ON "db.profiles"("userId");

-- AddForeignKey
ALTER TABLE "db.profiles" ADD CONSTRAINT "db.profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "db.users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db.posts" ADD CONSTRAINT "db.posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "db.users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db.posts" ADD CONSTRAINT "db.posts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "db.categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
