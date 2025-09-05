-- CreateTable
CREATE TABLE "public"."User" (
    "guid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "dateCreated" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("guid")
);
