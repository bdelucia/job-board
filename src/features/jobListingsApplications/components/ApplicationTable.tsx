"use client"

import { DataTable } from "@/components/dataTable/DataTable"
import { DataTableSortableColumnHeader } from "@/components/dataTable/DataTableSortableColumnHeader"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ApplicationStage,
  applicationStages,
  JobListingApplicationTable,
  UserResumeTable,
  UserTable,
} from "@/drizzle/schema"
import { ColumnDef } from "@tanstack/react-table"
import { ReactNode, useOptimistic, useTransition } from "react"
import { StageIcon } from "./PageIcon"
import { formatJobListingApplicationStage } from "../lib/formatters"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"
import { sortApplicationsByStage } from "../lib/utils"
import { updateJobListingApplication } from "../db/jobListingApplications"
import { toast } from "sonner"
import { updateJobListingApplicationStage } from "../actions/actions"

type Application = Pick<
  typeof JobListingApplicationTable.$inferSelect,
  "createdAt" | "stage" | "rating" | "jobListingId"
> & {
  coverLetterMarkdown: ReactNode | null
  user: Pick<typeof UserTable.$inferSelect, "id" | "name" | "imageUrl"> & {
    resume:
      | (Pick<typeof UserResumeTable.$inferSelect, "resumeFileUrl"> & {
          markdownSummary: ReactNode | null
        })
      | null
  }
}

function getColumns(
  canUpdateRating: boolean,
  canUpdateStage: boolean
): ColumnDef<Application>[] {
  return [
    {
      accessorFn: (row) => row.user.name,
      header: "Name",
      cell: ({ row }) => {
        const user = row.original.user

        const nameInitials = user.name
          .split(" ")
          .slice(0, 2)
          .map((name) => name.charAt(0).toUpperCase())
          .join("")

        return (
          <div className="flex items-center gap-2">
            <Avatar className="rounded-full size-6">
              <AvatarImage src={user.imageUrl ?? undefined} alt={user.name} />
              <AvatarFallback className="uppercase bg-primary text-primary-foreground text-xs">
                {nameInitials}
              </AvatarFallback>
            </Avatar>
            <span>{user.name}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "stage",
      header: ({ column }) => (
        <DataTableSortableColumnHeader title="Stage" column={column} />
      ),
      sortingFn: ({ original: a }, { original: b }) => {
        return sortApplicationByStage(a.stage, b.stage)
      },
      filterFn: ({ original }, _, value) => {
        return value.includes(original.stage)
      },
      cell: ({ row }) => (
        <StageCell
          canUpdate={canUpdateStage}
          stage={row.original.stage}
          jobListingId={row.original.jobListingId}
          userId={row.original.user.id}
        />
      ),
    },
  ]
}

// TODO
export function SkeletonApplicationTable() {
  return null
}

export function ApplicationTable({
  applications,
}: {
  applications: Application[]
}) {
  return <DataTable data={applications} columns={getColumns(true, true)} />
}
function sortApplicationByStage(stage: string, stage1: string): number {
  throw new Error("Function not implemented.")
}

function StageCell({
  stage,
  jobListingId,
  userId,
  canUpdate,
}: {
  stage: ApplicationStage
  jobListingId: string
  userId: string
  canUpdate: boolean
}) {
  const [optimisticStage, setOptimisticStage] = useOptimistic(stage)
  const [isPending, startTransition] = useTransition()

  if (!canUpdate) {
    return <StageDetails stage={optimisticStage} />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className={cn("-ml-3", isPending && "opacity-50")}
        >
          <StageDetails stage={optimisticStage} />
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {applicationStages
          .toSorted(sortApplicationsByStage)
          .map((stageValue) => (
            <DropdownMenuItem
              key={stageValue}
              onClick={() => {
                startTransition(async () => {
                  setOptimisticStage(stageValue)
                  const res = await updateJobListingApplicationStage(
                    {
                      jobListingId,
                      userId,
                    },
                    stageValue
                  )

                  if (res?.error) {
                    toast.error(res.message)
                  }
                })
              }}
            >
              <StageDetails stage={stageValue} />
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function StageDetails({ stage }: { stage: ApplicationStage }) {
  return (
    <div className="flex gap-2 items-center">
      <StageIcon stage={stage} className="size-5 text-inherit" />
      <div>{formatJobListingApplicationStage(stage)}</div>
    </div>
  )
}
