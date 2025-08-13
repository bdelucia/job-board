import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"
import { getCurrentUser } from "../clerk/lib/getCurrentAuth"
import { upsertUserResume } from "@/features/users/db/userResumes"
import { inngest } from "../inngest/client"
import { UserResumeTable } from "@/drizzle/schema"
import { db } from "@/drizzle/db"
import { eq } from "drizzle-orm"
import { uploadthing } from "./client"

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const customFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  resumeUploader: f(
    {
      pdf: {
        /**
         * For full list of options and defaults, see the File Route API reference
         * @see https://docs.uploadthing.com/file-routes#route-config
         */
        maxFileSize: "8MB",
        maxFileCount: 1,
      },
    },
    { awaitServerData: true }
  )
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const { userId } = await getCurrentUser()
      if (userId == null) throw new UploadThingError("Unauthorized")

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { userId } = metadata
      const resumeFileKey = await getUserResumeFileKey(userId)
      await upsertUserResume(userId, {
        resumeFileUrl: file.ufsUrl,
        resumeFileKey: file.key,
      })

      if (resumeFileKey != null) {
        await uploadthing.deleteFiles(resumeFileKey)
      }

      // TODO:
      await inngest.send({ name: "app/resume.uploaded", user: { id: userId } })

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { message: "Resume uploaded successfully" }
    }),
} satisfies FileRouter

export type CustomFileRouter = typeof customFileRouter

async function getUserResumeFileKey(userId: string) {
  const data = await db.query.UserResumeTable.findFirst({
    where: eq(UserResumeTable.userId, userId),
    columns: {
      resumeFileKey: true,
    },
  })

  return data?.resumeFileKey
}
