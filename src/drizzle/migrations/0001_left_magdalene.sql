ALTER TABLE "job_listings" ALTER COLUMN "experienceLevel" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."job_listings_experience_level";--> statement-breakpoint
CREATE TYPE "public"."job_listings_experience_level" AS ENUM('junior', 'mid_level', 'senior');--> statement-breakpoint
ALTER TABLE "job_listings" ALTER COLUMN "experienceLevel" SET DATA TYPE "public"."job_listings_experience_level" USING "experienceLevel"::"public"."job_listings_experience_level";