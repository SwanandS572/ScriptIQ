import { pgTable, serial, varchar, boolean, text, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const userSubscription = pgTable("userSubscription", {
	id: serial().primaryKey().notNull(),
	email: varchar(),
	userName: varchar(),
	active: boolean(),
	paymentId: varchar(),
	joinDate: varchar(),
});

export const aiOutput = pgTable("aiOutput", {
	id: serial().primaryKey().notNull(),
	formData: text().notNull(),
	aiResponse: text(),
	templatesluq: varchar({ length: 255 }).notNull(),
	createdBy: varchar({ length: 255 }).notNull(),
	createdAt: varchar("CreatedAt"),
	wordCount: integer().default(0).notNull(),
});
