-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'CANDIDATE';

-- CreateTable
CREATE TABLE "VoiceInterview" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "transcript" TEXT NOT NULL,
    "followup" TEXT,
    "sentiment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VoiceInterview_pkey" PRIMARY KEY ("id")
);
