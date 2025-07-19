import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { OrganizationUserSettingsTable } from "./organizationUserSettings";
import { relations } from "drizzle-orm";
import { UserNotificationsSettingsTable } from "./userNotificationSettings";
import { UserResumeTable } from "./userResume";

export const UserTable = pgTable("users", {
  id: varchar().primaryKey(),
  name: varchar().notNull(),
  imageUrl: varchar().notNull(),
  email: varchar().notNull(),
  createdAt,
  updatedAt,
});

export const userRelations = relations(UserTable, ({ one, many }) => ({
  notificationsSettings: one(UserNotificationsSettingsTable),
  resume: one(UserResumeTable),
  organizationUserSettings: many(OrganizationUserSettingsTable),
}));
