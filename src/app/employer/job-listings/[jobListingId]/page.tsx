import { ActionButton } from "@/components/ActionButton"
import { AsyncIf } from "@/components/AsyncIf"
import { MarkdownPartial } from "@/components/markdown/MarkdownPartial"
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { db } from "@/drizzle/db"
import { JobListingStatus, JobListingTable } from "@/drizzle/schema"
import { JobListingBadges } from "@/features/jobListings/components/JobListingBadges"
import { getJobListingIdTag } from "@/features/jobListings/db/cache/jobListings"
import { formatJobListingStatus } from "@/features/jobListings/lib/formatters"
import { hasReachedMaxFeaturedJobListings } from "@/features/jobListings/lib/planFeatureHelpers"
import {
  getJobListingStatus,
  getNextJobListingStatus,
} from "@/features/jobListings/lib/utils"
import { getCurrentOrganization } from "@/services/clerk/lib/getCurrentAuth"
import { hasOrgUserPermission } from "@/services/clerk/lib/orgUserPermissions"
import { and, eq } from "drizzle-orm"
import { EditIcon, EyeIcon, EyeOffIcon } from "lucide-react"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ReactNode, Suspense } from "react"

type Props = {
  params: Promise<{ jobListingId: string }>
}

export default function JobListingPage(props: Props) {
  return (
    <Suspense>
      <SuspendedPage {...props} />
    </Suspense>
  )
}

async function SuspendedPage({ params }: Props) {
  const { orgId } = await getCurrentOrganization()
  if (orgId == null) return null

  const { jobListingId } = await params
  const jobListing = await getJobListing(jobListingId, orgId)
  if (jobListing == null) return notFound()

  return (
    <div className="space-y-6 max-w-6xl max-auto p-4 @container">
      <div className="flex items-center justify-between gap-4 @max-4xl:flex-col @max-4xl:items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {jobListing.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>{formatJobListingStatus(jobListing.status)}</Badge>
            <JobListingBadges jobListing={jobListing} />
          </div>
        </div>
        <div className="flex items-center gap-2 empty:-mt:4">
          <AsyncIf
            condition={() => hasOrgUserPermission("org:job_listings:update")}
          >
            <Button asChild variant="outline">
              <Link href={`/employer/job-listings/${jobListing.id}/edit`}>
                <EditIcon className="size-4" /> Edit
              </Link>
            </Button>
          </AsyncIf>
          <StatusUpdateButton status={jobListing.status} />
        </div>
      </div>

      <MarkdownPartial
        dialogMarkdown={<MarkdownRenderer source={jobListing.description} />}
        mainMarkdown={
          <MarkdownRenderer
            className="prose-small"
            source={jobListing.description}
          />
        }
        dialogTitle="Description"
      />
    </div>
  )
}

function StatusUpdateButton({ status }: { status: JobListingStatus }) {
  const button = (
    <ActionButton
      action={toggleJobListingStatus.bind(null, id)}
      variant="outline"
      requireAreYouSure={getNextJobListingStatus(status) === "published"}
      areYouSureDescription="This will immediately show this job listing to all users."
    >
      {statusToggleButtonText(status)}
    </ActionButton>
  )

  return (
    <AsyncIf
      condition={() => hasOrgUserPermission("org:job_listings:change_status")}
    >
      {getNextJobListingStatus(status) === "published" ? (
        <AsyncIf
          condition={async () => {
            const isMaxed = await hasReachedMaxFeaturedJobListings()
            return !isMaxed
          }}
          otherwise={
            <UpgradePopover
              buttonText={statusToggleButtonText(status)}
              popoverText="You must upgrade your plan to publish more job listings."
            />
          }
        >
          {button}
        </AsyncIf>
      ) : (
        button
      )}
    </AsyncIf>
  )
}

function UpgradePopover({
  buttonText,
  popoverText,
}: {
  buttonText: ReactNode
  popoverText: ReactNode
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{buttonText}</Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        {popoverText}
        <Button asChild>
          <Link href="/employer/pricing">Upgrade Plan</Link>
        </Button>
      </PopoverContent>
    </Popover>
  )
}

function statusToggleButtonText(status: JobListingStatus) {
  switch (status) {
    case "delisted":
    case "draft":
      return (
        <>
          <EyeIcon className="size-4" />
          Publish
        </>
      )
    case "published":
      return (
        <>
          <EyeOffIcon className="size-4" />
          Delist
        </>
      )
    default:
      throw new Error(`Unknown status: ${status satisfies never}`)
  }
}

async function getJobListing(id: string, orgId: string) {
  "use cache"
  cacheTag(getJobListingIdTag(id))

  return db.query.JobListingTable.findFirst({
    where: and(
      eq(JobListingTable.id, id),
      eq(JobListingTable.organizationId, orgId)
    ),
  })
}
