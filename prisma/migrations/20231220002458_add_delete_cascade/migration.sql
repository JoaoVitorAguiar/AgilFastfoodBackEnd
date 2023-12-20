-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_orders" ("created_at", "id", "updated_at", "userId") SELECT "created_at", "id", "updated_at", "userId" FROM "orders";
DROP TABLE "orders";
ALTER TABLE "new_orders" RENAME TO "orders";
CREATE TABLE "new_FoodOnOrder" (
    "orderId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("orderId", "foodId"),
    CONSTRAINT "FoodOnOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FoodOnOrder_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FoodOnOrder" ("foodId", "orderId", "quantity") SELECT "foodId", "orderId", "quantity" FROM "FoodOnOrder";
DROP TABLE "FoodOnOrder";
ALTER TABLE "new_FoodOnOrder" RENAME TO "FoodOnOrder";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
