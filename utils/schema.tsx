import { boolean, integer, pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core"

// Define the table with the exact case as in the database
export const aiOutput = pgTable('aiOutput', {
    id: serial('id').primaryKey(),
    formData: text('formData').notNull(),
    aiResponse: text('aiResponse'),
    templatesluq: varchar('templatesluq', { length: 255 }).notNull(),
    wordCount: integer('wordCount').notNull().default(0),
    createdBy: varchar('createdBy', { length: 255 }).notNull(),
    CreatedAt: text('CreatedAt')  // Matches the database schema
});

export const UserSubscription = pgTable('userSubscription', {
    id: serial('id').primaryKey(),
    email: varchar('email'),
    userName: varchar('userName'),
    active: boolean('active'),
    paymentId: varchar('paymentId'),
    joinDate: varchar('joinDate')
});