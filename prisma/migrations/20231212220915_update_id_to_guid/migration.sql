/*
  Warnings:

  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `paymentType` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `orders` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `complement` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `users` table. All the data in the column will be lost.
  - The primary key for the `FoodOnOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `foods` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `foods` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_orders" ("createdAt", "created_at", "id", "updatedAt", "updated_at", "userId") SELECT "createdAt", "created_at", "id", "updatedAt", "updated_at", "userId" FROM "orders";
DROP TABLE "orders";
ALTER TABLE "new_orders" RENAME TO "orders";
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_users" ("created_at", "email", "fullName", "id", "password_hash", "updated_at") SELECT "created_at", "email", "fullName", "id", "password_hash", "updated_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new_FoodOnOrder" (
    "orderId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("orderId", "foodId"),
    CONSTRAINT "FoodOnOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FoodOnOrder_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FoodOnOrder" ("foodId", "orderId", "quantity") SELECT "foodId", "orderId", "quantity" FROM "FoodOnOrder";
DROP TABLE "FoodOnOrder";
ALTER TABLE "new_FoodOnOrder" RENAME TO "FoodOnOrder";
CREATE TABLE "new_foods" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_foods" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "foods";
DROP TABLE "foods";
ALTER TABLE "new_foods" RENAME TO "foods";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
