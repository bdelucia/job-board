# Jobs by Bob: A full-stack job listing board made with Inngest, Clerk, Next.js and React

## Pages:
![Home Page](https://github.com/user-attachments/assets/b7291372-f058-4a95-a382-fc57af4b301d)

![Employer Dashboard](https://github.com/user-attachments/assets/e7d9322f-ebe6-4243-9acc-157623796f32)

![Employer Notification Settings](https://github.com/user-attachments/assets/04ca73a8-a600-4a7c-83db-1c29a07cc429)


## Getting Started (for devs)

First, run the development server:

```bash
npm run dev
```

Then run the inngest server:

```bash
npm run inngest
```

Then run the docker db server:

```bash
sudo docker-compose up
```

(Optional) Run the drizzle studio to see the PostgreSQL database:

```bash
npm run db:studio
```

### Expanded Project View:

```
job-board2/
├── .gitignore        
├── components.json   
├── docker-compose.yml
├── drizzle.config.ts 
├── eslint.config.mjs 
├── folderGenerator.py
├── next.config.ts    
├── package-lock.json 
├── package.json
├── postcss.config.mjs
├── README.md
├── src/
├── ├── app/
├── ├── ├── (clerk)/
├── ├── ├── ├── layout.tsx
├── ├── ├── ├── organizations/
├── ├── ├── ├── ├── select/
├── ├── ├── ├── ├── ├── page.tsx
├── ├── ├── ├── sign-in/
├── ├── ├── ├── ├── [[...sign-in]]/
├── ├── ├── ├── ├── ├── page.tsx
├── ├── ├── (job-seeker)/
├── ├── ├── ├── @sidebar/
├── ├── ├── ├── ├── ai-search/
├── ├── ├── ├── ├── ├── page.tsx
├── ├── ├── ├── ├── job-listings/
├── ├── ├── ├── ├── ├── [jobListingId]/
├── ├── ├── ├── ├── ├── ├── page.tsx
├── ├── ├── ├── ├── page.tsx
├── ├── ├── ├── ├── user-settings/
├── ├── ├── ├── ├── ├── notifications/
├── ├── ├── ├── ├── ├── ├── page.tsx
├── ├── ├── ├── ├── ├── resume/
├── ├── ├── ├── ├── ├── ├── page.tsx
├── ├── ├── ├── ai-search/
├── ├── ├── ├── ├── page.tsx
├── ├── ├── ├── job-listings/
├── ├── ├── ├── ├── [jobListingId]/
├── ├── ├── ├── ├── ├── page.tsx
├── ├── ├── ├── ├── ├── _ClientSheet.tsx
├── ├── ├── ├── layout.tsx
├── ├── ├── ├── page.tsx
├── ├── ├── ├── user-settings/
├── ├── ├── ├── ├── notifications/
├── ├── ├── ├── ├── ├── page.tsx
├── ├── ├── ├── ├── resume/
├── ├── ├── ├── ├── ├── page.tsx
├── ├── ├── ├── ├── ├── _DropzoneClient.tsx
├── ├── ├── ├── _shared/
├── ├── ├── ├── ├── JobBoardSidebar.tsx
├── ├── ├── ├── ├── JobListingItems.tsx
├── ├── ├── ├── ├── UserSettingsSidebar.tsx
├── ├── ├── api/
├── ├── ├── ├── inngest/
├── ├── ├── ├── ├── route.ts
├── ├── ├── ├── uploadthing/
├── ├── ├── ├── ├── route.ts
├── ├── ├── employer/
├── ├── ├── ├── job-listings/
├── ├── ├── ├── ├── new/
├── ├── ├── ├── ├── ├── page.tsx
├── ├── ├── ├── ├── [jobListingId]/
├── ├── ├── ├── ├── ├── edit/
├── ├── ├── ├── ├── ├── ├── page.tsx
├── ├── ├── ├── ├── ├── page.tsx
├── ├── ├── ├── layout.tsx
├── ├── ├── ├── page.tsx
├── ├── ├── ├── pricing/
├── ├── ├── ├── ├── page.tsx
├── ├── ├── ├── user-settings/
├── ├── ├── ├── ├── page.tsx
├── ├── ├── ├── _JobListingMenuGroup.tsx
├── ├── ├── globals.css
├── ├── ├── layout.tsx
├── ├── components/
├── ├── ├── ActionButton.tsx
├── ├── ├── AsyncIf.tsx
├── ├── ├── dataTable/
├── ├── ├── ├── DataTable.tsx
├── ├── ├── ├── DataTableFacetedFilter.tsx
├── ├── ├── ├── DataTablePagination.tsx
├── ├── ├── ├── DataTableSortableColumnHeader.tsx
├── ├── ├── IsBreakpoint.tsx
├── ├── ├── LoadingSpinner.tsx
├── ├── ├── LoadingSwap.tsx
├── ├── ├── markdown/
├── ├── ├── ├── MarkdownEditor.tsx
├── ├── ├── ├── MarkdownPartial.tsx
├── ├── ├── ├── MarkdownRenderer.tsx
├── ├── ├── ├── _MarkdownEditor.tsx
├── ├── ├── sidebar/
├── ├── ├── ├── AppSidebar.tsx
├── ├── ├── ├── SidebarNavMenuGroup.tsx
├── ├── ├── ├── _AppSidebarClient.tsx
├── ├── ├── ui/
├── ├── ├── ├── alert-dialog.tsx
├── ├── ├── ├── avatar.tsx
├── ├── ├── ├── badge.tsx
├── ├── ├── ├── button.tsx
├── ├── ├── ├── card.tsx
├── ├── ├── ├── collapsible.tsx
├── ├── ├── ├── command.tsx
├── ├── ├── ├── dialog.tsx
├── ├── ├── ├── dropdown-menu.tsx
├── ├── ├── ├── form.tsx
├── ├── ├── ├── input.tsx
├── ├── ├── ├── label.tsx
├── ├── ├── ├── popover.tsx
├── ├── ├── ├── resizable.tsx
├── ├── ├── ├── select.tsx
├── ├── ├── ├── separator.tsx
├── ├── ├── ├── sheet.tsx
├── ├── ├── ├── sidebar.tsx
├── ├── ├── ├── skeleton.tsx
├── ├── ├── ├── sonner.tsx
├── ├── ├── ├── switch.tsx
├── ├── ├── ├── table.tsx
├── ├── ├── ├── textarea.tsx
├── ├── ├── ├── tooltip.tsx
├── ├── data/
├── ├── ├── env/
├── ├── ├── ├── client.ts
├── ├── ├── ├── server.ts
├── ├── ├── states.json
├── ├── drizzle/
├── ├── ├── db.ts
├── ├── ├── migrations/
├── ├── ├── ├── 0000_sleepy_flatman.sql
├── ├── ├── ├── 0001_common_gorilla_man.sql
├── ├── ├── ├── meta/
├── ├── ├── ├── ├── 0000_snapshot.json
├── ├── ├── ├── ├── 0001_snapshot.json
├── ├── ├── ├── ├── _journal.json
├── ├── ├── schema/
├── ├── ├── ├── jobListing.ts
├── ├── ├── ├── jobListingApplication.ts
├── ├── ├── ├── organizations.ts
├── ├── ├── ├── organizationUserSettings.ts
├── ├── ├── ├── user.ts
├── ├── ├── ├── userNotificationSettings.ts
├── ├── ├── ├── userResume.ts
├── ├── ├── schema.ts
├── ├── ├── schemaHelpers.ts
├── ├── features/
├── ├── ├── jobListings/
├── ├── ├── ├── actions/
├── ├── ├── ├── ├── actions.ts
├── ├── ├── ├── ├── schemas.ts
├── ├── ├── ├── components/
├── ├── ├── ├── ├── JobListingAiSearchForm.tsx
├── ├── ├── ├── ├── JobListingBadges.tsx
├── ├── ├── ├── ├── JobListingFilterForm.tsx
├── ├── ├── ├── ├── JobListingForm.tsx
├── ├── ├── ├── ├── StateSelectItems.tsx
├── ├── ├── ├── db/
├── ├── ├── ├── ├── cache/
├── ├── ├── ├── ├── ├── jobListings.ts
├── ├── ├── ├── ├── jobListings.ts
├── ├── ├── ├── lib/
├── ├── ├── ├── ├── formatters.ts
├── ├── ├── ├── ├── planFeatureHelpers.ts
├── ├── ├── ├── ├── utils.ts
├── ├── ├── jobListingsApplications/
├── ├── ├── ├── actions/
├── ├── ├── ├── ├── actions.ts
├── ├── ├── ├── ├── schemas.ts
├── ├── ├── ├── components/
├── ├── ├── ├── ├── ApplicationTable.tsx
├── ├── ├── ├── ├── NewJobListingApplicationForm.tsx
├── ├── ├── ├── ├── RatingIcons.tsx
├── ├── ├── ├── ├── StageIcon.tsx
├── ├── ├── ├── data/
├── ├── ├── ├── ├── constants.ts
├── ├── ├── ├── db/
├── ├── ├── ├── ├── cache/
├── ├── ├── ├── ├── ├── jobListingApplications.ts
├── ├── ├── ├── ├── jobListingApplications.ts
├── ├── ├── ├── lib/
├── ├── ├── ├── ├── formatters.ts
├── ├── ├── ├── ├── utils.ts
├── ├── ├── organizations/
├── ├── ├── ├── actions/
├── ├── ├── ├── ├── organizationUserSettingActions.ts
├── ├── ├── ├── ├── schemas.ts
├── ├── ├── ├── components/
├── ├── ├── ├── ├── NotificationsForm.tsx
├── ├── ├── ├── ├── SidebarOrganizationButton.tsx
├── ├── ├── ├── ├── _SidebarOrganizationButtonClient.tsx
├── ├── ├── ├── db/
├── ├── ├── ├── ├── cache/
├── ├── ├── ├── ├── ├── organizations.ts
├── ├── ├── ├── ├── ├── organizationUserSettings.ts
├── ├── ├── ├── ├── organizations.ts
├── ├── ├── ├── ├── organizationUserSettings.ts
├── ├── ├── users/
├── ├── ├── ├── actions/
├── ├── ├── ├── ├── schemas.ts
├── ├── ├── ├── ├── userNotificationSettingsAction.ts
├── ├── ├── ├── components/
├── ├── ├── ├── ├── NotificationsForm.tsx
├── ├── ├── ├── ├── SidebarUserButton.tsx
├── ├── ├── ├── ├── _SidebarUserButtonClient.tsx
├── ├── ├── ├── db/
├── ├── ├── ├── ├── cache/
├── ├── ├── ├── ├── ├── userNotificationSettings.ts
├── ├── ├── ├── ├── ├── userResumes.ts
├── ├── ├── ├── ├── ├── users.ts
├── ├── ├── ├── ├── userNotificationSettings.ts
├── ├── ├── ├── ├── userResumes.ts
├── ├── ├── ├── ├── users.ts
├── ├── hooks/
├── ├── ├── use-mobile.ts
├── ├── ├── useIsDarkMode.ts
├── ├── lib/
├── ├── ├── convertSearchParamsToString.ts
├── ├── ├── dataCache.ts
├── ├── ├── utils.ts
├── ├── middleware.ts
├── ├── services/
├── ├── ├── clerk/
├── ├── ├── ├── components/
├── ├── ├── ├── ├── AuthButtons.tsx
├── ├── ├── ├── ├── ClerkProvider.tsx
├── ├── ├── ├── ├── PricingTable.tsx
├── ├── ├── ├── ├── SignInStatus.tsx
├── ├── ├── ├── lib/
├── ├── ├── ├── ├── getCurrentAuth.ts
├── ├── ├── ├── ├── orgUserPermissions.ts
├── ├── ├── ├── ├── planFeatures.ts
├── ├── ├── inngest/
├── ├── ├── ├── ai/
├── ├── ├── ├── ├── applicantRankingAgent.ts
├── ├── ├── ├── ├── getLastOutputMessage.ts
├── ├── ├── ├── ├── getMatchingJobListings.ts
├── ├── ├── ├── client.ts
├── ├── ├── ├── functions/
├── ├── ├── ├── ├── clerk.ts
├── ├── ├── ├── ├── email.ts
├── ├── ├── ├── ├── jobListingApplication.ts
├── ├── ├── ├── ├── resume.ts
├── ├── ├── resend/
├── ├── ├── ├── client.ts
├── ├── ├── ├── components/
├── ├── ├── ├── ├── DailyApplicationEmail.tsx
├── ├── ├── ├── ├── DailyJobListingEmail.tsx
├── ├── ├── ├── data/
├── ├── ├── ├── ├── tailwindConfig.ts
├── ├── ├── uploadthing/
├── ├── ├── ├── client.ts
├── ├── ├── ├── components/
├── ├── ├── ├── ├── UploadThing.tsx
├── ├── ├── ├── ├── UploadThingSSR.tsx
├── ├── ├── ├── router.ts
├── tsconfig.json
```
