-- CreateTable
CREATE TABLE "Metadata" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apiVersion" REAL NOT NULL DEFAULT 0.1,
    "apiName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AppClients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "browser" TEXT NOT NULL,
    "metadataId" INTEGER NOT NULL,
    CONSTRAINT "AppClients_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "Metadata" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_apiName_key" ON "Metadata"("apiName");
