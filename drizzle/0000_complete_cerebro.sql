-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "userSubscription" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar,
	"userName" varchar,
	"active" boolean,
	"paymentId" varchar,
	"joinDate" varchar
);
--> statement-breakpoint
CREATE TABLE "aiOutput" (
	"id" serial PRIMARY KEY NOT NULL,
	"formData" text NOT NULL,
	"aiResponse" text,
	"templatesluq" varchar(255) NOT NULL,
	"createdBy" varchar(255) NOT NULL,
	"CreatedAt" varchar,
	"wordCount" integer DEFAULT 0 NOT NULL
);

*/