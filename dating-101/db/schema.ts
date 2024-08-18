import {
  pgTable,
  bigserial,
  varchar,
  doublePrecision,
  date,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  email: varchar("email", { length: 50 }).notNull().unique(),
  password: varchar("password", { length: 100 }).notNull().unique(),
  dateOfBirth: date("date_of_birth").notNull(),
  gender: varchar("gender", { length: 50 }).notNull(),
  profileImage: varchar("profile_image", { length: 1000 }),
  longitude: doublePrecision("longitude").notNull(),
  latitude: doublePrecision("latitude").notNull(),
});

export const blacklist = pgTable("blacklist", {
  access_token: varchar("access_token", { length: 1000 }).primaryKey(),
});
