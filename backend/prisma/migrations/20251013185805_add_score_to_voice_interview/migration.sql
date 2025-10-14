/*
  Warnings:

  - Made the column `followup` on table `VoiceInterview` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sentiment` on table `VoiceInterview` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "VoiceInterview" ADD COLUMN     "score" TEXT,
ALTER COLUMN "followup" SET NOT NULL,
ALTER COLUMN "sentiment" SET NOT NULL;
