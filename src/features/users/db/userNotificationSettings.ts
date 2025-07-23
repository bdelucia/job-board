import { db } from "@/drizzle/db";
import { UserNotificationsSettingsTable, UserTable } from "@/drizzle/schema";

export async function insertUserNotificationSettings(
  settings: typeof UserNotificationsSettingsTable.$inferInsert
) {
  await db
    .insert(UserNotificationsSettingsTable)
    .values(settings)
    .onConflictDoNothing();
}
