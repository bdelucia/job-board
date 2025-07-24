import { db } from "@/drizzle/db"
import { UserNotificationsSettingsTable } from "@/drizzle/schema"
import { revalidateUserNotificationSettingsCache } from "./cache/userNotificationSettings"

export async function insertUserNotificationSettings(
  settings: typeof UserNotificationsSettingsTable.$inferInsert
) {
  await db
    .insert(UserNotificationsSettingsTable)
    .values(settings)
    .onConflictDoNothing()

  revalidateUserNotificationSettingsCache(settings.userId)
}
