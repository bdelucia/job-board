import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";

export const UserNotificationsSettingsTable = pgTable(
  "user_notification_settings",
  {
    userId: varchar()
      .primaryKey()
      .references(() => UserTable.id),
    newJobEmailNotifications: boolean().notNull().default(false),
    aiPrompt: varchar(),
    createdAt,
    updatedAt,
  }
);

export const userNotificationSettingsRelations = relations(
  UserNotificationsSettingsTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserNotificationsSettingsTable.userId],
      references: [UserTable.id],
    }),
  })
);
