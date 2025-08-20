"use server"

import { z } from "zod"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentAuth"
import { userNotificationsSettingsSchema } from "./schemas"
import { updateUserNotificationSettings as updateUserNotificationSettingsDb } from "../db/userNotificationSettings"

export async function updateUserNotificationSettings(
  unsafeData: z.infer<typeof userNotificationsSettingsSchema>
) {
  const { userId } = await getCurrentUser()
  if (userId == null) {
    return {
      error: true,
      message: "You must be signed in to update notification settings",
    }
  }

  const { success, data } =
    userNotificationsSettingsSchema.safeParse(unsafeData)
  if (!success) {
    return {
      error: true,
      message: "There was an error updating your notification settings",
    }
  }

  await updateUserNotificationSettingsDb(userId, data)

  return {
    error: false,
    message: "Successfully updated your notification settings",
  }
}
