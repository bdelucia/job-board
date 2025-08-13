import { db } from "@/drizzle/db"
import { JobListingApplicationTable } from "@/drizzle/schema"
import { revalidateJobListingApplicationCache } from "./cache/jobListingApplications"
import { and, eq } from "drizzle-orm"

export async function insertJobListingApplication(
  application: typeof JobListingApplicationTable.$inferInsert
) {
  await db.insert(JobListingApplicationTable).values(application)

  revalidateJobListingApplicationCache(application)
}
